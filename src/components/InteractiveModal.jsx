import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from './Button';

export default function InteractiveModal({ isOpen, mode, onClose, initialData }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', topic: 'ML Experiment' });
  const [submitted, setSubmitted] = useState(false);

  const [inputText, setInputText] = useState('I am really glad I took the time to study machine learning.');
  const [digitGrid, setDigitGrid] = useState(Array(64).fill(0));
  const [predictedDigit, setPredictedDigit] = useState('7');

  const [area, setArea] = useState(120);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const calculatedHousePrice = 80000 + (area * 1100) + (bedrooms * 10500) + (bathrooms * 7000);

  const [selectedPet, setSelectedPet] = useState('cat');
  const [spamInput, setSpamInput] = useState('Claim your free prize now before time runs out!');

  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const computeSentiment = (text) => {
    const t = text.toLowerCase();
    const posWords = ['love', 'good', 'great', 'exceeded', 'glad', 'enjoy', 'fast', 'smart', 'super', 'awesome', 'positive'];
    const negWords = ['bad', 'hate', 'slow', 'error', 'failed', 'miss', 'frustrat', 'wrong', 'awful', 'negative'];

    let posScore = 0;
    let negScore = 0;
    posWords.forEach((w) => {
      if (t.includes(w)) posScore += 2;
    });
    negWords.forEach((w) => {
      if (t.includes(w)) negScore += 2;
    });

    if (posScore > negScore) return { label: 'Positive', score: 0.94, color: 'text-[#1F2A2E] bg-[#E5EED4] border-[#93A854]/40' };
    if (negScore > posScore) return { label: 'Negative', score: 0.89, color: 'text-[#1F2A2E] bg-[#F7E3D7] border-[#E67B50]/40' };
    return { label: 'Neutral', score: 0.65, color: 'text-[#1F2A2E] bg-[#F5EDD6] border-[#F4C95D]/50' };
  };

  const sentiment = computeSentiment(inputText);

  const togglePixel = (index) => {
    const updated = [...digitGrid];
    updated[index] = updated[index] ? 0 : 1;
    setDigitGrid(updated);

    const activeCount = updated.filter((x) => x === 1).length;
    if (activeCount === 0) setPredictedDigit('-');
    else if (activeCount > 18) setPredictedDigit('8');
    else if (activeCount > 14) setPredictedDigit('0');
    else if (activeCount > 8) setPredictedDigit('7');
    else setPredictedDigit('1');
  };

  const isSpam =
    spamInput.toLowerCase().includes('prize') ||
    spamInput.toLowerCase().includes('free') ||
    spamInput.toLowerCase().includes('claim') ||
    spamInput.toLowerCase().includes('reward') ||
    spamInput.toLowerCase().includes('urgent');

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        className="win98-window p-1 max-w-lg w-full max-h-[90vh] flex flex-col"
      >
        <div className="win98-titlebar shrink-0">
          <span className="text-[11px] font-bold tracking-wide">
            {mode === 'contact' ? 'Send a Message' : mode === 'story' ? 'Case Study' : 'Interactive Demo'}
          </span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
            className="win98-raised w-4 h-4 flex items-center justify-center text-[#111827] cursor-pointer"
          >
            <X size={10} strokeWidth={2.5} />
          </button>
        </div>

        <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 overflow-y-auto">
        {/* 1. MODE: CONTACT */}
        {mode === 'contact' && (
          <div>
            {!submitted ? (
              <>
                <div className="mb-5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#000080] uppercase block mb-1">
                    Get in touch
                  </span>
                  <h3 id="modal-heading" className="font-display text-2xl font-bold text-[#111827] tracking-tight">
                    Let's start a conversation.
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-1">
                    Send a note about a collaboration, question, or just to say hi!
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-[#111827] mb-1">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="win98-sunken w-full px-3 py-2 text-sm bg-white outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[#111827] mb-1">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="win98-sunken w-full px-3 py-2 text-sm bg-white outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-bold text-[#111827] mb-1">
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="win98-sunken w-full px-3 py-2 text-sm bg-white outline-hidden"
                    >
                      <option>Machine Learning Project</option>
                      <option>Internship / Job Opportunity</option>
                      <option>Campus / Event Invitation</option>
                      <option>Just saying hello</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-[#111827] mb-1">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      required
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="win98-sunken w-full px-3 py-2 text-sm bg-white outline-hidden resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                  >
                    Send message
                    <Send size={14} className="text-[#000080]" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="win98-sunken w-12 h-12 bg-[#E5EED4] text-[#000080] flex items-center justify-center mx-auto mb-4">
                  <Check size={24} />
                </div>
                <h3 id="modal-heading" className="font-display text-xl font-bold text-[#111827] mb-2">
                  Thank you, {formData.name || 'friend'}!
                </h3>
                <p className="text-xs text-[#4B5563] max-w-xs mx-auto mb-6">
                  Your message has been received. I'll get back to you shortly at {formData.email || 'your email'}.
                </p>
                <Button
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        )}

        {/* 2. MODE: PROJECT SPECIFIC DEMOS */}
        {mode === 'project' && (
          <div>
            {initialData === 'housing' && (
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#2D6E7E] uppercase block mb-1">
                  Regression Experiment
                </span>
                <h3 id="modal-heading" className="font-display text-2xl font-bold text-[#1F2A2E] tracking-tight mb-1">
                  House Price Estimator
                </h3>
                <p className="text-xs text-[#465359] mb-6">
                  Adjust features below to test the linear regression weights in real time:
                </p>

                <div className="space-y-4 bg-[#FAF5EB] p-5 rounded-2xl border border-[#1F2A2E]/10">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#1F2A2E] mb-1">
                      <span>Floor Area: {area} m²</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={400}
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full accent-[#2D6E7E]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#1F2A2E] mb-1">
                      <span>Bedrooms: {bedrooms}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={6}
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full accent-[#2D6E7E]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#1F2A2E] mb-1">
                      <span>Bathrooms: {bathrooms}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={4}
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full accent-[#2D6E7E]"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#1F2A2E]/10 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#5C6B70] uppercase">Estimated Value</span>
                    <span className="font-display text-2xl font-extrabold text-[#2D6E7E]">
                      ${calculatedHousePrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {initialData === 'catdog' && (
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#2D6E7E] uppercase block mb-1">
                  Computer Vision
                </span>
                <h3 id="modal-heading" className="font-display text-2xl font-bold text-[#1F2A2E] tracking-tight mb-1">
                  Cat or Dog Classifier
                </h3>
                <p className="text-xs text-[#465359] mb-6">
                  Convolutional feature map classification with softmax confidence:
                </p>

                <div className="bg-[#FAF5EB] p-6 rounded-2xl border border-[#1F2A2E]/10 text-center">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border border-[#1F2A2E]/15 mb-4 shadow-xs">
                    <img
                      src={selectedPet === 'cat' ? '/cat.jpg' : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop&q=80'}
                      alt="Candidate"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex justify-center gap-3 mb-5">
                    <Button
                      onClick={() => setSelectedPet('cat')}
                      aria-pressed={selectedPet === 'cat'}
                    >
                      Test Cat Image
                    </Button>
                    <Button
                      onClick={() => setSelectedPet('dog')}
                      aria-pressed={selectedPet === 'dog'}
                    >
                      Test Dog Image
                    </Button>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#1F2A2E]/10 inline-block text-left min-w-[200px]">
                    <span className="text-[10px] uppercase font-mono font-bold text-[#5C6B70] block mb-0.5">Model Guess</span>
                    <div className="font-display text-xl font-extrabold text-[#1F2A2E] capitalize">
                      {selectedPet}.
                    </div>
                    <div className="text-[11px] text-[#2D6E7E] font-mono mt-0.5">
                      Confidence: {selectedPet === 'cat' ? '98.7%' : '97.2%'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {initialData === 'spam' && (
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#2D6E7E] uppercase block mb-1">
                  NLP Classification
                </span>
                <h3 id="modal-heading" className="font-display text-2xl font-bold text-[#1F2A2E] tracking-tight mb-1">
                  Spam vs Ham Classifier
                </h3>
                <p className="text-xs text-[#465359] mb-6">
                  Evaluating SMS & email body tokens against naive Bayes & logistic regression features:
                </p>

                <div className="space-y-4 bg-[#FAF5EB] p-5 rounded-2xl border border-[#1F2A2E]/10">
                  <textarea
                    value={spamInput}
                    onChange={(e) => setSpamInput(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-[#1F2A2E]/15 rounded-xl p-3 text-sm text-[#1F2A2E] outline-hidden focus:border-[#2D6E7E] resize-none"
                    placeholder="Type or paste any SMS or email text..."
                  />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#465359] font-medium">Classification:</span>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        isSpam ? 'bg-[#F7E3D7] text-[#1F2A2E]' : 'bg-[#E5EED4] text-[#1F2A2E]'
                      }`}
                    >
                      {isSpam ? 'Likely Spam' : 'Legitimate (Ham)'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {(initialData === 'sentiment' || initialData === 'digits' || initialData === 'clustering') && (
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#2D6E7E] uppercase block mb-1">
                  Interactive Experiment
                </span>
                <h3 id="modal-heading" className="font-display text-2xl font-bold text-[#1F2A2E] tracking-tight mb-1">
                  {initialData === 'sentiment' ? 'Reading Between the Words' : initialData === 'digits' ? 'Handwritten Digit Recognizer' : 'Patterns Hiding in Plain Sight'}
                </h3>
                <p className="text-xs text-[#465359] mb-6">
                  {initialData === 'sentiment'
                    ? 'Type sentences to observe how sentiment weights react.'
                    : initialData === 'digits'
                      ? 'Click pixels to draw custom numbers on the 8x8 matrix.'
                      : 'Unsupervised K-Means clustering of textual embeddings.'}
                </p>

                {initialData === 'sentiment' && (
                  <div className="space-y-4 bg-[#FAF5EB] p-5 rounded-2xl border border-[#1F2A2E]/10">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-[#1F2A2E]/15 rounded-xl p-3 text-sm text-[#1F2A2E] outline-hidden focus:border-[#2D6E7E] resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#465359]">Predicted Mood:</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${sentiment.color}`}>
                        {sentiment.label} ({(sentiment.score * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                )}

                {initialData === 'digits' && (
                  <div className="bg-[#FAF5EB] p-5 rounded-2xl border border-[#1F2A2E]/10 flex items-center justify-around">
                    <div className="grid grid-cols-8 gap-1 p-2 bg-white border border-[#1F2A2E]/12 rounded-xl">
                      {digitGrid.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => togglePixel(idx)}
                          className={`w-4 h-4 rounded-[2px] transition-colors ${
                            p ? 'bg-[#2D6E7E]' : 'bg-[#F2EAD9]/70 hover:bg-[#F2EAD9]'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#5C6B70] block mb-1">Prediction</span>
                      <span className="font-display text-4xl font-extrabold text-[#1F2A2E]">{predictedDigit}</span>
                    </div>
                  </div>
                )}

                {initialData === 'clustering' && (
                  <div className="bg-[#FAF5EB] p-5 rounded-2xl border border-[#1F2A2E]/10 space-y-3">
                    <div className="text-xs font-semibold text-[#1F2A2E]">Embedding Vector Distance (t-SNE Projection):</div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-[#1F2A2E]/10">
                        <div className="font-bold text-[#2D6E7E]">Cluster 1</div>
                        <div className="text-[10px] text-[#465359] mt-1">Short reads & tips</div>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-[#1F2A2E]/10">
                        <div className="font-bold text-[#E67B50]">Cluster 2</div>
                        <div className="text-[10px] text-[#465359] mt-1">Deep architectural dives</div>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-[#1F2A2E]/10">
                        <div className="font-bold text-[#93A854]">Cluster 3</div>
                        <div className="text-[10px] text-[#465359] mt-1">Code tutorials</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={onClose}
              className="mt-6 w-full"
            >
              Close
            </Button>
          </div>
        )}

        {/* 3. MODE: STORY DETAILS */}
        {mode === 'story' && (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#2D6E7E] uppercase block mb-1">
                Project Deep Dive
              </span>
              <h3 id="modal-heading" className="font-display text-2xl font-bold text-[#1F2A2E] tracking-tight">
                {initialData === 'studyspace' ? 'Study Space' : 'Campus Pocket'}
              </h3>
              <p className="text-xs text-[#465359] mt-1">
                {initialData === 'studyspace'
                  ? 'A simpler way to organize coursework and study plans.'
                  : 'Campus events, reminders, and notes in one place.'}
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#465359] leading-relaxed">
              <p>
                <strong className="text-[#1F2A2E]">Problem:</strong> Students often juggle fragmented assignments across disparate portals and chat groups, losing track of deadlines.
              </p>
              <p>
                <strong className="text-[#1F2A2E]">Engineering Solution:</strong> Built a streamlined progressive web application featuring offline-first storage, sync triggers, and intuitive task prioritisation.
              </p>
              <div className="p-3 bg-[#FAF5EB] rounded-xl border border-[#1F2A2E]/10 space-y-1">
                <div className="font-semibold text-[#1F2A2E] text-[11px]">Key Tech Stack:</div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-white border border-[#1F2A2E]/10 rounded text-[10px] font-mono">React</span>
                  <span className="px-2 py-0.5 bg-white border border-[#1F2A2E]/10 rounded text-[10px] font-mono">TypeScript</span>
                  <span className="px-2 py-0.5 bg-white border border-[#1F2A2E]/10 rounded text-[10px] font-mono">Tailwind CSS</span>
                  <span className="px-2 py-0.5 bg-white border border-[#1F2A2E]/10 rounded text-[10px] font-mono">IndexedDB</span>
                </div>
              </div>
            </div>

            <Button
              onClick={onClose}
              className="mt-6 w-full"
            >
              Back to portfolio
            </Button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
