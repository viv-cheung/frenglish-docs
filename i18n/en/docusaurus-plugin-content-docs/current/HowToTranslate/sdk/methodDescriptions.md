---
id: method-descriptions
sidebar_position: 2
description: Learn how to use Frenglish's SDK to integrate automatic translation of content into your applications
---

# Function Descriptions

## Introduction

The Frenglish SDK is a powerful tool that enables developers to integrate automatic translation of content into their applications. This SDK handles the entire translation process, from submitting content for translation to retrieving the translated content. This document provides detailed information on how to use each method in the SDK.

## Installation

Please refer to the [Quickstart Guide](./quickstart.md#installation) for installation instructions.

## SDK Methods

### translate

```javascript
translate(contents: string[], isFullTranslation: boolean, filenames: string[]): Promise<RequestTranslationResponse>
```

Sends content for translation. This method handles the polling process automatically and returns the translated content when completed.

#### Parameters:

- content: string[] - An array of text content to be translated. Each element represents a separate piece of content.
- fullTranslation: boolean (optional, default false) - Controls translation behavior:
  - When false (default): Optimizes translation by checking previously translated content in the database. Only translates new or modified content, reducing translation time and costs.
  - When true: Forces a complete retranslation of all content, ignoring any existing translations.
- filenames: string[] (optional) - An array of filenames corresponding to each content item. Used to track and identify translations within your project. If provided, must match the length of content array. The filenames should include file extensions (e.g., .json).

#### Returns:

A Promise that resolves to a RequestTranslationResponse object containing:
- translationId: number - Unique identifier for the translation request.
- content?: TranslationResponse[] - Array of TranslationResponse objects, each representing translated content for a specific language.

#### Example:

```javascript
const contents = [
  '{"hello": "Hello, world!"}',
  '{"goodbye": "Goodbye, world!"}'
];
const filenames = ['greetings.json', 'farewells.json'];

try {
  const translation = await frenglish.translate(contents, false, filenames);
  if (translation && translation.content) {
    console.log('Translation completed:', translation.content);
  } else {
    console.log('Translation in progress or failed.');
  }
} catch (error) {
  console.error('Translation error:', error.message);
}
```
#### Errors:

- Throws an error if the translation request fails or if the polling exceeds the maximum allowed time.
- Throws an error if the translation is cancelled.

### translateString 

```javascript
translateString(text: string, targetLanguage: string): Promise<string>
```
#### Parameters:

- content: string - The text content to be translated.
- lang: string - The target language code (e.g., 'fr' for French).

#### Returns:

A Promise that resolves to the translated string.

#### Example:

```javascript
try {
  const translatedText = await frenglish.translateString('Hello, world!', 'fr');
  console.log('Translated text:', translatedText);
} catch (error) {
  console.error('Error translating string:', error.message);
}
```
#### Errors:

- Throws an error if the target language is not supported.
- Throws an error if the translation request fails or if the polling exceeds the maximum allowed time.

### upload

```javascript
upload(content: string, filename: string): Promise<void>
```

Uploads files to use as the base comparison for translations. This can help in optimizing translations by providing context.

#### Parameters:

files: FileContentWithLanguage[] - An array of files with content and language information.
Returns:

A Promise that resolves when the files are successfully uploaded.

#### Example:

```javascript
const files = [
  {
    language: 'en',
    filename: 'app.json',
    content: '{"welcome": "Welcome to the app!"}'
  }
];

try {
  await frenglish.upload(files);
  console.log('Files uploaded successfully.');
} catch (error) {
  console.error('Error uploading files:', error.message);
}
```

#### Errors:

- Throws an error if the upload fails.

### getTranslationContent

```javascript
getTranslationContent(translationId: number): Promise<TranslationResponse[]>
```

Retrieves the translated content for a completed translation request.

#### Parameters:

- translationId: number - The unique identifier for the translation request.

#### Returns:

A Promise that resolves to an array of TranslationResponse objects.
Example:

```javascript
try {
  const translationContent = await frenglish.getTranslationContent(translationId);
  console.log('Translation content:', translationContent);
} catch (error) {
  console.error('Error getting translation content:', error.message);
}
```

#### Errors:

- Throws an error if the request fails.

### getDefaultConfiguration

```javascript
getDefaultConfiguration(): Promise<string>
```
Retrieves the default configuration for the Frenglish SDK.

### Parameters:

None.

#### Returns:

A Promise that resolves to a Configuration object.

#### Example:

```javascript
try {
  const defaultConfig = await frenglish.getDefaultConfiguration();
  console.log('Default configuration:', defaultConfig);
} catch (error) {
  console.error('Error getting default configuration:', error.message);
}
```

#### Errors:

- Throws an error if the request fails.

### getSupportedLanguages

```javascript
getSupportedLanguages(): Promise<string[]>
```
Retrieves a list of languages supported by the Frenglish API.

#### Parameters:

None.

#### Returns:

A Promise that resolves to an array of supported language codes.
Example:

```javascript
try {
  const supportedLanguages = await frenglish.getSupportedLanguages();
  console.log('Supported languages:', supportedLanguages);
} catch (error) {
  console.error('Error getting supported languages:', error.message);
}
```

### getSupportedFileTypes

```javascript
getSupportedFileTypes(): Promise<string[]>
```

Retrieves a list of file types supported by the Frenglish API.

#### Parameters:

None.

#### Returns:

A Promise that resolves to an array of supported file type extensions.
Example:

```javascript
try {
  const supportedFileTypes = await frenglish.getSupportedFileTypes();
  console.log('Supported file types:', supportedFileTypes);
} catch (error) {
  console.error('Error getting supported file types:', error.message);
}
```
#### Errors:

- Throws an error if the request fails.

### registerWebhook

```javascript
registerWebhook(webhookUrl: string): Promise<void>
```

Registers a webhook URL to receive notifications when a translation is completed. This is optional but useful for asynchronous handling of translation results.

#### Parameters:

- webhookUrl: string - The URL of your webhook endpoint where you want to receive notifications.

#### Returns:

A Promise that resolves when the webhook is successfully registered.

#### Example:

```javascript
await frenglish.registerWebhook('https://yourdomain.com/webhook-endpoint');
```

#### Errors:

- Throws an error if the registration fails, e.g., due to an invalid URL or network issues.
