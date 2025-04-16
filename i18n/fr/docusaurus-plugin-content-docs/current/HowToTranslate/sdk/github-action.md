# MOCKDATA + fr-translated How to set up GitHub Action
fr-translated This guide will walk you through the process of setting up a GitHub Action to automatically translate your repository's content using the Frenglish SDK.

## MOCKDATA + fr-translated Prerequisites

1. fr-translated A GitHub repository where you want to implement the translations
2. MOCKDATA + fr-translated A Frenglish private API key (get it at [www.frenglish.ai](http://www.frenglish.ai) under your cli/sdk project in the developer setting's tab)

## fr-translated Setup Steps

1.  MOCKDATA + fr-translated **Create the GitHub Action workflow file**

    fr-translated Create a new file in your repository at `.github/workflows/frenglish-translation.yml` and copy the provided GitHub Action code into it (see code below).

    ```yaml
    name: Frenglish Translation

    on:
      push:
        branches:
          - '**'

    jobs:
      translate:
        if: github.event_name == 'push' && !contains(github.event.head_commit.message, 'Merge pull request')
        runs-on: ubuntu-latest
        permissions:
          contents: write
          pull-requests: write
        steps:
          - name: Checkout code
            uses: actions/checkout@v4
            with:
              fetch-depth: 0
              token: ${{ secrets.GITHUB_TOKEN }}
          - name: Setup Node.js
            uses: actions/setup-node@v3
            with:
              node-version: '18'

          - name: Install dependencies
            run: |
              npm install
              npm install frenglish

          - name: Setup Git
            run: |
              git config --global user.email "github-actions[bot]@users.noreply.github.com"
              git config --global user.name "github-actions[bot]"
              git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}.git

          - name: Run translation script
            env:
              FRENGLISH_API_KEY: ${{ secrets.FRENGLISH_API_KEY }}
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            run: node .github/scripts/translate.js
    ```

2.  MOCKDATA + fr-translated **Set up the Frenglish API key**

    fr-translated Store your Frenglish API key as a GitHub secret:

    MOCKDATA + fr-translated a. Go to your repository on GitHub
    b. Click on "Settings" > "Secrets and variables" > "Actions"
    c. Click "New repository secret"
    d. Name: `FRENGLISH_API_KEY`
    e. Value: Your Frenglish private API key
    f. Click "Add secret"

3.  fr-translated **Create the translation script**

    MOCKDATA + fr-translated Create a new file at `.github/scripts/translate.js`. This script will use the Frenglish SDK to perform the translations.

    MOCKDATA + fr-translated Copy the translation script you could install in `.github/scripts/translate.js`:

    ```javascript
    const { execSync } = require('child_process');
    const fs = require('fs').promises;
    const path = require('path');

    // ============================================================
    // 🔧 REQUIRED CONFIGURATION – USERS MUST MODIFY THESE VALUES
    // ============================================================

    // Path to your original language files (e.g., English source content)
    const ORIGIN_LANGUAGE_DIR = path.resolve('./i18n');

    // Path where translated files will be saved
    const TRANSLATION_OUTPUT_DIR = path.resolve('./i18n');

    // List of files or directories to exclude from processing
    const EXCLUDED_FILES = ['package.json', 'package-lock.json', 'node_modules'];

    // ============================================================
    // DO NOT MODIFY BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING
    // ============================================================

    (async () => {
        // Dynamically import the ESM-only module
        const sdkModule = await import('@frenglish/sdk');
        const FrenglishSDK = sdkModule.FrenglishSDK;
        if (!FrenglishSDK) throw new Error('FrenglishSDK not found in module exports.');

        // Retrieve the API key from environment variable
        const FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY;
        const frenglish = FrenglishSDK(FRENGLISH_API_KEY);

        async function getDefaultBranch() {
            try {
                const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}`, {
                    headers: {
                        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                const data = await response.json();
                return data.default_branch;
            } catch (error) {
                console.log('Error getting default branch:', error.message);
                return 'main';
            }
        }

        async function isSupportedFile(filePath) {
            try {
                const relativePath = path.relative(ORIGIN_LANGUAGE_DIR, filePath);
                if (relativePath.startsWith('..')) {
                    return false;
                }

                if (EXCLUDED_FILES.some(excluded => filePath.includes(excluded))) {
                    console.log(`File ${filePath} is excluded from translation`);
                    return false;
                }

                const supportedFileTypes = await frenglish.getSupportedFileTypes();
                const validFileTypes = supportedFileTypes.filter(type => type.length > 0);
                const ext = path.extname(filePath).toLowerCase().replace('.', '');
                return ext && validFileTypes.includes(ext);
            } catch (error) {
                console.log(`Error checking file ${filePath}:`, error.message);
                return false;
            }
        }

        async function getChangedFiles() {
            try {
                const defaultBranch = await getDefaultBranch();
                console.log('Default branch:', defaultBranch);
                const currentBranch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF?.replace('refs/heads/', '');
                console.log('Current branch:', currentBranch);
                execSync(`git fetch origin ${defaultBranch}:refs/remotes/origin/${defaultBranch}`);
                execSync(`git fetch origin ${currentBranch}:refs/remotes/origin/${currentBranch}`);
                console.log(`Getting changed files between ${defaultBranch} and ${currentBranch}...`);
                const output = execSync(`git diff --diff-filter=ACM --name-only origin/${defaultBranch}...origin/${currentBranch}`).toString().trim();
                const changedFiles = output.split('\n');
                console.log('All changed files:', changedFiles);
                const supportedFiles = [];
                for (const file of changedFiles) {
                    const isSupported = await isSupportedFile(file);
                    if (isSupported) {
                        supportedFiles.push(file);
                    }
                }
                console.log('Supported changed files:', supportedFiles);
                return supportedFiles;
            } catch (error) {
                console.log('Error getting changed files:', error.message);
                return [];
            }
        }

        async function translateAndPushChanges() {
            try {
                const config = await frenglish.getDefaultConfiguration();
                const originLanguage = config.originLanguage.toLowerCase();
                const filesToTranslate = await getChangedFiles();
                if (filesToTranslate.length === 0) {
                    console.log('No files to translate');
                    return;
                }

                const fileContents = await Promise.all(filesToTranslate.map(async (file) => {
                    const content = await fs.readFile(file, 'utf-8');
                    return { fileId: path.relative(ORIGIN_LANGUAGE_DIR, file), content };
                }));

                const filenames = fileContents.map(file => file.fileId);
                const contents = fileContents.map(file => file.content);

                console.log('Initiating translation...');
                const translation = await frenglish.translate(contents, false, filenames);
                console.log(`Translation requested with ID: ${translation.translationId}`);

                execSync('git config --global user.email "github-actions[bot]@users.noreply.github.com"');
                execSync('git config --global user.name "github-actions[bot]"');

                for (const languageData of translation.content) {
                    const language = languageData.language;
                    if (language === originLanguage) continue;
                    const languageOutputDir = path.join(TRANSLATION_OUTPUT_DIR, language);
                    await fs.mkdir(languageOutputDir, { recursive: true });
                    console.log(`Created output directory for ${language}: ${languageOutputDir}`);

                    for (const translatedFile of languageData.files) {
                        const originalFile = filesToTranslate.find(file =>
                            path.relative(ORIGIN_LANGUAGE_DIR, file) === translatedFile.fileId
                        );
                        if (originalFile) {
                            const translatedFilePath = path.join(languageOutputDir, translatedFile.fileId);
                            await fs.mkdir(path.dirname(translatedFilePath), { recursive: true });
                            if (translatedFile.content.length > 0) {
                                await fs.writeFile(translatedFilePath, translatedFile.content, 'utf8');
                                console.log(`Translated file written: ${translatedFilePath}`);
                                execSync(`git add ${translatedFilePath}`);
                            } else {
                                console.warn(`Empty content for file: ${translatedFile.fileId}. Skipping.`);
                            }
                        } else {
                            console.warn(`Original file not found for translated file: ${translatedFile.fileId}`);
                        }
                    }
                }

                const status = execSync('git status --porcelain').toString().trim();
                if (status) {
                    execSync('git commit -m "chore: update translations"');
                    execSync(`git push origin ${process.env.GITHUB_HEAD_REF}`);
                    console.log('Translations pushed to PR');
                } else {
                    console.log('No translations to commit');
                }
            } catch (error) {
                console.error('Error during translation process:', error);
                process.exit(1);
            }
        }

        // Run the translation process
        translateAndPushChanges();
    })();
    ```

    fr-translated :::caution

    MOCKDATA + fr-translated Ensure you adjust the parameters within the `🔧 REQUIRED CONFIGURATION` section in the above script

    fr-translated :::

4.  MOCKDATA + fr-translated **Install Frenglish SDK dependencies**

    fr-translated Use your favorite package manager to install Frenglish:

    ```bash
    npm install @frenglish/cli @frenglish/sdk @frenglish/utils
    ```

    MOCKDATA + fr-translated or

    ```bash
    yarn add @frenglish/cli @frenglish/sdk @frenglish/utils
    ```

    MOCKDATA + fr-translated or

    ```bash
    pnpm add @frenglish/cli @frenglish/sdk @frenglish/utils
    ```

5.  MOCKDATA + fr-translated **Commit and push your changes**

    fr-translated Add the new files to your repository:

    ```bash
    git add .github/workflows/frenglish-translation.yml .github/scripts/translate.js
    git commit -m "Add Frenglish translation GitHub Action"
    git push
    ```

6.  MOCKDATA + fr-translated **Verify the Action**

    fr-translated After pushing your changes:
    a. Go to your repository on GitHub
    b. Click on the "Actions" tab
    c. You should see the "Frenglish Translation" workflow running

## MOCKDATA + fr-translated How it works

1. fr-translated The action is triggered on every push to any branch.
2. MOCKDATA + fr-translated It checks out your code and sets up Node.js.
3. fr-translated It installs the necessary dependencies, including the Frenglish SDK.
4. MOCKDATA + fr-translated It runs your translation script, which uses the Frenglish SDK to translate your files.
5. fr-translated If changes are made, it will automatically create the locale files in the supported languages you specified in the output translation path you specified.

## MOCKDATA + fr-translated Customization

- fr-translated You can adjust the trigger in the workflow file to run on specific branches or events.
- MOCKDATA + fr-translated Modify the `translate.js` script to handle different file types or translation processes as needed.
- fr-translated Update the pull request creation step if you want to change how the translations are submitted for review.

## MOCKDATA + fr-translated Troubleshooting
fr-translated If you encounter any issues:
1. MOCKDATA + fr-translated Check the Action logs in the GitHub Actions tab for error messages.
2. fr-translated Ensure your Frenglish private API key is correctly set in the repository secrets.
3. MOCKDATA + fr-translated Verify that your `translate.js` script is correctly using the Frenglish SDK.

fr-translated Remember to keep your Frenglish API key secret and never commit it directly to your repository.