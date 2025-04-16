# fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated Как настроить GitHub Action
MOCKDATA + fr-translated fr-translated fr-translated fr-translated fr-translated В этом руководстве описан процесс настройки GitHub Action для автоматического перевода содержимого вашего репозитория с помощью Frenglish SDK.

## fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated Предварительные требования

1. MOCKDATA + fr-translated fr-translated fr-translated fr-translated fr-translated Репозиторий на GitHub, в котором вы хотите реализовать переводы
2. fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated Приватный API-ключ Frenglish (получите его на [www.frenglish.ai](http://www.frenglish.ai) в разделе "Настройки разработчика" вашего проекта cli/sdk)

## MOCKDATA + fr-translated fr-translated fr-translated fr-translated fr-translated Этапы настройки

1.  fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated **Создайте файл workflow для GitHub Action**

    MOCKDATA + fr-translated fr-translated fr-translated fr-translated fr-translated Создайте новый файл в вашем репозитории по пути `.github/workflows/frenglish-translation.yml` и вставьте в него предоставленный код GitHub Action (см. код ниже).

    ```
    ```

fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated name: Frenglish Translation

MOCKDATA + fr-translated fr-translated fr-translated fr-translated fr-translated on:
push:
branches:
\- '\*\*'

fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated jobs:
translate:
if: github.event\_name == 'push' && !contains(github.event.head\_commit.message, 'Merge pull request')
runs-on: ubuntu-latest
permissions:
contents: write
pull-requests: write
steps:
\- name: Checkout code
uses: actions/checkout\@v4
with:
fetch-depth: 0
token: $\{\{ secrets.GITHUB\_TOKEN }}
\- name: Setup Node.js
uses: actions/setup-node\@v3
with:
node-version: '18'

```
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

````

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
````

fr-translated fr-translated MOCKDATA + fr-translated fr-translated fr-translated При необходимости адаптируйте этот скрипт под ваши конкретные задачи перевода.

MOCKDATA + fr-translated **Шаг 4: Установите зависимости Frenglish SDK**

fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated Используйте ваш любимый менеджер пакетов для установки Frenglish:

```bash
npm install @frenglish/cli @frenglish/sdk @frenglish/utils
```

```bash
yarn add @frenglish/cli @frenglish/sdk @frenglish/utils
```

```bash
pnpm add @frenglish/cli @frenglish/sdk @frenglish/utils
```

5.  MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated **Зафиксируйте и отправьте изменения**

    fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated Добавьте новые файлы в ваш репозиторий:

    ```
    git add .github/workflows/frenglish-translation.yml .github/scripts/translate.js
    git commit -m "Add Frenglish translation GitHub Action"
    git push
    ```

6.  MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated **Проверьте работу Action**

    fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated После отправки изменений:
    a. Перейдите в ваш репозиторий на GitHub
    b. Нажмите на вкладку "Actions"
    c. Вы должны увидеть выполнение workflow "Frenglish Translation"

## MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated Как это работает

1. fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated Действие запускается при каждом пуше в любую ветку.
2. MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated Оно извлекает ваш код и настраивает Node.js.
3. fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated Устанавливаются необходимые зависимости, включая Frenglish SDK.
4. MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated Запускается ваш скрипт перевода, который использует Frenglish SDK для перевода файлов.
5. fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated Если были внесены изменения, автоматически создаются файлы локализации на поддерживаемых языках, в указанном вами пути вывода перевода

## MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated Настройка

- fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated fr-translated Вы можете изменить триггер в файле workflow, чтобы запуск происходил только для определённых веток или событий.
- MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated Измените скрипт `translate.js`, чтобы при необходимости обрабатывать другие типы файлов или выполнять другие процессы перевода.
- fr-translated fr-translated fr-translated MOCKDATA + fr-translated fr-translated Обновите шаг создания pull request, при необходимости изменив способ отправки переводов на проверку.

## MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated Устранение неполадок
fr-translated fr-translated fr-translated MOCKDATA + fr-translated fr-translated Если возникли проблемы:
1. MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated fr-translated MOCKDATA + fr-translated Проверьте журналы действий во вкладке GitHub Actions на наличие ошибок.
2. fr-translated fr-translated fr-translated MOCKDATA + fr-translated fr-translated Убедитесь, что ваш приватный API-ключ Frenglish правильно указан в секретах репозитория.
3. MOCKDATA + fr-translated MOCKDATA + fr-translated MOCKDATA + fr-translated Убедитесь, что ваш скрипт `translate.js` правильно использует Frenglish SDK.

fr-translated fr-translated fr-translated Не забывайте держать ваш API-ключ Frenglish в секрете и никогда не добавляйте его напрямую в репозиторий.