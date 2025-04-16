# How to set up GitHub Action

This guide will walk you through the process of setting up a GitHub Action to automatically translate your repository's content using the Frenglish SDK.

## Prerequisites

1. A GitHub repository where you want to implement the translations
2. A Frenglish private API key (get it at www.frenglish.ai under your cli/sdk project in the developer setting's tab)

## Setup Steps

1. **Create the GitHub Action workflow file**

   Create a new file in your repository at `.github/workflows/frenglish-translation.yml` and copy the provided GitHub Action code into it.

   ```
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

2. **Set up the Frenglish API key**

   Store your Frenglish API key as a GitHub secret:
   
   a. Go to your repository on GitHub
   b. Click on "Settings" > "Secrets and variables" > "Actions"
   c. Click "New repository secret"
   d. Name: `FRENGLISH_API_KEY`
   e. Value: Your Frenglish private API key
   f. Click "Add secret"

3. **Create the translation script**

   Create a new file at `.github/scripts/translate.js`. This script will use the Frenglish SDK to perform the translations. Here's a basic example:

   ```javascript
    import { execSync } from 'child_process';
    import { promises as fs } from 'fs';
    import path from 'path';
    import { FrenglishSDK } from '@frenglish/sdk';

    // Start from the current directory (docs)
    const ORIGIN_LANGUAGE_DIR = path.resolve('./'); // This is the relative path to the origin language directory
    const FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY;
    const frenglish = FrenglishSDK(FRENGLISH_API_KEY);

    // Get excluded files from environment variable
    const EXCLUDED_FILES = process.env.EXCLUDED_FILES 
    ? JSON.parse(process.env.EXCLUDED_FILES.replace(/'/g, '"'))
    : ['package.json', 'package-lock.json', 'node_modules'];

    /**
    * Gets the default branch name from GitHub API.
    * You could override this function to use a different "default" branch.
    */
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

    /**
    * Checks if a file is under the origin language directory and has a supported locale file tyoe for translation
    */
    async function isSupportedFile(filePath) {
    try {
        // Check if file is under origin language directory
        const relativePath = path.relative(ORIGIN_LANGUAGE_DIR, filePath);
        if (relativePath.startsWith('..')) {
        return false;
        }

        // Check if file is in the excluded list
        if (EXCLUDED_FILES.some(excluded => filePath.includes(excluded))) {
        console.log(`File ${filePath} is excluded from translation`);
        return false;
        }

        // Get supported file types from the SDK
        const supportedFileTypes = await frenglish.getSupportedFileTypes();
        const validFileTypes = supportedFileTypes.filter(type => type.length > 0);

        // Check if file extension is supported
        const ext = path.extname(filePath).toLowerCase().replace('.', '');
        return ext && validFileTypes.includes(ext);
    } catch (error) {
        console.log(`Error checking file ${filePath}:`, error.message);
        return false;
    }
    }

    async function getChangedFiles() {
    try {
        // Get the default branch
        const defaultBranch = await getDefaultBranch();
        console.log('Default branch:', defaultBranch);

        // Get the current branch
        const currentBranch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF?.replace('refs/heads/', '');
        console.log('Current branch:', currentBranch);

        // Fetch both branches with different local names to avoid conflicts
        execSync(`git fetch origin ${defaultBranch}:refs/remotes/origin/${defaultBranch}`);
        execSync(`git fetch origin ${currentBranch}:refs/remotes/origin/${currentBranch}`);
        
        console.log(`Getting changed files between ${defaultBranch} and ${currentBranch}...`);
        const output = execSync(`git diff --name-only origin/${defaultBranch}...origin/${currentBranch}`).toString().trim();
        const changedFiles = output.split('\n');
        console.log('All changed files:', changedFiles);

        // Check each changed file to see if it's a supported file in the origin language directory
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
        // Get configuration and supported languages
        const config = await frenglish.getDefaultConfiguration();
        const originLanguage = config.originLanguage.toLowerCase();

        // Get changed files that need translation
        const filesToTranslate = await getChangedFiles();
        if (filesToTranslate.length === 0) {
        console.log('No files to translate');
        return;
        }

        // Read the content of changed files
        const fileContents = await Promise.all(filesToTranslate.map(async (file) => {
        const content = await fs.readFile(file, 'utf-8');
        return { fileId: path.relative(ORIGIN_LANGUAGE_DIR, file), content };
        }));

        const filenames = fileContents.map(file => file.fileId);
        const contents = fileContents.map(file => file.content);

        console.log('Initiating translation...');
        const translation = await frenglish.translate(contents, false, filenames);
        console.log(`Translation requested with ID: ${translation.translationId}`);

        // Configure git for the PR
        execSync('git config --global user.email "github-actions[bot]@users.noreply.github.com"');
        execSync('git config --global user.name "github-actions[bot]"');

        // Process each language's translations
        for (const languageData of translation.content) {
        const language = languageData.language;
        if (language === originLanguage) continue; // Skip origin language

        // Create language-specific output directory
        const languageOutputDir = path.join(ORIGIN_LANGUAGE_DIR, language);
        await fs.mkdir(languageOutputDir, { recursive: true });
        console.log(`Created output directory for ${language}: ${languageOutputDir}`);

        for (const translatedFile of languageData.files) {
            const originalFile = filesToTranslate.find(file => 
            path.relative(ORIGIN_LANGUAGE_DIR, file) === translatedFile.fileId
            );
            if (originalFile) {
            // Create the full output path maintaining the original structure
            const translatedFilePath = path.join(languageOutputDir, translatedFile.fileId);
            await fs.mkdir(path.dirname(translatedFilePath), { recursive: true });

            if (translatedFile.content.length > 0) {
                await fs.writeFile(translatedFilePath, translatedFile.content, 'utf8');
                console.log(`Translated file written: ${translatedFilePath}`);

                // Add the translated file to git
                execSync(`git add ${translatedFilePath}`);
            } else {
                console.warn(`Empty content for file: ${translatedFile.fileId}. Skipping.`);
            }
            } else {
            console.warn(`Original file not found for translated file: ${translatedFile.fileId}`);
            }
        }
        }

        // Check if there are any changes to commit
        const status = execSync('git status --porcelain').toString().trim();
        if (status) {
        // Commit and push the translations
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
   ```

   Adjust this script as needed to fit your specific translation requirements.

4. **Update your `package.json`**

   Ensure your `package.json` includes the Frenglish SDK as a dependency:

   ```json
   {
    "dependencies": {
        "@frenglish/cli": "latest",
        "@frenglish/sdk": "latest",
        "@frenglish/utils": "latest"
    },
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
5. If changes are made, it will automatically create the locale files in the supported languages you specified in the output translation path you specified

## Customization

- You can adjust the trigger in the workflow file to run on specific branches or events.
- Modify the `translate.js` script to handle different file types or translation processes as needed.
- Update the pull request creation step if you want to change how the translations are submitted for review.

## Troubleshooting

If you encounter any issues:
1. Check the Action logs in the GitHub Actions tab for error messages.
2. Ensure your Frenglish private API key is correctly set in the repository secrets.
3. Verify that your `translate.js` script is correctly using the Frenglish SDK.

Remember to keep your Frenglish API key secret and never commit it directly to your repository.