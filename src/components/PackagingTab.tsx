import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Download, Check, X, Laptop, Terminal, Apple } from 'lucide-react';

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
      <section
        aria-labelledby="os-packaging-heading"
        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl"
      >
        <h2 id="os-packaging-heading" className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span aria-hidden="true">📦</span>
          <span>{t.osManualTitle}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed max-w-3xl">
          {t.osManualSub}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Windows */}
          <article aria-labelledby="windows-heading" className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5">
            <h3 id="windows-heading" className="flex items-center gap-2 font-bold text-sm text-sky-400">
              <Laptop width={16} height={16} className="w-4 h-4 text-sky-400" aria-hidden="true" />
              <span>Windows 10 / 11</span>
            </h3>
            <ol className="list-decimal pl-4 text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li>Open your skill folder (e.g. <code className="text-cyan-300 font-mono">my-skill/</code>).</li>
              <li>
                Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">Ctrl + A</kbd> to select <strong>all files inside</strong>.
              </li>
              <li>Right-click on <code className="text-cyan-300 font-mono">SKILL.md</code>.</li>
              <li>Choose <strong>Compress to ZIP file</strong>.</li>
              <li className="text-emerald-400 font-semibold">Done! Now SKILL.md sits right at the zip root.</li>
            </ol>
          </article>

          {/* macOS */}
          <article aria-labelledby="macos-heading" className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5">
            <h3 id="macos-heading" className="flex items-center gap-2 font-bold text-sm text-slate-200">
              <Apple width={16} height={16} className="w-4 h-4 text-slate-300" aria-hidden="true" />
              <span>macOS (Terminal or Finder)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-snug">Inside Terminal, run:</p>
            <div className="bg-black/80 p-2.5 rounded-lg font-mono text-[11px] text-cyan-300 leading-relaxed border border-slate-800">
              cd my-skill-folder<br />
              zip -r ../my-skill.zip .
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Or in Finder: Open the folder, select all items, right-click → <em>Compress Items</em>.
            </p>
          </article>

          {/* Linux */}
          <article aria-labelledby="linux-heading" className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5">
            <h3 id="linux-heading" className="flex items-center gap-2 font-bold text-sm text-amber-400">
              <Terminal width={16} height={16} className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Linux (CLI)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-snug">Run the standard zip command:</p>
            <div className="bg-black/80 p-2.5 rounded-lg font-mono text-[11px] text-cyan-300 leading-relaxed border border-slate-800">
              cd my-skill-folder<br />
              zip -r ../my-skill.zip *
            </div>
            <p className="text-xs text-emerald-400 leading-relaxed">
              Guarantees zero hidden top-level directory wrapper.
            </p>
          </article>
        </div>
      </section>

      {/* Common Pitfalls Comparison: Wrong vs Correct */}
      <section aria-labelledby="pitfalls-section-heading" className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <h2 id="pitfalls-section-heading" className="sr-only">Common Zip Packaging Pitfalls and Correct Pattern</h2>
        {/* WRONG */}
        <article
          aria-labelledby="wrong-zip-heading"
          className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-rose-900/60 space-y-3.5 shadow-xl"
        >
          <h3 id="wrong-zip-heading" className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <X width={20} height={20} className="w-5 h-5 text-rose-400" aria-hidden="true" />
            <span>{t.wrongZipTitle}</span>
          </h3>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 space-y-1.5">
            <div className="font-bold text-white">my-skill.zip</div>
            <div className="pl-4 text-rose-400">
              └── 📁 my-skill/ <span className="text-[10px] bg-rose-950 border border-rose-800 px-1.5 py-0.5 rounded ml-1">(WRONG: Extra folder!)</span>
            </div>
            <div className="pl-8 text-slate-300">├── 📄 SKILL.md</div>
            <div className="pl-8 text-slate-300">├── 📁 assets/</div>
            <div className="pl-8 text-slate-300">└── 📁 scripts/</div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.wrongZipDesc}
          </p>
        </article>

        {/* CORRECT */}
        <article
          aria-labelledby="correct-zip-heading"
          className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-emerald-900/60 space-y-3.5 shadow-xl"
        >
          <h3 id="correct-zip-heading" className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Check width={20} height={20} className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <span>{t.correctZipTitle}</span>
          </h3>
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
              type="button"
              onClick={onExportZip}
              aria-label="Download pre-packaged valid skill ZIP"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Download width={16} height={16} className="w-4 h-4" aria-hidden="true" />
              <span>Download Pre-Packaged .ZIP Now</span>
            </button>
          </div>
        </article>
      </section>
    </div>
  );
};
