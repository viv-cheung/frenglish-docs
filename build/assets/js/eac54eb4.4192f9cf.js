/*! For license information please see eac54eb4.4192f9cf.js.LICENSE.txt */
"use strict";(self.webpackChunkfrenglish_docusaurus=self.webpackChunkfrenglish_docusaurus||[]).push([[558],{8225:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>o,default:()=>f,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var s=t(4848),a=t(8453);const r={id:"example",sidebar_position:5,description:"Example use case for SDK",slug:"/SDK"},o="Full Example",l={id:"HowToTranslate/sdk/example",title:"Full Example",description:"Example use case for SDK",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/HowToTranslate/sdk/example.md",sourceDirName:"HowToTranslate/sdk",slug:"/SDK",permalink:"/docs/SDK",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{id:"example",sidebar_position:5,description:"Example use case for SDK",slug:"/SDK"},sidebar:"tutorialSidebar",previous:{title:"How to set up GitHub Action",permalink:"/docs/HowToTranslate/sdk/github-action"},next:{title:"CLI Overview",permalink:"/docs/CLI"}},i={},c=[];function u(e){const n={code:"code",h1:"h1",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"full-example",children:"Full Example"}),"\n",(0,s.jsx)(n.p,{children:"Here's a complete example combining all the steps:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const fs = require('fs').promises;\nconst path = require('path');\nconst FrenglishSDK = require('frenglish-sdk').default;\n\nconst FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY || 'YOUR_API_KEY_HERE';\nconst frenglish = new FrenglishSDK(FRENGLISH_API_KEY);\n\nasync function main() {\n  try {\n    // Step 1: Prepare files\n    const filesToTranslate = ['src/locales/en/file1.txt', 'src/locales/en/file2.txt'];\n    const fileContents = await Promise.all(filesToTranslate.map(async (file) => {\n      const content = await fs.readFile(file, 'utf-8');\n      return { fileId: path.basename(file), content };\n    }));\n\n    const filenames = fileContents.map(file => file.fileId);\n    const contents = fileContents.map(file => file.content);\n\n    // Step 2: Request translation\n    const translation = await frenglish.translate(filenames, contents);\n    console.log(`Translation requested with ID: ${translation.translationId}`);\n\n    // Step 3: Retrieve translated content\n    const translatedContent = translation.content;\n\n    // Step 4: Save translated files\n    for (const languageData of translatedContent) {\n      const language = languageData.language;\n      const translatedFiles = languageData.files;\n\n      for (const translatedFile of translatedFiles) {\n        const translatedFilePath = path.join('src/locales', language, translatedFile.fileId);\n        await fs.mkdir(path.dirname(translatedFilePath), { recursive: true });\n        await fs.writeFile(translatedFilePath, translatedFile.content);\n        console.log(`Translated file written: ${translatedFilePath}`);\n      }\n    }\n  } catch (error) {\n    console.error('Error during translation process:', error);\n    process.exit(1);\n  }\n}\n\nmain();```\n"})})]})}function f(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},1020:(e,n,t)=>{var s=t(6540),a=Symbol.for("react.element"),r=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function c(e,n,t){var s,r={},c=null,u=null;for(s in void 0!==t&&(c=""+t),void 0!==n.key&&(c=""+n.key),void 0!==n.ref&&(u=n.ref),n)o.call(n,s)&&!i.hasOwnProperty(s)&&(r[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps)void 0===r[s]&&(r[s]=n[s]);return{$$typeof:a,type:e,key:c,ref:u,props:r,_owner:l.current}}n.Fragment=r,n.jsx=c,n.jsxs=c},4848:(e,n,t)=>{e.exports=t(1020)},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>l});var s=t(6540);const a={},r=s.createContext(a);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);