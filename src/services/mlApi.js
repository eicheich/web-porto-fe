const RAW_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

// Minimal 60 detik untuk mengakomodasi cold-start lazy loading (.keras / .joblib)
export const ML_TIMEOUT_MS = 60000;
export const HEALTH_TIMEOUT_MS = 15000;

export const MAX_BASE64_LENGTH = 2 * 1024 * 1024; // 2 MB karakter
export const MAX_IMAGE_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

export class ApiError extends Error {
  constructor(message, status = 0, detail = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

function extractDetailMessage(detail) {
  if (!detail) return null;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((err) => {
        const loc = Array.isArray(err.loc) ? err.loc.slice(1).join('.') : '';
        return loc ? `${loc}: ${err.msg}` : err.msg;
      })
      .filter(Boolean)
      .join('; ');
  }
  if (typeof detail === 'object') {
    return JSON.stringify(detail);
  }
  return String(detail);
}

async function parseErrorResponse(response) {
  let detail = null;
  try {
    const data = await response.json();
    detail = data?.detail ?? null;
  } catch {
    // Abaikan jika body bukan JSON
  }

  const parsedDetail = extractDetailMessage(detail);
  const status = response.status;

  if (status === 400) {
    throw new ApiError(
      parsedDetail || 'Format gambar tidak didukung atau data tidak valid.',
      400,
      detail
    );
  }
  if (status === 413) {
    throw new ApiError(
      parsedDetail || 'Ukuran gambar melebihi batas maksimal yang diizinkan.',
      413,
      detail
    );
  }
  if (status === 422) {
    throw new ApiError(
      parsedDetail || 'Data yang dimasukkan belum sesuai. Periksa kembali input Anda.',
      422,
      detail
    );
  }
  if (status >= 500) {
    throw new ApiError(
      'Terjadi kendala pada sistem saat memproses permintaan. Silakan coba lagi sebentar lagi.',
      status,
      detail
    );
  }

  throw new ApiError(
    parsedDetail || 'Permintaan tidak dapat diproses saat ini.',
    status,
    detail
  );
}

async function fetchWithTimeout(path, options = {}, timeoutMs = ML_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      await parseErrorResponse(response);
    }

    return await response.json();
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    if (err?.name === 'AbortError') {
      throw new ApiError(
        'Proses memakan waktu lebih lama dari biasanya. Silakan coba lagi sebentar lagi.',
        408
      );
    }
    throw new ApiError(
      'Layanan prediksi sedang tidak tersedia saat ini. Silakan coba lagi beberapa saat lagi.',
      0
    );
  } finally {
    clearTimeout(timer);
  }
}

/**
 * A. Health Check
 */
export function fetchApiStatus() {
  return fetchWithTimeout('/', { method: 'GET' }, HEALTH_TIMEOUT_MS);
}

export function fetchHealthStatus() {
  return fetchWithTimeout('/health', { method: 'GET' }, HEALTH_TIMEOUT_MS);
}

/**
 * B. Prediksi Harga Rumah (POST /predict-house-pricing)
 */
export function validateHousePricingInput({ LB, LT, KT, KM, GRS }) {
  const lb = Number(LB);
  const lt = Number(LT);
  const kt = Number(KT);
  const km = Number(KM);
  const grs = Number(GRS);

  if (!Number.isFinite(lb) || lb <= 0 || lb > 100000) {
    throw new ApiError('Luas Bangunan (LB) wajib lebih dari 0 dan maksimal 100.000 m².', 422);
  }
  if (!Number.isFinite(lt) || lt <= 0 || lt > 100000) {
    throw new ApiError('Luas Tanah (LT) wajib lebih dari 0 dan maksimal 100.000 m².', 422);
  }
  if (!Number.isInteger(kt) || kt < 0 || kt > 100) {
    throw new ApiError('Kamar Tidur (KT) harus bilangan bulat antara 0 hingga 100.', 422);
  }
  if (!Number.isInteger(km) || km < 0 || km > 100) {
    throw new ApiError('Kamar Mandi (KM) harus bilangan bulat antara 0 hingga 100.', 422);
  }
  if (!Number.isInteger(grs) || grs < 0 || grs > 100) {
    throw new ApiError('Kapasitas Garasi (GRS) harus bilangan bulat antara 0 hingga 100.', 422);
  }

  return { LB: lb, LT: lt, KT: kt, KM: km, GRS: grs };
}

export async function predictHousePricing(rawInput) {
  const payload = validateHousePricingInput(rawInput);
  return fetchWithTimeout('/predict-house-pricing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

/**
 * C. Pengenalan Angka Tulisan Tangan (POST /predict-handwrite/)
 */
export async function predictHandwrittenDigit(imageBase64) {
  if (!imageBase64 || typeof imageBase64 !== 'string') {
    throw new ApiError('Gambar canvas tidak boleh kosong.', 400);
  }
  if (imageBase64.length > MAX_BASE64_LENGTH) {
    throw new ApiError('Ukuran gambar base64 melebihi batas maksimal 2 MB.', 413);
  }

  return fetchWithTimeout('/predict-handwrite/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_base64: imageBase64 }),
  });
}

/**
 * D. Klasifikasi Gambar 3-Kelas: Cats, Dogs, Others (POST /predict)
 */
export function validateImageFile(file) {
  if (!file) {
    throw new ApiError('Pilih file gambar terlebih dahulu.', 400);
  }
  const lowerName = (file.name || '').toLowerCase();
  const hasValidExt = ALLOWED_IMAGE_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  if (!hasValidExt) {
    throw new ApiError(
      'Format file tidak didukung. Gunakan .png, .jpg, .jpeg, atau .webp.',
      400
    );
  }
  if (file.size > MAX_IMAGE_FILE_BYTES) {
    throw new ApiError('Ukuran file gambar melebihi batas maksimal 5 MB.', 413);
  }
}

export async function predictImageClass(file) {
  validateImageFile(file);
  const formData = new FormData();
  formData.append('image', file);

  return fetchWithTimeout('/predict', {
    method: 'POST',
    body: formData,
  });
}

export function formatRupiah(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

