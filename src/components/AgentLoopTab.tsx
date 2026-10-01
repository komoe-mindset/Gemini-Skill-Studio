import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { agentLoopStepsData, simulationSteps } from '../data/agentLoop';
import {
  Play,
  Square,
  Copy,
  Terminal,
  Lightbulb
} from 'lucide-react';

interface AgentLoopTabProps {
  language: Language;
  showToast: (msg: string, icon?: string) => void;
}

export const AgentLoopTab: React.FC<AgentLoopTabProps> = ({ language, showToast }) => {
  const t = translations[language];

  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const simTimerRef = useRef<NodeJS.Timeout | null>(null);
  const simLogEndRef = useRef<HTMLDivElement | null>(null);

  const activeStepData = agentLoopStepsData[selectedStep];

  const handleStartSimulation = () => {
    if (isSimulating) {
      handleStopSimulation();
      return;
    }

    setIsSimulating(true);
    setSimLogs([]);
    let currentIndex = 0;

    if (simTimerRef.current) clearInterval(simTimerRef.current);

    simTimerRef.current = setInterval(() => {
      if (currentIndex < simulationSteps.length) {
        const item = simulationSteps[currentIndex];
        setSelectedStep(item.step);
        setSimLogs((prev) => [...prev, item.text]);
        currentIndex++;
      } else {
        if (simTimerRef.current) clearInterval(simTimerRef.current);
        setIsSimulating(false);
      }
    }, 1300);

    showToast('Simulation started: watch the 8-agent loop in action', '🎬');
  };

  const handleStopSimulation = () => {
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    setIsSimulating(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeStepData.code);
    showToast('Sample snippet copied to clipboard!', '📋');
  };

  useEffect(() => {
    simLogEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [simLogs]);

  useEffect(() => {
    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Overview Header */}
      <section
        aria-labelledby="agent-loop-heading"
        className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-4 sm:p-6 rounded-2xl relative overflow-hidden shadow-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-medium mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
              <span>{t.agentLoopBadge}</span>
            </div>
            <h2 id="agent-loop-heading" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {t.agentLoopTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {t.agentLoopSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleStartSimulation}
              aria-label={isSimulating ? "Stop agent loop simulation" : "Start full agent loop simulation"}
              className={`w-full sm:w-auto font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition active:scale-95 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                isSimulating
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-500/20'
              }`}
            >
              {isSimulating ? (
                <>
                  <Square width={16} height={16} className="w-4 h-4" aria-hidden="true" />
                  <span>Stop Simulation</span>
                </>
              ) : (
                <>
                  <Play width={16} height={16} className="w-4 h-4 fill-white" aria-hidden="true" />
                  <span>{t.simBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Live Simulation Terminal Console (Shows when simulating or logs present) */}
      {(isSimulating || simLogs.length > 0) && (
        <section
          aria-label="Simulation Output Log"
          className="bg-black/95 border border-cyan-700/60 rounded-2xl p-4 sm:p-5 font-mono text-xs text-slate-300 space-y-3 shadow-2xl code-glow animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
              <span className="text-slate-300 text-xs ml-2 flex items-center gap-1.5">
                <Terminal width={14} height={14} className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                <span>Gemini Agent Loop Execution Runtime</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                handleStopSimulation();
                setSimLogs([]);
              }}
              aria-label="Close simulation terminal"
              className="text-slate-300 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950"
            >
              Close
            </button>
          </div>

          <div
            role="log"
            aria-live="polite"
            aria-atomic="false"
            className="space-y-1.5 min-h-[120px] max-h-56 overflow-y-auto pr-1"
          >
            {simLogs.map((log, idx) => (
              <div
                key={idx}
                className={`font-mono text-xs leading-relaxed ${
                  idx === simLogs.length - 1
                    ? 'text-cyan-300 font-semibold animate-pulse'
                    : 'text-slate-300'
                }`}
              >
                {log}
              </div>
            ))}
            <div ref={simLogEndRef} />
          </div>
        </section>
      )}

      {/* 8-Step Grid (Responsive for Mobile Swipe / Scroll) */}
      <section aria-labelledby="loop-steps-grid-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="loop-steps-grid-heading" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span aria-hidden="true">🔄</span>
            <span>{t.loopGridHeader}</span>
          </h2>
          <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-950/70 border border-cyan-800 px-2.5 py-0.5 rounded-lg">
            Step 0{selectedStep} Selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((stepNum) => {
            const step = agentLoopStepsData[stepNum];
            const isSelected = selectedStep === stepNum;
            return (
              <button
                key={stepNum}
                type="button"
                role="button"
                aria-pressed={isSelected}
                aria-label={`Step 0${stepNum}: ${language === 'my' ? step.titleMy : step.titleEn}`}
                onClick={() => setSelectedStep(stepNum)}
                className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200 border-2 relative group active:scale-98 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isSelected ? 'text-cyan-400' : 'text-slate-300 group-hover:text-cyan-300'
                    }`}
                  >
                    0{stepNum}
                  </span>
                  <span className="text-2xl" aria-hidden="true">{step.icon}</span>
                </div>

                <h3 className="font-bold text-white text-sm mb-0.5">
                  {language === 'my' ? step.titleMy.split(' ')[0] : step.titleEn.split(' ')[0]}
                </h3>

                <p className="text-[11px] text-slate-300 mb-2 leading-snug line-clamp-1">
                  {language === 'my' ? step.questionMy : step.questionEn}
                </p>

                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800/80 text-[11px] text-slate-300">
                  <strong className="text-cyan-300 block text-[10px] uppercase font-mono">
                    Simple:
                  </strong>
                  <span className="line-clamp-2">
                    {language === 'my' ? step.simpleMy : step.simpleEn}
                  </span>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono pt-2 border-t border-slate-800/80">
                  <span className="text-cyan-400 truncate max-w-[120px]">
                    {step.mapping.split(':')[1]?.trim() || step.mapping}
                  </span>
                  <span className="text-slate-300 font-sans text-[9px] bg-slate-800 px-1.5 py-0.5 rounded">
                    linked
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Step Deep Dive Details */}
      <article aria-labelledby="step-deep-dive-title" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl code-glow">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 bg-slate-950 border border-slate-800 rounded-xl shrink-0" aria-hidden="true">
              {activeStepData.icon}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  {activeStepData.num}
                </span>
                <h3 id="step-deep-dive-title" className="text-base sm:text-lg font-bold text-white">
                  {language === 'my'
                    ? activeStepData.titleMy
                    : language === 'en'
                    ? activeStepData.titleEn
                    : `${activeStepData.titleEn} • ${activeStepData.titleMy}`}
                </h3>
              </div>
              <p className="text-xs text-cyan-300 font-mono mt-0.5">
                {activeStepData.mapping}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${activeStepData.badgeClass}`}
          >
            {activeStepData.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Left: Bilingual Explanations */}
          <div className="lg:col-span-6 space-y-4">
            {/* English Explanations */}
            {(language === 'en' || language === 'both') && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wide mb-1.5">
                  <span aria-hidden="true">🇺🇸</span>
                  <span>How this Step Works in Gemini Spark</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeStepData.descEn}
                </p>
              </div>
            )}

            {/* Myanmar Explanations */}
            {(language === 'my' || language === 'both') && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide mb-1.5">
                  <span aria-hidden="true">🇲🇲</span>
                  <span>မြန်မာလို အဓိပ္ပာယ်ရှင်းလင်းချက်</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed myanmar-text">
                  {activeStepData.descMy}
                </p>
              </div>
            )}
          </div>

          {/* Right: Code Sample & Architect Pro Tip */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span className="text-xs font-mono font-bold text-slate-300">
                  {activeStepData.filename}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  aria-label="Copy step code example"
                  className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950"
                >
                  <Copy width={12} height={12} className="w-3 h-3" aria-hidden="true" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-48 p-1">
                <code>{activeStepData.code}</code>
              </pre>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/70 text-xs text-slate-300 flex items-start gap-2.5">
              <Lightbulb width={16} height={16} className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-cyan-300 block mb-0.5">
                  {activeStepData.tipTitle}
                </strong>
                <span className="text-slate-300 leading-relaxed">
                  {activeStepData.tipDesc}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
