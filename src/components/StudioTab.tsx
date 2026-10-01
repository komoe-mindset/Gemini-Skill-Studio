import React, { useState } from 'react';
import { Language, PreflightCheck } from '../types';
import { translations } from '../data/translations';
import {
  FileCode,
  FolderOpen,
  BookOpen,
  Terminal,
  Plus,
  Trash2,
  Copy,
  Wand2,
  Download,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Folder,
  X,
  Type
} from 'lucide-react';

interface StudioTabProps {
  language: Language;
  workspaceFiles: Record<string, string>;
  activeFilePath: string;
  skillName: string;
  skillDesc: string;
  selectedPreset: string;
  preflightChecks: PreflightCheck[];
  isAllValid: boolean;
  onSelectFile: (path: string) => void;
  onUpdateContent: (content: string) => void;
  onUpdateMetadata: (name: string, desc: string) => void;
  onLoadPreset: (presetId: string) => void;
  onResetEmpty: () => void;
  onAddFile: (folder: string, filename: string) => void;
  onDeleteFile: (path: string) => void;
  onExportZip: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const StudioTab: React.FC<StudioTabProps> = ({
  language,
  workspaceFiles,
  activeFilePath,
  skillName,
  skillDesc,
  selectedPreset,
  preflightChecks,
  isAllValid,
  onSelectFile,
  onUpdateContent,
  onUpdateMetadata,
  onLoadPreset,
  onResetEmpty,
  onAddFile,
  onDeleteFile,
  onExportZip,
  showToast
}) => {
  const t = translations[language];

  // Mobile view toggle: 'files' | 'editor'
  const [mobileView, setMobileView] = useState<'editor' | 'files'>('editor');
  // Add file modal
  const [showModal, setShowModal] = useState(false);
  const [modalFolder, setModalFolder] = useState('root');
  const [modalFilename, setModalFilename] = useState('');
  // Editor font scale
  const [fontSize, setFontSize] = useState<number>(13); // in px

  const currentContent = workspaceFiles[activeFilePath] || '';

  const getFileCategory = (path: string) => {
    if (path === 'SKILL.md') return { label: 'Root Conductor', color: 'text-cyan-400', bg: 'bg-cyan-950/80 border-cyan-800' };
    if (path.startsWith('assets/')) return { label: 'Template Asset', color: 'text-amber-400', bg: 'bg-amber-950/80 border-amber-800' };
    if (path.startsWith('references/')) return { label: 'Knowledge Doc', color: 'text-emerald-400', bg: 'bg-emerald-950/80 border-emerald-800' };
    if (path.startsWith('scripts/')) return { label: 'Executable Tool', color: 'text-purple-400', bg: 'bg-purple-950/80 border-purple-800' };
    return { label: 'Skill File', color: 'text-slate-300', bg: 'bg-slate-900 border-slate-700' };
  };

  const getFileIcon = (path: string) => {
    if (path === 'SKILL.md') return <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />;
    if (path.startsWith('assets/')) return <FolderOpen className="w-4 h-4 text-amber-400 shrink-0" />;
    if (path.startsWith('references/')) return <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />;
    if (path.startsWith('scripts/')) return <Terminal className="w-4 h-4 text-purple-400 shrink-0" />;
    return <FileText className="w-4 h-4 text-slate-400 shrink-0" />;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    showToast('File content copied to clipboard!', '📋');
  };

  const handleFormat = () => {
    // Normalizes trailing newlines and whitespace
    const formatted = currentContent.trimEnd() + '\n';
    onUpdateContent(formatted);
    showToast('File formatted with clean EOF', '🪄');
  };

  const handleCreateFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = modalFilename.trim();
    if (!cleanName) {
      showToast('Please specify a filename', '⚠️');
      return;
    }
    const fullPath = modalFolder === 'root' ? cleanName : `${modalFolder}/${cleanName}`;
    if (workspaceFiles[fullPath]) {
      showToast('File already exists in workspace', '⚠️');
      return;
    }
    onAddFile(modalFolder, cleanName);
    setShowModal(false);
    setModalFilename('');
    setMobileView('editor');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Control Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <span className="text-xs font-semibold text-slate-300 whitespace-nowrap hidden sm:inline">
              {t.blueprintLabel}
            </span>
            <select
              value={selectedPreset}
              onChange={(e) => onLoadPreset(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-cyan-300 font-medium focus:border-cyan-500 focus:outline-none w-full sm:w-auto min-h-[40px] truncate"
            >
              <option value="flow1">🎬 AI Video: flow1 (Google Flow Pipeline)</option>
              <option value="docker">🛡️ Docker Compose Security Guard</option>
              <option value="data">📊 CSV Data Validator & Sanitizer</option>
              <option value="myanmar">🇲🇲 Myanmar Official Letter Formatter</option>
            </select>
          </div>

          <button
            onClick={onResetEmpty}
            className="text-xs text-slate-400 hover:text-rose-400 px-3 py-2 rounded-xl border border-slate-700/80 bg-slate-950 hover:bg-slate-800 transition min-h-[40px] whitespace-nowrap active:scale-95"
          >
            {t.clearReset}
          </button>
        </div>

        {/* Pre-flight Diagnostic Status */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border ${
            isAllValid
              ? 'bg-emerald-950/70 border-emerald-800 text-emerald-300'
              : 'bg-amber-950/70 border-amber-800 text-amber-300'
          }`}
        >
          {isAllValid ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>{isAllValid ? 'Skill Verified: Ready to Zip' : 'Review Warnings Before Export'}</span>
        </div>
      </div>

      {/* Mobile-Only Segmented Control between Files & Editor */}
      <div className="flex lg:hidden bg-slate-900 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setMobileView('editor')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all min-h-[40px] flex items-center justify-center gap-2 ${
            mobileView === 'editor'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Code Editor ({activeFilePath})</span>
        </button>
        <button
          onClick={() => setMobileView('files')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all min-h-[40px] flex items-center justify-center gap-2 ${
            mobileView === 'files'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span>Files & Checks ({Object.keys(workspaceFiles).length})</span>
        </button>
      </div>

      {/* Quick Mobile Horizontal File Picker Strip (when in editor view) */}
      <div className="flex lg:hidden overflow-x-auto gap-2 pb-1 scrollbar-none">
        {Object.keys(workspaceFiles)
          .sort()
          .map((path) => {
            const isSel = path === activeFilePath;
            return (
              <button
                key={path}
                onClick={() => onSelectFile(path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap shrink-0 border transition ${
                  isSel
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {getFileIcon(path)}
                <span>{path}</span>
              </button>
            );
          })}
      </div>

      {/* Main Grid: Files & Preflight (Col 4) | Editor & Download (Col 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Virtual Files & Preflight Diagnostics */}
        <div
          className={`lg:col-span-4 space-y-4 ${
            mobileView === 'files' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* File Tree Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-cyan-400" />
                <span>{t.virtualFilesTitle}</span>
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="text-[11px] bg-cyan-950 border border-cyan-800 text-cyan-300 hover:bg-cyan-900/60 min-h-[32px] px-2.5 py-1 rounded-lg font-mono flex items-center gap-1 active:scale-95 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add File</span>
              </button>
            </div>

            {/* File List */}
            <div className="space-y-1.5 font-mono text-xs max-h-64 overflow-y-auto pr-1">
              {Object.keys(workspaceFiles)
                .sort()
                .map((path) => {
                  const isActive = path === activeFilePath;
                  const cat = getFileCategory(path);
                  return (
                    <div
                      key={path}
                      onClick={() => {
                        onSelectFile(path);
                        setMobileView('editor');
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition min-h-[40px] ${
                        isActive
                          ? 'bg-cyan-950/70 border border-cyan-500/60 text-cyan-200 font-bold'
                          : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden truncate">
                        {getFileIcon(path)}
                        <span className={`truncate ${cat.color}`}>{path}</span>
                      </div>
                      {path !== 'SKILL.md' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteFile(path);
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1.5 rounded transition"
                          title={`Delete ${path}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Skill Metadata Inputs */}
            <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  {t.skillSlugLabel}
                </label>
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => onUpdateMetadata(e.target.value, skillDesc)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none min-h-[38px]"
                  placeholder="e.g. docker-compose-guard"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  {t.skillDescLabel}
                </label>
                <textarea
                  rows={3}
                  value={skillDesc}
                  onChange={(e) => onUpdateMetadata(skillName, e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-sans focus:border-cyan-500 focus:outline-none leading-relaxed resize-none"
                  placeholder="Router description in SKILL.md for Gemini Spark..."
                />
              </div>
            </div>
          </div>

          {/* Preflight Diagnostics Box */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-xs space-y-2.5 shadow-lg">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <span>🩺</span>
              <span>{t.preflightTitle}</span>
            </div>
            <ul className="space-y-1.5 text-[11px] font-mono">
              {preflightChecks.map((check) => (
                <li
                  key={check.id}
                  className={`flex items-start gap-2 ${
                    check.passed ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  <span className="shrink-0 mt-0.5">{check.passed ? '✓' : '✗'}</span>
                  <div>
                    <span>{check.label}</span>
                    {check.detail && !check.passed && (
                      <p className="text-[10px] text-rose-300 font-sans mt-0.5">
                        {check.detail}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Code Editor & Download Button */}
        <div
          className={`lg:col-span-8 flex flex-col ${
            mobileView === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl code-glow">
            {/* Editor Header Bar */}
            <div className="bg-slate-950 border-b border-slate-800 px-3 sm:px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {getFileIcon(activeFilePath)}
                <span className="font-mono text-xs sm:text-sm font-bold text-cyan-300 truncate">
                  {activeFilePath}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    getFileCategory(activeFilePath).bg
                  } ${getFileCategory(activeFilePath).color} hidden sm:inline-block`}
                >
                  {getFileCategory(activeFilePath).label}
                </span>
              </div>

              {/* Action Affordances */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Font Size Scaling for Mobile */}
                <div className="flex items-center bg-slate-900 rounded-lg border border-slate-800 px-1.5 py-0.5">
                  <button
                    onClick={() => setFontSize((prev) => Math.max(11, prev - 1))}
                    className="text-[10px] text-slate-400 hover:text-white px-1.5 py-1"
                    title="Decrease font size"
                  >
                    A-
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono px-1">
                    {fontSize}
                  </span>
                  <button
                    onClick={() => setFontSize((prev) => Math.min(18, prev + 1))}
                    className="text-[10px] text-slate-400 hover:text-white px-1.5 py-1"
                    title="Increase font size"
                  >
                    A+
                  </button>
                </div>

                <button
                  onClick={handleFormat}
                  className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1 active:scale-95 transition min-h-[34px]"
                  title="Auto-format file"
                >
                  <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Format</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="text-xs text-cyan-400 hover:text-cyan-300 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1 active:scale-95 transition min-h-[34px]"
                  title="Copy file content"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy</span>
                </button>
              </div>
            </div>

            {/* Live Textarea */}
            <div className="relative flex-1 p-2 sm:p-3 bg-slate-950 min-h-[360px] sm:min-h-[440px] flex flex-col">
              <textarea
                value={currentContent}
                onChange={(e) => onUpdateContent(e.target.value)}
                spellCheck={false}
                style={{ fontSize: `${fontSize}px` }}
                className="w-full flex-1 bg-transparent text-slate-200 font-mono-code leading-relaxed p-2 focus:outline-none resize-none selection:bg-cyan-600 selection:text-white min-h-[350px] sm:min-h-[420px]"
                placeholder="Enter markdown instructions, YAML, Python script, or template content..."
              />
            </div>

            {/* Bottom Action & Download Bar */}
            <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-2 text-center sm:text-left">
                <span className="text-amber-400">⚡</span>
                <span>{t.editorSaveNote}</span>
              </div>

              <button
                onClick={onExportZip}
                className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition active:scale-95 min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>{t.downloadZipBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New File Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Create New Skill File</span>
              </h4>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Directory
                </label>
                <select
                  value={modalFolder}
                  onChange={(e) => setModalFolder(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none min-h-[42px]"
                >
                  <option value="root">Root (for SKILL.md or top-level file)</option>
                  <option value="assets">assets/ (Templates, boilerplates)</option>
                  <option value="references">references/ (Guides, rules, docs)</option>
                  <option value="scripts">scripts/ (Python, shell tools)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Filename
                </label>
                <input
                  type="text"
                  value={modalFilename}
                  onChange={(e) => setModalFilename(e.target.value)}
                  placeholder="e.g. styleguide.md or validator.py"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none min-h-[42px]"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shadow-lg shadow-cyan-600/30 min-h-[40px] active:scale-95"
                >
                  Create File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
