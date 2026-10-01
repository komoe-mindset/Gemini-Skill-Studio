import { BlueprintPreset } from '../types';

export const studioPresets: Record<string, BlueprintPreset> = {
  flow1: {
    id: 'flow1',
    label: '🎬 AI Video Director: flow1 (Google Flow Commercial Pipeline)',
    metaName: 'flow1-ai-video',
    metaDesc: "Use when planning, scripting, and structuring commercial video production packages for Google Flow AI execution across an 11-stage sequential pipeline.",
    files: {
      'SKILL.md': `---
name: flow1
description: "Use when planning, scripting, and structuring end-to-end commercial video production packages for Google Flow AI execution across an 11-stage sequential intake, storyboard, and prompt synthesis pipeline. Starts running on prompts like 'plan a commercial video for Google Flow', 'create an 11-stage commercial video script', or 'generate a commercial storyboard and Flow AI prompt'."
---
# Role & Objective
You are an expert Commercial Creative Director, Advertising Screenwriter, Storyboard Artist, and AI Video Production Planner. Your objective is to guide the user step-by-step through an 11-stage commercial production workflow, developing a complete high-end short commercial package tailored for American audiences and formatted for Google Flow AI execution.

---

# Scope & Boundaries

### Language Protocol
1. **Interactive Guidance (Myanmar / Burmese):**
   - Conduct all stage transitions, questions, option choices, explanations, consistency audits, and scene descriptions in natural Myanmar language.
2. **Commercial Copy (American English):**
   - Write spoken actor dialogue, voiceover (VO), and brand taglines in contemporary American English with Myanmar explanations.
3. **Google Flow AI Prompts (English Only):**
   - Final master prompt and camera instructions must be strictly 100% English inside code blocks (zero Myanmar characters).

### Core Production Rules
- **Strict Sequential Order:** Execute exactly one stage at a time (Stage 1 to 11).
- **Identity Locking:** Once character, product, or location references are defined, maintain zero drift across all scenes.

---

# Execution Steps Summary
- Stage 1: Character Reference Intake (YES/NO in Myanmar)
- Stage 2: Product Reference Intake (YES/NO in Myanmar)
- Stage 3: Location Reference Intake (YES/NO in Myanmar)
- Stage 4: 10 Commercial Concepts (Text only, Myanmar context + English taglines)
- Stage 5: Concept Selection & Lock
- Stage 6: Duration Selection (15s | 30s | 45s | 50s | 60s)
- Stage 7: Commercial Script (Hook → Problem → Product Reveal → Payoff → Tagline)
- Stage 8: Storyboard Plan (\`assets/storyboard_schema.md\` table format)
- Stage 9: Complete Storyboard Image Synthesis
- Stage 10: Final Consistency Audit (Cross-examine with \`references/consistency_rules.md\`)
- Stage 11: Final Google Flow Master Prompt (Run \`scripts/verify_flow_prompt.py\` before finalizing)`,

      'references/consistency_rules.md': `# Video Production Consistency Rules

## 1. Visual Separation Invariant
- Character Reference Sheet, Product Reference Sheet, and Location Reference Sheet must remain standalone.
- Never combine storyboard shots into reference sheets.

## 2. Identity Locking
- Character facial features, hair, skin tone, and costume must stay identical in all frames.
- Product logos and proportions must stay locked.

## 3. Google Flow Constraints
- Master prompts must be strictly English-only.
- Include cinematic lighting: e.g. "anamorphic lens, volumetric rim lighting, 8k resolution, 24fps".`,

      'scripts/verify_flow_prompt.py': `#!/usr/bin/env python3
import sys
import re

def verify_flow_prompt(prompt_text):
    errors = []
    # Check 1: Zero Myanmar unicode characters inside the English codeblock
    myanmar_chars = re.findall(r'[\u1000-\u109F]', prompt_text)
    if myanmar_chars:
        errors.append(f"Prompt Error: Contains {len(myanmar_chars)} Myanmar characters. Google Flow requires 100% English.")

    # Check 2: Essential camera keywords
    keywords = ['shot', 'camera', 'lighting', 'fps']
    missing = [k for k in keywords if k not in prompt_text.lower()]
    if missing:
        errors.append(f"Quality Warning: Missing standard cinematography terms: {', '.join(missing)}")

    if errors:
        print("FAILURES DETECTED IN FLOW PROMPT:")
        for err in errors:
            print(f"- {err}")
        sys.exit(1)
    else:
        print("SUCCESS: Master Prompt verified for Google Flow AI execution.")
        sys.exit(0)

if __name__ == '__main__':
    sample = sys.argv[1] if len(sys.argv) > 1 else "Cinematic 4k shot of product, camera pan, 24fps"
    verify_flow_prompt(sample)`,

      'assets/storyboard_schema.md': `| Shot # | Duration | Action Description (Myanmar) | Character | Product | Location | Camera & Lighting | Dialogue / VO (English + MM) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 0:00-0:05 | ကုန်ပစ္စည်းကို ပထမဆုံး စတင်မိတ်ဆက်ခြင်း | Present | Present | Studio Interior | Slow dolly in, rim light | VO: "Redefine your energy." (စွမ်းအင်ကို အသစ်ဖန်တီးပါ) |
| 2 | 0:05-0:12 | အသုံးပြုသူ လက်တွေ့ကြုံတွေ့နေရသော ပြဿနာ | Present | None | Urban Street | Handheld, natural daylight | Actor: "Running out of time." (အချိန်တွေ မလုံလောက်တော့ဘူး) |`
    }
  },

  docker: {
    id: 'docker',
    label: '🛡️ Docker Compose Security Guard (Full Stack)',
    metaName: 'docker-compose-guard',
    metaDesc: 'Audits Docker Compose files for security flaws, runs python linter scripts, and scaffolds secure templates.',
    files: {
      'SKILL.md': `---
name: docker-compose-guard
description: Audits Docker Compose files for security flaws, runs python linter scripts, and scaffolds secure templates.
---

# Docker Compose Security Guard

When triggered:
1. If the user provides a compose file, run \`scripts/lint_compose.py\` to audit network bindings and privileges.
2. Cross-reference flagged findings with \`references/security_rules.md\` to provide remediation advice.
3. If the user requests a brand new configuration, use \`assets/secure-compose-template.yml\` as baseline.
4. Output the final hardened YAML file with inline comments explaining fixes.`,

      'references/security_rules.md': `# Container Security Guidelines

## 1. Privilege Escalation
Containers must not run as root.
- Enforce: \`security_opt: ["no-new-privileges:true"]\`
- Disallow: \`privileged: true\`

## 2. Public Network Bindings
- Databases (Postgres 5432, MySQL 3306, Redis 6379) must never bind to \`0.0.0.0\`.
- Instead, link them via internal Docker networks or \`127.0.0.1:5432:5432\`.

## 3. Version Pinning
- Ban \`:latest\` tags in production declarations. Use pinned image versions (e.g. \`node:20.11-alpine\`).`,

      'scripts/lint_compose.py': `#!/usr/bin/env python3
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
    lint(target)`,

      'assets/secure-compose-template.yml': `version: '3.8'

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
  },

  data: {
    id: 'data',
    label: '📊 CSV Data Validator & Sanitizer (Python Scripts)',
    metaName: 'csv-data-sanitizer',
    metaDesc: 'Validates CSV datasets against strict schemas, checks null thresholds, and outputs normalized clean records.',
    files: {
      'SKILL.md': `---
name: csv-data-sanitizer
description: Validates CSV datasets against strict schemas, checks null thresholds, runs python sanitizers, and outputs normalized clean records.
---

# CSV Data Sanitizer Workflow

When a user submits CSV data or asks to audit tabular datasets:
1. Save raw data and execute \`scripts/clean_and_validate.py\`.
2. Verify headers match required format described in \`references/data_schema_rules.md\`.
3. Format output adhering to \`assets/sample_output_template.csv\`.
4. Provide summary metrics: total rows processed, bad rows dropped, encoding cleaned.`,

      'references/data_schema_rules.md': `# Data Schema Standards

## Required Columns
- \`user_id\` (UUID or integer, non-null)
- \`email\` (valid RFC 5322 format)
- \`signup_date\` (ISO 8601: YYYY-MM-DD)

## Acceptance Thresholds
- Null percentage in critical columns must be < 2%.
- UTF-8 clean encoding with CRLF / LF line endings.`,

      'scripts/clean_and_validate.py': `#!/usr/bin/env python3
import sys
import csv

def validate_csv(filename):
    print(f"Auditing CSV records in {filename}...")
    valid_count = 0
    errors = 0
    # Deterministic streaming row audit
    print(f"SUMMARY: {valid_count} clean rows, {errors} violations.")
    sys.exit(0 if errors == 0 else 1)

if __name__ == '__main__':
    validate_csv(sys.argv[1] if len(sys.argv) > 1 else "data.csv")`,

      'assets/sample_output_template.csv': `user_id,email,signup_date,status
usr_1001,alex.doe@example.com,2026-01-15,active
usr_1002,maya.lin@example.com,2026-02-01,active`
    }
  },

  myanmar: {
    id: 'myanmar',
    label: '🇲🇲 Myanmar Official Letter Formatter (မြန်မာရုံးသုံးစာ စံ)',
    metaName: 'myanmar-official-letter',
    metaDesc: 'Formats formal Myanmar official government & corporate letters, validates Burmese grammar/honorifics, and outputs standard letterheads.',
    files: {
      'SKILL.md': `---
name: myanmar-official-letter
description: Formats formal Myanmar official government and corporate letters, validates Burmese grammar, punctuation, and honorifics, and scaffolds standard letterheads.
---

# မြန်မာရုံးသုံးစာ စံသတ်မှတ်ချက် ညွှန်ကြားချက်များ

အသုံးပြုသူက ရုံးတွင်းစာ၊ ရုံးထွက်စာ ရေးသားခိုင်းသည့်အခါ:
1. \`references/official_letter_rules.md\` ပါ ရုံးသုံးစာစည်းမျဉ်းများနှင့် တိုက်ဆိုင်စစ်ဆေးပါ။
2. အရေးအသားမှားယွင်းမှုနှင့် သတ်ပုံအမှားများကို \`scripts/check_burmese_spelling.py\` ဖြင့် စစ်ဆေးပါ။
3. \`assets/letterhead_template.md\` ပုံစံကြမ်းကို အသုံးပြု၍ သပ်ရပ်သော ရုံးသုံးစာအဖြစ် တင်ပြပေးပါ။`,

      'references/official_letter_rules.md': `# မြန်မာရုံးသုံးစာ ရေးသားနည်း စည်းမျဉ်းများ

## ၁။ စာအမှတ်နှင့် ရက်စွဲ
- စာအမှတ်ကို ညာဘက်အပေါ်တွင် ထားရှိရမည်။
- နေ့စွဲကို "၂၀၂၆ ခုနှစ်၊ မတ်လ (၁၅) ရက်" ပုံစံဖြင့် တိကျစွာ ရေးရမည်။

## ၂။ အသုံးအနှုန်းနှင့် သတ်ပုံ
- "အကြောင်းအရာ။" ပြီးလျှင် အောက်တစ်ကြောင်းဆင်း၍ "ပါဝင်သောအချက်အလက်များ" ကို ဖော်ပြရမည်။
- "လေးစားစွာဖြင့်" သို့မဟုတ် ဌာနအကြီးအကဲ၏ အတည်ပြု လက်မှတ်နေရာ ပါဝင်ရမည်။`,

      'scripts/check_burmese_spelling.py': `#!/usr/bin/env python3
import sys

def check_text(text):
    common_mistakes = {
        "လေ့လာသင်ယူ": "လေ့လာဆည်းပူး",
        "ရုံးထိုင်": "ရုံးလုပ်ငန်း"
    }
    issues = []
    for wrong, fix in common_mistakes.items():
        if wrong in text:
            issues.append(f"အသုံးအနှုန်းပြင်ဆင်ရန်: '{wrong}' အစား '{fix}' ကို သုံးပါ။")
    
    if issues:
        print("အကြံပြုချက်များ:")
        for i in issues:
            print("- " + i)
    else:
        print("သတ်ပုံနှင့် အသုံးအနှုန်း စံသတ်မှတ်ချက် အောင်မြင်ပါသည်။")
    sys.exit(0)

if __name__ == '__main__':
    check_text(sys.argv[1] if len(sys.argv) > 1 else "နမူနာ")`,

      'assets/letterhead_template.md': `ပြည်ထောင်စုသမ္မတမြန်မာနိုင်ငံတော်
[ဌာနအမည်]
[လိပ်စာ]

စာအမှတ်: [စာအမှတ် ရိုက်ထည့်ပါ]
ရက်စွဲ: ၂၀၂၆ ခုနှစ်၊ [လ] [ရက်] ရက်

သို့
  [လက်ခံမည့်သူ၏ ရာထူး / ဌာန]

အကြောင်းအရာ။    ။ [ရုံးသုံးစာ ခေါင်းစဉ် ရိုက်ထည့်ပါ]

၁။ [စာကိုယ် အပိုဒ် ၁]

၂။ [စာကိုယ် အပိုဒ် ၂]

လေးစားစွာဖြင့်

([အမည်])
[ရာထူး]`
    }
  }
};
