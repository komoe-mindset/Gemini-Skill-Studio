import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Download, Sparkles, Languages } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onExportZip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onExportZip
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 truncate">
                Spark Skill Studio
              </span>
              <span className="hidden sm:inline-block text-[10px] text-cyan-300 font-mono px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/80">
                v2.0
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 truncate hidden xs:block">
              Gemini Spark Skill Architect & Studio
            </p>
          </div>
        </div>

        {/* Action Zone: Language Selector & Quick Export */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onLanguageChange('en')}
              className={`min-h-[32px] px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English interface"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('my')}
              className={`min-h-[32px] px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'my'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Myanmar Unicode"
            >
              မြန်မာ
            </button>
            <button
              onClick={() => onLanguageChange('both')}
              className={`min-h-[32px] px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'both'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Dual EN + MM"
            >
              Dual
            </button>
          </div>

          {/* Export Zip Trigger */}
          <button
            onClick={onExportZip}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold min-h-[40px] px-3 sm:px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/20 transition transform active:scale-95 whitespace-nowrap"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">{t.exportZipBtn}</span>
            <span className="sm:hidden">.ZIP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
