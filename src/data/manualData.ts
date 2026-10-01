import { ExplorerNodeData } from '../types';

export const explorerNodes: Record<string, ExplorerNodeData> = {
  skill_md: {
    key: 'skill_md',
    title: 'SKILL.md',
    icon: '📄',
    tagline: 'Primary Entry Point & Metadata Coordinator (ဗဟိုလမ်းညွှန်ဖိုင်)',
    badge: 'Mandatory (မဖြစ်မနေလိုအပ်)',
    badgeClass: 'bg-cyan-950/80 border border-cyan-800 text-cyan-300',
    descEn: 'The core orchestrator file. It tells Gemini when to activate (YAML frontmatter) and gives precise step-by-step instructions on when to read references, execute scripts, and inject assets.',
    descMy: 'စွမ်းရည်၏ ဗဟိုဦးနှောက်ဖိုင် ဖြစ်ပါသည်။ အသုံးပြုသူ၏ မေးခွန်းနှင့် ကိုက်ညီပါက စွမ်းရည်ကို အလိုအလျောက် ခေါ်ယူပေးမည့် အချက်အလက် (YAML frontmatter) နှင့် မည်သည့်အချိန်တွင် Script များကို Run မည်၊ မည်သည့် reference စည်းမျဉ်းများကို ကြည့်မည်ကို အသေးစိတ် ညွှန်ကြားပေးရပါသည်။',
    code: `---
name: docker-compose-guard
description: Audits Docker Compose files for security flaws, runs linter scripts, and scaffolds secure boilerplate templates.
---

# Instructions
When triggered:
1. Run \`scripts/lint_compose.py\` on user YAML.
2. Cross-examine with \`references/security_rules.md\`.
3. Use \`assets/secure-compose-template.yml\` for templates.`,
    doText: 'Keep YAML frontmatter short with clear keywords for the router.',
    dontText: 'Do not dump entire 50-page manuals directly into SKILL.md. Move them to references/!'
  },
  assets: {
    key: 'assets',
    title: 'assets/',
    icon: '📦',
    tagline: 'Starter Templates, Boilerplates & Static Files (ပုံစံကြမ်း နမူနာဖိုင်များ)',
    badge: 'Optional (စိတ်ကြိုက်ထည့်နိုင်သည်)',
    badgeClass: 'bg-amber-950/80 border border-amber-800 text-amber-300',
    descEn: 'Holds boilerplate templates, starter schemas, boilerplate configurations, or logos that Gemini will actively clone, modify, and present directly to the user as final output.',
    descMy: 'အသုံးပြုသူထံ အသစ်ဖန်တီးပေးရန် လိုအပ်သော Template ပုံစံကြမ်းများ (ဥပမာ- Docker Compose template, JSON boilerplate, Form စာရွက်စာတမ်းကြမ်းများ) ထည့်သွင်းထားရသည့် ဖိုဒါဖြစ်ပါသည်။',
    code: `# assets/secure-compose-template.yml
version: '3.8'

services:
  app:
    image: alpine:3.19
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true`,
    doText: 'Use clean, production-ready boilerplates with comments marking customizable fields.',
    dontText: 'Do not store active execution scripts here; put scripts strictly inside scripts/.'
  },
  references: {
    key: 'references',
    title: 'references/',
    icon: '📚',
    tagline: 'Domain Knowledge, Rules & Style Guides (စည်းမျဉ်း လမ်းညွှန်ဖိုင်များ)',
    badge: 'Optional (သုတလမ်းညွှန်)',
    badgeClass: 'bg-emerald-950/80 border border-emerald-800 text-emerald-300',
    descEn: 'Reference manuals, policy documents, and style guides that Gemini queries on demand. Spark only reads these when relevant, preserving your prompt token budget.',
    descMy: 'Gemini အသုံးပြုမည့် စည်းကမ်းချက်များ၊ ဥပဒေ/မူဝါဒများ၊ ကုမ္ပဏီ Styleguide များကို စုစည်းထားသော နေရာဖြစ်ပါသည်။ အသုံးပြုသူ၏ မေးခွန်းနှင့် သက်ဆိုင်သည့်အခါမှသာ Gemini က လှမ်းဖတ်ပါသည်။',
    code: `# references/security_rules.md

# Critical Security Guidelines
1. Container root privileges must be restricted.
2. Port 5432, 3306, 6379 must never bind to 0.0.0.0.
3. Images must use pinned versions instead of ':latest'.`,
    doText: 'Format files cleanly with Markdown headings and bullet points for instant vector search.',
    dontText: 'Do not copy-paste raw unformatted binary files if possible.'
  },
  scripts: {
    key: 'scripts',
    title: 'scripts/',
    icon: '⚡',
    tagline: 'Deterministic Local Tools (အလိုအလျောက် Run မည့် ကုဒ်ဖိုင်များ)',
    badge: 'Optional (Tool Automation)',
    badgeClass: 'bg-purple-950/80 border border-purple-800 text-purple-300',
    descEn: 'Standalone Python or Bash scripts that Gemini executes in a secure sandbox to perform calculations, deterministic schema validation, or text linting without AI hallucination.',
    descMy: 'Gemini က တိုက်ရိုက် run နိုင်သော Python သို့မဟုတ် Shell script များ ဖြစ်ပါသည်။ ဥပမာ- ဖိုင်အမှားစစ်ဆေးပေးခြင်း၊ ကိန်းဂဏန်းတွက်ချက်ခြင်းများကို တိကျသေချာစွာ လုပ်ဆောင်ပေးပါသည်။',
    code: `#!/usr/bin/env python3
# scripts/lint_compose.py
import sys
print("Checking file: " + sys.argv[1] if len(sys.argv) > 1 else "PASS: No critical flaws.")`,
    doText: 'Accept file paths as command line arguments (sys.argv) and return clean stdout.',
    dontText: 'Do not write scripts that require interactive UI prompts or long-running daemons.'
  }
};
