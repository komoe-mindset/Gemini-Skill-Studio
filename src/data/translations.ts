import { Language } from '../types';

export interface Translations {
  exportZipBtn: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  p1Badge: string;
  p1Summary: string;
  p2Badge: string;
  p2Summary: string;
  p3Badge: string;
  p3Summary: string;
  p4Badge: string;
  p4Summary: string;
  tabStudio: string;
  tabAgentLoop: string;
  tabManual: string;
  tabExplorer: string;
  tabPackaging: string;
  agentLoopBadge: string;
  agentLoopTitle: string;
  agentLoopSubtitle: string;
  simBtn: string;
  simRunning: string;
  loopGridHeader: string;
  blueprintLabel: string;
  clearReset: string;
  virtualFilesTitle: string;
  skillSlugLabel: string;
  skillDescLabel: string;
  preflightTitle: string;
  editorSaveNote: string;
  downloadZipBtn: string;
  manualHeaderTitle: string;
  manualHeaderSub: string;
  explorerTreeTitle: string;
  optionalRule: string;
  optionalRuleText: string;
  osManualTitle: string;
  osManualSub: string;
  wrongZipTitle: string;
  wrongZipDesc: string;
  correctZipTitle: string;
  correctZipDesc: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    exportZipBtn: 'Export .ZIP',
    heroBadge: 'Agent Skills Complete Developer Specification & Generator',
    heroTitle: 'Build & Package Gemini Spark Skills Like a Pro',
    heroDescription: 'Learn the exact folder schema, follow line-by-line file manuals, edit files inside the live studio, and download validated ZIP packages ready for Gemini Spark import.',
    p1Badge: 'Must Have',
    p1Summary: 'Router & brain. Contains YAML triggers & steps directing files.',
    p2Badge: 'Boilerplates',
    p2Summary: 'Static boilerplates, clean templates copied into final user responses.',
    p3Badge: 'Knowledge',
    p3Summary: 'Guides, policies, and API specs read by Gemini on-demand.',
    p4Badge: 'Executables',
    p4Summary: 'Deterministic Python or shell tools executed in isolated sandbox.',
    tabStudio: 'Skill Studio & Multi-File ZIP Builder',
    tabAgentLoop: 'The 8-Agent Loop & Skill Mapping',
    tabManual: 'File-by-File Content Manual',
    tabExplorer: 'Directory Structure & Inspector',
    tabPackaging: 'OS Zip Guides & Common Pitfalls',
    agentLoopBadge: 'Agentic Architecture • Execution Loop',
    agentLoopTitle: 'The Agent Loop & Gemini Skill Structure',
    agentLoopSubtitle: 'An AI agent is an iterative loop, not just a single prompt. When you build a Gemini Spark Skill, your files give the agent tools and memory for each stage of this loop.',
    simBtn: 'Simulate Full Agent Loop',
    simRunning: 'Simulation Running...',
    loopGridHeader: 'Click any step to inspect file linkage & Burmese meaning',
    blueprintLabel: 'Select Blueprint:',
    clearReset: '✨ Start Empty',
    virtualFilesTitle: 'Workspace Files',
    skillSlugLabel: 'Skill Name (Zip package name)',
    skillDescLabel: 'Trigger Prompt (Router description in SKILL.md)',
    preflightTitle: 'Live Diagnostic Checks:',
    editorSaveNote: 'Edits reflect instantly inside memory. Ready to package anytime.',
    downloadZipBtn: 'Generate & Download Skill .ZIP',
    manualHeaderTitle: 'Gemini Spark File Content Manual & Writing Rules',
    manualHeaderSub: 'Learn how to format each specific file so Gemini Spark understands when to trigger, where to look, and how to execute tools without errors.',
    explorerTreeTitle: 'Directory Blueprint',
    optionalRule: '💡 Key Architecture Rule:',
    optionalRuleText: 'Only SKILL.md is mandatory. assets/, references/, and scripts/ are 100% optional! You only create the folders you actually need.',
    osManualTitle: 'How to Properly Zip Your Skill Folder on Your Computer',
    osManualSub: 'The #1 reason skills fail to import into Gemini Spark is the "Double-Folder Nesting Trap". Follow these instructions for your operating system:',
    wrongZipTitle: 'INCORRECT: Double-Nested Zip',
    wrongZipDesc: 'If Gemini Spark opens the zip and sees an outer folder instead of SKILL.md directly at root level, it will reject the skill with an "Invalid Skill Archive" error.',
    correctZipTitle: 'CORRECT: Root-Level Zip',
    correctZipDesc: 'Our online Studio automatically exports using this exact format. You can drag and drop the exported .zip directly into Gemini Spark!'
  },
  my: {
    exportZipBtn: '.ZIP ဒေါင်းလုဒ်',
    heroBadge: 'Gemini Spark စွမ်းရည် (Skill) တည်ဆောက်နည်း လမ်းညွှန်နှင့် Zip ထုတ်လုပ်စနစ်',
    heroTitle: 'Gemini Spark Skills ကို လွယ်ကူစွာ တည်ဆောက်ပြီး Zip ထုတ်ယူပါ',
    heroDescription: 'ဖိုင်ဖွဲ့စည်းပုံ အတိအကျကို နားလည်ပြီး တိုက်ရိုက် စမ်းသပ်ပြင်ဆင်ကာ Gemini Spark ထဲသို့ တိုက်ရိုက် Upload တင်နိုင်သော Zip ဖိုင်ကို ထုတ်ယူလိုက်ပါ။',
    p1Badge: 'မဖြစ်မနေ',
    p1Summary: 'ဗဟိုဦးနှောက်ဖိုင်။ Skill စတင်အလုပ်လုပ်ရန် YAML trigger နှင့် ညွှန်ကြားချက်များ ပါဝင်သည်။',
    p2Badge: 'ပုံစံကြမ်းများ',
    p2Summary: 'မူကြမ်းဖိုင်များ။ အသုံးပြုသူထံ ပြန်ထုတ်ပေးမည့် ပုံစံကြမ်း (Templates) များကို သိမ်းဆည်းရန်။',
    p3Badge: 'သုတစည်းမျဉ်း',
    p3Summary: 'စည်းမျဉ်းနှင့် လမ်းညွှန်ချက်များ။ မေးခွန်းနှင့် ကိုက်ညီမှသာ Gemini က ဆွဲထုတ်ဖတ်ရှုသည်။',
    p4Badge: 'ကိရိယာကုဒ်များ',
    p4Summary: 'အလိုအလျောက် run မည့် ကုဒ်များ။ Python/Bash ဖြင့် တိကျစွာ တွက်ချက်စစ်ဆေးပေးသည်။',
    tabStudio: 'Skill ဖန်တီးပြီး Zip ထုတ်စနစ်',
    tabAgentLoop: 'အေဂျင့်လည်ပတ်ပုံ အဆင့် ၈ ဆင့် နှင့် Skill ချိတ်ဆက်မှု',
    tabManual: 'ဖိုင်ရေးသားနည်း အသေးစိတ်လက်စွဲ',
    tabExplorer: 'ဖိုင်တွဲဖွဲ့စည်းပုံ အသေးစိတ်ကြည့်ရန်',
    tabPackaging: 'Zip ပြုလုပ်နည်းနှင့် ရှောင်ရန်အမှားများ',
    agentLoopBadge: 'အေဂျင့်စနစ် လည်ပတ်ပုံ ၈ ဆင့် (The 8-Agent Loop)',
    agentLoopTitle: 'The Agent Loop နှင့် Gemini Skill ဖွဲ့စည်းပုံ ချိတ်ဆက်ပုံ',
    agentLoopSubtitle: 'AI Agent သည် မေးခွန်းတစ်ခုတည်း ချက်ချင်းဖြေခြင်းမဟုတ်ဘဲ အဆင့်ဆင့် လည်ပတ်စဉ်းစားခြင်း ဖြစ်သည်။ Gemini Spark Skill အတွင်းရှိ ဖိုင်များ (SKILL.md, assets, references, scripts) က ဤ ၈ ဆင့်ကို အဆင့်တိုင်း အထောက်အကူပြုသည်။',
    simBtn: 'အေဂျင့်လည်ပတ်ပုံကို စမ်းသပ်ကြည့်မည်',
    simRunning: 'စမ်းသပ်လည်ပတ်နေပါသည်...',
    loopGridHeader: 'အဆင့်တစ်ခုချင်းစီကို နှိပ်၍ မြန်မာလိုရှင်းလင်းချက်နှင့် သက်ဆိုင်သော ဖိုင်ကို ကြည့်နိုင်ပါသည်',
    blueprintLabel: 'နမူနာရွေးပါ:',
    clearReset: '✨ အစမှ စတင်မည်',
    virtualFilesTitle: 'Skill အတွင်းရှိ ဖိုင်များ',
    skillSlugLabel: 'Skill အမည် (ဒေါင်းလုဒ်ရမည့် .zip ဖိုင်အမည်)',
    skillDescLabel: 'ခေါ်ယူမည့် အကြောင်းအရာ (SKILL.md အတွင်းရှိ router description)',
    preflightTitle: 'တိုက်ရိုက် စစ်ဆေးချက်များ:',
    editorSaveNote: 'ပြင်ဆင်မှုများသည် ချက်ချင်းအကျုံးဝင်ပါသည်။ အချိန်မရွေး Zip ထုတ်ယူနိုင်ပါသည်။',
    downloadZipBtn: 'စစ်ဆေးပြီး Zip ဒေါင်းလုဒ်ရယူပါ',
    manualHeaderTitle: 'Gemini Spark ဖိုင်များ ရေးသားပုံ လမ်းညွှန်နှင့် စည်းမျဉ်းများ',
    manualHeaderSub: 'Gemini Spark က မည်သည့်အချိန်တွင် အလုပ်လုပ်ရမည်၊ မည်သည့်ဖိုင်ကို ဖတ်ရမည်ကို အမှားအယွင်းမရှိ သိရှိစေရန် ရေးသားနည်းများဖြစ်ပါသည်။',
    explorerTreeTitle: 'ဖိုင်တွဲ တည်ဆောက်ပုံ စံစနစ်',
    optionalRule: '💡 အဓိက မှတ်သားရန် စည်းမျဉ်း:',
    optionalRuleText: 'SKILL.md တစ်ခုတည်းသာ မဖြစ်မနေ လိုအပ်ပါသည်။ assets/၊ references/ နှင့် scripts/ ဖိုဒါများသည် မိမိလိုအပ်မှသာ ထည့်သွင်းရသော စိတ်ကြိုက်ဖိုဒါများ ဖြစ်ပါသည်။',
    osManualTitle: 'သင့်ကွန်ပျူတာပေါ်တွင် Zip ဖိုင် မှန်ကန်စွာ ချုပ်နည်း',
    osManualSub: 'Gemini Spark ထဲသို့ မကြာခဏ Upload မအောင်မြင်ရခြင်း အဓိကအကြောင်းအရင်းမှာ "ဖိုဒါအထပ်ထပ် ဖြစ်နေခြင်း" ကြောင့် ဖြစ်သည်။ အောက်ပါအတိုင်း ပြုလုပ်ပါ:',
    wrongZipTitle: 'မှားယွင်းသောပုံစံ: ဖိုဒါအထပ်ထပ် ဖြစ်နေခြင်း (Double-Nested)',
    wrongZipDesc: 'Zip ဖိုင်ကို ဖွင့်လိုက်သောအခါ SKILL.md ကို ချက်ချင်းမတွေ့ဘဲ ဖိုဒါတစ်ခု ထပ်ခံနေပါက Gemini Spark က Invalid Skill Archive ဟု ပြပြီး ငြင်းပယ်ပါလိမ့်မည်။',
    correctZipTitle: 'မှန်ကန်သောပုံစံ: အပြင်ဆုံးတွင် SKILL.md တိုက်ရိုက်ရှိခြင်း (Root-Level)',
    correctZipDesc: 'ဤ Studio မှ ထုတ်ပေးသော .ZIP သည် ဤမှန်ကန်သော ပုံစံအတိုင်း အလိုအလျောက် ထုတ်ပေးထားသဖြင့် Gemini Spark ထဲသို့ တိုက်ရိုက် Upload ဆွဲတင်နိုင်ပါသည်။'
  },
  both: {
    exportZipBtn: 'Export .ZIP (.zip ဒေါင်းလုဒ်)',
    heroBadge: 'Agent Skills Complete Spec • စွမ်းရည်တည်ဆောက်နည်း လမ်းညွှန်နှင့် Zip စနစ်',
    heroTitle: 'Build & Package Gemini Spark Skills (စွမ်းရည်များ တည်ဆောက်ပါ)',
    heroDescription: 'Learn folder schema & line-by-line manuals. ဖိုင်ဖွဲ့စည်းပုံ အတိအကျကို နားလည်ပြီး တိုက်ရိုက် စမ်းသပ်ကာ Gemini Spark ထဲသို့ Upload တင်နိုင်သော Zip ကို ထုတ်ယူပါ။',
    p1Badge: 'Must Have • မဖြစ်မနေ',
    p1Summary: 'Router & brain (ဗဟိုဦးနှောက်) • YAML triggers & steps directing files.',
    p2Badge: 'Boilerplates • ပုံစံကြမ်း',
    p2Summary: 'Static boilerplates • ပြန်ထုတ်ပေးမည့် ပုံစံကြမ်း (Templates) များကို သိမ်းဆည်းရန်။',
    p3Badge: 'Knowledge • သုတစည်းမျဉ်း',
    p3Summary: 'Domain knowledge & policies • လိုအပ်မှသာ ဆွဲဖတ်သော စည်းကမ်းလမ်းညွှန်များ။',
    p4Badge: 'Executables • ကိရိယာ',
    p4Summary: 'Python/Shell tools • Sandbox ထဲတွင် တိကျစွာ run မည့် ကုဒ်ဖိုင်များ။',
    tabStudio: '💻 Skill Studio & ZIP Builder (တိုက်ရိုက်စမ်းသပ်ရန်)',
    tabAgentLoop: '🔄 8-Agent Loop & Mapping (အေဂျင့်လည်ပတ်ပုံ ၈ ဆင့်)',
    tabManual: '📖 File Manual (ဖိုင်ရေးသားနည်းလက်စွဲ)',
    tabExplorer: '🗂️ Structure (ဖိုင်တွဲဖွဲ့စည်းပုံ)',
    tabPackaging: '📦 Zip Guide (Zip ပြုလုပ်နည်းလမ်းညွှန်)',
    agentLoopBadge: 'The 8-Agent Loop • အေဂျင့်စနစ် လည်ပတ်ပုံ ၈ ဆင့်',
    agentLoopTitle: 'The Agent Loop & Gemini Skill Mapping (စွမ်းရည်ချိတ်ဆက်မှု)',
    agentLoopSubtitle: 'Teach that an AI agent is a loop, not just a prompt. (AI Agent သည် မေးခွန်းတစ်ခုတည်း မဟုတ်ဘဲ ဤ ၈ ဆင့်အတိုင်း ဖိုင်များနှင့် ချိတ်ဆက်လည်ပတ်ပါသည်)',
    simBtn: 'Simulate Agent Loop (စမ်းသပ် run ကြည့်မည်)',
    simRunning: 'Loop Simulating... (လည်ပတ်နေပါသည်...)',
    loopGridHeader: 'Click any step to inspect file linkage & Burmese meaning (အဆင့်တစ်ခုစီကို နှိပ်ကြည့်ပါ)',
    blueprintLabel: 'Select Blueprint (နမူနာရွေးပါ):',
    clearReset: '✨ Start Empty (အစမှစမည်)',
    virtualFilesTitle: 'Workspace Files (ဖိုင်များ)',
    skillSlugLabel: 'Skill Name • ဖိုင်အမည် (Zip Package Name)',
    skillDescLabel: 'Trigger Prompt • ခေါ်ယူမည့်ဖော်ပြချက် (Router in SKILL.md)',
    preflightTitle: 'Live Diagnostics (တိုက်ရိုက်စစ်ဆေးချက်များ):',
    editorSaveNote: 'Edits reflect instantly. ချက်ချင်း သိမ်းဆည်းပြီးဖြစ်၍ Zip ထုတ်ယူနိုင်ပါသည်။',
    downloadZipBtn: 'Generate & Download .ZIP (.zip ဒေါင်းလုဒ်ရယူပါ)',
    manualHeaderTitle: 'File Content Manual & Rules (ဖိုင်ရေးသားနည်း လမ်းညွှန်)',
    manualHeaderSub: 'Learn how to format each specific file so Gemini Spark understands triggers & actions. (အမှားအယွင်းမရှိ ရေးသားနိုင်သော နည်းလမ်းများ)',
    explorerTreeTitle: 'Directory Blueprint (ဖိုင်တွဲစံစနစ်)',
    optionalRule: '💡 Key Rule • အဓိကစည်းမျဉ်း:',
    optionalRuleText: 'Only SKILL.md is mandatory. (SKILL.md တစ်ခုတည်းသာ မဖြစ်မနေ လိုအပ်ပြီး ကျန်ဖိုဒါများသည် စိတ်ကြိုက်ဖြစ်ပါသည်)',
    osManualTitle: 'How to Properly Zip Your Skill (Zip ဖိုင် မှန်ကန်စွာ ချုပ်နည်း)',
    osManualSub: 'Prevent the "Double-Folder Nesting Trap" on your operating system (ဖိုဒါအထပ်ထပ် မဖြစ်စေရန် ပြုလုပ်နည်း):',
    wrongZipTitle: '❌ INCORRECT (မှားယွင်းသောပုံစံ: ဖိုဒါအထပ်ထပ် ဖြစ်နေခြင်း)',
    wrongZipDesc: 'Avoid nested outer folder before SKILL.md (Zip ဖွင့်လိုက်လျှင် SKILL.md တိုက်ရိုက် မရှိပါက ပျက်စီးနိုင်သည်)',
    correctZipTitle: '✅ CORRECT (မှန်ကန်သောပုံစံ: SKILL.md အပြင်ဆုံးတွင် ရှိခြင်း)',
    correctZipDesc: 'SKILL.md sits right at zip root (Studio မှ ထုတ်ပေးသော Zip သည် ဤမှန်ကန်သော ပုံစံအတိုင်း ဖြစ်ပါသည်)'
  }
};
