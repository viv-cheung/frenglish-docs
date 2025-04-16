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
            const output = execSync(`git diff --name-only origin/${defaultBranch}...origin/${currentBranch}`).toString().trim();
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