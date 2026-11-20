import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function LearningLab({ onOpenFullDemo: _onOpenFullDemo }) {
  // Sentiment demo state
  const sampleSentences = [
    { text: "I loved the event. So glad I joined!", sentiment: "Leaning positive", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { text: "The presentation covered good points, though ran slightly over time.", sentiment: "Balanced neutral", color: "text-amber-700 bg-amber-50 border-amber-200" },
    { text: "Could not get the model weights to converge today.", sentiment: "Leaning negative", color: "text-rose-700 bg-rose-50 border-rose-200" },
    { text: "Exploring attention mechanisms in vision transformers.", sentiment: "Inquisitive", color: "text-[#3B7B88] bg-[#3B7B88]/10 border-[#3B7B88]/20" }
  ];

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [customText, setCustomText] = useState("I loved the event. So glad I joined!");
  const [currentSentiment, setCurrentSentiment] = useState("Leaning positive");

  const analyzeSentiment = (text) => {
    setCustomText(text);
    const lower = text.toLowerCase();
    if (lower.includes('love') || lower.includes('glad') || lower.includes('great') || lower.includes('good') || lower.includes('amazing')) {
      setCurrentSentiment("Leaning positive");
    } else if (lower.includes('fail') || lower.includes('bad') || lower.includes('error') || lower.includes('frustrat') || lower.includes('not')) {
      setCurrentSentiment("Leaning negative");
    } else {
      setCurrentSentiment("Balanced neutral");
    }
  };

  // Digit demo state
  const digitOptions = [
    { digit: '7', word: 'Seven.' },
    { digit: '3', word: 'Three.' },
    { digit: '8', word: 'Eight.' },
    { digit: '0', word: 'Zero.' },
  ];
  const [activeDigit, setActiveDigit] = useState(digitOptions[0]);

  return (
    <section id="learning-lab" className="px-6 py-6 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        {/* Lab Window Container */}
        <div className="bg-[#fcfcfc] rounded-3xl border border-neutral-200/90 shadow-[0_10px_35px_-15px_rgba(0,0,0,0.07)] p-6 sm:p-10 md:p-12 relative overflow-hidden">
          {/* Window Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
            {/* 3 Window Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            </div>

            {/* Window title */}
            <span className="text-[12px] font-medium text-neutral-400 tracking-wide">
              My learning lab
            </span>

            <div className="w-8" />
          </div>

          {/* Window Content */}
          <div className="text-center mb-10 max-w-xl mx-auto">
            <span className="text-[11px] font-bold tracking-widest text-neutral-500 uppercase block mb-2">
              Machine Learning, One Experiment At A Time
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
              Small inputs. Interesting possibilities.
            </h2>
            <p className="text-sm text-neutral-500">
              A sentence. A scribble. A chance to understand a little more.
            </p>
          </div>

          {/* Two Interactive Cards Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            {/* Card 1: Sentiment analysis */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-neutral-800 tracking-tight">
                    What does this sound like?
                  </h3>
                  <button
                    onClick={() => {
                      const next = (sentenceIndex + 1) % sampleSentences.length;
                      setSentenceIndex(next);
                      analyzeSentiment(sampleSentences[next].text);
                    }}
                    className="text-[11px] text-[#3B7B88] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    title="Next example sentence"
                  >
                    <RefreshCw size={11} /> Next example
                  </button>
                </div>

                {/* Input box */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 mb-5 focus-within:border-[#3B7B88] transition">
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => analyzeSentiment(e.target.value)}
                    className="w-full bg-transparent text-sm text-neutral-800 outline-hidden font-normal"
                    placeholder="Type any sentence..."
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase block mb-1.5">
                  The Model's Guess
                </span>
                <div className="text-base font-semibold text-neutral-900 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#3B7B88]" />
                  {currentSentiment}
                </div>
              </div>
            </div>

            {/* Card 2: Number Recognition */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-neutral-800 tracking-tight">
                    What number did you write?
                  </h3>
                  {/* Selector pills for digits */}
                  <div className="flex items-center gap-1">
                    {digitOptions.map((item) => (
                      <button
                        key={item.digit}
                        onClick={() => setActiveDigit(item)}
                        className={`w-6 h-6 rounded-md text-xs font-mono font-medium transition cursor-pointer ${
                          activeDigit.digit === item.digit
                            ? 'bg-neutral-900 text-white'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {item.digit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Black box with digit */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 bg-neutral-950 rounded-xl flex items-center justify-center text-white font-mono text-3xl font-light shadow-inner select-none">
                    {activeDigit.digit}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase block mb-1">
                      The Model's Guess
                    </span>
                    <div className="text-xl font-bold text-neutral-900 tracking-tight">
                      {activeDigit.word}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center justify-between pt-2 border-t border-neutral-100">
                <span>Example output</span>
                <span className="font-mono text-[10px] text-neutral-400">conf: 99.4%</span>
              </div>
            </div>
          </div>

          {/* Window Footer Tagline */}
          <div className="text-center pt-2">
            <span className="text-xs text-neutral-400 font-normal">
              Built to learn, not to know everything.
            </span>
          </div>
        </div>

        {/* Section Beneath Lab Card */}
        <div className="text-center pt-8 pb-4">
          <p className="text-xs text-neutral-500 font-medium tracking-wide mb-1">
            Small experiments. Honest lessons. A work in progress.
          </p>
          <p className="text-xs text-neutral-400 max-w-lg mx-auto mb-8 font-normal">
            My main focus is machine learning, supported by a foundation in software engineering.
          </p>

          {/* 3 Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-sm font-medium text-neutral-700">
            <span className="hover:text-neutral-900 transition-colors cursor-default">
              Machine learning
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="hover:text-neutral-900 transition-colors cursor-default">
              Hands-on experiments
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="hover:text-neutral-900 transition-colors cursor-default">
              A little software, too
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

