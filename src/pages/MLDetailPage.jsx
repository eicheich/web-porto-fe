import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowDown,
  ArrowRight,
  Loader2,
  Upload,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { Win98WindowControls, PixelDocIcon } from '../components/RetroStickers';
import HandwriteCanvas from '../components/HandwriteCanvas';
import {
  fetchApiStatus,
  fetchHealthStatus,
  predictHousePricing,
  predictHandwrittenDigit,
  predictImageClass,
  validateImageFile,
  formatRupiah,
} from '../services/mlApi';

export default function MLDetailPage({ projectId = 'reading-between-the-words', onBackToProjects }) {
  const aliasMap = {
    sentiment: 'reading-between-the-words',
    digits: 'what-does-a-seven-look-like',
    catdog: 'cat-or-dog',
    housing: 'house-price-estimator',
    spam: 'a-second-look-at-spam',
    clustering: 'patterns-hiding-in-plain-sight',
  };

  const projectConfigs = {
    'reading-between-the-words': {
      category: 'Machine Learning / Language',
      title: 'Reading between the words.',
      subtitle: 'A sentiment classifier for short English sentences.',
      howItWorks: 'Clean the text → spot key mood words → predict the overall tone.',
      howItWorksSub: 'Predictions are estimates, not a full understanding of human context.',
      realWorldUse: 'Helps teams automatically sort thousands of customer reviews or event feedback into positive, negative, or mixed.',
      myRole: 'Built the text preprocessing pipeline, trained the baseline classifier, and designed this interactive web demo.',
      tools: ['Python', 'Scikit-Learn', 'NLP', 'React'],
      note: 'Best with short English sentences. Sarcasm and mixed tone can be misread.',
    },
    'what-does-a-seven-look-like': {
      category: 'Machine Learning / Vision',
      title: 'What does a seven look like?',
      subtitle: 'A hands-on look at how models learn to recognize handwritten numbers.',
      howItWorks: 'Read pixel grid → detect strokes and curves → match against learned digit shapes.',
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
      howItWorks: 'Resize photo → scan visual patterns (ears, nose, fur) → predict Cat or Dog.',
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
      howItWorks: 'Measure property details → weigh how each feature affects value → output an estimated price.',
      howItWorksSub: 'Uses historical housing patterns to turn raw numbers into a practical price range.',
      realWorldUse: 'Helps homebuyers, renters, and agents get a fast, data-backed baseline price before negotiating.',
      myRole: 'Cleaned housing records, selected key property features, and built a real-time slider calculator.',
      tools: ['Python', 'Pandas', 'Scikit-Learn', 'Regression'],
      note: 'Historical housing estimates do not factor sudden market fluctuations or macro trends.',
    },
    'a-second-look-at-spam': {
      category: 'Machine Learning / Language',
      title: 'A second look at spam.',
      subtitle: 'Trying to separate useful messages from noise, without pretending the model gets it right every time.',
      howItWorks: 'Break message into words → flag suspicious promo patterns → decide Spam or Safe.',
      howItWorksSub: 'Balanced carefully so important real messages do not accidentally get blocked.',
      realWorldUse: 'Protects everyday email and SMS inboxes from phishing links, fake prizes, and promotional clutter.',
      myRole: 'Analyzed common spam phrasing, trained a text classifier, and tested false-positive edge cases.',
      tools: ['Python', 'TF-IDF', 'Scikit-Learn', 'Text Classification'],
      note: 'Spam filters must constantly adapt to new phrasing and disguised words.',
    },
    'patterns-hiding-in-plain-sight': {
      category: 'Machine Learning / Exploratory Learning',
      title: 'Patterns hiding in plain sight.',
      subtitle: 'Grouping similar examples to see what they have in common—and what they don\'t.',
      howItWorks: 'Compare topic similarity → group close items together → reveal natural categories.',
      howItWorksSub: 'Finds structure in unorganized data without needing manual labels beforehand.',
      realWorldUse: 'Helps content platforms group similar articles, or businesses understand different types of customer behavior.',
      myRole: 'Extracted text embeddings, ran unsupervised clustering, and visualized the resulting groups clearly.',
      tools: ['Python', 'K-Means', 'NumPy', 'Data Exploration'],
      note: 'Group boundaries depend on how similarity is measured and how many groups are chosen.',
    },
  };

  const resolvedId = aliasMap[projectId] || projectId;
  const currentConfig = projectConfigs[resolvedId] || projectConfigs['reading-between-the-words'];

  const [sentence, setSentence] = useState('I loved the event. So glad I joined!');
  const [prediction, setPrediction] = useState({
    tone: 'Leaning positive',
    explanation: 'The wording suggests an overall positive tone.',
    why: 'Words such as "loved" and "glad" point toward a positive reading.',
  });

  const sentimentExamples = [
    {
      label: 'Positive example',
      text: 'I loved the event. So glad I joined!',
      tone: 'Leaning positive',
      explanation: 'The wording suggests an overall positive tone.',
      why: 'Words such as "loved" and "glad" point toward a positive reading.',
    },
    {
      label: 'Negative example',
      text: 'The presentation was confusing and ran way too late.',
      tone: 'Leaning negative',
      explanation: 'The phrasing signals criticism and frustration.',
      why: 'Words such as "confusing" and "too late" indicate a critical evaluation.',
    },
    {
      label: 'Mixed feelings',
      text: 'The speaker was great, though the venue was quite crowded.',
      tone: 'Mixed feelings',
      explanation: 'Contains both favorable and cautionary signals.',
      why: 'Positive praise ("great") is balanced with contrastive feedback ("though crowded").',
    },
  ];

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
      setDigitError(err.message || 'Gagal memprediksi angka tulisan tangan.');
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
      setClassifierError(err.message || 'File gambar tidak valid.');
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
      setClassifierError(err.message || 'Gagal mengklasifikasikan gambar.');
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
      setHouseError(err.message || 'Gagal menghitung estimasi harga rumah.');
    } finally {
      setHouseLoading(false);
    }
  };

  const [spamInput, setSpamInput] = useState('Claim your surprise reward today!');
  const isSpam =
    spamInput.toLowerCase().includes('reward') ||
    spamInput.toLowerCase().includes('win') ||
    spamInput.toLowerCase().includes('claim') ||
    spamInput.toLowerCase().includes('free') ||
    spamInput.toLowerCase().includes('prize');

  const handleAnalyzeSentiment = () => {
    const lower = sentence.toLowerCase();
    const hasPos =
      lower.includes('love') ||
      lower.includes('glad') ||
      lower.includes('great') ||
      lower.includes('good') ||
      lower.includes('amazing');
    const hasNeg =
      lower.includes('bad') ||
      lower.includes('confus') ||
      lower.includes('late') ||
      lower.includes('fail') ||
      lower.includes('frustrat');

    if (hasPos && hasNeg) {
      setPrediction({
        tone: 'Mixed feelings',
        explanation: 'Contains both favorable and cautionary signals.',
        why: 'Sentence balances affirming sentiment with contrasting conditions.',
      });
    } else if (hasPos) {
      setPrediction({
        tone: 'Leaning positive',
        explanation: 'The wording suggests an overall positive tone.',
        why: 'Affirming vocabulary points toward a constructive and enthusiastic reading.',
      });
    } else if (hasNeg) {
      setPrediction({
        tone: 'Leaning negative',
        explanation: 'The phrasing signals critical remarks.',
        why: 'Critical adjectives indicate an unfavorable assessment.',
      });
    } else {
      setPrediction({
        tone: 'Neutral observation',
        explanation: 'The sentence carries factual information with balanced tone.',
        why: 'Lacks explicit polarizing qualifiers.',
      });
    }
  };

  const scrollToDemo = () => {
    document.getElementById('try-model-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14 pb-20">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <button
          onClick={onBackToProjects}
          className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#111827] px-3 py-1.5 cursor-pointer group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          All ML projects
        </button>
      </motion.div>

      {/* Breadcrumb & Title */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#D4D0C8] win98-raised px-2.5 py-0.5 mb-3">
            <PixelDocIcon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#000080] uppercase">
              {currentConfig.category}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-[46px] font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-[-0.02em] leading-tight mb-3">
            {currentConfig.title}
          </h1>
          <p className="text-base sm:text-lg text-[#E6F4F4] font-normal mb-6">
            {currentConfig.subtitle}
          </p>

          {/* Jump links */}
          <div className="flex items-center gap-3 text-xs font-bold">
            <button
              onClick={scrollToDemo}
              className="win98-raised inline-flex items-center gap-1.5 text-[#111827] px-3.5 py-1.5 cursor-pointer"
            >
              Try the demo
              <ArrowDown size={13} className="text-[#000080]" />
            </button>
            <button
              onClick={scrollToHowItWorks}
              className="win98-raised inline-flex items-center text-[#111827] px-3.5 py-1.5 cursor-pointer"
            >
              How it works
            </button>
          </div>
        </div>

        <div className="win98-raised px-3 py-1.5 self-start md:self-end flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111827]">
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
                ? 'Model Service Online'
                : apiStatus.state === 'checking'
                  ? 'Checking Service...'
                  : 'Model Service Offline'}
            </span>
            <button
              type="button"
              onClick={handleCheckMemoryHealth}
              title="Cek status model di memori (/health)"
              className="ml-1 text-[#000080] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={11} />
            </button>
          </div>
          {apiStatus.modelsInMemory && (
            <div className="text-[10px] font-mono text-[#4B5563]">
              RAM: {Object.entries(apiStatus.modelsInMemory)
                .filter(([, loaded]) => loaded)
                .map(([name]) => name)
                .join(', ') || 'Lazy (belum dimuat)'}
            </div>
          )}
        </div>
      </motion.div>

      {/* Section: Try the model */}
      <motion.div
        id="try-model-section"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-mt-10 pt-2"
      >
        <div className="mb-5">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-[-0.02em] mb-1">
            Try the model
          </h2>
          <p className="text-sm text-[#E6F4F4] font-normal">
            {projectId.includes('seven') || projectId === 'digits'
              ? 'Click squares on the grid to draw a number and see what the model guesses.'
              : projectId.includes('cat')
                ? 'Switch between sample photos to test how the model tells cats and dogs apart.'
                : projectId.includes('house')
                  ? 'Move the sliders to see how house size and rooms change the estimated price.'
                  : projectId.includes('spam')
                    ? 'Write a message or pick an example to see if it looks like spam.'
                    : 'Write a sentence or choose an example.'}
          </p>
        </div>

        {/* Outer Win98 Window Container */}
        <div className="win98-window p-1">
          <div className="win98-titlebar">
            <span className="text-[11px] font-bold tracking-wide">
              model_demo.exe — {currentConfig.title}
            </span>
            <Win98WindowControls />
          </div>
          <div className="win98-sunken bg-[#E8E4DC] p-4 sm:p-6">
          {/* VARIANT A: SENTIMENT */}
          {(!projectId || projectId === 'reading-between-the-words' || projectId === 'sentiment') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-[#FFFDF8] border border-[#1F2A2E]/10 rounded-2xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-[#1F2A2E] text-sm">
                      Your sentence
                    </span>
                    <span className="text-[#5C6B70] font-normal">
                      English · up to 280 characters
                    </span>
                  </div>

                  <div className="relative mb-4">
                    <textarea
                      rows={4}
                      maxLength={280}
                      value={sentence}
                      onChange={(e) => setSentence(e.target.value)}
                      placeholder="Type a sentence here..."
                      className="w-full bg-white border border-[#1F2A2E]/15 rounded-xl p-3.5 text-sm text-[#1F2A2E] outline-hidden focus:border-[#2D6E7E] focus:ring-1 focus:ring-[#2D6E7E] transition resize-none font-normal leading-relaxed"
                    />
                    <span className="absolute bottom-3 right-3 text-[11px] text-[#5C6B70] font-mono">
                      {sentence.length} / 280
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {sentimentExamples.map((ex, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSentence(ex.text);
                          setPrediction({
                            tone: ex.tone,
                            explanation: ex.explanation,
                            why: ex.why,
                          });
                        }}
                        className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                          sentence === ex.text
                            ? 'bg-[#1F2A2E] text-[#FFFDF8]'
                            : 'bg-[#F2EAD9]/75 text-[#465359] hover:bg-[#F2EAD9]'
                        }`}
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleAnalyzeSentiment}
                      className="px-6 py-2.5 rounded-full bg-[#2D6E7E] hover:bg-[#245A68] active:scale-[0.97] text-white text-xs sm:text-sm font-medium transition cursor-pointer shadow-2xs"
                    >
                      Analyze sentence
                    </button>
                    <button
                      onClick={() => setSentence('')}
                      className="text-xs sm:text-sm text-[#5C6B70] hover:text-[#1F2A2E] transition cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>

                  <p className="text-[11px] text-[#5C6B70] mt-4 font-normal">
                    Please avoid private or sensitive information.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#FFFDF8] border border-[#1F2A2E]/10 rounded-2xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 text-xs">
                    <span className="font-semibold text-[#1F2A2E] text-sm">
                      Prediction
                    </span>
                    <span className="bg-[#F5EDD6] text-[#465359] px-2.5 py-0.5 rounded-full text-[11px] font-normal">
                      Example output
                    </span>
                  </div>

                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={prediction.tone}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                      >
                        <h3 className="font-display text-3xl sm:text-[34px] font-bold text-[#1F2A2E] tracking-[-0.02em] leading-tight mb-2">
                          {prediction.tone}
                        </h3>
                        <p className="text-sm text-[#465359] font-normal leading-relaxed">
                          {prediction.explanation}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="pt-4 border-t border-[#1F2A2E]/8">
                    <span className="text-xs font-semibold text-[#1F2A2E] block mb-1">
                      Why this guess?
                    </span>
                    <p className="text-xs text-[#465359] font-normal leading-relaxed">
                      {prediction.why}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <span className="text-xs text-[#2D6E7E] font-medium">
                    A prediction, not a certain judgment.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VARIANT B: DIGIT (POST /predict-handwrite/) */}
          {(projectId.includes('seven') || projectId === 'digits') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-[#FAF8F2] win98-sunken p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-[#111827] text-sm">
                    Draw a Digit (0–9) · 280×280 Canvas
                  </span>
                  <span className="text-[11px] font-mono text-[#4B5563]">
                    Mouse &amp; Touch
                  </span>
                </div>

                <HandwriteCanvas
                  onPredict={handlePredictDigit}
                  isLoading={digitLoading}
                />

                <p className="text-xs text-[#4B5563] mt-3">
                  Gambar satu angka di tengah kotak, lalu klik Predict Digit untuk mengirim ke model MNIST CNN.
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#FAF8F2] win98-sunken p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#000080] uppercase tracking-wider block mb-2">
                    The Model's Guess
                  </span>

                  {digitLoading && (
                    <div className="win98-raised bg-[#F5EDD6] p-3 mb-4 flex items-start gap-2 text-xs text-[#111827]">
                      <Loader2 size={15} className="animate-spin shrink-0 mt-0.5 text-[#000080]" />
                      <div>
                        <div className="font-bold">Memproses gambar...</div>
                        <div className="text-[11px] text-[#4B5563]">
                          Request pertama memuat model (.keras) ke memori (cold-start ±10–60 detik).
                        </div>
                      </div>
                    </div>
                  )}

                  {digitError && (
                    <div className="win98-sunken bg-[#FEE2E2] p-3 mb-4 flex items-start gap-2 text-xs text-[#991B1B]">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{digitError}</span>
                    </div>
                  )}

                  {digitResult ? (
                    <>
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="font-display text-5xl font-extrabold text-[#000080]">
                          {digitResult.predicted_digit}
                        </h3>
                        <span className="win98-raised px-2 py-0.5 text-xs font-mono font-bold text-[#111827]">
                          {(digitResult.confidence * 100).toFixed(1)}% confidence
                        </span>
                      </div>
                      <p className="text-xs text-[#4B5563]">
                        Prediksi dikembalikan dari endpoint <code className="font-mono">POST /predict-handwrite/</code>.
                      </p>
                    </>
                  ) : !digitLoading && !digitError ? (
                    <>
                      <h3 className="font-display text-3xl font-extrabold text-[#111827] mb-2">
                        Ready.
                      </h3>
                      <p className="text-xs text-[#4B5563]">
                        Gambar angka pada canvas 280×280 di samping lalu tekan <strong>Predict Digit</strong>.
                      </p>
                    </>
                  ) : null}
                </div>
                <span className="text-[11px] font-mono text-[#4B5563] mt-4">
                  Max base64: 2 MB · Auto-invert MNIST
                </span>
              </div>
            </div>
          )}

          {/* VARIANT C: 3-CLASS IMAGE CLASSIFIER (POST /predict) */}
          {(projectId.includes('cat') || projectId === 'catdog') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-[#FAF8F2] win98-sunken p-5 sm:p-6 flex flex-col items-center text-center">
                <div className="w-40 h-40 win98-sunken bg-white overflow-hidden mb-4">
                  <img
                    src={previewUrl}
                    alt="Selected preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <label className="win98-raised px-3.5 py-1.5 text-xs font-bold text-[#111827] cursor-pointer inline-flex items-center gap-1.5">
                    <Upload size={13} className="text-[#000080]" />
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
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('/cat.jpg');
                      setClassifierError(null);
                      setClassifierResult(null);
                    }}
                    className="win98-raised px-3.5 py-1.5 text-xs font-bold text-[#111827] cursor-pointer"
                  >
                    Use Sample Cat
                  </button>

                  <button
                    type="button"
                    onClick={handleClassifySelectedImage}
                    disabled={classifierLoading}
                    className="win98-raised px-4 py-1.5 text-xs font-bold text-[#000080] cursor-pointer disabled:opacity-50"
                  >
                    {classifierLoading ? 'Classifying...' : 'Classify Image'}
                  </button>
                </div>

                <span className="text-[11px] font-mono text-[#4B5563]">
                  {selectedFile ? `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)` : 'Sample: cat.jpg · Format: .png, .jpg, .jpeg, .webp (maks 5 MB)'}
                </span>
              </div>

              <div className="lg:col-span-5 bg-[#FAF8F2] win98-sunken p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#000080] uppercase tracking-wider block mb-2">
                    3-Class Classification (Cats / Dogs / Others)
                  </span>

                  {classifierLoading && (
                    <div className="win98-raised bg-[#F5EDD6] p-3 mb-4 flex items-start gap-2 text-xs text-[#111827]">
                      <Loader2 size={15} className="animate-spin shrink-0 mt-0.5 text-[#000080]" />
                      <div>
                        <div className="font-bold">Menganalisis gambar...</div>
                        <div className="text-[11px] text-[#4B5563]">
                          Request pertama memuat model classifier ke memori (cold-start ±10–60 detik).
                        </div>
                      </div>
                    </div>
                  )}

                  {classifierError && (
                    <div className="win98-sunken bg-[#FEE2E2] p-3 mb-4 flex items-start gap-2 text-xs text-[#991B1B]">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{classifierError}</span>
                    </div>
                  )}

                  {classifierResult ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-3xl font-extrabold text-[#111827] capitalize">
                          {classifierResult.prediction}
                        </h3>
                        <span className="win98-raised px-2 py-0.5 text-xs font-mono font-bold text-[#000080]">
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
                                <span className={`capitalize ${isWinner ? 'font-bold text-[#000080]' : 'text-[#4B5563]'}`}>
                                  {cls}
                                </span>
                                <span className="font-bold text-[#111827]">{pct.toFixed(1)}%</span>
                              </div>
                              <div className="win98-sunken h-3 bg-white p-[1px]">
                                <div
                                  className={`h-full transition-all duration-300 ${
                                    isWinner ? 'bg-[#000080]' : 'bg-[#9CA3AF]'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {typeof classifierResult.execution_time_ms === 'number' && (
                        <div className="text-[11px] font-mono text-[#4B5563] pt-2 border-t border-[#D4D0C8]">
                          Latency: {classifierResult.execution_time_ms.toFixed(2)} ms
                        </div>
                      )}
                    </div>
                  ) : !classifierLoading && !classifierError ? (
                    <div>
                      <h3 className="font-display text-2xl font-extrabold text-[#111827] mb-1">
                        Ready to classify.
                      </h3>
                      <p className="text-xs text-[#4B5563]">
                        Pilih foto atau gunakan sample, lalu klik <strong>Classify Image</strong>.
                      </p>
                    </div>
                  ) : null}
                </div>

                <span className="text-[11px] font-mono text-[#4B5563] mt-4">
                  Endpoint: POST /predict (multipart/form-data)
                </span>
              </div>
            </div>
          )}

          {/* VARIANT D: HOUSE PRICE ESTIMATOR (POST /predict-house-pricing) */}
          {(projectId.includes('house') || projectId === 'housing') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form
                onSubmit={handlePredictHousePrice}
                className="lg:col-span-7 bg-[#FAF8F2] win98-sunken p-5 sm:p-6 space-y-3.5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="house-lb" className="block text-xs font-bold text-[#111827] mb-1">
                      Luas Bangunan (LB, m²)
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
                      className="win98-sunken w-full px-3 py-1.5 text-sm bg-white outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="house-lt" className="block text-xs font-bold text-[#111827] mb-1">
                      Luas Tanah (LT, m²)
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
                      className="win98-sunken w-full px-3 py-1.5 text-sm bg-white outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="house-kt" className="block text-xs font-bold text-[#111827] mb-1">
                      Kamar Tidur (KT)
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
                      className="win98-sunken w-full px-3 py-1.5 text-sm bg-white outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="house-km" className="block text-xs font-bold text-[#111827] mb-1">
                      Kamar Mandi (KM)
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
                      className="win98-sunken w-full px-3 py-1.5 text-sm bg-white outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="house-grs" className="block text-xs font-bold text-[#111827] mb-1">
                      Kapasitas Garasi (GRS, mobil)
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
                      className="win98-sunken w-full px-3 py-1.5 text-sm bg-white outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={houseLoading}
                    className="win98-raised px-5 py-2 text-xs font-bold text-[#000080] cursor-pointer disabled:opacity-50"
                  >
                    {houseLoading ? 'Menghitung Estimasi...' : 'Estimasi Harga Rumah'}
                  </button>
                </div>
              </form>

              <div className="lg:col-span-5 bg-[#FAF8F2] win98-sunken p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#000080] uppercase tracking-wider block mb-2">
                    Estimated Price (IDR)
                  </span>

                  {houseLoading && (
                    <div className="win98-raised bg-[#F5EDD6] p-3 mb-4 flex items-start gap-2 text-xs text-[#111827]">
                      <Loader2 size={15} className="animate-spin shrink-0 mt-0.5 text-[#000080]" />
                      <div>
                        <div className="font-bold">Menghitung prediksi...</div>
                        <div className="text-[11px] text-[#4B5563]">
                          Request pertama memuat model (.joblib) ke memori (cold-start ±10–60 detik).
                        </div>
                      </div>
                    </div>
                  )}

                  {houseError && (
                    <div className="win98-sunken bg-[#FEE2E2] p-3 mb-4 flex items-start gap-2 text-xs text-[#991B1B]">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{houseError}</span>
                    </div>
                  )}

                  {houseResult ? (
                    <>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#000080] mb-2 break-words">
                        {formatRupiah(houseResult.estimasi_harga)}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#15803D] font-bold">
                        <CheckCircle2 size={13} />
                        Status: {houseResult.status || 'sukses'}
                      </div>
                    </>
                  ) : !houseLoading && !houseError ? (
                    <>
                      <h3 className="font-display text-2xl font-extrabold text-[#111827] mb-1">
                        Siap menghitung.
                      </h3>
                      <p className="text-xs text-[#4B5563]">
                        Isi parameter LB, LT, KT, KM, dan GRS lalu klik <strong>Estimasi Harga Rumah</strong>.
                      </p>
                    </>
                  ) : null}
                </div>
                <span className="text-[11px] font-mono text-[#4B5563] mt-4">
                  Endpoint: POST /predict-house-pricing
                </span>
              </div>
            </div>
          )}

          {/* VARIANT E: SPAM CLASSIFIER */}
          {projectId.includes('spam') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-[#FFFDF8] border border-[#1F2A2E]/10 rounded-2xl p-6 sm:p-7 shadow-2xs">
                <span className="font-semibold text-[#1F2A2E] text-sm block mb-3">
                  Input message
                </span>
                <textarea
                  rows={3}
                  value={spamInput}
                  onChange={(e) => setSpamInput(e.target.value)}
                  className="w-full bg-white border border-[#1F2A2E]/15 rounded-xl p-3 text-sm text-[#1F2A2E] outline-hidden focus:border-[#2D6E7E]"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setSpamInput('Claim your surprise reward today!')}
                    className="text-xs bg-[#F2EAD9]/75 hover:bg-[#F2EAD9] px-3 py-1 rounded-full cursor-pointer"
                  >
                    Sample Spam
                  </button>
                  <button
                    onClick={() => setSpamInput('Can we reschedule our project sync to tomorrow at 10am?')}
                    className="text-xs bg-[#F2EAD9]/75 hover:bg-[#F2EAD9] px-3 py-1 rounded-full cursor-pointer"
                  >
                    Sample Legitimate
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#FFFDF8] border border-[#1F2A2E]/10 rounded-2xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-[#5C6B70] uppercase tracking-wider block mb-2">
                    Example Model Output
                  </span>
                  <h3 className="font-display text-3xl font-extrabold text-[#1F2A2E] mb-2">
                    {isSpam ? 'Likely spam' : 'Legitimate (Ham)'}
                  </h3>
                  <p className="text-xs text-[#465359]">
                    {isSpam
                      ? 'High density of promotional & urgent conversion trigger tokens.'
                      : 'Conversational syntax matching legitimate correspondence.'}
                  </p>
                </div>
                <span className="text-xs text-[#2D6E7E] font-medium">
                  Illustrative result
                </span>
              </div>
            </div>
          )}

          {/* VARIANT F: CLUSTERING */}
          {(projectId.includes('cluster') || projectId.includes('patterns')) && (
            <div className="bg-[#FFFDF8] border border-[#1F2A2E]/10 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <span className="font-semibold text-[#1F2A2E] text-sm block mb-4">
                Discovered Semantic Clusters
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#DCEDFB]/65 rounded-xl border border-[#1F2A2E]/10">
                  <div className="font-bold text-[#1F2A2E] text-sm mb-1">Group A · Quick Guides</div>
                  <p className="text-xs text-[#465359]">Short reads, cheat sheets, and high-level architectural summaries.</p>
                </div>
                <div className="p-4 bg-[#F5EDD6]/75 rounded-xl border border-[#1F2A2E]/10">
                  <div className="font-bold text-[#1F2A2E] text-sm mb-1">Group B · Deep Dives</div>
                  <p className="text-xs text-[#465359]">Long-form engineering blogs, post-mortems, and mathematical derivations.</p>
                </div>
                <div className="p-4 bg-[#E5EED4]/75 rounded-xl border border-[#1F2A2E]/10">
                  <div className="font-bold text-[#1F2A2E] text-sm mb-1">Group C · Code Tutorials</div>
                  <p className="text-xs text-[#465359]">Hands-on walkthroughs, step-by-step repository implementations.</p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        <p className="text-center text-xs text-[#E6F4F4] font-mono mt-5">
          {currentConfig.note}
        </p>
      </motion.div>

      <hr className="border-white/25 my-14" />

      {/* Section: How it works & Real-world Context */}
      <motion.div
        id="how-it-works-section"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="scroll-mt-10 mb-14"
      >
        <div className="mb-7">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-[-0.02em] mb-3">
            How it works
          </h2>
          <p className="text-base sm:text-lg text-white font-medium mb-1">
            {currentConfig.howItWorks}
          </p>
          <p className="text-sm text-[#E6F4F4] font-normal">
            {currentConfig.howItWorksSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="win98-window p-1 flex flex-col">
            <div className="win98-titlebar">
              <span className="text-[11px] font-bold tracking-wide">
                Why it matters (Real-world use)
              </span>
              <Win98WindowControls />
            </div>
            <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex-1">
              <p className="text-sm text-[#111827] leading-relaxed font-normal">
                {currentConfig.realWorldUse}
              </p>
            </div>
          </div>

          <div className="win98-window p-1 flex flex-col">
            <div className="win98-titlebar">
              <span className="text-[11px] font-bold tracking-wide">
                My Role & What I Built
              </span>
              <Win98WindowControls />
            </div>
            <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <p className="text-sm text-[#111827] leading-relaxed font-normal mb-4">
                {currentConfig.myRole}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#D4D0C8]">
                {currentConfig.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="win98-raised text-[11px] font-mono font-bold bg-[#D4D0C8] px-2.5 py-0.5 text-[#111827]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* More projects Win98 banner */}
      <div className="win98-window p-1">
        <div className="win98-titlebar">
          <span className="text-[11px] font-bold tracking-wide">more_projects.exe</span>
          <Win98WindowControls />
        </div>
        <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex items-center justify-between gap-4">
          <h3 className="font-display text-lg font-bold text-[#111827] tracking-tight">
            More projects
          </h3>
          <button
            onClick={onBackToProjects}
            className="win98-raised inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111827] px-4 py-2 cursor-pointer group"
          >
            All ML projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  );
}
