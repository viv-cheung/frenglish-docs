/*! For license information please see 5c2d04a7.94ce249c.js.LICENSE.txt */
"use strict";(self.webpackChunkfrenglish_docusaurus=self.webpackChunkfrenglish_docusaurus||[]).push([[217],{5640:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>i,contentTitle:()=>r,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var o=t(4848),s=t(8453);const a={id:"translationFilesManagement",sidebar_position:2,description:"How to structure translation files",slug:"/translation-files-management"},r="Translation Files Management",l={id:"HowToTranslate/translationFilesManagement",title:"Translation Files Management",description:"How to structure translation files",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/HowToTranslate/2-TranslationManagement.md",sourceDirName:"HowToTranslate",slug:"/translation-files-management",permalink:"/docs/translation-files-management",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"translationFilesManagement",sidebar_position:2,description:"How to structure translation files",slug:"/translation-files-management"},sidebar:"tutorialSidebar",previous:{title:"General Configuration",permalink:"/docs/configuration"},next:{title:"SDK Quickstart",permalink:"/docs/HowToTranslate/sdk/sdk-quickstart"}},i={},c=[{value:"How to structure your translation files for automatic translations",id:"how-to-structure-your-translation-files-for-automatic-translations",level:2},{value:"Option 1:",id:"option-1",level:3},{value:"Option 2:",id:"option-2",level:3}];function d(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h1,{id:"translation-files-management",children:"Translation Files Management"}),"\n",(0,o.jsx)(e.h2,{id:"how-to-structure-your-translation-files-for-automatic-translations",children:"How to structure your translation files for automatic translations"}),"\n",(0,o.jsx)(e.h3,{id:"option-1",children:"Option 1:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:'Origin language folder should be named the language code (ex. "en")'}),"\n",(0,o.jsx)(e.li,{children:"Files inside the origin language folder should only contain files required for translation"}),"\n",(0,o.jsx)(e.li,{children:"These files do not need to contain the origin language folder name (ex. intro.md, about.json, contactUs.po)"}),"\n"]}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsx)(e.strong,{children:"Example Directory Structure"})}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Translation files will be organized as follows. The translation path for this example would be ",(0,o.jsx)(e.code,{children:"docs/locales/*"}),":"]}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-plaintext",children:"    docs/\n    \u251c\u2500 locales/\n        \u251c\u2500 en/\n        \u2502  \u251c\u2500 common.json\n        \u2502  \u2514\u2500 about.json\n        \u251c\u2500 fr/\n        \u2502  \u251c\u2500 common.json\n        \u2502  \u2514\u2500 about.json\n"})}),"\n",(0,o.jsx)(e.h3,{id:"option-2",children:"Option 2:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Have a parent folder called ",(0,o.jsx)(e.code,{children:"locales"})," or ",(0,o.jsx)(e.code,{children:"languages"})," or a name that symbolizes all the children files are translation/language files"]}),"\n",(0,o.jsx)(e.li,{children:"Name each file with the language code in the filename"}),"\n",(0,o.jsx)(e.li,{children:"Using this method, none of the declared origin languages will be translated. All files containing target language codes will be translated"}),"\n"]}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsx)(e.strong,{children:"Example Directory Structure"})}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Translation files will be organized as follows. The translation path for this example would be ",(0,o.jsx)(e.code,{children:"docs/locales/*"}),":"]}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-plaintext",children:"    docs/\n    \u251c\u2500 locales/\n        \u251c\u2500 en_common.json\n        \u2502  en_about.json\n        \u251c\u2500 fr_common.json\n        \u2502  fr_about.json\n"})})]})}function u(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(d,{...n})}):d(n)}},1020:(n,e,t)=>{var o=t(6540),s=Symbol.for("react.element"),a=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,l=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function c(n,e,t){var o,a={},c=null,d=null;for(o in void 0!==t&&(c=""+t),void 0!==e.key&&(c=""+e.key),void 0!==e.ref&&(d=e.ref),e)r.call(e,o)&&!i.hasOwnProperty(o)&&(a[o]=e[o]);if(n&&n.defaultProps)for(o in e=n.defaultProps)void 0===a[o]&&(a[o]=e[o]);return{$$typeof:s,type:n,key:c,ref:d,props:a,_owner:l.current}}e.Fragment=a,e.jsx=c,e.jsxs=c},4848:(n,e,t)=>{n.exports=t(1020)},8453:(n,e,t)=>{t.d(e,{R:()=>r,x:()=>l});var o=t(6540);const s={},a=o.createContext(s);function r(n){const e=o.useContext(a);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:r(n.components),o.createElement(a.Provider,{value:e},n.children)}}}]);