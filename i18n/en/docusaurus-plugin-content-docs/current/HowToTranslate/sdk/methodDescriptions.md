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

## Rules and key filters

Configuration options that control *what* gets translated and *how* can be grouped under rules and key filters. You can pass these via `partialConfig` when calling `translate()` or `translateString()`, or set them in your project dashboard.

### Translation rules

- **rules** (string, optional) – General instructions for the translator (e.g. tone, terminology, style). Applied to all target languages unless overridden by language-specific rules.
- **rulesPerLanguage** (array of `{ language, rules }`, optional) – Override rules for specific target languages. Each entry has a language code (e.g. `"fr"`) and a `rules` string. Useful when one locale needs different style or terminology.
- **implicitRules** (array, optional) – Structured implicit rules applied by the translation pipeline.

### Include and exclude filters (key filters)

Key filters control which **keys** in your JSON (or other structured content) are sent for translation. They apply to the key path (e.g. top-level key `"title"` or nested path like `"meta.description"`).

- **keyFilters** (object or `null`, optional):
  - **includeFilters** – Array of patterns. When **non-empty**, only keys whose path matches **at least one** of these patterns are translated. All other keys are left unchanged.
  - **excludeFilters** – Array of patterns. Keys whose path matches **any** of these patterns are **not** translated; they are left as in the origin language.
  - If both `includeFilters` and `excludeFilters` are `null` or empty, **all** keys are translated (no filtering).
  - **Behavior when both are set:** Include is applied first (only matching keys are candidates); then exclude is applied (matching keys are removed from that set). So a key is translated only if it matches an include pattern (when includes are present) and does not match any exclude pattern.

- **keyFiltersPerLanguage** (array of `{ language, keyFilters }`, optional) – Override key filters per target language. Each entry has a language code and a `keyFilters` object with its own `includeFilters` and `excludeFilters`. If you don’t set a per-language filter for a language, the global `keyFilters` is used for that language.

**Pattern format:** Each pattern is a dot-separated key path (e.g. `title`, `meta.description`). The key path of an entry is matched against these patterns. A segment can be `*` to match any single key at that level (e.g. `meta.*` matches `meta.title`, `meta.description`, etc.). You cannot use the same pattern in both include and exclude.

**Typical use cases:**

- **Include only certain keys:** Set `includeFilters` to patterns for the keys you want translated (e.g. `["title", "meta.label"]`). Everything else is left untranslated.
- **Exclude sensitive or non-translatable keys:** Set `excludeFilters` to patterns for keys that must not be translated (e.g. `["internalId", "code", "url"]`). All other keys are translated.
- **Different keys per language:** Use `keyFiltersPerLanguage` so that, for example, one language gets only a subset of keys while another gets all keys.

**Example: input JSON vs output with filters**

Assume origin language is English and you translate to French. Input JSON:

```json
{
  "id": "user-42",
  "title": "Welcome",
  "meta": {
    "label": "Home",
    "code": "H1"
  }
}
```

- **With `includeFilters: ["title", "meta.label"]`** — Only those key paths are translated; the rest stay in the origin language:

```json
{
  "id": "user-42",
  "title": "Bienvenue",
  "meta": {
    "label": "Accueil",
    "code": "H1"
  }
}
```

- **With `excludeFilters: ["id", "code"]`** — Everything is translated except keys whose path contains `id` or `code`:

```json
{
  "id": "user-42",
  "title": "Bienvenue",
  "meta": {
    "label": "Accueil",
    "code": "H1"
  }
}
```

You can pass key filters in `partialConfig` when calling `translate()`; see the [translate](#translate) parameters and the example below in that section.

## SDK Methods

### translate

```javascript
translate(contents: string[], isFullTranslation: boolean, filenames: string[], partialConfig: PartialConfiguration): Promise<RequestTranslationResponse>
```

Sends content for translation. This method handles the polling process automatically and returns the translated content when completed.

#### Parameters:

- content: string[] - An array of text content to be translated. Each element represents a separate piece of content.
- fullTranslation: boolean (optional, default false) - Controls translation behavior:
  - When false (default): Optimizes translation by checking previously translated content in the database. Only translates new or modified content, reducing translation time and costs.
  - When true: Forces a complete retranslation of all content, ignoring any existing translations.
- filenames: string[] (optional) - An array of filenames corresponding to each content item. Used to track and identify translations within your project. If provided, must match the length of content array. The filenames should include file extensions (e.g., .json).
- partialConfig: PartialConfiguration (optional) - Override default configuration settings for this translation. Main options:
  - **originLanguage**, **languages** – Source and target language codes.
  - **rules**, **rulesPerLanguage**, **implicitRules** – Translation rules (see [Rules and key filters](#rules-and-key-filters)).
  - **keyFilters** – `{ includeFilters: string[], excludeFilters: string[] } | null` to include or exclude keys from translation (see [Include and exclude filters](#include-and-exclude-filters-key-filters)).
  - **keyFiltersPerLanguage** – Per-language overrides for key filters (see [Include and exclude filters](#include-and-exclude-filters-key-filters)).
  - **autoMergeToBaseBranch**, **useThisConfig** – Other behavior flags.

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
const partialConfig = {
  languages: ['fr', 'es'],
  rules: 'use an informal tone'
};

try {
  const translation = await frenglish.translate(contents, false, filenames, partialConfig);
  if (translation && translation.content) {
    console.log('Translation completed:', translation.content);
  } else {
    console.log('Translation in progress or failed.');
  }
} catch (error) {
  console.error('Translation error:', error.message);
}
```

**Example with include/exclude filters** (only translate certain keys, or exclude others):

```javascript
// Only translate keys matching these patterns; leave all other keys unchanged
const partialConfigInclude = {
  languages: ['fr'],
  keyFilters: {
    includeFilters: ['title', 'description', 'meta.*'],
    excludeFilters: null
  }
};

// Translate all keys except those matching these patterns
const partialConfigExclude = {
  languages: ['fr'],
  keyFilters: {
    includeFilters: null,
    excludeFilters: ['internalId', 'code', 'url']
  }
};

const translation = await frenglish.translate(contents, false, filenames, partialConfigExclude);
```

#### Errors:

- Throws an error if the translation request fails or if the polling exceeds the maximum allowed time.
- Throws an error if the translation is cancelled.

### translateString 

```javascript
translateString(text: string, targetLanguage: string, partialConfig: PartialConfiguration): Promise<string>
```
#### Parameters:

- content: string - The text content to be translated.
- lang: string - The target language code (e.g., 'fr' for French).
- partialConfig: PartialConfiguration (optional) - Override default configuration settings for this translation. Same structure as in translate() method.

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
