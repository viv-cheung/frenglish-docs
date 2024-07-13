/*! For license information please see 187ab940.0aa9a7da.js.LICENSE.txt */
"use strict";(self.webpackChunkfrenglish_docusaurus=self.webpackChunkfrenglish_docusaurus||[]).push([[155],{6327:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var l=t(4848),a=t(8453);const r={id:"oneTimeTranslation",sidebar_position:3,description:"One Time Translation",slug:"/one-time-translation"},i="One Time Translation",o={id:"HowToTranslate/oneTimeTranslation",title:"One Time Translation",description:"One Time Translation",source:"@site/i18n/fr/docusaurus-plugin-content-docs/current/HowToTranslate/3-OneTimeTranslation.md",sourceDirName:"HowToTranslate",slug:"/one-time-translation",permalink:"/fr/docs/one-time-translation",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{id:"oneTimeTranslation",sidebar_position:3,description:"One Time Translation",slug:"/one-time-translation"},sidebar:"tutorialSidebar",previous:{title:"Translation Files Management",permalink:"/fr/docs/translation-files-management"},next:{title:"Translate docusaurus",permalink:"/fr/docs/Tutorial - Extras/Translate docusaurus"}},s={},c=[{value:"Using Frenglish.ai",id:"using-frenglishai",level:2},{value:"Translating all files locally",id:"translating-all-files-locally",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"one-time-translation",children:"One Time Translation"}),"\n",(0,l.jsx)(n.h2,{id:"using-frenglishai",children:"Using Frenglish.ai"}),"\n",(0,l.jsx)(n.p,{children:'In the "General Configuration" tab,'}),"\n",(0,l.jsx)(n.p,{children:'a. Turn on the "Repository Active Status" and click "Save"\nb. Enter the translation path (ex "src/locales/*" ) you would like the files to manage translations for (all files under that path will be translated), click "Add path" then click "Save".'}),"\n",(0,l.jsx)(n.p,{children:'In the "Language Configuration" tab,'}),"\n",(0,l.jsx)(n.p,{children:'a. Select your origin language (files you regularly manage, ex. English), then click "Save"\nb. Select languages you want to support, then click "Save"'}),"\n",(0,l.jsx)(n.p,{children:'Optionally, in the "Rules Configuration" tab,'}),"\n",(0,l.jsx)(n.p,{children:'a. Enter all the general rules all your translation files should follow, then click "Save"\nb. Enter language specific rules for yoru translation files, then click "Save"'}),"\n",(0,l.jsx)(n.p,{children:'You\'re ready to translate! Your next translation will be created on your next commit (for changes detected in your language files) or click the green "One-time Translation" to get started.'}),"\n",(0,l.jsx)(n.p,{children:'Option 1:\nClick "All" option to translate all your files from the translation path.'}),"\n",(0,l.jsx)(n.p,{children:'Option 2:\nClick "specify paths" to translate only certain files'}),"\n",(0,l.jsx)(n.p,{children:'b. Enter your branch name you want to translate from. The Frenglish bot will create a new Pull Request from that branch you specificed\nc. Select the languages you want to translate to\nd. Click "Translate Now" whenever you\'re ready!'}),"\n",(0,l.jsx)(n.h2,{id:"translating-all-files-locally",children:"Translating all files locally"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["If you commit the ",(0,l.jsx)(n.code,{children:"frenglishConfig.json"})," file for the first time, and the target language translation files do not exist (or they do not belong under the target language folder) it will translate all your files. The origin language file name must match the target language file identically."]}),"\n",(0,l.jsxs)(n.li,{children:["If you commit a change in the ",(0,l.jsx)(n.code,{children:"frenglishConfig.json"})," and there are no translation files or folder that exist, we will translate all your origin language files into your target language."]}),"\n"]}),"\n",(0,l.jsxs)(n.p,{children:["Example, ",(0,l.jsx)(n.code,{children:"common.json"})," will be translated in the ",(0,l.jsx)(n.code,{children:"fr"})," folder since ",(0,l.jsx)(n.code,{children:"common.json"})," does not exist in the ",(0,l.jsx)(n.code,{children:"fr"})," folder:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-plaintext",children:"    docs/\n    \u251c\u2500 locales/\n        \u251c\u2500 en/\n        \u2502  \u251c\u2500 common.json\n        \u2502  fr/\n        \u2502  \u251c\u2500 common1.json\n"})}),"\n",(0,l.jsxs)(n.p,{children:["Example 2, ",(0,l.jsx)(n.code,{children:"common.json"})," will be translated in a newly created ",(0,l.jsx)(n.code,{children:"fr"})," folder since in the ",(0,l.jsx)(n.code,{children:"frenglishConfig.json"}),", it has ",(0,l.jsx)(n.code,{children:"fr"})," specified in the ",(0,l.jsx)(n.code,{children:"languages"})," value:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-plaintext",children:"    docs/\n    \u251c\u2500 locales/\n        \u251c\u2500 en/\n        \u2502  \u251c\u2500 common.json\n"})})]})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},1020:(e,n,t)=>{var l=t(6540),a=Symbol.for("react.element"),r=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,o=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function c(e,n,t){var l,r={},c=null,d=null;for(l in void 0!==t&&(c=""+t),void 0!==n.key&&(c=""+n.key),void 0!==n.ref&&(d=n.ref),n)i.call(n,l)&&!s.hasOwnProperty(l)&&(r[l]=n[l]);if(e&&e.defaultProps)for(l in n=e.defaultProps)void 0===r[l]&&(r[l]=n[l]);return{$$typeof:a,type:e,key:c,ref:d,props:r,_owner:o.current}}n.Fragment=r,n.jsx=c,n.jsxs=c},4848:(e,n,t)=>{e.exports=t(1020)},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>o});var l=t(6540);const a={},r=l.createContext(a);function i(e){const n=l.useContext(r);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);