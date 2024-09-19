# How to set up GitHub Action

This guide will walk you through the process of setting up a GitHub Action to automatically translate your repository's content using the Frenglish SDK.

## Prerequisites

1. A GitHub repository where you want to implement the translations
2. A Frenglish API key (get it at www.frenglish.ai under your cli/sdk project in the developer setting's tab)

## Setup Steps

1. **Create the GitHub Action workflow file**

   Create a new file in your repository at `.github/workflows/frenglish-translation.yml` and copy the provided GitHub Action code into it.

   ```
    name: Frenglish Translation

    on:
    push:
        branches:
        - '**'  # This will trigger on pushes to any branch

    jobs:
    translate:
        runs-on: ubuntu-latest
        permissions:
        contents: write
        pull-requests: write
        steps:
        - name: Checkout code
            uses: actions/checkout@v3

        - name: Setup Node.js
            uses: actions/setup-node@v3
            with:
            node-version: '18'

        - name: Install dependencies
            run: |
            npm install
            npm install frenglish-sdk

        - name: Get branch name
            id: branch-name
            run: echo "branch=${GITHUB_REF#refs/heads/}" >> $GITHUB_OUTPUT

        - name: Run translation script
            env:
            FRENGLISH_API_KEY: ${{ secrets.FRENGLISH_API_KEY }}
            run: node .github/scripts/translate.js

        - name: Create Pull Request
            uses: peter-evans/create-pull-request@v5
            with:
            token: ${{ secrets.GITHUB_TOKEN }}
            commit-message: Add translated files
            title: "Frenglish Translation Update for ${{ steps.branch-name.outputs.branch }}"
            body: "This PR contains updated translations for the changed files in branch ${{ steps.branch-name.outputs.branch }}."
            branch: ${{ steps.branch-name.outputs.branch }}-frenglish-translations
            base: ${{ steps.branch-name.outputs.branch }}
   ```

2. **Set up the Frenglish API key**

   Store your Frenglish API key as a GitHub secret:
   
   a. Go to your repository on GitHub
   b. Click on "Settings" > "Secrets and variables" > "Actions"
   c. Click "New repository secret"
   d. Name: `FRENGLISH_API_KEY`
   e. Value: Your Frenglish API key
   f. Click "Add secret"

3. **Create the translation script**

   Create a new file at `.github/scripts/translate.js`. This script will use the Frenglish SDK to perform the translations. Here's a basic example:

   ```javascript
    const { execSync } = require('child_process');
    const fs = require('fs').promises;
    const path = require('path');
    const FrenglishSDK = require('frenglish-sdk').default;

    const ORIGIN_LANGUAGE_DIR = 'src/locales/en';  // Adjust this to your origin language directory
    const FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY;
    const frenglish = new FrenglishSDK(FRENGLISH_API_KEY);

    async function getChangedFiles() {
    try {
        // First, try to get changed files between the last two commits
        console.log('Attempting to get changed files from git diff...');
        const output = execSync('git diff --name-only HEAD^ HEAD').toString().trim();
        const changedFiles = output.split('\n').filter(file => file.startsWith(ORIGIN_LANGUAGE_DIR));
        console.log('Changed files:', changedFiles);
        
        if (changedFiles.length > 0) {
        return changedFiles;
        } else {
        console.log('No changed files found in the origin language directory. Falling back to all files.');
        }
    } catch (error) {
        console.log('Error getting changed files:', error.message);
        console.log('Falling back to all files in the origin language directory.');
    }

    // Fallback: get all files in the origin language directory
    console.log('Getting all files from:', ORIGIN_LANGUAGE_DIR);
    const allFiles = execSync(`find ${ORIGIN_LANGUAGE_DIR} -type f`).toString().trim().split('\n');
    console.log('All files:', allFiles);
    return allFiles;
    }

    async function main() {
    try {
        const filesToTranslate = await getChangedFiles();

        if (filesToTranslate.length === 0) {
        console.log('No files to translate');
        return;
        }

        console.log('Files to translate:', filesToTranslate);

        const fileContents = await Promise.all(filesToTranslate.map(async (file) => {
        const content = await fs.readFile(file, 'utf-8');
        return { fileId: path.basename(file), content };
        }));

        const filenames = fileContents.map(file => file.fileId);
        const contents = fileContents.map(file => file.content);

        console.log('Initiating translation...');
        console.log("contents", contents);
        
        // Adjust the translate call based on the SDK's expected parameters
        const translation = await frenglish.translate(filenames, contents);
        console.log(`Translation requested with ID: ${translation.translationId}`);

        for (const languageData of translation.content) {
        const language = languageData.language
        const translatedFiles = languageData.files

        console.log("language", language);
        console.log("translatedFiles", translatedFiles);

        for (const translatedFile of translatedFiles) {
            const originalFile = filesToTranslate.find(file => path.basename(file) === translatedFile.fileId);
            if (originalFile) {
            const translatedFilePath = originalFile.replace(`/en/`, `/${language}/`);
            await fs.mkdir(path.dirname(translatedFilePath), { recursive: true });
            await fs.writeFile(translatedFilePath, translatedFile.content);
            console.log(`Translated file written: ${translatedFilePath}`);
            } else {
            console.warn(`Original file not found for translated file: ${translatedFile.fileId}`);
            }
        }
        }
    } catch (error) {
        console.error('Error during translation process:', error);
        if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', await error.response.text());
        }
        process.exit(1);
    }
    }

    main();
   ```

   Adjust this script as needed to fit your specific translation requirements.

4. **Update your `package.json`**

   Ensure your `package.json` includes the Frenglish SDK as a dependency:

   ```json
   {
     "dependencies": {
       "frenglish": "^1.0.1"
     }
   }
   ```

5. **Commit and push your changes**

   Add the new files to your repository:
   ```
   git add .github/workflows/frenglish-translation.yml .github/scripts/translate.js
   git commit -m "Add Frenglish translation GitHub Action"
   git push
   ```

6. **Verify the Action**

   After pushing your changes:
   a. Go to your repository on GitHub
   b. Click on the "Actions" tab
   c. You should see the "Frenglish Translation" workflow running

## How it works

1. The action is triggered on every push to any branch.
2. It checks out your code and sets up Node.js.
3. It installs the necessary dependencies, including the Frenglish SDK.
4. It runs your translation script, which uses the Frenglish SDK to translate your files.
5. If changes are made, it creates a new pull request with the translated files.

## Customization

- You can adjust the trigger in the workflow file to run on specific branches or events.
- Modify the `translate.js` script to handle different file types or translation processes as needed.
- Update the pull request creation step if you want to change how the translations are submitted for review.

## Troubleshooting

If you encounter any issues:
1. Check the Action logs in the GitHub Actions tab for error messages.
2. Ensure your Frenglish API key is correctly set in the repository secrets.
3. Verify that your `translate.js` script is correctly using the Frenglish SDK.

Remember to keep your Frenglish API key secret and never commit it directly to your repository.