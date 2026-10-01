import { AgentLoopStep } from '../types';

export const agentLoopStepsData: Record<number, AgentLoopStep> = {
  1: {
    step: 1,
    num: 'STEP 01',
    titleEn: 'Goal (Defining the Commercial Video Finish Line)',
    titleMy: 'ပန်းတိုင် (ဗီဒီယိုကြော်ငြာ ပန်းတိုင်သတ်မှတ်ခြင်း)',
    questionEn: 'What do I want to achieve?',
    questionMy: 'ငါ မည်သည့်ရလဒ်ကို ပြီးမြောက်အောင် လုပ်ရမည်နည်း?',
    simpleEn: 'Define the finish line.',
    simpleMy: 'ပြီးမြောက်ရမည့် ပန်းတိုင်ကို တိကျစွာ သတ်မှတ်ခြင်း။',
    mapping: 'Gemini Skill File: SKILL.md (YAML Frontmatter description:)',
    badge: 'Router & Intent Detection',
    badgeClass: 'bg-cyan-950/80 border-cyan-800 text-cyan-300',
    icon: '🎯',
    descEn: 'The agent identifies the goal: plan an 11-stage commercial video for Google Flow. The YAML frontmatter in SKILL.md registers triggers ("plan a commercial video", "generate Flow AI prompt") and activates the production pipeline.',
    descMy: 'အေဂျင့်က မိမိလုပ်ဆောင်ရမည့် ပန်းတိုင်ကို သတ်မှတ်သည်။ SKILL.md အပေါ်ဆုံးရှိ YAML description သည် "Google Flow အတွက် စီးပွားဖြစ် ဗီဒီယိုကြော်ငြာ ဇာတ်ညွှန်းနှင့် prompt ရေးပေးပါ" ဟု အသုံးပြုသူ မေးမြန်းလိုက်သည်နှင့် ဤ Skill ကို ချက်ချင်း စတင်ခေါ်ယူပေးပါသည်။',
    filename: 'SKILL.md (YAML Frontmatter)',
    code: `---
name: flow1
description: "Use when planning, scripting, and structuring commercial video production packages for Google Flow AI execution across an 11-stage sequential pipeline."
---`,
    tipTitle: 'Video Goal Pro Tip:',
    tipDesc: 'Specify clear trigger verbs such as "commercial video", "storyboard synthesis", and target AI engine ("Google Flow").'
  },
  2: {
    step: 2,
    num: 'STEP 02',
    titleEn: 'Think (Checking Visual Rules & Reference Constraints)',
    titleMy: 'စဉ်းစားခြင်း (စည်းမျဉ်း၊ မူဝါဒနှင့် ကန့်သတ်ချက်များ စစ်ဆေးခြင်း)',
    questionEn: 'What info do I have or need?',
    questionMy: 'ငါ့မှာ ဘာအချက်အလက်တွေ ရှိပြီး ဘာတွေ လိုအပ်သေးသလဲ?',
    simpleEn: 'Check time, topic, rules, and missing info.',
    simpleMy: 'စည်းမျဉ်း၊ သတင်းအချက်အလက်နှင့် လိုအပ်ချက်များကို စစ်ဆေးခြင်း။',
    mapping: 'Gemini Skill File: references/ (e.g. references/consistency_rules.md)',
    badge: 'On-Demand Knowledge Base',
    badgeClass: 'bg-emerald-950/80 border-emerald-800 text-emerald-300',
    icon: '🧠',
    descEn: 'The agent checks rules: Character identity must stay locked, visual sheets must remain separate, user conversation must be in Myanmar, and Google Flow master prompts must be 100% English. It pulls these from references/ without wasting tokens.',
    descMy: 'မည်သည့်စည်းကမ်းများကို လိုက်နာရမည်ကို စဉ်းစားသည်။ references/ ထဲရှိ ဖိုင်များကို ဖတ်ရှုပြီး Character နှင့် Product ပုံစံများ အခန်းတိုင်းတွင် တူညီစေရန် (Identity Locking) နှင့် Prompt ထဲတွင် မြန်မာစာမပါဘဲ English ဖြင့်သာ ရေးရမည့် စည်းမျဉ်းများကို သတိပြုမှတ်သားသည်။',
    filename: 'references/consistency_rules.md',
    code: `# Video Production Constraints
1. Identity Locking: Character facial features and costume must stay identical in all shots.
2. Language: Guidance in Myanmar; Flow master prompt strictly in English.
3. Animals never speak human dialogue.`,
    tipTitle: 'Knowledge Layering:',
    tipDesc: 'Keep camera lens standards, aspect ratios, and lighting vocabulary inside references/ so the agent produces cinema-grade prompts.'
  },
  3: {
    step: 3,
    num: 'STEP 03',
    titleEn: 'Plan (Structuring the 11-Stage Video Pipeline)',
    titleMy: 'စီစဉ်ခြင်း (အဆင့် ၁၁ ဆင့်ပါ လုပ်ငန်းစဉ် ဖွဲ့စည်းခြင်း)',
    questionEn: 'What small steps should happen?',
    questionMy: 'မည်သည့် အဆင့်ငယ်များအတိုင်း လုပ်ဆောင်ရမည်နည်း?',
    simpleEn: 'Turn one big goal into an ordered checklist.',
    simpleMy: 'ပန်းတိုင်ကြီးတစ်ခုလုံးကို စနစ်တကျ အဆင့်လိုက် ခွဲခြမ်းခြင်း။',
    mapping: 'Gemini Skill File: SKILL.md (Body Execution Steps)',
    badge: 'Workflow Orchestration',
    badgeClass: 'bg-cyan-950/80 border-cyan-800 text-cyan-300',
    icon: '🗺️',
    descEn: 'The agent maps out the sequential checklist: Stage 1 (Character) → Stage 2 (Product) → Stage 3 (Location) → Stage 4 (10 Concepts) → Stage 7 (Script) → Stage 8 (Storyboard) → Stage 11 (Google Flow Master Prompt).',
    descMy: 'ကြီးမားသော ဗီဒီယိုဖန်တီးမှုကို အဆင့်လိုက် စီစဉ်သည်။ SKILL.md ၏ စာကိုယ်တွင် ညွှန်ကြားထားသည့်အတိုင်း အဆင့် ၁ မှ အဆင့် ၁၁ အထိ တစ်ဆင့်ပြီးမှ တစ်ဆင့် (Strict Sequential Order) အတိုင်း မေးခွန်းထုတ်ပြီး ရှေ့ဆက်ရန် စီမံသည်။',
    filename: 'SKILL.md (Stage Breakdown)',
    code: `# Execution Plan
Stage 1: Character Intake (Ask in Myanmar)
Stage 2: Product Intake
Stage 3: Location Intake
Stage 4: 10 Concepts -> Stage 5: Lock Concept
Stage 6: Duration -> Stage 7: Script -> Stage 8: Storyboard Table
Stage 10: Consistency Audit -> Stage 11: Flow Master Prompt`,
    tipTitle: 'Sequential Enforcing:',
    tipDesc: 'Include the rule: "Never advance to subsequent stages until current stage is confirmed by user" to prevent skipped steps.'
  },
  4: {
    step: 4,
    num: 'STEP 04',
    titleEn: 'Take Action (Executing Scripts & Generating Storyboards)',
    titleMy: 'လုပ်ဆောင်ခြင်း (ဇယားထုတ်ပေးခြင်းနှင့် Script စစ်ဆေးခြင်း)',
    questionEn: 'Do the next planned step.',
    questionMy: 'စီစဉ်ထားသော အဆင့်ကို လက်တွေ့ စတင်လုပ်ဆောင်ပါ။',
    simpleEn: 'Use AI, a file, a tool, or ask a person.',
    simpleMy: 'Python script run ခြင်း၊ Template ဖိုင် ယူသုံးခြင်း။',
    mapping: 'Gemini Skill Files: assets/ (Storyboard Table) & scripts/ (Linter)',
    badge: 'Tool Execution & Sandboxing',
    badgeClass: 'bg-purple-950/80 border-purple-800 text-purple-300',
    icon: '⚡',
    descEn: 'The agent takes action: it loads the Markdown table schema from assets/storyboard_schema.md to render shot timings, and runs scripts/verify_flow_prompt.py to audit prompt formatting.',
    descMy: 'လက်တွေ့ လုပ်ဆောင်သည့်အဆင့် ဖြစ်သည်။ assets/ ထဲမှ ဇယားပုံစံကြမ်းကို ယူ၍ အခန်း ၈ ခန်းပါ Storyboard ဇယားကို ဖြည့်သွင်းပေးပြီး scripts/verify_flow_prompt.py ဖြင့် ရေးထားသော prompt ကို စစ်ဆေး run စေပါသည်။',
    filename: 'scripts/verify_flow_prompt.py',
    code: `#!/usr/bin/env python3
# Scans master prompt to ensure zero Burmese chars & cinematic camera tags
verify_flow_prompt(master_prompt_text)`,
    tipTitle: 'Asset Reusability:',
    tipDesc: 'Put production schemas (tables, shot cards, lighting templates) in assets/ so Gemini never outputs poorly formatted tables.'
  },
  5: {
    step: 5,
    num: 'STEP 05',
    titleEn: 'Observe (Inspecting Tool Output & Script Exit Codes)',
    titleMy: 'စောင့်ကြည့်ခြင်း (Script စစ်ဆေးချက် ရလဒ်အစစ်ကို ဖတ်ရှုခြင်း)',
    questionEn: 'What happened after the action?',
    questionMy: 'လက်တွေ့လုပ်ဆောင်ပြီးနောက် ဘာတွေ ထွက်ပေါ်လာသလဲ?',
    simpleEn: 'Look at real result, not what you hoped.',
    simpleMy: 'ထင်မြင်ချက်မဟုတ်ဘဲ လက်တွေ့ထွက်လာသော ရလဒ်အစစ်ကို ကြည့်ခြင်း။',
    mapping: 'Sandbox Runtime stdout, stderr, and exit codes',
    badge: 'Environment Feedback',
    badgeClass: 'bg-sky-950/80 border-sky-800 text-sky-300',
    icon: '👀',
    descEn: 'The agent reviews the Python script output from the sandbox: Did the prompt contain accidental Myanmar characters? Are all camera tags present? Did the storyboard total 30 seconds as requested?',
    descMy: 'လုပ်ဆောင်ချက်ပြီးနောက် ထွက်လာသော ရလဒ်အစစ်ကို စောင့်ကြည့်သည်။ Python script စစ်ဆေးချက်မှ "FAIL: Contains Burmese text inside codeblock" သို့မဟုတ် "PASS: 0 errors" စသည့် output နှင့် စက္ကန့် ၃၀ ပြည့်မပြည့် စစ်ဆေးဖတ်ရှုသည်။',
    filename: 'Sandbox Output (stdout)',
    code: `[EXECUTION RESULT]: scripts/verify_flow_prompt.py
OUTPUT:
- SUCCESS: Master prompt is 100% English.
- Shot count: 8 shots. Total duration: 30 seconds.
[EXIT CODE: 0 (SUCCESS)]`,
    tipTitle: 'Verification Signal:',
    tipDesc: 'Scripts act as deterministic quality control, preventing foreign character syntax errors in video generation tools.'
  },
  6: {
    step: 6,
    num: 'STEP 06',
    titleEn: 'Evaluate (Stage 10: Consistency Audit)',
    titleMy: 'အကဲဖြတ်ခြင်း (Stage 10: အချက်အလက်များ တူညီမှု စစ်ဆေးခြင်း)',
    questionEn: 'Is result good enough for goal?',
    questionMy: 'ထွက်လာသော ရလဒ်သည် ပန်းတိုင်အတွက် လုံလောက်ပြီလား?',
    simpleEn: 'Compare result with score, rule, or success test.',
    simpleMy: 'စည်းမျဉ်းစည်းကမ်းများနှင့် ပြန်လည် တိုက်ဆိုင်စစ်ဆေးခြင်း။',
    mapping: 'Gemini Skill File: references/consistency_rules.md',
    badge: 'Validation & Quality Gate',
    badgeClass: 'bg-emerald-950/80 border-emerald-800 text-emerald-300',
    icon: '📊',
    descEn: 'Stage 10 audit: The agent evaluates whether the character appearance in Shot 8 matches Shot 1, verifies the product branding placement, and ensures the script matches the selected US concept.',
    descMy: 'စံနှုန်းနှင့် ကိုက်မကိုက် အကဲဖြတ်သည်။ Stage 10 တွင် အခန်း ၁ မှ အခန်း ၈ အထိ ဇာတ်ကောင် အဝတ်အစား၊ မျက်နှာသွင်ပြင်နှင့် ကုန်ပစ္စည်းပုံစံများ ပြောင်းလဲသွေဖည်သွားခြင်း (Drift) ရှိ/မရှိ ပြန်လည်စစ်ဆေး အတည်ပြုသည်။',
    filename: 'Evaluation Logic (Stage 10 Audit)',
    code: `Consistency Audit Report:
1. Character Identity: LOCKED (No drift from Stage 1).
2. Product Branding: LOCKED (Matches Stage 2).
3. Script Continuity: Verified 30-second pacing.
Result: Passed quality inspection.`,
    tipTitle: 'Audit Checklists:',
    tipDesc: 'Instruct the skill to provide an explicit 5-point audit report before delivering the final video prompt.'
  },
  7: {
    step: 7,
    num: 'STEP 07',
    titleEn: 'Continue (Self-Correction & Refinement Loop)',
    titleMy: 'ဆက်လက်ပြုပြင်ခြင်း (လိုအပ်ပါက ပြင်ဆင်ပြီး အစီအစဉ် ပြန်လည်မွမ်းမံခြင်း)',
    questionEn: 'If not good enough, improve & retry.',
    questionMy: 'မလုံလောက်သေးပါက မည်သို့ ထပ်မံပြင်ဆင်ရမည်နည်း?',
    simpleEn: 'Change the plan using what you learned.',
    simpleMy: 'သိရှိလာသော အမှားများအပေါ် အခြေခံ၍ အစီအစဉ် ပြန်ဆွဲခြင်း။',
    mapping: 'Agent Loopback -> Stage 8 / 9 (Re-script / Re-prompt)',
    badge: 'Self-Correction Loop',
    badgeClass: 'bg-blue-950/80 border-blue-800 text-blue-300',
    icon: '🔄',
    descEn: 'If the user requests changes (e.g. "make Shot 3 more energetic", or script length is too long), the agent loops back, updates the storyboard table from assets/, and re-verifies prompt constraints.',
    descMy: 'အကယ်၍ အသုံးပြုသူက "အခန်း ၃ ကို ပိုသွက်လက်အောင် ပြင်ပေးပါ" ဟု ပြင်ဆင်ခိုင်းပါက လက်မလျှော့ဘဲ ဇယားကို ပြန်လည်ပြင်ဆင်ပြီး Stage 8 သို့ ပြန်လည်လည်ပတ်ကာ စစ်ဆေးမှု ထပ်မံလုပ်ဆောင်ပါသည်။',
    filename: 'Self-Correction Execution',
    code: `Agent Loopback Action:
- Updating Shot 3: Switching to drone aerial shot.
- Re-calculating pacing to maintain exactly 30s.
- Re-generating Flow prompt segment...`,
    tipTitle: 'Iterative Feedback:',
    tipDesc: 'Make sure your prompt allows single-shot adjustments without regenerating the entire 11-stage pipeline from scratch.'
  },
  8: {
    step: 8,
    num: 'STEP 08',
    titleEn: 'Stop (Delivering Final Google Flow Master Prompt)',
    titleMy: 'ရပ်တန့်ခြင်း (အသင့်သုံး Google Flow Master Prompt ထုတ်ပေးခြင်း)',
    questionEn: 'Stop when goal is reached or human needed.',
    questionMy: 'ပန်းတိုင်ရောက်သည့်အခါ သို့မဟုတ် လူကိုယ်တိုင် လိုအပ်သည့်အခါ ရပ်ပါ။',
    simpleEn: 'Success reached, time limit, risk, or approval.',
    simpleMy: 'အောင်မြင်စွာ ပြီးမြောက်ခြင်း သို့မဟုတ် ခွင့်ပြုချက်တောင်းခံခြင်း။',
    mapping: 'User Output & Stage 11 Master Code Block',
    badge: 'Goal Completion & Delivery',
    badgeClass: 'bg-rose-950/80 border-rose-800 text-rose-300',
    icon: '🛑',
    descEn: 'The agent finishes Stage 11: It outputs clear guidance in Myanmar followed by a single, comprehensive English-only code block ready to be pasted directly into Google Flow AI.',
    descMy: 'ပန်းတိုင် အောင်မြင်စွာ ပြီးဆုံးသွားသည်။ Stage 11 အရ မြန်မာလို အသုံးပြုနည်း လမ်းညွှန်ပေးပြီး Google Flow ထဲသို့ တိုက်ရိုက် Paste လုပ်ရုံဖြင့် ဗီဒီယိုထုတ်နိုင်မည့် English Master Prompt ကုဒ်ဘလောက်ကို တင်ပြပေးပါသည်။',
    filename: 'Stage 11: Final Master Prompt Block',
    code: `\`\`\`text
[GOOGLE FLOW MASTER PROMPT]
Cinematic 30s commercial: Dynamic tracking shot, 35mm lens, golden hour rim light.
Sequence 01: Character unboxes energy drink (0:00-0:05)...
Sequence 02: High-speed athlete sprint, 120fps slow-motion...
Rendering specs: 4K resolution, 24fps, cinematic aspect 16:9.
\`\`\``,
    tipTitle: 'Clear Hand-off:',
    tipDesc: 'Always format the final generation prompt inside an isolated code block so users can copy it with one click.'
  }
};

export const simulationSteps = [
  { step: 1, text: '🎯 [01 GOAL]: Reading SKILL.md frontmatter... User prompt: "Create a 30s commercial video for Google Flow". Skill flow1 activated!' },
  { step: 2, text: '🧠 [02 THINK]: Loading references/consistency_rules.md. Invariant locked: Character zero-drift & 100% English prompt for Flow.' },
  { step: 3, text: '🗺️ [03 PLAN]: Structuring 11-stage pipeline: Character intake -> Product intake -> 10 Concepts -> Script -> Storyboard.' },
  { step: 4, text: '⚡ [04 ACTION]: Prompting user in Myanmar: "အသုံးပြုချင်သော Character ပုံ ရှိပါသလား?". Loading assets/storyboard_schema.md...' },
  { step: 5, text: '👀 [05 OBSERVE]: User selected Concept #3 (Cinematic Tech). Generated 8-shot storyboard table. Pacing total: 30.0s.' },
  { step: 6, text: '📊 [06 EVALUATE]: Running Stage 10 audit: Character & Product zero-drift verified. Executing scripts/verify_flow_prompt.py...' },
  { step: 7, text: '🔄 [07 CONTINUE]: Python tool output: 0 errors. Zero Burmese characters in codeblock. Camera specs verified (35mm anamorphic, 24fps).' },
  { step: 8, text: '🛑 [08 STOP]: Stage 11 reached! Delivering complete Google Flow Master Prompt code block to user.' }
];
