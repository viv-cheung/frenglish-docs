"use strict";(self.webpackChunkfrenglish_docusaurus=self.webpackChunkfrenglish_docusaurus||[]).push([[70],{8614:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var a=t(4848),o=t(8453);const i={id:"faq",sidebar_position:4,description:"Frequently Asked Questions",slug:"/FAQ"},s=void 0,l={id:"faq",title:"faq",description:"Frequently Asked Questions",source:"@site/docs/faq.md",sourceDirName:".",slug:"/FAQ",permalink:"/docs/FAQ",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"faq",sidebar_position:4,description:"Frequently Asked Questions",slug:"/FAQ"},sidebar:"tutorialSidebar",previous:{title:"translate-docs",permalink:"/docs/Tutorial - Extras/translate-docs"}},r={},d=[{value:"How do you translate all your files?",id:"how-do-you-translate-all-your-files",level:2},{value:"How do I know the quality is good?",id:"how-do-i-know-the-quality-is-good",level:2},{value:"How long should I expect for my translation files to be completed?",id:"how-long-should-i-expect-for-my-translation-files-to-be-completed",level:2},{value:"Not everything in my file requires translation, how do you pick and choose what to translate?",id:"not-everything-in-my-file-requires-translation-how-do-you-pick-and-choose-what-to-translate",level:2},{value:"Do you just support French translations?",id:"do-you-just-support-french-translations",level:2},{value:"What happens if I closed a PR from Frenglish?",id:"what-happens-if-i-closed-a-pr-from-frenglish",level:2},{value:"Are code snippets translated?",id:"are-code-snippets-translated",level:2},{value:"How does overage work?",id:"how-does-overage-work",level:2},{value:"What happens if I upgrade my plan AFTER I entered overage?",id:"what-happens-if-i-upgrade-my-plan-after-i-entered-overage",level:2}];function h(e){const n={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{id:"how-do-you-translate-all-your-files",children:"How do you translate all your files?"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["If you commit the ",(0,a.jsx)(n.code,{children:"frenglishConfig.json"})," file for the first time, and the target language locale files do not exist (or they do not belong under the target language folder) it will translate all your files. The origin language file name must match the target language file identically."]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Example, ",(0,a.jsx)(n.code,{children:"common.json"})," will be translated in the ",(0,a.jsx)(n.code,{children:"fr"})," folder since ",(0,a.jsx)(n.code,{children:"common.json"})," does not exist in the fr folder:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"    docs/\n    \u251c\u2500 locales/\n        \u251c\u2500 en/\n        \u2502  \u251c\u2500 common.json\n        \u2502  fr/\n        \u2502  \u251c\u2500 common1.json\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Example 2, ",(0,a.jsx)(n.code,{children:"common.json"})," will be translated in a newly created",(0,a.jsx)(n.code,{children:"fr"})," folder since in the ",(0,a.jsx)(n.code,{children:"frenglishConfig.json"}),", it has ",(0,a.jsx)(n.code,{children:"fr"})," specified in the ",(0,a.jsx)(n.code,{children:"languages"})," value:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-plaintext",children:"    docs/\n    \u251c\u2500 locales/\n        \u251c\u2500 en/\n        \u2502  \u251c\u2500 common.json\n"})}),"\n",(0,a.jsx)(n.h2,{id:"how-do-i-know-the-quality-is-good",children:"How do I know the quality is good?"}),"\n",(0,a.jsx)(n.p,{children:"The Frenglish bot goes through the following validation steps:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Multiple reflection and review loops to ensure the translation follows your specified rules and sounds natural"}),"\n",(0,a.jsx)(n.li,{children:"Has an implicit learning feature to teach itself rules based on manually changed locale files"}),"\n",(0,a.jsx)(n.li,{children:"Translations are sent to human translators for quality validation every quarter"}),"\n",(0,a.jsx)(n.li,{children:"METEOR score (standardized translation quality test) are performed regularly; this test will translate content to the target language and back to its origin language. A score will be given by comparing the original values against the back-translation values"}),"\n",(0,a.jsx)(n.li,{children:"All the docs you see have been translated by the Frenglish bot! Therefore, the quality of the translation is transparent and a benchmark for what you should expect"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"how-long-should-i-expect-for-my-translation-files-to-be-completed",children:"How long should I expect for my translation files to be completed?"}),"\n",(0,a.jsx)(n.p,{children:"This is dependent on how many characters you are translating. Typically, you could expect 1 minute per file to be translated. This is because the Frenglish bot goes through multiple validation steps to ensure the quality of the translation is high before outputting a result."}),"\n",(0,a.jsx)(n.h2,{id:"not-everything-in-my-file-requires-translation-how-do-you-pick-and-choose-what-to-translate",children:"Not everything in my file requires translation, how do you pick and choose what to translate?"}),"\n",(0,a.jsx)(n.p,{children:"The Frenglish bot will translate only relevant content depending on the file type. For example:"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"Markdown Files"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Code will not be translated"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"PO Files"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Comments, msgid, and other po meta data will not be translated or count as translated content"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"JSON Files"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Keys will not be translated and only the values will be translated"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"do-you-just-support-french-translations",children:"Do you just support French translations?"}),"\n",(0,a.jsx)(n.p,{children:'No, the name "Frenglish" was chosen to represent its Quebec company origins. Many Quebecers use the term "Frenglish" to refer to how they converse (by missing in both French and English in natural dialogue).'}),"\n",(0,a.jsx)(n.p,{children:"We support the following languages:"}),"\n",(0,a.jsx)(n.p,{children:"Afrikaans, Arabic, Armenian, Azerbaijani, Belarusian, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Galician, German, Greek, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Marathi, Maori, Nepali, Norwegian, Persian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swahili, Swedish, Tagalog, Tamil, Thai, Turkish, Ukrainian, Urdu, Vietnamese, and Welsh."}),"\n",(0,a.jsx)(n.h2,{id:"what-happens-if-i-closed-a-pr-from-frenglish",children:"What happens if I closed a PR from Frenglish?"}),"\n",(0,a.jsx)(n.p,{children:"The content contained in that PR will NOT be translated in future Frenglish PRs. Only close Frenglish PR if you don't want this content to be translated by frenglish. You can always edit the text in the Frenglish PR and merge it"}),"\n",(0,a.jsx)(n.h2,{id:"are-code-snippets-translated",children:"Are code snippets translated?"}),"\n",(0,a.jsx)(n.p,{children:"No, code snippets are not translated and DO NOT count towards your translated words usage"}),"\n",(0,a.jsx)(n.h2,{id:"how-does-overage-work",children:"How does overage work?"}),"\n",(0,a.jsx)(n.p,{children:"You get charged every $100 in overage you accumulate during a period, or whatever overage user had when new period start (NOTE: currently we don't handle cancellation for this I just realized... will open ticket)"}),"\n",(0,a.jsx)(n.h2,{id:"what-happens-if-i-upgrade-my-plan-after-i-entered-overage",children:"What happens if I upgrade my plan AFTER I entered overage?"}),"\n",(0,a.jsx)(n.p,{children:"Whatever amount of overage you spent on your previous plan will be credited for this month. This means that if you spend $50 in overage in PRO, the first $50 in overage on your upgraded plan will not get charged"})]})}function c(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>l});var a=t(6540);const o={},i=a.createContext(o);function s(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);