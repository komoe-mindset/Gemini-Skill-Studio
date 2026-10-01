import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { explorerNodes } from '../data/manualData';
import { FileCode, FolderOpen, BookOpen, Terminal, Copy, Check, X, FolderTree } from 'lucide-react';

interface ExplorerTabProps {
  language: Language;
  initialNode?: string;
  showToast: (msg: string, icon?: string) => void;
}

export const ExplorerTab: React.FC<ExplorerTabProps> = ({
  language,
  initialNode = 'skill_md',
  showToast
}) => {
  const t = translations[language];
  const [selectedKey, setSelectedKey] = useState<string>(initialNode);

  const activeData = explorerNodes[selectedKey] || explorerNodes['skill_md'];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeData.code);
    showToast('Sample copied to clipboard!', '📋');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
      {/* Interactive Visual Tree */}
      <nav
        aria-label="Skill Directory Blueprint"
        className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-xl code-glow flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <h2 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <FolderTree width={16} height={16} className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>{t.explorerTreeTitle}</span>
            </h2>
            <span className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded font-mono">
              Select node
            </span>
          </div>

          <div role="tree" aria-label="Skill file hierarchy" className="space-y-1.5 font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-200 py-1.5 px-2 rounded-xl font-semibold bg-slate-800/40">
              <span className="text-base" aria-hidden="true">📁</span>
              <span>my-custom-skill/</span>
            </div>

            {/* SKILL.md */}
            <button
              type="button"
              role="treeitem"
              aria-selected={selectedKey === 'skill_md'}
              aria-label="SKILL.md Primary router and conductor"
              onClick={() => setSelectedKey('skill_md')}
              className={`w-full text-left pl-6 flex items-center gap-2.5 py-2 px-2.5 rounded-xl border transition min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                selectedKey === 'skill_md'
                  ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <FileCode width={16} height={16} className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
              <div className="truncate">
                <div className="text-xs sm:text-sm">SKILL.md</div>
                <div className="text-[10px] text-cyan-300 font-sans">
                  Primary router & conductor
                </div>
              </div>
            </button>

            {/* assets/ */}
            <button
              type="button"
              role="treeitem"
              aria-selected={selectedKey === 'assets'}
              aria-label="assets/ Boilerplates and templates directory"
              onClick={() => setSelectedKey('assets')}
              className={`w-full text-left pl-6 flex items-center gap-2.5 py-2 px-2.5 rounded-xl border transition min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                selectedKey === 'assets'
                  ? 'bg-amber-950/60 border-amber-500/60 text-amber-300 font-bold'
                  : 'border-transparent text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <FolderOpen width={16} height={16} className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <div className="truncate">
                <div className="text-xs sm:text-sm text-amber-400">assets/</div>
                <div className="text-[10px] text-slate-300 font-sans">
                  Boilerplates & skeletons
                </div>
              </div>
            </button>

            {/* references/ */}
            <button
              type="button"
              role="treeitem"
              aria-selected={selectedKey === 'references'}
              aria-label="references/ Domain policies and knowledge directory"
              onClick={() => setSelectedKey('references')}
              className={`w-full text-left pl-6 flex items-center gap-2.5 py-2 px-2.5 rounded-xl border transition min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                selectedKey === 'references'
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-bold'
                  : 'border-transparent text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen width={16} height={16} className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <div className="truncate">
                <div className="text-xs sm:text-sm text-emerald-400">references/</div>
                <div className="text-[10px] text-slate-300 font-sans">
                  Policies & knowledge docs
                </div>
              </div>
            </button>

            {/* scripts/ */}
            <button
              type="button"
              role="treeitem"
              aria-selected={selectedKey === 'scripts'}
              aria-label="scripts/ Executable tools directory"
              onClick={() => setSelectedKey('scripts')}
              className={`w-full text-left pl-6 flex items-center gap-2.5 py-2 px-2.5 rounded-xl border transition min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                selectedKey === 'scripts'
                  ? 'bg-purple-950/60 border-purple-500/60 text-purple-300 font-bold'
                  : 'border-transparent text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <Terminal width={16} height={16} className="w-4 h-4 text-purple-400 shrink-0" aria-hidden="true" />
              <div className="truncate">
                <div className="text-xs sm:text-sm text-purple-400">scripts/</div>
                <div className="text-[10px] text-slate-300 font-sans">
                  Python & Bash executables
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Architectural Golden Rule */}
        <aside aria-label="Architecture tip" className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-300 bg-slate-950/70 p-3 sm:p-3.5 rounded-xl">
          <span className="text-cyan-400 font-bold block mb-1">
            {t.optionalRule}
          </span>
          <p className="leading-relaxed">{t.optionalRuleText}</p>
        </aside>
      </nav>

      {/* Inspector Detail View */}
      <section
        aria-labelledby="inspector-heading"
        className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl flex flex-col justify-between space-y-5"
      >
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2 bg-slate-950 border border-slate-800 rounded-xl" aria-hidden="true">
                {activeData.icon}
              </span>
              <div>
                <h2 id="inspector-heading" className="text-lg sm:text-xl font-bold text-white font-mono">
                  {activeData.title}
                </h2>
                <p className="text-xs text-cyan-300 font-medium">
                  {activeData.tagline}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${activeData.badgeClass}`}
            >
              {activeData.badge}
            </span>
          </div>

          {/* Bilingual Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-5">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wide mb-1.5">
                <span aria-hidden="true">🇺🇸</span>
                <span>English Purpose</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                {activeData.descEn}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm myanmar-text">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wide mb-1.5 font-sans">
                <span aria-hidden="true">🇲🇲</span>
                <span>မြန်မာလို အနှစ်ချုပ်ရှင်းလင်းချက်</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                {activeData.descMy}
              </p>
            </div>
          </div>

          {/* Blueprint Code Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-slate-300">
                Blueprint Code Template
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy blueprint code template"
                className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              >
                <Copy width={12} height={12} className="w-3 h-3" aria-hidden="true" />
                <span>Copy Blueprint</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-56 leading-relaxed">
              <code>{activeData.code}</code>
            </pre>
          </div>
        </div>

        {/* Dos and Don'ts Checklist */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2 bg-emerald-950/30 border border-emerald-900/60 p-3 rounded-xl text-emerald-300">
            <Check width={16} height={16} className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="leading-relaxed">{activeData.doText}</div>
          </div>
          <div className="flex items-start gap-2 bg-rose-950/30 border border-rose-900/60 p-3 rounded-xl text-rose-300">
            <X width={16} height={16} className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="leading-relaxed">{activeData.dontText}</div>
          </div>
        </div>
      </section>
    </div>
  );
};
