import React, { useState, useMemo } from 'react';
import JSZip from 'jszip';
import { Language, TabType, PreflightCheck } from './types';
import { studioPresets } from './data/presets';
import { translations } from './data/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StudioTab } from './components/StudioTab';
import { AgentLoopTab } from './components/AgentLoopTab';
import { ManualTab } from './components/ManualTab';
import { ExplorerTab } from './components/ExplorerTab';
import { PackagingTab } from './components/PackagingTab';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';
import { Code2, GitFork, BookOpen, FolderTree, PackageCheck } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('both');
  const [activeTab, setActiveTab] = useState<TabType>('studio');
  const [selectedPreset, setSelectedPreset] = useState<string>('flow1');

  // Active workspace state initialized with 'flow1' AI Video blueprint
  const [workspaceFiles, setWorkspaceFiles] = useState<Record<string, string>>(
    () => ({ ...studioPresets['flow1'].files })
  );
  const [activeFilePath, setActiveFilePath] = useState<string>('SKILL.md');
  const [skillName, setSkillName] = useState<string>(studioPresets['flow1'].metaName);
  const [skillDesc, setSkillDesc] = useState<string>(studioPresets['flow1'].metaDesc);
  const [explorerNode, setExplorerNode] = useState<string>('skill_md');

  // Toast feedback state
  const [toast, setToast] = useState<{ message: string; icon: string; visible: boolean }>({
    message: '',
    icon: '✅',
    visible: false
  });

  const showToast = (message: string, icon = '✅') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  // Preflight Diagnostic Engine
  const { preflightChecks, isAllValid } = useMemo(() => {
    const checks: PreflightCheck[] = [];
    let valid = true;

    // 1. Root SKILL.md Check
    const hasSkillMd = Boolean(workspaceFiles['SKILL.md']);
    checks.push({
      id: 'root-skill',
      label: 'SKILL.md present at root level',
      passed: hasSkillMd,
      detail: hasSkillMd ? undefined : 'Skill must contain SKILL.md directly at root.'
    });
    if (!hasSkillMd) valid = false;

    // 2. YAML frontmatter check
    const skillContent = workspaceFiles['SKILL.md'] || '';
    const hasFrontmatter = skillContent.startsWith('---') && skillContent.indexOf('---', 3) !== -1;
    checks.push({
      id: 'yaml-syntax',
      label: 'Valid YAML Frontmatter delimiters (---)',
      passed: hasFrontmatter,
      detail: hasFrontmatter ? undefined : 'Line 1 must be --- and close with --- before body.'
    });
    if (!hasFrontmatter) valid = false;

    // 3. Name & Description check
    const hasNameMatch = /name:\s*[\w-]+/.test(skillContent);
    const hasDescMatch = /description:\s*.+/.test(skillContent);
    const hasBoth = hasNameMatch && hasDescMatch;
    checks.push({
      id: 'router-meta',
      label: 'Trigger name and router description defined',
      passed: hasBoth,
      detail: hasBoth ? undefined : 'SKILL.md requires name: and description: in YAML.'
    });
    if (!hasBoth) valid = false;

    // 4. Cross-reference file integrity check
    const matches = skillContent.match(/(?:assets|references|scripts)\/[\w.-]+/g) || [];
    const missing: string[] = [];
    matches.forEach((ref) => {
      if (!workspaceFiles[ref]) {
        missing.push(ref);
      }
    });

    const crossPassed = missing.length === 0;
    checks.push({
      id: 'cross-refs',
      label: crossPassed
        ? `All referenced files exist in workspace (${matches.length} verified)`
        : `Missing referenced file: ${missing[0]}`,
      passed: crossPassed,
      detail: crossPassed ? undefined : `Referenced in SKILL.md but not found in workspace.`
    });
    if (!crossPassed) valid = false;

    return { preflightChecks: checks, isAllValid: valid };
  }, [workspaceFiles]);

  // Load preset blueprint
  const handleLoadPreset = (presetId: string) => {
    const preset = studioPresets[presetId];
    if (!preset) return;
    setSelectedPreset(presetId);
    setWorkspaceFiles({ ...preset.files });
    setActiveFilePath('SKILL.md');
    setSkillName(preset.metaName);
    setSkillDesc(preset.metaDesc);
    showToast(`Loaded blueprint: ${preset.label.split('(')[0].trim()}`, '📂');
  };

  // Reset to empty skill
  const handleResetEmpty = () => {
    const initialSkill = `---\nname: my-custom-skill\ndescription: "Trigger prompt explaining what this skill does."\n---\n\n# Instructions\n\n1. Explain what this skill does.\n`;
    setSkillName('my-custom-skill');
    setSkillDesc('Trigger prompt explaining what this skill does.');
    setWorkspaceFiles({ 'SKILL.md': initialSkill });
    setActiveFilePath('SKILL.md');
    showToast('Workspace reset to empty baseline', '✨');
  };

  // Update content of active file
  const handleUpdateContent = (newContent: string) => {
    setWorkspaceFiles((prev) => ({
      ...prev,
      [activeFilePath]: newContent
    }));

    // If editing SKILL.md, sync metadata inputs
    if (activeFilePath === 'SKILL.md') {
      const nameMatch = newContent.match(/name:\s*([^\n\r]+)/);
      const descMatch = newContent.match(/description:\s*([^\n\r]+)/);
      if (nameMatch && nameMatch[1]) {
        setSkillName(nameMatch[1].trim().replace(/^["']|["']$/g, ''));
      }
      if (descMatch && descMatch[1]) {
        setSkillDesc(descMatch[1].trim().replace(/^["']|["']$/g, ''));
      }
    }
  };

  // Sync metadata fields to SKILL.md frontmatter
  const handleUpdateMetadata = (newName: string, newDesc: string) => {
    setSkillName(newName);
    setSkillDesc(newDesc);

    if (workspaceFiles['SKILL.md']) {
      let content = workspaceFiles['SKILL.md'];
      content = content.replace(/name:\s*[^\n\r]+/, `name: ${newName}`);
      content = content.replace(/description:\s*[^\n\r]+/, `description: "${newDesc}"`);
      setWorkspaceFiles((prev) => ({
        ...prev,
        'SKILL.md': content
      }));
    }
  };

  // Add new file to workspace
  const handleAddFile = (folder: string, filename: string) => {
    const cleanPath = folder === 'root' ? filename : `${folder}/${filename}`;
    const initialText = cleanPath.endsWith('.py')
      ? `#!/usr/bin/env python3\nimport sys\n\n# Script implementation\n`
      : cleanPath.endsWith('.yml') || cleanPath.endsWith('.yaml')
      ? `# Configuration\nversion: '3.8'\n`
      : `# ${filename}\n\n`;

    setWorkspaceFiles((prev) => ({
      ...prev,
      [cleanPath]: initialText
    }));
    setActiveFilePath(cleanPath);
    showToast(`Created file: ${cleanPath}`, '📄');
  };

  // Delete file from workspace
  const handleDeleteFile = (path: string) => {
    if (path === 'SKILL.md') {
      showToast('Cannot delete mandatory root SKILL.md', '⚠️');
      return;
    }
    setWorkspaceFiles((prev) => {
      const copy = { ...prev };
      delete copy[path];
      return copy;
    });
    if (activeFilePath === path) {
      setActiveFilePath('SKILL.md');
    }
    showToast(`Removed file: ${path}`, '🗑️');
  };

  // Client-side ZIP generation
  const handleExportZip = async () => {
    try {
      const zip = new JSZip();
      const zipName = skillName.trim() || 'my-skill';

      // Place all files directly at root (No double-nesting!)
      Object.entries(workspaceFiles).forEach(([filePath, content]) => {
        zip.file(filePath, content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${zipName}.zip`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showToast(`Exported ${zipName}.zip successfully!`, '🎉');
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      showToast(`Failed to generate zip: ${errorMsg}`, '❌');
    }
  };

  // Navigate to explorer with node
  const handleSelectPillar = (tab: TabType, targetFile?: string) => {
    setActiveTab(tab);
    if (tab === 'explorer' && targetFile) {
      setExplorerNode(targetFile);
    } else if (tab === 'studio' && targetFile && workspaceFiles[targetFile]) {
      setActiveFilePath(targetFile);
    }
  };

  // Send sample from Manual to Studio editor
  const handleSendToStudio = (filePath: string, defaultContent?: string) => {
    setWorkspaceFiles((prev) => {
      if (!prev[filePath] && defaultContent) {
        return { ...prev, [filePath]: defaultContent };
      }
      return prev;
    });
    setActiveFilePath(filePath);
    setActiveTab('studio');
    showToast(`Opened ${filePath} in Studio Editor`, '✏️');
  };

  const t = translations[language];

  const primaryTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'studio', label: t.tabStudio, icon: <Code2 className="w-4 h-4" /> },
    { id: 'agentloop', label: t.tabAgentLoop, icon: <GitFork className="w-4 h-4" /> },
    { id: 'manual', label: t.tabManual, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'explorer', label: t.tabExplorer, icon: <FolderTree className="w-4 h-4" /> },
    { id: 'packaging', label: t.tabPackaging, icon: <PackageCheck className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onExportZip={handleExportZip}
      />

      {/* Hero Section */}
      <Hero
        language={language}
        onSelectPillar={handleSelectPillar}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 w-full flex-1 pb-20 md:pb-10">
        {/* Desktop Primary Navigation Tabs */}
        <div className="hidden md:flex border-b border-slate-800 mb-6 gap-2 overflow-x-auto scrollbar-none">
          {primaryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors min-h-[44px] ${
                  isActive
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Studio */}
        {activeTab === 'studio' && (
          <StudioTab
            language={language}
            workspaceFiles={workspaceFiles}
            activeFilePath={activeFilePath}
            skillName={skillName}
            skillDesc={skillDesc}
            selectedPreset={selectedPreset}
            preflightChecks={preflightChecks}
            isAllValid={isAllValid}
            onSelectFile={setActiveFilePath}
            onUpdateContent={handleUpdateContent}
            onUpdateMetadata={handleUpdateMetadata}
            onLoadPreset={handleLoadPreset}
            onResetEmpty={handleResetEmpty}
            onAddFile={handleAddFile}
            onDeleteFile={handleDeleteFile}
            onExportZip={handleExportZip}
            showToast={showToast}
          />
        )}

        {/* Tab 2: Agent Loop */}
        {activeTab === 'agentloop' && (
          <AgentLoopTab
            language={language}
            showToast={showToast}
          />
        )}

        {/* Tab 3: Manual */}
        {activeTab === 'manual' && (
          <ManualTab
            language={language}
            onSendToStudio={handleSendToStudio}
            showToast={showToast}
          />
        )}

        {/* Tab 4: Explorer */}
        {activeTab === 'explorer' && (
          <ExplorerTab
            language={language}
            initialNode={explorerNode}
            showToast={showToast}
          />
        )}

        {/* Tab 5: Packaging */}
        {activeTab === 'packaging' && (
          <PackagingTab
            language={language}
            onExportZip={handleExportZip}
          />
        )}
      </main>

      {/* Mobile Ergonomic Bottom Tab Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
      />

      {/* Floating Notification Toast */}
      <Toast
        message={toast.message}
        icon={toast.icon}
        visible={toast.visible}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 mt-auto hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p className="font-semibold text-slate-300">
              Gemini Spark Skill Architect & Studio
            </p>
            <p className="myanmar-text text-slate-400 text-[11px]">
              Gemini Spark စွမ်းရည်တည်ဆောက်မှု အထောက်အကူပြု လမ်းညွှန်နှင့် Zip ဖန်တီးမှု စနစ်
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-400">
              Agent Skills Open Spec Standard
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
