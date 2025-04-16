---
id: sdk-quickstart
sidebar_position: 1
description: MOCKDATA + fr-translated Learn how to use Frenglish's SDK to integrate automatic translation of content into your applications
---

# fr-translated SDK Quickstart

## MOCKDATA + fr-translated Introduction
MOCKDATA + fr-translated The Frenglish SDK is a powerful tool that enables developers to integrate automatic translation of content files into their applications. This SDK handles the entire translation process, from submitting files for translation to retrieving the translated content.

## fr-translated Installation

```bash
npm install @frenglish/sdk
```

## fr-translated Quick Start

```javascript
import { FrenglishSDK } from '@frenglish/sdk';

// Initialize the SDK with your API key
const sdk = FrenglishSDK('your_api_key');

// Example: Translate content
async function translateContent() {
  try {
    const result = await sdk.translate(
      ['Hello world', 'Welcome to our app'],
      true, // isFullTranslation
      ['welcome.txt', 'greeting.txt']
    );
    console.log('Translation result:', result);
  } catch (error) {
    console.error('Translation failed:', error);
  }
}
```

## MOCKDATA + fr-translated Core Features

### fr-translated Translation

```javascript
// Translate multiple strings
const result = await sdk.translate(
  content: string[],           // Array of content to translate
  isFullTranslation?: boolean, // Whether to perform a full translation
  filenames?: string[],        // Optional filenames for the content
  partialConfig?: PartialConfiguration // Optional configuration overrides
);

// Translate a single string
const translated = await sdk.translateString(
  content: string | string[],            // String or string[] to translate
  lang: string,                          // Target language code
  partialConfig?: PartialConfiguration
);
```

### MOCKDATA + fr-translated Project Management

```javascript
// Get project information
const project = await sdk.getProjectInformation();

// Update project name
await sdk.updateProjectName('New Project Name');

// Toggle project active status
await sdk.setProjectActiveStatus(true);

// Toggle test mode
await sdk.setTestMode(true);
```

### MOCKDATA + fr-translated Configuration

```javascript
// Get default configuration
const config = await sdk.getDefaultConfiguration();

// Update configuration
await sdk.updateConfiguration({
  originLanguage: 'en',
  languages: ['fr', 'es'],
  rules: 'Use a casual tone'
});

// Get supported languages
const languages = await sdk.getSupportedLanguages();

// Get supported file types
const fileTypes = await sdk.getSupportedFileTypes();
```

### fr-translated File Management

```javascript
// Upload files for translation
const uploadResult = await sdk.upload([
  {
    content: 'Hello world',
    language: 'en'
  }
]);

// Get project's text map
const textMap = await sdk.getTextMap();
```

## MOCKDATA + fr-translated SDK Methods Reference

### fr-translated Translation Methods

1.  MOCKDATA + fr-translated **translate**
    - fr-translated Description: Translates multiple strings or content blocks to all configured target languages
    - MOCKDATA + fr-translated Parameters:
      - fr-translated `content`: string\[] - Array of content to translate
      - MOCKDATA + fr-translated `isFullTranslation`: boolean (optional) - Whether to perform a full translation
      - fr-translated `filenames`: string\[] (optional) - Filenames for the content
      - MOCKDATA + fr-translated `partialConfig`: PartialConfiguration (optional) - Configuration overrides
    - fr-translated Returns: `Promise<{ translationId: number, content: TranslationResponse[] }>`

2.  MOCKDATA + fr-translated **translateString**
    - fr-translated Description: Translates a single string to a specific target language
    - MOCKDATA + fr-translated Parameters:
      - MOCKDATA + fr-translated `content`: string | string \[] - Single string to translate or an array of strings to translate
      - fr-translated `lang`: string - Target language code
      - MOCKDATA + fr-translated `partialConfig`: PartialConfiguration (optional) - Configuration overrides
    - MOCKDATA + fr-translated Returns: `Promise<string | string[] | undefined>`

3.  fr-translated **getTranslationStatus**
    - MOCKDATA + fr-translated Description: Checks the current status of a translation request (e.g., completed, in progress, cancelled)
    - MOCKDATA + fr-translated Parameters:
      - fr-translated `translationId`: number - ID of the translation to check
    - MOCKDATA + fr-translated Returns: `Promise<TranslationStatus>`

4.  fr-translated **getTranslationContent**
    - MOCKDATA + fr-translated Description: Retrieves the translated content for a completed translation
    - MOCKDATA + fr-translated Parameters:
      - fr-translated `translationId`: number - ID of the translation to retrieve
    - MOCKDATA + fr-translated Returns: `Promise<TranslationResponse[]>`

### fr-translated Project Management Methods

1.  MOCKDATA + fr-translated **getProjectInformation**
    - fr-translated Description: Retrieves detailed information about the current project
    - MOCKDATA + fr-translated Returns:`Promise<Project>`

2.  fr-translated **updateProjectName**
    - MOCKDATA + fr-translated Description: Updates the name of the current project
    - MOCKDATA + fr-translated Parameters:
      - fr-translated `updatedProjectName`: string - New project name
    - MOCKDATA + fr-translated Returns: `Promise<Project>`

3.  fr-translated **setProjectActiveStatus**
    - MOCKDATA + fr-translated Description: Enables or disables the project's active status
    - MOCKDATA + fr-translated Parameters:
      - fr-translated `isActive`: boolean - New active status
    - MOCKDATA + fr-translated Returns: `Promise<Project>`

4.  MOCKDATA + fr-translated **setTestMode**
    - fr-translated Description: Toggles test mode for the project, useful for testing without consuming API credits
    - MOCKDATA + fr-translated Parameters:
      - MOCKDATA + fr-translated `isTestMode`: boolean - New test mode status
    - MOCKDATA + fr-translated Returns: `Promise<Project>`

### fr-translated Configuration Methods

1.  MOCKDATA + fr-translated **getDefaultConfiguration**
    - fr-translated Description: Retrieves the default configuration settings for the project
    - MOCKDATA + fr-translated Returns: `Promise<Configuration>`

2.  MOCKDATA + fr-translated **updateConfiguration**
    - fr-translated Description: Updates the project's configuration settings
    - MOCKDATA + fr-translated Parameters:
      - MOCKDATA + fr-translated `partiallyUpdatedConfig`: PartialConfiguration - Configuration updates
    - MOCKDATA + fr-translated Returns: `Promise<Configuration>`

3.  fr-translated **getProjectSupportedLanguages**
    - MOCKDATA + fr-translated Description: Gets the list of languages supported by the project and the origin language
    - fr-translated Returns: `Promise<{ languages: string[], originLanguage: string }>`

4.  MOCKDATA + fr-translated **getSupportedLanguages**
    - fr-translated Description: Gets all languages supported by the Frenglish service
    - MOCKDATA + fr-translated Returns: `Promise<string[]>`

5.  fr-translated **getSupportedFileTypes**
    - MOCKDATA + fr-translated Description: Gets all file types that can be processed for translation
    - MOCKDATA + fr-translated Returns: `Promise<string[]>`

### fr-translated File Management Methods

1.  MOCKDATA + fr-translated **upload**
    - fr-translated Description: Uploads files for translation, typically used as base files to compare against
    - MOCKDATA + fr-translated Parameters:
      - MOCKDATA + fr-translated `files`: FileContentWithLanguage\[] - Array of files to upload
    - fr-translated Returns: `Promise<{ message: string, originFilesInfo: Array<{ fileId: string, originS3Version: string }> }>`

2.  MOCKDATA + fr-translated **getTextMap**
    - fr-translated Description: Retrieves the project's text map, which contains mappings of text content for consistency
    - MOCKDATA + fr-translated Returns: `Promise<{ content: FlatJSON[] } | null>`

### fr-translated Domain Management Methods

1.  MOCKDATA + fr-translated **getProjectDomain**
    - fr-translated Description: Gets the domain URL associated with the current project
    - MOCKDATA + fr-translated Returns: `Promise<string>`

2.  fr-translated **getPublicAPIKeyFromDomain**
    - MOCKDATA + fr-translated Description: Retrieves the public API key associated with a given domain
    - MOCKDATA + fr-translated Parameters:
      - fr-translated `domainURL`: string - Domain URL to get API key for
    - MOCKDATA + fr-translated Returns: `Promise<string>`

## MOCKDATA + fr-translated Configuration Types

```ts
// Define the PartialConfiguration type
type PartialConfiguration = {
  originLanguage?: string;
  languages?: string[];
  rules?: string;
  languageSpecificRules?: Record<string, string>;
  // ... other configuration options
};
```