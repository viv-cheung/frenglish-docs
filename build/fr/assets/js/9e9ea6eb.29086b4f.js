/*! For license information please see 9e9ea6eb.29086b4f.js.LICENSE.txt */
"use strict";(self.webpackChunkfrenglish_docusaurus=self.webpackChunkfrenglish_docusaurus||[]).push([[199],{2839:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var s=t(4848),r=t(8453);const i={},o="How to set up GitHub Action",l={id:"HowToTranslate/sdk/github-action",title:"How to set up GitHub Action",description:"This guide will walk you through the process of setting up a GitHub Action to automatically translate your repository's content using the Frenglish SDK.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/HowToTranslate/sdk/github-action.md",sourceDirName:"HowToTranslate/sdk",slug:"/HowToTranslate/sdk/github-action",permalink:"/fr/docs/HowToTranslate/sdk/github-action",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Function Descriptions",permalink:"/fr/docs/HowToTranslate/sdk/method-descriptions"},next:{title:"Full Example",permalink:"/fr/docs/SDK"}},a={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Setup Steps",id:"setup-steps",level:2},{value:"How it works",id:"how-it-works",level:2},{value:"Customization",id:"customization",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"how-to-set-up-github-action",children:"How to set up GitHub Action"}),"\n",(0,s.jsx)(n.p,{children:"This guide will walk you through the process of setting up a GitHub Action to automatically translate your repository's content using the Frenglish SDK."}),"\n",(0,s.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"A GitHub repository where you want to implement the translations"}),"\n",(0,s.jsxs)(n.li,{children:["A Frenglish API key (get it at ",(0,s.jsx)(n.a,{href:"http://www.frenglish.ai",children:"www.frenglish.ai"})," under your cli/sdk project in the developer setting's tab)"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"setup-steps",children:"Setup Steps"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Create the GitHub Action workflow file"})}),"\n",(0,s.jsxs)(n.p,{children:["Create a new file in your repository at ",(0,s.jsx)(n.code,{children:".github/workflows/frenglish-translation.yml"})," and copy the provided GitHub Action code into it."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:' name: Frenglish Translation\n\n on:\n push:\n     branches:\n     - \'**\'  # This will trigger on pushes to any branch\n\n jobs:\n translate:\n     runs-on: ubuntu-latest\n     permissions:\n     contents: write\n     pull-requests: write\n     steps:\n     - name: Checkout code\n         uses: actions/checkout@v3\n\n     - name: Setup Node.js\n         uses: actions/setup-node@v3\n         with:\n         node-version: \'18\'\n\n     - name: Install dependencies\n         run: |\n         npm install\n         npm install frenglish\n\n     - name: Get branch name\n         id: branch-name\n         run: echo "branch=${GITHUB_REF#refs/heads/}" >> $GITHUB_OUTPUT\n\n     - name: Run translation script\n         env:\n         FRENGLISH_API_KEY: ${{ secrets.FRENGLISH_API_KEY }}\n         run: node .github/scripts/translate.js\n\n     - name: Create Pull Request\n         uses: peter-evans/create-pull-request@v5\n         with:\n         token: ${{ secrets.GITHUB_TOKEN }}\n         commit-message: Add translated files\n         title: "Frenglish Translation Update for ${{ steps.branch-name.outputs.branch }}"\n         body: "This PR contains updated translations for the changed files in branch ${{ steps.branch-name.outputs.branch }}."\n         branch: ${{ steps.branch-name.outputs.branch }}-frenglish-translations\n         base: ${{ steps.branch-name.outputs.branch }}\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Set up the Frenglish API key"})}),"\n",(0,s.jsx)(n.p,{children:"Store your Frenglish API key as a GitHub secret:"}),"\n",(0,s.jsxs)(n.p,{children:['a. Go to your repository on GitHub\nb. Click on "Settings" > "Secrets and variables" > "Actions"\nc. Click "New repository secret"\nd. Name: ',(0,s.jsx)(n.code,{children:"FRENGLISH_API_KEY"}),'\ne. Value: Your Frenglish API key\nf. Click "Add secret"']}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Create the translation script"})}),"\n",(0,s.jsxs)(n.p,{children:["Create a new file at ",(0,s.jsx)(n.code,{children:".github/scripts/translate.js"}),". This script will use the Frenglish SDK to perform the translations. Here's a basic example:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:" const { execSync } = require('child_process');\n const fs = require('fs').promises;\n const path = require('path');\n const FrenglishSDK = require('frenglish').default;\n\n const ORIGIN_LANGUAGE_DIR = 'src/locales/en';  // Adjust this to your origin language directory\n const FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY;\n const frenglish = new FrenglishSDK(FRENGLISH_API_KEY);\n\n async function getChangedFiles() {\n try {\n     // First, try to get changed files between the last two commits\n     console.log('Attempting to get changed files from git diff...');\n     const output = execSync('git diff --name-only HEAD^ HEAD').toString().trim();\n     const changedFiles = output.split('\\n').filter(file => file.startsWith(ORIGIN_LANGUAGE_DIR));\n     console.log('Changed files:', changedFiles);\n     \n     if (changedFiles.length > 0) {\n     return changedFiles;\n     } else {\n     console.log('No changed files found in the origin language directory. Falling back to all files.');\n     }\n } catch (error) {\n     console.log('Error getting changed files:', error.message);\n     console.log('Falling back to all files in the origin language directory.');\n }\n\n // Fallback: get all files in the origin language directory\n console.log('Getting all files from:', ORIGIN_LANGUAGE_DIR);\n const allFiles = execSync(`find ${ORIGIN_LANGUAGE_DIR} -type f`).toString().trim().split('\\n');\n console.log('All files:', allFiles);\n return allFiles;\n }\n\n async function main() {\n try {\n     const filesToTranslate = await getChangedFiles();\n\n     if (filesToTranslate.length === 0) {\n     console.log('No files to translate');\n     return;\n     }\n\n     console.log('Files to translate:', filesToTranslate);\n\n     const fileContents = await Promise.all(filesToTranslate.map(async (file) => {\n     const content = await fs.readFile(file, 'utf-8');\n     return { fileId: path.basename(file), content };\n     }));\n\n     const filenames = fileContents.map(file => file.fileId);\n     const contents = fileContents.map(file => file.content);\n\n     console.log('Initiating translation...');\n     console.log(\"contents\", contents);\n     \n     // Adjust the translate call based on the SDK's expected parameters\n     const translation = await frenglish.translate(contents, false, filenames);\n     console.log(`Translation requested with ID: ${translation.translationId}`);\n\n     for (const languageData of translation.content) {\n     const language = languageData.language\n     const translatedFiles = languageData.files\n\n     console.log(\"language\", language);\n     console.log(\"translatedFiles\", translatedFiles);\n\n     for (const translatedFile of translatedFiles) {\n         const originalFile = filesToTranslate.find(file => path.basename(file) === translatedFile.fileId);\n         if (originalFile) {\n         const translatedFilePath = originalFile.replace(`/en/`, `/${language}/`);\n         await fs.mkdir(path.dirname(translatedFilePath), { recursive: true });\n         await fs.writeFile(translatedFilePath, translatedFile.content);\n         console.log(`Translated file written: ${translatedFilePath}`);\n         } else {\n         console.warn(`Original file not found for translated file: ${translatedFile.fileId}`);\n         }\n     }\n     }\n } catch (error) {\n     console.error('Error during translation process:', error);\n     if (error.response) {\n     console.error('Response status:', error.response.status);\n     console.error('Response data:', await error.response.text());\n     }\n     process.exit(1);\n }\n }\n\n main();\n"})}),"\n",(0,s.jsx)(n.p,{children:"Adjust this script as needed to fit your specific translation requirements."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsxs)(n.strong,{children:["Update your ",(0,s.jsx)(n.code,{children:"package.json"})]})}),"\n",(0,s.jsxs)(n.p,{children:["Ensure your ",(0,s.jsx)(n.code,{children:"package.json"})," includes the Frenglish SDK as a dependency:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "dependencies": {\n    "frenglish": "^1.0.1"\n  }\n}\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Commit and push your changes"})}),"\n",(0,s.jsx)(n.p,{children:"Add the new files to your repository:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'git add .github/workflows/frenglish-translation.yml .github/scripts/translate.js\ngit commit -m "Add Frenglish translation GitHub Action"\ngit push\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Verify the Action"})}),"\n",(0,s.jsx)(n.p,{children:'After pushing your changes:\na. Go to your repository on GitHub\nb. Click on the "Actions" tab\nc. You should see the "Frenglish Translation" workflow running'}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"how-it-works",children:"How it works"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"The action is triggered on every push to any branch."}),"\n",(0,s.jsx)(n.li,{children:"It checks out your code and sets up Node.js."}),"\n",(0,s.jsx)(n.li,{children:"It installs the necessary dependencies, including the Frenglish SDK."}),"\n",(0,s.jsx)(n.li,{children:"It runs your translation script, which uses the Frenglish SDK to translate your files."}),"\n",(0,s.jsx)(n.li,{children:"If changes are made, it creates a new pull request with the translated files."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"customization",children:"Customization"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"You can adjust the trigger in the workflow file to run on specific branches or events."}),"\n",(0,s.jsxs)(n.li,{children:["Modify the ",(0,s.jsx)(n.code,{children:"translate.js"})," script to handle different file types or translation processes as needed."]}),"\n",(0,s.jsx)(n.li,{children:"Update the pull request creation step if you want to change how the translations are submitted for review."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,s.jsx)(n.p,{children:"If you encounter any issues:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Check the Action logs in the GitHub Actions tab for error messages."}),"\n",(0,s.jsx)(n.li,{children:"Ensure your Frenglish API key is correctly set in the repository secrets."}),"\n",(0,s.jsxs)(n.li,{children:["Verify that your ",(0,s.jsx)(n.code,{children:"translate.js"})," script is correctly using the Frenglish SDK."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Remember to keep your Frenglish API key secret and never commit it directly to your repository."})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},1020:(e,n,t)=>{var s=t(6540),r=Symbol.for("react.element"),i=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(e,n,t){var s,i={},c=null,h=null;for(s in void 0!==t&&(c=""+t),void 0!==n.key&&(c=""+n.key),void 0!==n.ref&&(h=n.ref),n)o.call(n,s)&&!a.hasOwnProperty(s)&&(i[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps)void 0===i[s]&&(i[s]=n[s]);return{$$typeof:r,type:e,key:c,ref:h,props:i,_owner:l.current}}n.Fragment=i,n.jsx=c,n.jsxs=c},4848:(e,n,t)=>{e.exports=t(1020)},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>l});var s=t(6540);const r={},i=s.createContext(r);function o(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);