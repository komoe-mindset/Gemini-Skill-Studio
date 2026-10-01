import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Download, Check, X, Laptop, Terminal, Apple, HelpCircle } from 'lucide-react';

interface PackagingTabProps {
  language: Language;
  onExportZip: () => void;
}

export const PackagingTab: React.FC<PackagingTabProps> = ({
  language,
  onExportZip
}) => {
  const t = translations[language];

  return (
    <div className="space-y-6">
      {/* OS Guide Header & Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span>📦</span>
          <span>{t.osManualTitle}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed max-w-3xl">
          {t.osManualSub}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Windows */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-sm text-sky-400">
              <Laptop className="w-4 h-4 text-sky-400" />
              <span>Windows 10 / 11</span>
            </div>
            <ol className="list-decimal pl-4 text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li>Open your skill folder (e.g. <code className="text-cyan-300 font-mono">my-skill/</code>).</li>
              <li>
                Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">Ctrl + A</kbd> to select <strong>all files inside</strong>.
              </li>
              <li>Right-click on <code className="text-cyan-300 font-mono">SKILL.md</code>.</li>
              <li>Choose <strong>Compress to ZIP file</strong>.</li>
              <li className="text-emerald-400 font-semibold">Done! Now SKILL.md sits right at the zip root.</li>
            </ol>
          </div>

          {/* macOS */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-200">
              <Apple className="w-4 h-4 text-slate-300" />
              <span>macOS (Terminal or Finder)</span>
            </div>
            <p className="text-xs text-slate-400 leading-snug">Inside Terminal, run:</p>
            <div className="bg-black/80 p-2.5 rounded-lg font-mono text-[11px] text-cyan-300 leading-relaxed border border-slate-800">
              cd my-skill-folder<br />
              zip -r ../my-skill.zip .
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Or in Finder: Open the folder, select all items, right-click → <em>Compress Items</em>.
            </p>
          </div>

          {/* Linux */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Linux (CLI)</span>
            </div>
            <p className="text-xs text-slate-400 leading-snug">Run the standard zip command:</p>
            <div className="bg-black/80 p-2.5 rounded-lg font-mono text-[11px] text-cyan-300 leading-relaxed border border-slate-800">
              cd my-skill-folder<br />
              zip -r ../my-skill.zip *
            </div>
            <p className="text-xs text-emerald-400 leading-relaxed">
              Guarantees zero hidden top-level directory wrapper.
            </p>
          </div>
        </div>
      </div>

      {/* Common Pitfalls Comparison: Wrong vs Correct */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* WRONG */}
        <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-rose-900/60 space-y-3.5 shadow-xl">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <X className="w-5 h-5 text-rose-400" />
            <span>{t.wrongZipTitle}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 space-y-1.5">
            <div className="font-bold text-white">my-skill.zip</div>
            <div className="pl-4 text-rose-400">
              └── 📁 my-skill/ <span className="text-[10px] bg-rose-950 border border-rose-800 px-1.5 py-0.5 rounded ml-1">(WRONG: Extra folder!)</span>
            </div>
            <div className="pl-8 text-slate-400">├── 📄 SKILL.md</div>
            <div className="pl-8 text-slate-400">├── 📁 assets/</div>
            <div className="pl-8 text-slate-400">└── 📁 scripts/</div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.wrongZipDesc}
          </p>
        </div>

        {/* CORRECT */}
        <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-emerald-900/60 space-y-3.5 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Check className="w-5 h-5 text-emerald-400" />
            <span>{t.correctZipTitle}</span>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 space-y-1.5">
            <div className="font-bold text-white">my-skill.zip</div>
            <div className="pl-4 text-emerald-400 font-bold">
              ├── 📄 SKILL.md <span className="text-[10px] bg-emerald-950 border border-emerald-800 px-1.5 py-0.5 rounded ml-1">(Directly at root!)</span>
            </div>
            <div className="pl-4 text-slate-300">├── 📁 assets/</div>
            <div className="pl-4 text-slate-300">├── 📁 references/</div>
            <div className="pl-4 text-slate-300">└── 📁 scripts/</div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.correctZipDesc}
          </p>
          <div className="pt-2">
            <button
              onClick={onExportZip}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition min-h-[40px]"
            >
              <Download className="w-4 h-4" />
              <span>Download Pre-Packaged .ZIP Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
