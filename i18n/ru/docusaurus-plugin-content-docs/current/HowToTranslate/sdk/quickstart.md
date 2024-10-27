# SDK Documentation

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
npm install frenglish
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

Prepare your files for translation:

```javascript
const filenames = ['file1.json', 'file2.json'];
const contents = [
  'Content of file1',
  'Content of file2'
];

const translation = await frenglish.translate(contents, false, filenames);
console.log(`Translation requested with ID: ${translation.translationId}`);
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

## CLI Usage

Frenglish also provides a command-line interface for easy translation of files. After installation, you can use the `frenglish-translate` command:

```bash
frenglish-translate [options] <file1> <file2> ...
```

#### Constructor

- `constructor(apiKey: string)`

#### Methods

- `registerWebhook(webhookUrl: string): Promise<void>`
- `translate(filenames: string[], content: string[]): Promise<RequestTranslationResponse | undefined>`
- `getTranslationStatus(translationId: number): Promise<TranslationStatus>`
- `getTranslationContent(translationId: number): Promise<TranslationResponse[]>`

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
