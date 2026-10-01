import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { FileCode, FolderOpen, BookOpen, Terminal, ArrowUpRight, Copy } from 'lucide-react';

interface ManualTabProps {
  language: Language;
  onSendToStudio: (path: string, defaultContent?: string) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const ManualTab: React.FC<ManualTabProps> = ({
  language,
  onSendToStudio,
  showToast
}) => {
  const t = translations[language];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast('Code snippet copied to clipboard!', '📋');
  };

  const manualSections = [
    {
      id: 'skill_md',
      path: 'SKILL.md',
      title: '1. Writing `SKILL.md` (The Master Conductor)',
      subtitle: 'YAML Frontmatter + Step-by-Step Orchestration',
      badge: 'Root Directory Only',
      badgeColor: 'bg-cyan-950 border-cyan-800 text-cyan-300',
      icon: <FileCode width={20} height={20} className="w-5 h-5 text-cyan-400" aria-hidden="true" />,
      borderHover: 'border-cyan-800/60',
      codeColor: 'text-cyan-300',
      rulesEn: [
        'YAML Frontmatter: Must begin on line 1 with "---" and close with "---".',
        'name: Lowercase slug with hyphens (e.g. docker-compose-guard, flow1-ai-video).',
        'description: The router prompt. Gemini reads this to determine if your skill should trigger on user prompts.',
        'Body: Write imperative markdown instructions (Step 1, Step 2, Step 3) referencing subfolder paths directly.'
      ],
      rulesMy: 'SKILL.md သည် Skill တစ်ခုလုံး၏ ခေါင်းဆောင်ဖိုင်ဖြစ်ပါသည်။ အပေါ်ဆုံးတွင် "---" ဖြင့်စပြီး name နှင့် description ကို တိကျစွာ ရေးရပါမည်။ ဤ description ကို ဖတ်ပြီး Gemini က အလိုအလျောက် ခေါ်ယူအသုံးပြုပေးခြင်း ဖြစ်ပါသည်။ စာကိုယ်တွင် အဆင့် ၁၊ ၂၊ ၃ အဖြစ် မည်သည့် scripts ကို run ရမည်၊ မည်သည့် template ကို သုံးရမည်ကို ညွှန်ကြားရပါသည်။',
      sampleCode: `---
name: docker-compose-guard
description: Audits Docker Compose YAML files, runs syntax & security linters, and scaffolds production-ready templates.
---

# Docker Security Guard Instructions

When a user provides or asks to audit a Docker Compose file:
1. Save their YAML into a temporary file.
2. Execute \`scripts/lint_compose.py\` to test for exposed open ports and root permissions.
3. Compare any script warnings with \`references/security_rules.md\`.
4. If the user asks to generate a fresh service, copy \`assets/secure-compose-template.yml\`.
5. Return a clean report detailing any fixed vulnerabilities.`
    },
    {
      id: 'references',
      path: 'references/security_rules.md',
      title: '2. Writing `references/` (Domain Knowledge & Guidelines)',
      subtitle: 'Read on-demand only (Saves tokens & cost)',
      badge: 'Subdirectory: references/',
      badgeColor: 'bg-emerald-950 border-emerald-800 text-emerald-300',
      icon: <BookOpen width={20} height={20} className="w-5 h-5 text-emerald-400" aria-hidden="true" />,
      borderHover: 'border-emerald-800/60',
      codeColor: 'text-emerald-300',
      rulesEn: [
        'Use structured Markdown with clear H1, H2, bullet points, and code snippets.',
        'Do NOT dump 100-page unstructured text; divide into clean files like security_rules.md or api_spec.md.',
        'Gemini only indexes and reads the specific reference requested by SKILL.md.'
      ],
      rulesMy: 'ဤဖိုဒါတွင် ကုမ္ပဏီစည်းမျဉ်းများ၊ ဥပဒေများ၊ စံချိန်စံညွှန်းများ (Style Guide) ကို သိမ်းဆည်းရပါမည်။ မေးခွန်းတိုင်းအတွက် အကုန်မဖတ်ဘဲ လိုအပ်သည့်အချိန်တွင်သာ Gemini က သီးသန့်ဆွဲထုတ်ဖတ်ရှုသောကြောင့် Token မကုန်ဘဲ မြန်ဆန်စေပါသည်။',
      sampleCode: `# Container Security Policies

## 1. Privilege Escalation
Containers must not run as root.
- Enforce: \`security_opt: ["no-new-privileges:true"]\`
- Disallow: \`privileged: true\`

## 2. Public Network Bindings
- Databases (Postgres 5432, MySQL 3306, Redis 6379) must never bind to \`0.0.0.0\`.
- Instead, link them via internal Docker networks or \`127.0.0.1:5432:5432\`.

## 3. Version Pinning
- Ban \`:latest\` tags in production declarations. Use pinned image versions (e.g. \`node:20.11-alpine\`).`
    },
    {
      id: 'scripts',
      path: 'scripts/lint_compose.py',
      title: '3. Writing `scripts/` (Sandbox Executables)',
      subtitle: 'Deterministic Automation (Python, Bash, Node)',
      badge: 'Subdirectory: scripts/',
      badgeColor: 'bg-purple-950 border-purple-800 text-purple-300',
      icon: <Terminal width={20} height={20} className="w-5 h-5 text-purple-400" aria-hidden="true" />,
      borderHover: 'border-purple-800/60',
      codeColor: 'text-purple-300',
      rulesEn: [
        'Accept inputs as CLI arguments (sys.argv[1]) or standard input.',
        'Print output cleanly to stdout so Gemini can read the results.',
        'Use exit code 0 for success, and non-zero for failures.',
        'No GUI prompts or interactive input() loops. Must be strictly non-interactive.'
      ],
      rulesMy: 'Gemini သည် တွက်ချက်မှု၊ regex စစ်ဆေးမှုနှင့် syntax အမှားရှာဖွေမှုများကို အမှားအယွင်း (Hallucination) မရှိစေရန် Python Script များကို run ပြီး အဖြေရှာပါသည်။ Script များကို Terminal CLI command အနေဖြင့် တိုက်ရိုက် run နိုင်အောင် ရေးပေးရပါမည်။',
      sampleCode: `#!/usr/bin/env python3
import sys

def lint(file_path):
    issues = []
    with open(file_path, 'r') as f:
        content = f.read()

    # Deterministic pattern checks
    if '0.0.0.0:' in content:
        issues.append("SECURITY WARN: Found public binding '0.0.0.0:'")
    if ':latest' in content:
        issues.append("VERSION WARN: Image pinned with ':latest' tag")

    if issues:
        print("FAILURES DETECTED:")
        for item in issues:
            print(f" - {item}")
        sys.exit(1)
    else:
        print("SUCCESS: 0 security violations found.")
        sys.exit(0)

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else 'compose.yml'
    lint(target)`
    },
    {
      id: 'assets',
      path: 'assets/secure-compose-template.yml',
      title: '4. Writing `assets/` (Boilerplates & Starter Templates)',
      subtitle: 'Copied and adapted into user deliverables',
      badge: 'Subdirectory: assets/',
      badgeColor: 'bg-amber-950 border-amber-800 text-amber-300',
      icon: <FolderOpen width={20} height={20} className="w-5 h-5 text-amber-400" aria-hidden="true" />,
      borderHover: 'border-amber-800/60',
      codeColor: 'text-amber-300',
      rulesEn: [
        'Store clean production skeletons (YAML, JSON, boilerplate Markdown, config templates).',
        'Use clear comments indicating customizable parameters (e.g. # Set your service name here).',
        'Gemini duplicates and fills in this template rather than inventing structure from scratch.'
      ],
      rulesMy: 'အသုံးပြုသူထံ ပြန်လည်ထုတ်ပေးရမည့် ဖိုင်ပုံစံကြမ်း (Template) များကို ဤနေရာတွင် ထည့်ထားရပါမည်။ Gemini သည် သုညမှ အသစ်မစဘဲ ဤ Template ကို အခြေခံပြီး လိုအပ်သောအချက်အလက်များကို ဖြည့်သွင်း၍ အဖြေထုတ်ပေးပါသည်။',
      sampleCode: `version: '3.8'

services:
  web:
    image: nginx:1.25-alpine
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    ports:
      - "127.0.0.1:8080:80"
    networks:
      - secure_network

networks:
  secure_network:
    driver: bridge`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <section aria-labelledby="manual-header-title" className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl shadow-xl">
        <h2 id="manual-header-title" className="text-lg sm:text-xl font-bold text-white mb-1 flex items-center gap-2">
          <span aria-hidden="true">📖</span>
          <span>{t.manualHeaderTitle}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t.manualHeaderSub}
        </p>
      </section>

      {/* 4 Detailed Sections */}
      <section aria-label="Skill Architecture Blueprints" className="space-y-6">
        {manualSections.map((sec) => (
          <article
            key={sec.id}
            aria-labelledby={`manual-${sec.id}-title`}
            className={`bg-slate-900 border ${sec.borderHover} rounded-2xl p-4 sm:p-6 shadow-xl code-glow`}
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-slate-950 border border-slate-800 rounded-xl" aria-hidden="true">
                  {sec.icon}
                </span>
                <div>
                  <h3 id={`manual-${sec.id}-title`} className="text-sm sm:text-base font-bold text-white font-mono">
                    {sec.title}
                  </h3>
                  <span className="text-xs text-cyan-300 font-medium">
                    {sec.subtitle}
                  </span>
                </div>
              </div>

              <span
                className={`text-xs px-2.5 py-1 rounded-full border ${sec.badgeColor} font-mono`}
              >
                {sec.badge}
              </span>
            </div>

            {/* Content & Code Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              {/* Guidance Column */}
              <div className="lg:col-span-5 space-y-3.5">
                {(language === 'en' || language === 'both') && (
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300 block mb-1.5 uppercase font-mono tracking-wide text-[11px]">
                      🇺🇸 English Developer Rules:
                    </strong>
                    <ul className="list-disc pl-4 space-y-1">
                      {sec.rulesEn.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(language === 'my' || language === 'both') && (
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-200/90 leading-relaxed myanmar-text">
                    <strong className="text-amber-400 block mb-1 uppercase font-mono tracking-wide text-[11px]">
                      🇲🇲 မြန်မာလို ရေးသားနည်း လက်စွဲ:
                    </strong>
                    <p>{sec.rulesMy}</p>
                  </div>
                )}
              </div>

              {/* Code Sample Column */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-2">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex-1 flex flex-col">
                  <div className="text-[11px] font-mono text-slate-300 pb-2 border-b border-slate-800 mb-2 flex items-center justify-between">
                    <span className="truncate">{sec.path}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(sec.sampleCode)}
                        aria-label={`Copy ${sec.path} code sample`}
                        className="text-slate-300 hover:text-white text-[11px] flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                      >
                        <Copy width={12} height={12} className="w-3 h-3" aria-hidden="true" />
                        <span>Copy</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onSendToStudio(sec.path, sec.sampleCode)}
                        aria-label={`Send ${sec.path} to Studio Editor`}
                        className="text-cyan-300 hover:text-cyan-200 text-[11px] flex items-center gap-1 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded font-mono active:scale-95 transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                      >
                        <span>Send to Studio</span>
                        <ArrowUpRight width={12} height={12} className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <pre
                    className={`font-mono text-xs ${sec.codeColor} overflow-x-auto p-2 leading-relaxed flex-1 max-h-56`}
                  >
                    <code>{sec.sampleCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
