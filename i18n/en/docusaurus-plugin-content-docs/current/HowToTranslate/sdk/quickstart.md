---
id: sdk-quickstart
sidebar_position: 1
description: Learn how to use Frenglish's SDK to integrate automatic translation of content into your applications
---

# SDK Quickstart

## Introduction

The Frenglish SDK is a powerful tool that enables developers to integrate automatic translation of content files into their applications. This SDK handles the entire translation process, from submitting files for translation to retrieving the translated content.

## Installation

```bash
npm install @frenglish/sdk
```

## Quick Start

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

## Core Features

### Translation

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

### Project Management

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

### Configuration

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

### File Management

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

## SDK Methods Reference

### Translation Methods

1. **translate**
   - Description: Translates multiple strings or content blocks to all configured target languages
   - Parameters:
     - `content`: string[] - Array of content to translate
     - `isFullTranslation`: boolean (optional) - Whether to perform a full translation
     - `filenames`: string[] (optional) - Filenames for the content
     - `partialConfig`: PartialConfiguration (optional) - Configuration overrides
   - Returns: `Promise<{ translationId: number, content: TranslationResponse[] }>`

2. **translateString**
   - Description: Translates a single string to a specific target language
   - Parameters:
     - `content`: string | string [] - Single string to translate or an array of strings to translate
     - `lang`: string - Target language code
     - `partialConfig`: PartialConfiguration (optional) - Configuration overrides
   - Returns: `Promise<string | string[] | undefined>`

3. **getTranslationStatus**
   - Description: Checks the current status of a translation request (e.g., completed, in progress, cancelled)
   - Parameters:
     - `translationId`: number - ID of the translation to check
   - Returns: `Promise<TranslationStatus>`

4. **getTranslationContent**
   - Description: Retrieves the translated content for a completed translation
   - Parameters:
     - `translationId`: number - ID of the translation to retrieve
   - Returns: `Promise<TranslationResponse[]>`

### Project Management Methods

1. **getProjectInformation**
   - Description: Retrieves detailed information about the current project
   - Returns:`Promise<Project>`

2. **updateProjectName**
   - Description: Updates the name of the current project
   - Parameters:
     - `updatedProjectName`: string - New project name
   - Returns: `Promise<Project>`

3. **setProjectActiveStatus**
   - Description: Enables or disables the project's active status
   - Parameters:
     - `isActive`: boolean - New active status
   - Returns: `Promise<Project>`

4. **setTestMode**
   - Description: Toggles test mode for the project, useful for testing without consuming API credits
   - Parameters:
     - `isTestMode`: boolean - New test mode status
   - Returns: `Promise<Project>`

### Configuration Methods

1. **getDefaultConfiguration**
   - Description: Retrieves the default configuration settings for the project
   - Returns: `Promise<Configuration>`

2. **updateConfiguration**
   - Description: Updates the project's configuration settings
   - Parameters:
     - `partiallyUpdatedConfig`: PartialConfiguration - Configuration updates
   - Returns: `Promise<Configuration>`

3. **getProjectSupportedLanguages**
   - Description: Gets the list of languages supported by the project and the origin language
   - Returns: `Promise<{ languages: string[], originLanguage: string }>`

4. **getSupportedLanguages**
   - Description: Gets all languages supported by the Frenglish service
   - Returns: `Promise<string[]>`

5. **getSupportedFileTypes**
   - Description: Gets all file types that can be processed for translation
   - Returns: `Promise<string[]>`

### File Management Methods

1. **upload**
   - Description: Uploads files for translation, typically used as base files to compare against
   - Parameters:
     - `files`: FileContentWithLanguage[] - Array of files to upload
   - Returns: `Promise<{ message: string, originFilesInfo: Array<{ fileId: string, originS3Version: string }> }>`

2. **getTextMap**
   - Description: Retrieves the project's text map, which contains mappings of text content for consistency
   - Returns: `Promise<{ content: FlatJSON[] } | null>`

### Domain Management Methods

1. **getProjectDomain**
   - Description: Gets the domain URL associated with the current project
   - Returns: `Promise<string>`

2. **getPublicAPIKeyFromDomain**
   - Description: Retrieves the public API key associated with a given domain
   - Parameters:
     - `domainURL`: string - Domain URL to get API key for
   - Returns: `Promise<string>`

## Configuration Types

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