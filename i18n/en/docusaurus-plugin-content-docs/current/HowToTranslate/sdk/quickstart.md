---
id: sdk-quickstart
sidebar_position: 1
description: Learn how to use Frenglish's SDK to integrate automatic translation of content into your applications
---

# SDK Quickstart

## Introduction

The Frenglish SDK is a powerful tool that enables developers to integrate automatic translation of content files into their applications. This SDK handles the entire translation process, from submitting files for translation to retrieving the translated content.

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (version 14 or higher recommended)
- **npm** (Node Package Manager)
- A **Frenglish API key** (obtainable by signing up on the Frenglish platform)

## Installation

Install the Frenglish SDK using npm:

```bash
npm install -g frenglish
```

## Getting Started

### 1. Setting Up the SDK

Import the Frenglish SDK and initialize it with your API key:

```javascript
const FrenglishSDK = require('frenglish').default;

// Replace with your actual Frenglish API key
const FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY || 'YOUR_API_KEY_HERE';
const frenglish = new FrenglishSDK(FRENGLISH_API_KEY);
```

### 2. Registering a Webhook (Optional)

If you prefer to receive a webhook notification when the translation is complete:

```javascript
const webhookUrl = 'https://yourdomain.com/webhook-endpoint';

await frenglish.registerWebhook(webhookUrl);
```

### 3. Requesting a Translation

Prepare your files for translation. Adding the filenames is optional. This just tracks which translations should be returned if we see the same filenames under your project:

```javascript
const filenames = ['greeting.json', 'home.json'];
const contents = [
  "{'greetings': 'Hello'}",
  "{'home': 'This is a home', 'room': 'This is a room'}"
];

const translation = await frenglish.translate(contents, false, filenames);
console.log(`Translation requested with ID: ${translation.translationId}`);
```

The `translate` method sends content for translation and handles the polling process automatically.

#### Parameters

- `contents: string[]` - Array of text content to be translated. Each element represents a separate piece of content.
- `isFullTranslation: boolean` (optional, default: `false`) - Controls translation behavior:
  - When `false` (default): Optimizes translation by checking previously translated content in the database. Only translates new or modified content, reducing translation time and costs.
  - When `true`: Forces a complete retranslation of all content, ignoring any existing translations.
- `filenames: string[]` (optional) - Array of filenames corresponding to each content item. Used to track and identify translations within your project. If provided, must match the length of `contents` array. The filenames should contain the extension of the file (e.g. `.json`) so that we could properly return the same file structure with the translated content.

#### Returns

Returns a `RequestTranslationResponse` object containing:

- `translationId: number` - Unique identifier for the translation request.
- `content?: TranslationResponse[]` - Array of `TranslationResponse` objects, each representing translated content for a specific language.

```typescript
interface RequestTranslationResponse {
  translationId: number;
  content?: TranslationResponse[];
}

interface TranslationResponse {
  language: string;
  files: {
    fileId: string;  // Filename
    content: string; // Translated file content
  }[];
}
```

### 4. Retrieving Translation Content

The `translate` method handles polling internally and returns the translated content when completed:

```javascript
if (translation.content) {
  console.log('Translation completed:', translation.content);
} else {
  console.log('Translation failed or was cancelled');
}
```

### 5. Manual Status Checking (Optional)

If you need to check the status manually:

```javascript
const translationId = translation.translationId;
const status = await frenglish.getTranslationStatus(translationId);
console.log(`Current status: ${status}`);
```

### 6. Manual Content Retrieval (Optional)

If you need to retrieve the content separately:

```javascript
const translatedContent = await frenglish.getTranslationContent(translationId);
console.log('Translated content:', translatedContent);
```

## Types

```typescript
enum TranslationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

interface RequestTranslationResponse {
  translationId: number;
  content?: TranslationResponse[];
}

interface TranslationResponse {
  language: string;
  files: {
    fileId: string;
    content: string;
  }[];
}
```

## Error Handling

The SDK throws errors for various scenarios. Always wrap your API calls in try-catch blocks:

```javascript
try {
  const translation = await frenglish.translate(contents, false, filenames);
  // Handle successful translation
} catch (error) {
  console.error('Translation error:', error.message);
  // Handle the error appropriately
}
```

## Best Practices

1. **Environment Variables**: Store your API key in environment variables for security. The SDK uses `dotenv`, so you can use a `.env` file in your project root.
2. **Webhook Security**: Ensure your webhook endpoint is secure and validates incoming requests.
3. **Rate Limiting**: Be aware of any rate limits on the Frenglish API and handle them accordingly.
4. **Error Handling**: Implement robust error handling to manage various failure scenarios.
5. **Logging**: Implement logging for better debugging and monitoring of the translation process.