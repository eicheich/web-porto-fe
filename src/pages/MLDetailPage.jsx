import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Upload,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import Button from '../components/Button';
import HandwriteCanvas from '../components/HandwriteCanvas';
import FraudDetectionDemo from '../components/FraudDetectionDemo';
import {
  fetchApiStatus,
  fetchHealthStatus,
  predictHousePricing,
  predictHandwrittenDigit,
  predictImageClass,
  validateImageFile,
  formatRupiah,
} from '../services/mlApi';

export default function MLDetailPage({ projectId = 'fraud-detection', onBackToProjects }) {
  const aliasMap = {
    digits: 'what-does-a-seven-look-like',
    catdog: 'cat-or-dog',
    housing: 'house-price-estimator',
    fraud: 'fraud-detection',
  };

  const projectConfigs = {
    'fraud-detection': {
      category: 'Machine Learning / Tabular',
      title: 'Card fraud detection.',
      subtitle: 'Spotting suspicious payment activity across transaction amounts, locations, and device signals.',
      howItWorks: 'Review card signals → Evaluate risk indicators → Flag transactions that look unusually out of character',
      howItWorksSub: 'Balances risk detection so common everyday purchases continue smoothly without false alarms.',
      realWorldUse: 'Helps payment processors and merchants intercept account abuse and fraudulent charges before settlement.',
      myRole: 'Curated the transaction risk features, trained a tuned logistic regression model, and built this interactive exploration.',
      tools: ['Python', 'Scikit-Learn', 'FastAPI', 'React'],
      note: 'Estimates based on learned card behavior patterns. Unfamiliar legit purchases may trigger higher review scores.',
      links: [
        {
          label: 'Hugging Face Model',
          url: 'https://huggingface.co/unalivehooman/credit-card-fraud-detection-2026',
        },
        {
          label: 'Documentation (PDF)',
          url: 'https://drive.google.com/file/d/1DzipSpCgneMpUN8lj7rc9m7LPIEGR4Ti/view?usp=sharing',
        },
      ],
    },
    'what-does-a-seven-look-like': {
      category: 'Machine Learning / Vision',
      title: 'Handwritten digit recognizer.',
      subtitle: 'A hands-on look at how models learn to recognize handwritten numbers.',
      howItWorks: 'Read pixel grid → Detect strokes and curves → Match against learned digit shapes',
      howItWorksSub: 'Trained on thousands of handwritten digit examples to handle different writing styles.',
      realWorldUse: 'Used in banking to read handwritten check amounts, postal sorting, and digitizing paper forms.',
      myRole: 'Trained a neural network on handwritten digit data and built an 8×8 drawing grid so anyone can test it.',
      tools: ['Python', 'PyTorch', 'Computer Vision', 'React'],
      note: 'Best with centered digits. Extreme slant and noisy strokes can cause misclassification.',
    },
    'cat-or-dog': {
      category: 'Machine Learning / Vision',
      title: 'Cat or dog?',
      subtitle: 'A small experiment in telling cats and dogs apart from a single image.',
      howItWorks: 'Resize photo → Scan visual patterns (ears, nose, fur) → Predict Cat or Dog',
      howItWorksSub: 'Demonstrates how computers learn to see shapes and textures instead of reading text.',
      realWorldUse: 'The same visual recognition foundation powers pet adoption apps, wildlife cameras, and medical image screening.',
      myRole: 'Prepared image datasets, fine-tuned a convolutional classifier, and evaluated confidence scores on edge cases.',
      tools: ['Python', 'PyTorch', 'CNN', 'Image Classification'],
      note: 'Best with clear animal faces in natural daylight.',
    },
    'house-price-estimator': {
      category: 'Machine Learning / Regression',
      title: 'House price estimator',
      subtitle: 'Estimating house prices from property features such as area, bedrooms, and bathrooms.',
      howItWorks: 'Measure property details → Weigh how each feature affects value → Output an estimated price',
      howItWorksSub: 'Uses historical housing patterns to turn raw numbers into a practical price range.',
      realWorldUse: 'Helps homebuyers, renters, and agents get a fast, data-backed baseline price before negotiating.',
      myRole: 'Cleaned housing records, selected key property features, and built a real-time slider calculator.',
      tools: ['Python', 'Pandas', 'Scikit-Learn', 'Regression'],
      note: 'Historical housing estimates do not factor sudden market fluctuations or macro trends.',
    },
  };

  const resolvedId = aliasMap[projectId] || projectId;
  const currentConfig = projectConfigs[resolvedId] || projectConfigs['fraud-detection'];

  // Server health indicator (GET / & GET /health)
  const [apiStatus, setApiStatus] = useState({
    state: 'checking', // 'checking' | 'online' | 'offline'
    lazyLoading: true,
    modelFiles: null,
    modelsInMemory: null,
  });

  useEffect(() => {
    let active = true;
    fetchApiStatus()
      .then((data) => {
        if (!active) return;
        setApiStatus((prev) => ({
          ...prev,
          state: data?.status === 'online' ? 'online' : 'offline',
          lazyLoading: Boolean(data?.lazy_loading),
          modelFiles: data?.model_files || null,
        }));
      })
      .catch(() => {
        if (!active) return;
        setApiStatus((prev) => ({ ...prev, state: 'offline' }));
      });
    return () => {
      active = false;
    };
  }, []);

  const handleCheckMemoryHealth = async () => {
    try {
      const data = await fetchHealthStatus();
      setApiStatus((prev) => ({
        ...prev,
        state: 'online',
        modelsInMemory: data?.models_in_memory || data || null,
      }));
    } catch {
      setApiStatus((prev) => ({ ...prev, state: 'offline' }));
    }
  };

  // Variant B: Handwritten Digit (POST /predict-handwrite/)
  const [digitResult, setDigitResult] = useState(null);
  const [digitLoading, setDigitLoading] = useState(false);
  const [digitError, setDigitError] = useState(null);

  const handlePredictDigit = async (imageBase64) => {
    setDigitLoading(true);
    setDigitError(null);
    try {
      const res = await predictHandwrittenDigit(imageBase64);
      setDigitResult(res);
    } catch (err) {
      setDigitError(err.message || 'Failed to predict the handwritten digit.');
    } finally {
      setDigitLoading(false);
    }
  };

  // Variant C: 3-Class Image Classifier (POST /predict)
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/cat.jpg');
  const [classifierResult, setClassifierResult] = useState(null);
  const [classifierLoading, setClassifierLoading] = useState(false);
  const [classifierError, setClassifierError] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageFileSelect = (file) => {
    setClassifierError(null);
    setClassifierResult(null);
    try {
      validateImageFile(file);
      const nextUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(nextUrl);
    } catch (err) {
      setClassifierError(err.message || 'Invalid image file.');
    }
  };

  const handleClassifySelectedImage = async () => {
    setClassifierLoading(true);
    setClassifierError(null);
    try {
      let fileToSend = selectedFile;
      if (!fileToSend) {
        const resp = await fetch(previewUrl || '/cat.jpg');
        const blob = await resp.blob();
        fileToSend = new File([blob], 'sample-cat.jpg', { type: blob.type || 'image/jpeg' });
      }
      const res = await predictImageClass(fileToSend);
      setClassifierResult(res);
    } catch (err) {
      setClassifierError(err.message || 'Failed to classify the image.');
    } finally {
      setClassifierLoading(false);
    }
  };

  // Variant D: House Price Prediction (POST /predict-house-pricing)
  const [houseForm, setHouseForm] = useState({
    LB: '120',
    LT: '150',
    KT: '3',
    KM: '2',
    GRS: '1',
  });
  const [houseResult, setHouseResult] = useState(null);
  const [houseLoading, setHouseLoading] = useState(false);
  const [houseError, setHouseError] = useState(null);

  const handlePredictHousePrice = async (e) => {
    e.preventDefault();
    setHouseLoading(true);
    setHouseError(null);
    try {
      const res = await predictHousePricing({
        LB: parseFloat(houseForm.LB),
        LT: parseFloat(houseForm.LT),
        KT: Number(houseForm.KT),
        KM: Number(houseForm.KM),
        GRS: Number(houseForm.GRS),
      });
      setHouseResult(res);
    } catch (err) {
      setHouseError(err.message || 'Failed to estimate house price.');
    } finally {
      setHouseLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-10 pt-8 sm:pt-12 pb-20">
      {/* Top Bar: Back */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <Button onClick={onBackToProjects} className="group">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          All ML projects
        </Button>
      </motion.div>

      {/* Compact Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8"
      >
        <div className="min-w-0 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-block bg-[#008272] text-white px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase">
              {currentConfig.category}
            </span>
            <div className="bg-white border border-[#CBD5E1] px-2.5 py-1 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#0F172A]">
              <span
                className={`w-2 h-2 rounded-full ${
                  apiStatus.state === 'online'
                    ? 'bg-[#15803D]'
                    : apiStatus.state === 'checking'
                      ? 'bg-[#CA8A04] animate-pulse'
                      : 'bg-[#B91C1C]'
                }`}
              />
              <span>
                {apiStatus.state === 'online'
                  ? 'Service Online'
                  : apiStatus.state === 'checking'
                    ? 'Checking...'
                    : 'Service Offline'}
              </span>
              <button
                type="button"
                onClick={handleCheckMemoryHealth}
                aria-label="Refresh service status"
                className="ml-0.5 text-[#0078D7] hover:underline inline-flex items-center cursor-pointer"
              >
                <RefreshCw size={11} />
              </button>
            </div>
          </div>

          <h1 className="font-metro text-3xl sm:text-5xl font-light text-[#0F172A] tracking-tight leading-[1.06] mb-3">
            {currentConfig.title}
          </h1>
          <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed">
            {currentConfig.subtitle}
          </p>
        </div>

        {currentConfig.links && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {currentConfig.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#CBD5E1] hover:border-[#0078D7] hover:bg-[#0078D7] hover:text-white px-3.5 py-2 text-xs font-semibold text-[#0F172A] inline-flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink size={13} aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </motion.div>

      {/* Interactive Demo Tile — Front & Center */}
      <motion.div
        id="try-model-section"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-mt-20"
      >
        <div className="bg-white border border-[#CBD5E1] border-t-4 border-t-[#008272] overflow-hidden">
          <div className="bg-[#0F172A] text-white px-5 py-3 flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] font-semibold tracking-wide text-[#CBD5E1]">
              Live Demo — {currentConfig.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#38BDF8]">
              Interactive Inference
            </span>
          </div>
          <div className="bg-[#F8FAFC] p-4 sm:p-6">
          {/* VARIANT B: DIGIT (POST /predict-handwrite/) */}
          {(projectId.includes('seven') || projectId === 'digits') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white border border-[#E2E8F0] p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-[#0F172A] text-sm">
                    Draw a Digit (0–9) · 280×280 Canvas
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    Mouse &amp; Touch
                  </span>
                </div>

                <HandwriteCanvas
                  onPredict={handlePredictDigit}
                  isLoading={digitLoading}
                />

                <p className="text-xs text-[#64748B] mt-3">
                  Draw a single digit in the center of the box, then click Predict Digit to run inference.
                </p>
              </div>

              <div className="lg:col-span-5 bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#0078D7] uppercase tracking-wider block mb-2">
                    The Model's Guess
                  </span>

                  {digitLoading && (
                    <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 mb-4 flex items-center gap-2 text-xs text-[#0F172A]">
                      <Loader2 size={15} className="animate-spin shrink-0 text-[#0078D7]" />
                      <span className="font-semibold">Recognizing digit...</span>
                    </div>
                  )}

                  {digitError && (
                    <div className="bg-[#FEF2F2] border border-[#FECACA] p-3 mb-4 flex items-start gap-2 text-xs text-[#991B1B]">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{digitError}</span>
                    </div>
                  )}

                  {digitResult ? (
                    <>
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="font-metro text-5xl font-light text-[#0078D7]">
                          {digitResult.predicted_digit}
                        </h3>
                        <span className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#0078D7] px-2.5 py-0.5 text-xs font-mono font-semibold">
                          {(digitResult.confidence * 100).toFixed(1)}% confidence
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B]">
                        Predicted live from the handwritten digit classifier.
                      </p>
                    </>
                  ) : !digitLoading && !digitError ? (
                    <>
                      <h3 className="font-metro text-3xl font-light text-[#0F172A] mb-2">
                        Ready.
                      </h3>
                      <p className="text-xs text-[#64748B]">
                        Draw a digit on the 280×280 canvas on the left, then click <strong>Predict Digit</strong>.
                      </p>
                    </>
                  ) : null}
                </div>
                <span className="text-[11px] font-mono text-[#64748B] mt-4">
                  Max base64: 2 MB · Auto-invert MNIST
                </span>
              </div>
            </div>
          )}

          {/* VARIANT C: 3-CLASS IMAGE CLASSIFIER (POST /predict) */}
          {(projectId.includes('cat') || projectId === 'catdog') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col items-center text-center">
                <div className="w-40 h-40 border border-[#CBD5E1] bg-white overflow-hidden mb-4">
                  <img
                    src={previewUrl}
                    alt="Selected preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <Button as="label">
                    <Upload size={13} className="text-[#0078D7]" />
                    Upload Photo
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageFileSelect(file);
                      }}
                    />
                  </Button>

                  <Button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('/cat.jpg');
                      setClassifierError(null);
                      setClassifierResult(null);
                    }}
                  >
                    Use Sample Cat
                  </Button>

                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleClassifySelectedImage}
                    disabled={classifierLoading}
                  >
                    {classifierLoading ? 'Classifying...' : 'Classify Image'}
                  </Button>
                </div>

                <span className="text-[11px] font-mono text-[#64748B]">
                  {selectedFile ? `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)` : 'Sample: cat.jpg · Formats: .png, .jpg, .jpeg, .webp (max 5 MB)'}
                </span>
              </div>

              <div className="lg:col-span-5 bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#0078D7] uppercase tracking-wider block mb-2">
                    3-Class Classification (Cats / Dogs / Others)
                  </span>

                  {classifierLoading && (
                    <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 mb-4 flex items-center gap-2 text-xs text-[#0F172A]">
                      <Loader2 size={15} className="animate-spin shrink-0 text-[#0078D7]" />
                      <span className="font-semibold">Analyzing image...</span>
                    </div>
                  )}

                  {classifierError && (
                    <div className="bg-[#FEF2F2] border border-[#FECACA] p-3 mb-4 flex items-start gap-2 text-xs text-[#991B1B]">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{classifierError}</span>
                    </div>
                  )}

                  {classifierResult ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-metro text-3xl font-light text-[#0F172A] capitalize">
                          {classifierResult.prediction}
                        </h3>
                        <span className="bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-0.5 text-xs font-mono font-semibold text-[#0078D7]">
                          {(classifierResult.confidence * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="space-y-2">
                        {['cats', 'dogs', 'others'].map((cls) => {
                          const prob = classifierResult.probabilities?.[cls] ?? 0;
                          const pct = Math.max(0, Math.min(100, prob * 100));
                          const isWinner = classifierResult.prediction === cls;
                          return (
                            <div key={cls}>
                              <div className="flex justify-between text-xs font-mono mb-0.5">
                                <span className={`capitalize ${isWinner ? 'font-bold text-[#0078D7]' : 'text-[#64748B]'}`}>
                                  {cls}
                                </span>
                                <span className="font-bold text-[#0F172A]">{pct.toFixed(1)}%</span>
                              </div>
                              <div className="h-2.5 bg-[#E2E8F0]">
                                <div
                                  className={`h-full transition-all duration-300 ${
                                    isWinner ? 'bg-[#0078D7]' : 'bg-[#94A3B8]'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {typeof classifierResult.execution_time_ms === 'number' && (
                        <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                          Latency: {classifierResult.execution_time_ms.toFixed(2)} ms
                        </div>
                      )}
                    </div>
                  ) : !classifierLoading && !classifierError ? (
                    <div>
                      <h3 className="font-metro text-2xl font-light text-[#0F172A] mb-1">
                        Ready to classify.
                      </h3>
                      <p className="text-xs text-[#64748B]">
                        Upload a photo or use the sample image, then click <strong>Classify Image</strong>.
                      </p>
                    </div>
                  ) : null}
                </div>

                <span className="text-[11px] font-mono text-[#64748B] mt-4">
                  3-Class Vision Classifier
                </span>
              </div>
            </div>
          )}

          {/* VARIANT D: HOUSE PRICE ESTIMATOR (POST /predict-house-pricing) */}
          {(projectId.includes('house') || projectId === 'housing') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form
                onSubmit={handlePredictHousePrice}
                className="lg:col-span-7 bg-white border border-[#E2E8F0] p-5 sm:p-6 space-y-3.5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="house-lb" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Building Area (LB, m²)
                    </label>
                    <input
                      id="house-lb"
                      type="number"
                      step="any"
                      min="0.1"
                      max="100000"
                      required
                      value={houseForm.LB}
                      onChange={(e) => setHouseForm({ ...houseForm, LB: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="house-lt" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Land Area (LT, m²)
                    </label>
                    <input
                      id="house-lt"
                      type="number"
                      step="any"
                      min="0.1"
                      max="100000"
                      required
                      value={houseForm.LT}
                      onChange={(e) => setHouseForm({ ...houseForm, LT: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="house-kt" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Bedrooms (KT)
                    </label>
                    <input
                      id="house-kt"
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      required
                      value={houseForm.KT}
                      onChange={(e) => setHouseForm({ ...houseForm, KT: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="house-km" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Bathrooms (KM)
                    </label>
                    <input
                      id="house-km"
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      required
                      value={houseForm.KM}
                      onChange={(e) => setHouseForm({ ...houseForm, KM: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="house-grs" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Garage Capacity (GRS, cars)
                    </label>
                    <input
                      id="house-grs"
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      required
                      value={houseForm.GRS}
                      onChange={(e) => setHouseForm({ ...houseForm, GRS: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] focus:border-[#0078D7] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={houseLoading}
                  >
                    {houseLoading ? 'Estimating Price...' : 'Estimate House Price'}
                  </Button>
                </div>
              </form>

              <div className="lg:col-span-5 bg-white border border-[#E2E8F0] p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#008272] uppercase tracking-wider block mb-2">
                    Estimated Price (IDR)
                  </span>

                  {houseLoading && (
                    <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 mb-4 flex items-center gap-2 text-xs text-[#0F172A]">
                      <Loader2 size={15} className="animate-spin shrink-0 text-[#0078D7]" />
                      <span className="font-semibold">Estimating price...</span>
                    </div>
                  )}

                  {houseError && (
                    <div className="bg-[#FEF2F2] border border-[#FECACA] p-3 mb-4 flex items-start gap-2 text-xs text-[#991B1B]">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{houseError}</span>
                    </div>
                  )}

                  {houseResult ? (
                    <>
                      <h3 className="font-metro text-2xl sm:text-3xl font-light text-[#008272] mb-2 break-words">
                        {formatRupiah(houseResult.estimasi_harga)}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#15803D] font-bold">
                        <CheckCircle2 size={13} />
                        Status: {houseResult.status || 'success'}
                      </div>
                    </>
                  ) : !houseLoading && !houseError ? (
                    <>
                      <h3 className="font-metro text-2xl font-light text-[#0F172A] mb-1">
                        Ready to estimate.
                      </h3>
                      <p className="text-xs text-[#64748B]">
                        Enter LB, LT, KT, KM, and GRS values, then click <strong>Estimate House Price</strong>.
                      </p>
                    </>
                  ) : null}
                </div>
                <span className="text-[11px] font-mono text-[#64748B] mt-4">
                  Regression Price Estimator
                </span>
              </div>
            </div>
          )}

          {/* VARIANT G: FRAUD DETECTION (POST /predict-fraud) */}
          {resolvedId === 'fraud-detection' && <FraudDetectionDemo />}
          </div>
        </div>

        <p className="text-center text-xs text-[#475569] font-mono mt-4">
          {currentConfig.note}
        </p>
      </motion.div>

      {/* Structured Metro Model Overview Tile */}
      <motion.div
        id="how-it-works-section"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="scroll-mt-20 mt-12"
      >
        <div className="bg-white border border-[#CBD5E1] border-t-4 border-t-[#0078D7] overflow-hidden">
          <div className="bg-[#0F172A] text-white px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold tracking-wide text-[#CBD5E1]">
              Model Overview &amp; Context
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
            {/* Left: How it works */}
            <div className="bg-[#F8FAFC] p-6 sm:p-7">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0078D7] block mb-2">
                How it works
              </span>
              <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                {currentConfig.howItWorksSub}
              </p>

              <ol className="space-y-4">
                {currentConfig.howItWorks.split(' → ').map((step, index) => (
                  <li key={step} className="flex items-start gap-3.5">
                    <span className="bg-[#0078D7] text-white px-2 py-0.5 font-mono text-xs font-bold shrink-0">
                      0{index + 1}
                    </span>
                    <p className="font-display text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right: Real-world use, What I built, Tools */}
            <div className="bg-white p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0078D7] block mb-1.5">
                    Real-World Use
                  </span>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {currentConfig.realWorldUse}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0078D7] block mb-1.5">
                    What I Built
                  </span>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {currentConfig.myRole}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E2E8F0]">
                {currentConfig.tools.map((tool) => (
                  <span key={tool} className="bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] text-[11px] font-mono font-semibold px-2.5 py-1">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 flex justify-end">
        <Button variant="text" onClick={onBackToProjects} className="group">
          Explore all ML projects
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </main>
  );
}
