const { execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { FrenglishSDK } = require('@frenglish/sdk');

// Start from the current directory (docs)
const ORIGIN_LANGUAGE_DIR = path.resolve('./i18n'); // This is the relative path to the origin language directory
const FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY;
const frenglish = FrenglishSDK(FRENGLISH_API_KEY);

// Get excluded files from environment variable
const EXCLUDED_FILES = ['package.json', 'package-lock.json', 'node_modules'];

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