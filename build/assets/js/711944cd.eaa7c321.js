/*! For license information please see 711944cd.eaa7c321.js.LICENSE.txt */
"use strict";(self.webpackChunkfrenglish_docusaurus=self.webpackChunkfrenglish_docusaurus||[]).push([[688],{9832:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>t,toc:()=>c});var l=s(4848),i=s(8453);const r={id:"cli-quickstart",sidebar_position:4,description:"Learn how to use Frenglish's CLI to streamline your translation workflow",slug:"/CLI"},a="CLI User Guide",t={id:"HowToTranslate/cli/cli-quickstart",title:"CLI User Guide",description:"Learn how to use Frenglish's CLI to streamline your translation workflow",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/HowToTranslate/cli/quickstart.md",sourceDirName:"HowToTranslate/cli",slug:"/CLI",permalink:"/docs/CLI",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"cli-quickstart",sidebar_position:4,description:"Learn how to use Frenglish's CLI to streamline your translation workflow",slug:"/CLI"},sidebar:"tutorialSidebar",previous:{title:"Full Example",permalink:"/docs/SDK"},next:{title:"How automated translations are managed",permalink:"/docs/githubApp"}},o={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Basic Usage",id:"basic-usage",level:2},{value:"Advanced Usage",id:"advanced-usage",level:3},{value:"Command Options",id:"command-options",level:3},{value:"CLI Commands",id:"cli-commands",level:3},{value:"Workflow Examples",id:"workflow-examples",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"cli-user-guide",children:"CLI User Guide"}),"\n",(0,l.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,l.jsx)(n.p,{children:"The Frenglish CLI (Command Line Interface) is a powerful tool that allows developers to integrate translation commands of content files directly into their workflow. With the Frenglish CLI, you can easily submit files for translation, upload new files, check translation status, and retrieve translated content from your terminal. This guide will help you get started with one-time translations or manual translation management outside your automated build pipelines."}),"\n",(0,l.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,l.jsx)(n.p,{children:"Before you begin, ensure you have the following:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Node.js"})," installed on your machine (version 14 or higher recommended)"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"npm"})," (Node Package Manager) for package installation"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Git"})," for version control (optional but recommended)"]}),"\n",(0,l.jsxs)(n.li,{children:["A ",(0,l.jsx)(n.strong,{children:"Frenglish API key"})," (Sign up on the Frenglish platform to obtain one)"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,l.jsx)(n.p,{children:"Install the Frenglish CLI globally using npm:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npm install -g frenglish\n"})}),"\n",(0,l.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Create a ",(0,l.jsx)(n.code,{children:".env"})," file in your project root directory. You'll get the FRENGLISH_API_KEY from ",(0,l.jsx)(n.a,{href:"https://www.frenglish.ai",children:"www.frenglish.ai"})," when you create a new project. It will be under the ",(0,l.jsx)(n.strong,{children:"Developer Settings"})," tab:"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"FRENGLISH_API_KEY=your_api_key_here\nORIGIN_LANGUAGE_TRANSLATION_PATH=/path/to/your/translation/directory\nTRANSLATION_PATH=/path/to/translation/output\n"})}),"\n",(0,l.jsx)(n.p,{children:"Example:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"FRENGLISH_API_KEY=123abcdefg\nORIGIN_LANGUAGE_TRANSLATION_PATH=/src/locales/en\nTRANSLATION_PATH=/src/locales\n"})}),"\n",(0,l.jsxs)(n.p,{children:["Replace ",(0,l.jsx)(n.code,{children:"your_api_key_here"})," with your actual Frenglish API key and set the correct paths for ",(0,l.jsx)(n.code,{children:"ORIGIN_LANGUAGE_TRANSLATION_PATH"})," (the directory where your original language files are stored) and ",(0,l.jsx)(n.code,{children:"TRANSLATION_PATH"})," (the directory where the translated files will be saved)."]}),"\n",(0,l.jsxs)(n.ol,{start:"2",children:["\n",(0,l.jsxs)(n.li,{children:["Ensure your ",(0,l.jsx)(n.code,{children:".gitignore"})," file includes ",(0,l.jsx)(n.code,{children:".env"})," to keep your API key secure."]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"basic-usage",children:"Basic Usage"}),"\n",(0,l.jsx)(n.p,{children:"The basic syntax for the Frenglish CLI is:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"frenglish-translate [options]\n"})}),"\n",(0,l.jsx)(n.p,{children:"Without any options, the CLI will:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Detect all files in your specified translation directory (",(0,l.jsx)(n.code,{children:"ORIGIN_LANGUAGE_TRANSLATION_PATH"}),")."]}),"\n",(0,l.jsx)(n.li,{children:"Submit these files for translation."}),"\n",(0,l.jsx)(n.li,{children:"Wait for the translation to complete."}),"\n",(0,l.jsxs)(n.li,{children:["Save the translated files in the appropriate language subdirectories inside ",(0,l.jsx)(n.code,{children:"TRANSLATION_PATH"}),"."]}),"\n",(0,l.jsx)(n.li,{children:"After you have reviewed the generated translation files, commit them into your version control branch."}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"advanced-usage",children:"Advanced Usage"}),"\n",(0,l.jsx)(n.p,{children:"Here\u2019s how you can use the CLI with different options to manage translations effectively."}),"\n",(0,l.jsx)(n.h3,{id:"command-options",children:"Command Options"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"--path [string]"}),": Specify a custom path for translating specific files or directories."]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Default: Value of ",(0,l.jsx)(n.code,{children:"ORIGIN_LANGUAGE_TRANSLATION_PATH"})," in your ",(0,l.jsx)(n.code,{children:".env"})," file."]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Example:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'frenglish-translate --path "./custom/path/file.json"\n'})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"--isFullTranslation [boolean]"}),": Perform a full translation (translate all files, even if they haven't changed)."]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Default: ",(0,l.jsx)(n.code,{children:"false"})," (only changed files are translated).\nExample:"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"frenglish-translate --isFullTranslation=true\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"--help"}),": Display all available options and their descriptions.\nExample:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"frenglish-translate --help\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"cli-commands",children:"CLI Commands"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Translate Files"}),":\nThe primary command for translating files. This will detect changed files, submit them for translation, and save the translated files."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"frenglish-translate\n"})}),"\n",(0,l.jsx)(n.p,{children:"Options:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"--path"}),": Specify a file or directory to translate."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"--isFullTranslation"}),": Translate all files, regardless of changes.\nExamples:"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'frenglish-translate --path "./custom/path/file.json"\nfrenglish-translate --isFullTranslation=true\n'})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Upload New Files"}),":\nUse this command if you want to initialize translation for existing files. For an example, if you already have some translated files and you don't want to translate them again, you can use this command to upload existing translations. Frenglish will use these initialized files as the base and if the origin-language file changes, it will only translate the changed parts for the translated files."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"frenglish-upload\n"})}),"\n",(0,l.jsx)(n.p,{children:"Options:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"--path"}),": Specify a custom path for uploading files."]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Example:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"frenglish-upload --path ./custom/locales\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"workflow-examples",children:"Workflow Examples"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Translating Changed Files"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Make changes to your content files in the specified directory."}),"\n",(0,l.jsx)(n.li,{children:"Run the Frenglish CLI to translate those changed files:"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"frenglish-translate\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["The CLI will detect the changed files, initiate the translation process, and save the translated files in language-specific subdirectories under ",(0,l.jsx)(n.code,{children:"TRANSLATION_PATH"}),"."]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Translating All Files (Full Translation)"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["To translate all files, even if they haven't changed recently, use the ",(0,l.jsx)(n.code,{children:"--isFullTranslation"})," flag:"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"frenglish-translate --isFullTranslation=true\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Translating Specific Files"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["To translate specific files or directories, use the ",(0,l.jsx)(n.code,{children:"--path"})," option:"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'frenglish-translate --path "./src/locales/en/specific-file.json"\n'})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Uploading New Files"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"To upload newly added files for translation, run:"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'frenglish-upload --path "./src/locales/new_files"\n'})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,l.jsx)(n.p,{children:"If you encounter any issues:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsxs)(n.strong,{children:["Check Your ",(0,l.jsx)(n.code,{children:".env"})," File"]}),":\nEnsure your ",(0,l.jsx)(n.code,{children:".env"})," file is correctly set up and in the right location. Verify that the ",(0,l.jsx)(n.code,{children:"FRENGLISH_API_KEY"})," and paths (",(0,l.jsx)(n.code,{children:"ORIGIN_LANGUAGE_TRANSLATION_PATH"})," and ",(0,l.jsx)(n.code,{children:"TRANSLATION_PATH"}),") are set correctly."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Verify Your API Key"}),":\nCheck that your API key is valid in your Frenglish account."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Directory Access"}),":\nEnsure the paths specified in ",(0,l.jsx)(n.code,{children:"ORIGIN_LANGUAGE_TRANSLATION_PATH"})," and ",(0,l.jsx)(n.code,{children:"TRANSLATION_PATH"})," are correct and that you have the necessary permissions to read from and write to those directories."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},1020:(e,n,s)=>{var l=s(6540),i=Symbol.for("react.element"),r=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,t=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function c(e,n,s){var l,r={},c=null,d=null;for(l in void 0!==s&&(c=""+s),void 0!==n.key&&(c=""+n.key),void 0!==n.ref&&(d=n.ref),n)a.call(n,l)&&!o.hasOwnProperty(l)&&(r[l]=n[l]);if(e&&e.defaultProps)for(l in n=e.defaultProps)void 0===r[l]&&(r[l]=n[l]);return{$$typeof:i,type:e,key:c,ref:d,props:r,_owner:t.current}}n.Fragment=r,n.jsx=c,n.jsxs=c},4848:(e,n,s)=>{e.exports=s(1020)},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>t});var l=s(6540);const i={},r=l.createContext(i);function a(e){const n=l.useContext(r);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);