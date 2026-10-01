import React from 'react';
import { Language, TabType } from '../types';
import { translations } from '../data/translations';
import { FileCode, FolderOpen, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  language: Language;
  onSelectPillar: (tab: TabType, targetFile?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onSelectPillar }) => {
  const t = translations[language];

  return (
    <section className="relative overflow-hidden pt-6 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-medium mb-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <span className="truncate max-w-[280px] sm:max-w-none">{t.heroBadge}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2.5 text-balance">
          {language === 'my' ? (
            <span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-300">
                Gemini Spark Skills
              </span>{' '}
              တည်ဆောက်ပြီး Zip ထုတ်ယူပါ
            </span>
          ) : (
            <span>
              Build & Package{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-300">
                Gemini Spark Skills
              </span>{' '}
              Like a Pro
            </span>
          )}
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.heroDescription}
        </p>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mt-5 text-left">
          {/* Pillar 1: SKILL.md */}
          <div
            onClick={() => onSelectPillar('explorer', 'skill_md')}
            className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-cyan-800/40 hover:border-cyan-500/80 transition-all duration-200 group cursor-pointer active:scale-98"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-cyan-400 font-mono font-bold text-xs sm:text-sm flex items-center gap-1.5 truncate">
                <FileCode className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>SKILL.md</span>
              </span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800 font-mono shrink-0">
                {t.p1Badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
              {t.p1Summary}
            </p>
          </div>

          {/* Pillar 2: assets/ */}
          <div
            onClick={() => onSelectPillar('explorer', 'assets')}
            className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-amber-800/40 hover:border-amber-500/80 transition-all duration-200 group cursor-pointer active:scale-98"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-400 font-mono font-bold text-xs sm:text-sm flex items-center gap-1.5 truncate">
                <FolderOpen className="w-4 h-4 shrink-0 text-amber-400" />
                <span>assets/</span>
              </span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800 font-mono shrink-0">
                {t.p2Badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
              {t.p2Summary}
            </p>
          </div>

          {/* Pillar 3: references/ */}
          <div
            onClick={() => onSelectPillar('explorer', 'references')}
            className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-emerald-800/40 hover:border-emerald-500/80 transition-all duration-200 group cursor-pointer active:scale-98"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-emerald-400 font-mono font-bold text-xs sm:text-sm flex items-center gap-1.5 truncate">
                <BookOpen className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>references/</span>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800 font-mono shrink-0">
                {t.p3Badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
              {t.p3Summary}
            </p>
          </div>

          {/* Pillar 4: scripts/ */}
          <div
            onClick={() => onSelectPillar('explorer', 'scripts')}
            className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-purple-800/40 hover:border-purple-500/80 transition-all duration-200 group cursor-pointer active:scale-98"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-purple-400 font-mono font-bold text-xs sm:text-sm flex items-center gap-1.5 truncate">
                <Terminal className="w-4 h-4 shrink-0 text-purple-400" />
                <span>scripts/</span>
              </span>
              <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800 font-mono shrink-0">
                {t.p4Badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
              {t.p4Summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
