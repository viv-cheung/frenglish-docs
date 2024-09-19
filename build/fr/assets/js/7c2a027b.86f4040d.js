/*! For license information please see 7c2a027b.86f4040d.js.LICENSE.txt */
"use strict";(self.webpackChunkfrenglish_docusaurus=self.webpackChunkfrenglish_docusaurus||[]).push([[907],{2194:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var s=t(4848),r=t(8453);const i={},a="SDK Documentation",o={id:"HowToTranslate/sdk/quickstart",title:"SDK Documentation",description:"Introduction",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/HowToTranslate/sdk/quickstart.md",sourceDirName:"HowToTranslate/sdk",slug:"/HowToTranslate/sdk/quickstart",permalink:"/fr/docs/HowToTranslate/sdk/quickstart",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Gestion des fichiers de traduction",permalink:"/fr/docs/translation-files-management"},next:{title:"How to set up GitHub Action",permalink:"/fr/docs/HowToTranslate/sdk/github-action"}},l={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Getting Started",id:"getting-started",level:2},{value:"1. Setting Up the SDK",id:"1-setting-up-the-sdk",level:3},{value:"2. Registering a Webhook (Optional)",id:"2-registering-a-webhook-optional",level:3},{value:"3. Requesting a Translation",id:"3-requesting-a-translation",level:3},{value:"4. Retrieving Translation Content",id:"4-retrieving-translation-content",level:3},{value:"5. Manual Status Checking (Optional)",id:"5-manual-status-checking-optional",level:3},{value:"6. Manual Content Retrieval (Optional)",id:"6-manual-content-retrieval-optional",level:3},{value:"CLI Usage",id:"cli-usage",level:2},{value:"Constructor",id:"constructor",level:4},{value:"Methods",id:"methods",level:4},{value:"Types",id:"types",level:2},{value:"Error Handling",id:"error-handling",level:2},{value:"Best Practices",id:"best-practices",level:2}];function d(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"sdk-documentation",children:"SDK Documentation"}),"\n",(0,s.jsx)(e.h2,{id:"introduction",children:"Introduction"}),"\n",(0,s.jsx)(e.p,{children:"The Frenglish SDK is a powerful tool that enables developers to integrate automatic translation of content files into their applications. This SDK handles the entire translation process, from submitting files for translation to retrieving the translated content."}),"\n",(0,s.jsx)(e.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,s.jsx)(e.p,{children:"Before you begin, ensure you have the following:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Node.js"})," (version 14 or higher recommended)"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"npm"})," (Node Package Manager)"]}),"\n",(0,s.jsxs)(e.li,{children:["A ",(0,s.jsx)(e.strong,{children:"Frenglish API key"})," (obtainable by signing up on the Frenglish platform)"]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(e.p,{children:"Install the Frenglish SDK using npm:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"npm install frenglish\n"})}),"\n",(0,s.jsx)(e.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,s.jsx)(e.h3,{id:"1-setting-up-the-sdk",children:"1. Setting Up the SDK"}),"\n",(0,s.jsx)(e.p,{children:"Import the Frenglish SDK and initialize it with your API key:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"const FrenglishSDK = require('frenglish').default;\n\n// Replace with your actual Frenglish API key\nconst FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY || 'YOUR_API_KEY_HERE';\nconst frenglish = new FrenglishSDK(FRENGLISH_API_KEY);\n"})}),"\n",(0,s.jsx)(e.h3,{id:"2-registering-a-webhook-optional",children:"2. Registering a Webhook (Optional)"}),"\n",(0,s.jsx)(e.p,{children:"If you prefer to receive a webhook notification when the translation is complete:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"const webhookUrl = 'https://yourdomain.com/webhook-endpoint';\n\nawait frenglish.registerWebhook(webhookUrl);\n"})}),"\n",(0,s.jsx)(e.h3,{id:"3-requesting-a-translation",children:"3. Requesting a Translation"}),"\n",(0,s.jsx)(e.p,{children:"Prepare your files for translation:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"const filenames = ['file1.txt', 'file2.txt'];\nconst contents = [\n  'Content of file1',\n  'Content of file2'\n];\n\nconst translation = await frenglish.translate(filenames, contents);\nconsole.log(`Translation requested with ID: ${translation.translationId}`);\n"})}),"\n",(0,s.jsx)(e.h3,{id:"4-retrieving-translation-content",children:"4. Retrieving Translation Content"}),"\n",(0,s.jsxs)(e.p,{children:["The ",(0,s.jsx)(e.code,{children:"translate"})," method handles polling internally and returns the translated content when completed:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"if (translation.content) {\n  console.log('Translation completed:', translation.content);\n} else {\n  console.log('Translation failed or was cancelled');\n}\n"})}),"\n",(0,s.jsx)(e.h3,{id:"5-manual-status-checking-optional",children:"5. Manual Status Checking (Optional)"}),"\n",(0,s.jsx)(e.p,{children:"If you need to check the status manually:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"const translationId = translation.translationId;\nconst status = await frenglish.getTranslationStatus(translationId);\nconsole.log(`Current status: ${status}`);\n"})}),"\n",(0,s.jsx)(e.h3,{id:"6-manual-content-retrieval-optional",children:"6. Manual Content Retrieval (Optional)"}),"\n",(0,s.jsx)(e.p,{children:"If you need to retrieve the content separately:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"const translatedContent = await frenglish.getTranslationContent(translationId);\nconsole.log('Translated content:', translatedContent);\n"})}),"\n",(0,s.jsx)(e.h2,{id:"cli-usage",children:"CLI Usage"}),"\n",(0,s.jsxs)(e.p,{children:["Frenglish also provides a command-line interface for easy translation of files. After installation, you can use the ",(0,s.jsx)(e.code,{children:"frenglish-translate"})," command:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"frenglish-translate [options] <file1> <file2> ...\n"})}),"\n",(0,s.jsx)(e.h4,{id:"constructor",children:"Constructor"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"constructor(apiKey: string)"})}),"\n"]}),"\n",(0,s.jsx)(e.h4,{id:"methods",children:"Methods"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"registerWebhook(webhookUrl: string): Promise<void>"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"translate(filenames: string[], content: string[]): Promise<RequestTranslationResponse | undefined>"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"getTranslationStatus(translationId: number): Promise<TranslationStatus>"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"getTranslationContent(translationId: number): Promise<TranslationResponse[]>"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"types",children:"Types"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"enum TranslationStatus {\n  PENDING = 'PENDING',\n  IN_PROGRESS = 'IN_PROGRESS',\n  COMPLETED = 'COMPLETED',\n  CANCELLED = 'CANCELLED'\n}\n\ninterface RequestTranslationResponse {\n  translationId: number;\n  content?: TranslationResponse[];\n}\n\ninterface TranslationResponse {\n  language: string;\n  files: {\n    fileId: string;\n    content: string;\n  }[];\n}\n"})}),"\n",(0,s.jsx)(e.h2,{id:"error-handling",children:"Error Handling"}),"\n",(0,s.jsx)(e.p,{children:"The SDK throws errors for various scenarios. Always wrap your API calls in try-catch blocks:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-javascript",children:"try {\n  const translation = await frenglish.translate(filenames, contents);\n  // Handle successful translation\n} catch (error) {\n  console.error('Translation error:', error.message);\n  // Handle the error appropriately\n}\n"})}),"\n",(0,s.jsx)(e.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,s.jsxs)(e.ol,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Environment Variables"}),": Store your API key in environment variables for security. The SDK uses ",(0,s.jsx)(e.code,{children:"dotenv"}),", so you can use a ",(0,s.jsx)(e.code,{children:".env"})," file in your project root."]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Webhook Security"}),": Ensure your webhook endpoint is secure and validates incoming requests."]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Rate Limiting"}),": Be aware of any rate limits on the Frenglish API and handle them accordingly."]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Error Handling"}),": Implement robust error handling to manage various failure scenarios."]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Logging"}),": Implement logging for better debugging and monitoring of the translation process."]}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(d,{...n})}):d(n)}},1020:(n,e,t)=>{var s=t(6540),r=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(n,e,t){var s,i={},c=null,d=null;for(s in void 0!==t&&(c=""+t),void 0!==e.key&&(c=""+e.key),void 0!==e.ref&&(d=e.ref),e)a.call(e,s)&&!l.hasOwnProperty(s)&&(i[s]=e[s]);if(n&&n.defaultProps)for(s in e=n.defaultProps)void 0===i[s]&&(i[s]=e[s]);return{$$typeof:r,type:n,key:c,ref:d,props:i,_owner:o.current}}e.Fragment=i,e.jsx=c,e.jsxs=c},4848:(n,e,t)=>{n.exports=t(1020)},8453:(n,e,t)=>{t.d(e,{R:()=>a,x:()=>o});var s=t(6540);const r={},i=s.createContext(r);function a(n){const e=s.useContext(i);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:a(n.components),s.createElement(i.Provider,{value:e},n.children)}}}]);