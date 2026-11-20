const RAW_BASE_URL = import.meta.env.DEV
  ? '/ml-api'
  : import.meta.env.VITE_API_BASE_URL || '';

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
      parsedDetail || 'Unsupported file format or invalid input data.',
      400,
      detail
    );
  }
  if (status === 413) {
    throw new ApiError(
      parsedDetail || 'Image size exceeds the maximum allowed limit.',
      413,
      detail
    );
  }
  if (status === 422) {
    throw new ApiError(
      parsedDetail || 'Input validation failed. Please check your entered values.',
      422,
      detail
    );
  }
  if (status >= 500) {
    throw new ApiError(
      parsedDetail || 'Something went wrong while processing your request. Please try again shortly.',
      status,
      detail
    );
  }

  throw new ApiError(
    parsedDetail || 'Unable to process the request right now.',
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
        'The request is taking longer than expected. Please try again in a moment.',
        408
      );
    }
    throw new ApiError(
      'Prediction service is currently unavailable. Please try again later.',
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
    throw new ApiError('Building Area (LB) must be greater than 0 and at most 100,000 m².', 422);
  }
  if (!Number.isFinite(lt) || lt <= 0 || lt > 100000) {
    throw new ApiError('Land Area (LT) must be greater than 0 and at most 100,000 m².', 422);
  }
  if (!Number.isInteger(kt) || kt < 0 || kt > 100) {
    throw new ApiError('Bedrooms (KT) must be a whole number between 0 and 100.', 422);
  }
  if (!Number.isInteger(km) || km < 0 || km > 100) {
    throw new ApiError('Bathrooms (KM) must be a whole number between 0 and 100.', 422);
  }
  if (!Number.isInteger(grs) || grs < 0 || grs > 100) {
    throw new ApiError('Garage Capacity (GRS) must be a whole number between 0 and 100.', 422);
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
 * C. Handwritten Digit Recognition (POST /predict-handwrite/)
 */
export async function predictHandwrittenDigit(imageBase64) {
  if (!imageBase64 || typeof imageBase64 !== 'string') {
    throw new ApiError('Canvas drawing cannot be empty.', 400);
  }
  if (imageBase64.length > MAX_BASE64_LENGTH) {
    throw new ApiError('Image size exceeds the 2 MB limit.', 413);
  }

  return fetchWithTimeout('/predict-handwrite/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_base64: imageBase64 }),
  });
}

/**
 * D. 3-Class Image Classifier: Cats, Dogs, Others (POST /predict)
 */
export function validateImageFile(file) {
  if (!file) {
    throw new ApiError('Please select an image file first.', 400);
  }
  const lowerName = (file.name || '').toLowerCase();
  const hasValidExt = ALLOWED_IMAGE_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  if (!hasValidExt) {
    throw new ApiError(
      'Unsupported file format. Please use .png, .jpg, .jpeg, or .webp.',
      400
    );
  }
  if (file.size > MAX_IMAGE_FILE_BYTES) {
    throw new ApiError('Image file size exceeds the 5 MB limit.', 413);
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

/**
 * E. Credit/Debit Card Fraud Detection (POST /predict-fraud)
 */
export function validateFraudInput(raw) {
  const num = (v) => Number(v);
  const amount = num(raw.amount_usd);
  const customerAge = num(raw.customer_age);
  const cardAgeMonths = num(raw.card_age_months);
  const accountBalance = num(raw.account_balance_usd);
  const priorDisputes = raw.prior_disputes === '' || raw.prior_disputes === undefined ? 0 : num(raw.prior_disputes);
  const hoursSinceLast = num(raw.hours_since_last_txn);
  const txnCount24h = num(raw.txn_count_last_24h);
  const distanceKm = num(raw.distance_from_home_km);
  const velocityScore = num(raw.velocity_score);
  const timeOfDay = num(raw.time_of_day_hour);
  const dayOfWeek = num(raw.day_of_week);
  const merchantRisk = num(raw.merchant_risk_score);
  const cvvRetry = raw.cvv_retry_count === '' || raw.cvv_retry_count === undefined ? 0 : num(raw.cvv_retry_count);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new ApiError('amount_usd: Transaction amount must be greater than 0.', 422);
  }
  const requiredStrings = [
    ['merchant_category', raw.merchant_category],
    ['card_type', raw.card_type],
    ['auth_method', raw.auth_method],
    ['channel', raw.channel],
    ['device_type', raw.device_type],
  ];
  for (const [field, val] of requiredStrings) {
    if (!val || typeof val !== 'string' || !val.trim()) {
      throw new ApiError(`${field}: This field is required.`, 422);
    }
  }
  if (!Number.isInteger(customerAge) || customerAge < 18 || customerAge > 120) {
    throw new ApiError('customer_age: Must be a whole number between 18 and 120.', 422);
  }
  if (!Number.isInteger(cardAgeMonths) || cardAgeMonths < 0) {
    throw new ApiError('card_age_months: Must be a whole number >= 0.', 422);
  }
  if (!Number.isFinite(accountBalance) || accountBalance < 0) {
    throw new ApiError('account_balance_usd: Must be >= 0.', 422);
  }
  if (!Number.isInteger(priorDisputes) || priorDisputes < 0) {
    throw new ApiError('prior_disputes: Must be a whole number >= 0.', 422);
  }
  if (!Number.isFinite(hoursSinceLast) || hoursSinceLast < 0) {
    throw new ApiError('hours_since_last_txn: Must be >= 0.', 422);
  }
  if (!Number.isInteger(txnCount24h) || txnCount24h < 0) {
    throw new ApiError('txn_count_last_24h: Must be a whole number >= 0.', 422);
  }
  if (!Number.isFinite(distanceKm) || distanceKm < 0) {
    throw new ApiError('distance_from_home_km: Must be >= 0.', 422);
  }
  if (!Number.isFinite(velocityScore) || velocityScore < 0) {
    throw new ApiError('velocity_score: Must be >= 0.', 422);
  }
  if (!Number.isInteger(timeOfDay) || timeOfDay < 0 || timeOfDay > 23) {
    throw new ApiError('time_of_day_hour: Must be a whole number between 0 and 23.', 422);
  }
  if (!Number.isInteger(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
    throw new ApiError('day_of_week: Must be a whole number between 0 (Mon) and 6 (Sun).', 422);
  }
  if (!Number.isFinite(merchantRisk) || merchantRisk < 0 || merchantRisk > 100) {
    throw new ApiError('merchant_risk_score: Must be between 0 and 100.', 422);
  }
  if (!Number.isInteger(cvvRetry) || cvvRetry < 0 || cvvRetry > 10) {
    throw new ApiError('cvv_retry_count: Must be a whole number between 0 and 10.', 422);
  }

  return {
    amount_usd: amount,
    merchant_category: raw.merchant_category.trim(),
    card_type: raw.card_type.trim(),
    auth_method: raw.auth_method.trim(),
    channel: raw.channel.trim(),
    device_type: raw.device_type.trim(),
    customer_age: customerAge,
    card_age_months: cardAgeMonths,
    account_balance_usd: accountBalance,
    prior_disputes: priorDisputes,
    hours_since_last_txn: hoursSinceLast,
    txn_count_last_24h: txnCount24h,
    distance_from_home_km: distanceKm,
    velocity_score: velocityScore,
    time_of_day_hour: timeOfDay,
    day_of_week: dayOfWeek,
    merchant_risk_score: merchantRisk,
    cvv_retry_count: cvvRetry,
    is_foreign_transaction: Boolean(raw.is_foreign_transaction),
    is_new_merchant: Boolean(raw.is_new_merchant),
    used_vpn: Boolean(raw.used_vpn),
    ip_country_mismatch: Boolean(raw.ip_country_mismatch),
    billing_shipping_mismatch: Boolean(raw.billing_shipping_mismatch),
    is_ai_generated_scam_attempt: Boolean(raw.is_ai_generated_scam_attempt),
  };
}

export async function predictFraud(rawInput) {
  const payload = validateFraudInput(rawInput);
  return fetchWithTimeout('/predict-fraud', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

