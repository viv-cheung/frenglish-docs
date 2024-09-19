---
id: example
sidebar_position: 5
description: Example use case for SDK
slug: /SDK
---

# Full Example

Here's a complete example combining all the steps:

```const fs = require('fs').promises;
const path = require('path');
const FrenglishSDK = require('frenglish-sdk').default;

const FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY || 'YOUR_API_KEY_HERE';
const frenglish = new FrenglishSDK(FRENGLISH_API_KEY);

async function main() {
  try {
    // Step 1: Prepare files
    const filesToTranslate = ['src/locales/en/file1.txt', 'src/locales/en/file2.txt'];
    const fileContents = await Promise.all(filesToTranslate.map(async (file) => {
      const content = await fs.readFile(file, 'utf-8');
      return { fileId: path.basename(file), content };
    }));

    const filenames = fileContents.map(file => file.fileId);
    const contents = fileContents.map(file => file.content);

    // Step 2: Request translation
    const translation = await frenglish.translate(filenames, contents);
    console.log(`Translation requested with ID: ${translation.translationId}`);

    // Step 3: Retrieve translated content
    const translatedContent = translation.content;

    // Step 4: Save translated files
    for (const languageData of translatedContent) {
      const language = languageData.language;
      const translatedFiles = languageData.files;

      for (const translatedFile of translatedFiles) {
        const translatedFilePath = path.join('src/locales', language, translatedFile.fileId);
        await fs.mkdir(path.dirname(translatedFilePath), { recursive: true });
        await fs.writeFile(translatedFilePath, translatedFile.content);
        console.log(`Translated file written: ${translatedFilePath}`);
      }
    }
  } catch (error) {
    console.error('Error during translation process:', error);
    process.exit(1);
  }
}

main();```