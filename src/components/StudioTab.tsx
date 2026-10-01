import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  X
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

  // Local state for fast INP (zero latency on keystrokes, debounced parent update)
  const [localContent, setLocalContent] = useState<string>(workspaceFiles[activeFilePath] || '');
  const [localName, setLocalName] = useState<string>(skillName);
  const [localDesc, setLocalDesc] = useState<string>(skillDesc);

  const contentDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const metaDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync local content when activeFilePath changes or external preset loads
  useEffect(() => {
    setLocalContent(workspaceFiles[activeFilePath] || '');
  }, [activeFilePath, workspaceFiles]);

  useEffect(() => {
    setLocalName(skillName);
  }, [skillName]);

  useEffect(() => {
    setLocalDesc(skillDesc);
  }, [skillDesc]);

  // Handle Escape key to close modal for keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (contentDebounceRef.current) clearTimeout(contentDebounceRef.current);
      if (metaDebounceRef.current) clearTimeout(metaDebounceRef.current);
    };
  }, []);

  // Debounced content change handler
  const handleContentChange = useCallback((value: string) => {
    setLocalContent(value);
    if (contentDebounceRef.current) clearTimeout(contentDebounceRef.current);
    contentDebounceRef.current = setTimeout(() => {
      onUpdateContent(value);
    }, 250);
  }, [onUpdateContent]);

  // Flush content on blur to guarantee immediate persistence
  const handleContentBlur = useCallback(() => {
    if (contentDebounceRef.current) {
      clearTimeout(contentDebounceRef.current);
      contentDebounceRef.current = null;
    }
    onUpdateContent(localContent);
  }, [localContent, onUpdateContent]);

  // Debounced metadata change handler
  const handleMetadataChange = useCallback((name: string, desc: string) => {
    setLocalName(name);
    setLocalDesc(desc);
    if (metaDebounceRef.current) clearTimeout(metaDebounceRef.current);
    metaDebounceRef.current = setTimeout(() => {
      onUpdateMetadata(name, desc);
    }, 250);
  }, [onUpdateMetadata]);

  // Flush metadata on blur
  const handleMetadataBlur = useCallback(() => {
    if (metaDebounceRef.current) {
      clearTimeout(metaDebounceRef.current);
      metaDebounceRef.current = null;
    }
    onUpdateMetadata(localName, localDesc);
  }, [localName, localDesc, onUpdateMetadata]);

  const getFileCategory = (path: string) => {
    if (path === 'SKILL.md') return { label: 'Root Conductor', color: 'text-cyan-400', bg: 'bg-cyan-950/80 border-cyan-800' };
    if (path.startsWith('assets/')) return { label: 'Template Asset', color: 'text-amber-400', bg: 'bg-amber-950/80 border-amber-800' };
    if (path.startsWith('references/')) return { label: 'Knowledge Doc', color: 'text-emerald-400', bg: 'bg-emerald-950/80 border-emerald-800' };
    if (path.startsWith('scripts/')) return { label: 'Executable Tool', color: 'text-purple-400', bg: 'bg-purple-950/80 border-purple-800' };
    return { label: 'Skill File', color: 'text-slate-300', bg: 'bg-slate-900 border-slate-700' };
  };

  const getFileIcon = (path: string) => {
    if (path === 'SKILL.md') return <FileCode width={16} height={16} className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />;
    if (path.startsWith('assets/')) return <FolderOpen width={16} height={16} className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />;
    if (path.startsWith('references/')) return <BookOpen width={16} height={16} className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />;
    if (path.startsWith('scripts/')) return <Terminal width={16} height={16} className="w-4 h-4 text-purple-400 shrink-0" aria-hidden="true" />;
    return <FileText width={16} height={16} className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localContent);
    showToast('File content copied to clipboard!', '📋');
  };

  const handleFormat = () => {
    const formatted = localContent.trimEnd() + '\n';
    setLocalContent(formatted);
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

  // Font size class mapping without inline styles
  const fontSizeClass =
    fontSize <= 11
      ? 'text-[11px]'
      : fontSize === 12
      ? 'text-xs'
      : fontSize === 13
      ? 'text-[13px]'
      : fontSize === 14
      ? 'text-sm'
      : fontSize === 15
      ? 'text-[15px]'
      : fontSize === 16
      ? 'text-base'
      : 'text-[17px]';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Control Bar */}
      <section
        aria-label="Skill Blueprint Controls"
        className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg"
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <label htmlFor="blueprint-select" className="text-xs font-semibold text-slate-200 whitespace-nowrap">
              {t.blueprintLabel}
            </label>
            <select
              id="blueprint-select"
              value={selectedPreset}
              onChange={(e) => onLoadPreset(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-cyan-300 font-medium focus:border-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 w-full sm:w-auto min-h-[40px] truncate"
            >
              <option value="flow1">🎬 AI Video: flow1 (Google Flow Pipeline)</option>
              <option value="docker">🛡️ Docker Compose Security Guard</option>
              <option value="data">📊 CSV Data Validator & Sanitizer</option>
              <option value="myanmar">🇲🇲 Myanmar Official Letter Formatter</option>
            </select>
          </div>

          <button
            type="button"
            onClick={onResetEmpty}
            aria-label="Reset workspace to blank skill template"
            className="text-xs text-slate-300 hover:text-rose-400 px-3 py-2 rounded-xl border border-slate-700/80 bg-slate-950 hover:bg-slate-800 transition min-h-[40px] whitespace-nowrap active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {t.clearReset}
          </button>
        </div>

        {/* Pre-flight Diagnostic Status */}
        <div
          role="status"
          aria-live="polite"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border ${
            isAllValid
              ? 'bg-emerald-950/70 border-emerald-800 text-emerald-300'
              : 'bg-amber-950/70 border-amber-800 text-amber-300'
          }`}
        >
          {isAllValid ? (
            <CheckCircle2 width={16} height={16} className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          ) : (
            <AlertTriangle width={16} height={16} className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
          )}
          <span>{isAllValid ? 'Skill Verified: Ready to Zip' : 'Review Warnings Before Export'}</span>
        </div>
      </section>

      {/* Mobile-Only Segmented Control between Files & Editor */}
      <div
        role="tablist"
        aria-label="Editor and files switcher"
        className="flex lg:hidden bg-slate-900 p-1 rounded-xl border border-slate-800"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mobileView === 'editor'}
          onClick={() => setMobileView('editor')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all min-h-[40px] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            mobileView === 'editor'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <FileCode width={16} height={16} className="w-4 h-4" aria-hidden="true" />
          <span>Code Editor ({activeFilePath})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileView === 'files'}
          onClick={() => setMobileView('files')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all min-h-[40px] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            mobileView === 'files'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Folder width={16} height={16} className="w-4 h-4" aria-hidden="true" />
          <span>Files & Checks ({Object.keys(workspaceFiles).length})</span>
        </button>
      </div>

      {/* Quick Mobile Horizontal File Picker Strip (when in editor view) */}
      <nav aria-label="Quick file switcher" className="flex lg:hidden overflow-x-auto gap-2 pb-1 scrollbar-none">
        {Object.keys(workspaceFiles)
          .sort()
          .map((path) => {
            const isSel = path === activeFilePath;
            return (
              <button
                key={path}
                type="button"
                onClick={() => onSelectFile(path)}
                aria-label={`Switch to ${path}`}
                aria-current={isSel ? 'true' : undefined}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap shrink-0 border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSel
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {getFileIcon(path)}
                <span>{path}</span>
              </button>
            );
          })}
      </nav>

      {/* Main Grid: Files & Preflight (Col 4) | Editor & Download (Col 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Virtual Files & Preflight Diagnostics */}
        <aside
          aria-label="Skill workspace files and preflight diagnostics"
          className={`lg:col-span-4 space-y-4 ${
            mobileView === 'files' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* File Tree Section */}
          <section
            aria-labelledby="workspace-files-heading"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h2 id="workspace-files-heading" className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Folder width={16} height={16} className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>{t.virtualFilesTitle}</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                aria-haspopup="dialog"
                aria-expanded={showModal}
                aria-label="Add new file to skill workspace"
                className="text-[11px] bg-cyan-950 border border-cyan-800 text-cyan-300 hover:bg-cyan-900/60 min-h-[32px] px-2.5 py-1 rounded-lg font-mono flex items-center gap-1 active:scale-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Plus width={14} height={14} className="w-3.5 h-3.5" aria-hidden="true" />
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
                      className={`flex items-center justify-between p-2 rounded-xl transition min-h-[40px] ${
                        isActive
                          ? 'bg-cyan-950/70 border border-cyan-500/60 text-cyan-200 font-bold'
                          : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onSelectFile(path);
                          setMobileView('editor');
                        }}
                        aria-label={`Open file ${path}`}
                        aria-current={isActive ? 'true' : undefined}
                        className="flex items-center gap-2 overflow-hidden truncate flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                      >
                        {getFileIcon(path)}
                        <span className={`truncate ${cat.color}`}>{path}</span>
                      </button>
                      {path !== 'SKILL.md' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteFile(path);
                          }}
                          className="text-slate-300 hover:text-rose-400 p-1.5 rounded transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                          aria-label={`Delete ${path}`}
                        >
                          <Trash2 width={14} height={14} className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Skill Metadata Inputs (Debounced for fast INP) */}
            <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
              <div>
                <label htmlFor="skill-name-input" className="block text-[11px] font-semibold text-slate-300 mb-1">
                  {t.skillSlugLabel}
                </label>
                <input
                  id="skill-name-input"
                  type="text"
                  value={localName}
                  onChange={(e) => handleMetadataChange(e.target.value, localDesc)}
                  onBlur={handleMetadataBlur}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[38px]"
                  placeholder="e.g. docker-compose-guard"
                />
              </div>
              <div>
                <label htmlFor="skill-desc-input" className="block text-[11px] font-semibold text-slate-300 mb-1">
                  {t.skillDescLabel}
                </label>
                <textarea
                  id="skill-desc-input"
                  rows={3}
                  value={localDesc}
                  onChange={(e) => handleMetadataChange(localName, e.target.value)}
                  onBlur={handleMetadataBlur}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-sans focus:border-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 leading-relaxed resize-none"
                  placeholder="Router description in SKILL.md for Gemini Spark..."
                />
              </div>
            </div>
          </section>

          {/* Preflight Diagnostics Box */}
          <section
            aria-labelledby="diagnostics-heading"
            className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-xs space-y-2.5 shadow-lg"
          >
            <h2 id="diagnostics-heading" className="font-bold text-cyan-400 flex items-center gap-1.5">
              <span>🩺</span>
              <span>{t.preflightTitle}</span>
            </h2>
            <ul
              role="list"
              className="space-y-1.5 text-[11px] font-mono"
            >
              {preflightChecks.map((check) => (
                <li
                  key={check.id}
                  className={`flex items-start gap-2 ${
                    check.passed ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  <span className="shrink-0 mt-0.5" aria-hidden="true">{check.passed ? '✓' : '✗'}</span>
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
          </section>
        </aside>

        {/* Right Column: Code Editor & Download Button */}
        <section
          aria-labelledby="editor-heading"
          className={`lg:col-span-8 flex flex-col ${
            mobileView === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <h2 id="editor-heading" className="sr-only">Code and Instructions Editor</h2>
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
                <div
                  role="group"
                  aria-label="Editor font size controls"
                  className="flex items-center bg-slate-900 rounded-lg border border-slate-800 px-1.5 py-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setFontSize((prev) => Math.max(11, prev - 1))}
                    aria-label="Decrease font size"
                    className="text-[10px] text-slate-300 hover:text-white px-1.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 rounded"
                  >
                    A-
                  </button>
                  <span className="text-[10px] text-slate-300 font-mono px-1">
                    {fontSize}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFontSize((prev) => Math.min(18, prev + 1))}
                    aria-label="Increase font size"
                    className="text-[10px] text-slate-300 hover:text-white px-1.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 rounded"
                  >
                    A+
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleFormat}
                  aria-label="Auto-format file content"
                  className="text-xs text-slate-200 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1 active:scale-95 transition min-h-[34px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Wand2 width={14} height={14} className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Format</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy file content to clipboard"
                  className="text-xs text-cyan-300 hover:text-cyan-200 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1 active:scale-95 transition min-h-[34px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Copy width={14} height={14} className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Copy</span>
                </button>
              </div>
            </div>

            {/* Live Textarea with Debounced Handler for fast INP */}
            <div className="relative flex-1 p-2 sm:p-3 bg-slate-950 min-h-[360px] sm:min-h-[440px] flex flex-col">
              <label htmlFor="code-editor-textarea" className="sr-only">
                {`Code editor for ${activeFilePath}`}
              </label>
              <textarea
                id="code-editor-textarea"
                value={localContent}
                onChange={(e) => handleContentChange(e.target.value)}
                onBlur={handleContentBlur}
                aria-label={`Code editor for ${activeFilePath}`}
                spellCheck={false}
                className={`w-full flex-1 bg-transparent text-slate-200 font-mono-code leading-relaxed p-2 focus:outline-none resize-none selection:bg-cyan-600 selection:text-white min-h-[350px] sm:min-h-[420px] ${fontSizeClass}`}
                placeholder="Enter markdown instructions, YAML, Python script, or template content..."
              />
            </div>

            {/* Bottom Action & Download Bar */}
            <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-300 flex items-center gap-2 text-center sm:text-left">
                <span className="text-amber-400" aria-hidden="true">⚡</span>
                <span>{t.editorSaveNote}</span>
              </div>

              <button
                type="button"
                onClick={onExportZip}
                aria-label="Generate and download skill ZIP package"
                className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition active:scale-95 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Download width={16} height={16} className="w-4 h-4" aria-hidden="true" />
                <span>{t.downloadZipBtn}</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Add New File Modal with Dialog Accessibility */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 id="modal-title" className="font-bold text-white text-sm flex items-center gap-2">
                <Plus width={16} height={16} className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Create New Skill File</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="text-slate-300 hover:text-white p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <X width={16} height={16} className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleCreateFileSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-folder-select" className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Target Directory
                </label>
                <select
                  id="modal-folder-select"
                  value={modalFolder}
                  onChange={(e) => setModalFolder(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono focus:border-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[42px]"
                >
                  <option value="root">Root (for SKILL.md or top-level file)</option>
                  <option value="assets">assets/ (Templates, boilerplates)</option>
                  <option value="references">references/ (Guides, rules, docs)</option>
                  <option value="scripts">scripts/ (Python, shell tools)</option>
                </select>
              </div>

              <div>
                <label htmlFor="modal-filename-input" className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Filename
                </label>
                <input
                  id="modal-filename-input"
                  type="text"
                  value={modalFilename}
                  onChange={(e) => setModalFilename(e.target.value)}
                  placeholder="e.g. styleguide.md or validator.py"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[42px]"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  aria-label="Cancel creating new file"
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-200 hover:bg-slate-800 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  aria-label="Confirm creation of new skill file"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shadow-lg shadow-cyan-600/30 min-h-[40px] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
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
