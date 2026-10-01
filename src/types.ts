export type Language = 'en' | 'my' | 'both';

export type TabType = 'studio' | 'agentloop' | 'manual' | 'explorer' | 'packaging';

export interface PreflightCheck {
  id: string;
  label: string;
  passed: boolean;
  detail?: string;
}

export interface BlueprintPreset {
  id: string;
  label: string;
  metaName: string;
  metaDesc: string;
  files: Record<string, string>;
}

export interface AgentLoopStep {
  step: number;
  num: string;
  titleEn: string;
  titleMy: string;
  questionEn: string;
  questionMy: string;
  simpleEn: string;
  simpleMy: string;
  mapping: string;
  badge: string;
  badgeClass: string;
  icon: string;
  descEn: string;
  descMy: string;
  filename: string;
  code: string;
  tipTitle: string;
  tipDesc: string;
}

export interface ExplorerNodeData {
  key: string;
  title: string;
  icon: string;
  tagline: string;
  badge: string;
  badgeClass: string;
  descEn: string;
  descMy: string;
  code: string;
  doText: string;
  dontText: string;
}
