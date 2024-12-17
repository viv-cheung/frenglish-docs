---
id: method-descriptions
sidebar_position: 2
description: Learn how to use Frenglish's SDK to integrate automatic translation of content into your applications
---

# Описание функций

## Введение

SDK Frenglish — это мощный инструмент, который позволяет разработчикам интегрировать автоматический перевод контента в свои приложения. Этот SDK обрабатывает весь процесс перевода, от отправки контента на перевод до получения переведенного контента. Этот документ предоставляет подробную информацию о том, как использовать каждый метод в SDK.

## Установка

Пожалуйста, обратитесь к [Руководству по быстрому старту](./quickstart.md#installation) для инструкций по установке.

## Методы SDK

### translate

```javascript
translate(contents: string[], isFullTranslation: boolean, filenames: string[], partialConfig: PartialConfiguration): Promise<RequestTranslationResponse>
```

Отправляет контент на перевод. Этот метод автоматически обрабатывает процесс опроса и возвращает переведенный контент по завершении.

#### Параметры:

- content: string[] - Массив текстового контента для перевода. Каждый элемент представляет отдельный фрагмент контента.
- fullTranslation: boolean (необязательно, по умолчанию false) - Управляет поведением перевода:
  - Когда false (по умолчанию): Оптимизирует перевод, проверяя ранее переведенный контент в базе данных. Переводит только новый или измененный контент, сокращая время и затраты на перевод.
  - Когда true: Принудительно выполняет полную перепереводку всего контента, игнорируя любые существующие переводы.
- filenames: string[] (необязательно) - Массив имен файлов, соответствующих каждому элементу контента. Используется для отслеживания и идентификации переводов в вашем проекте. Если предоставлено, должно соответствовать длине массива контента. Имена файлов должны включать расширения файлов (например, .json).
- partialConfig: PartialConfiguration (необязательно) - Переопределяет настройки конфигурации по умолчанию для этого перевода. Может включать:

```typescript
  {
    originLanguage?: string,      // Source language code
    languages?: string[],         // Target language codes
    rules?: string,              // General translation rules
    autoMergeToBaseBranch?: boolean,  // Auto-merge setting
    implicitRules?: ImplicitRule[],    // Array of implicit translation rules
    rulesPerLanguage?: Rule[],    // Language-specific rules
    useThisConfig?: boolean,      // Whether to use this config
    keyFilters?: {               // Filters for translation keys
      includeFilters: string[],
      excludeFilters: string[]
    } | null
  }
  ```

#### Возвращает:

Promise, который разрешается в объект RequestTranslationResponse, содержащий:
- translationId: number - Уникальный идентификатор запроса на перевод.
- content?: TranslationResponse[] - Массив объектов TranslationResponse, каждый из которых представляет переведенный контент для конкретного языка.

#### Пример:

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

#### Ошибки:

- Вызывает ошибку, если запрос на перевод не удается или если опрос превышает максимально допустимое время.
- Вызывает ошибку, если перевод отменен.

### translateString

```javascript
translateString(text: string, targetLanguage: string, partialConfig: PartialConfiguration): Promise<string>
```

- content: string - Текстовый контент для перевода.
- lang: string - Код целевого языка (например, 'fr' для французского).
- partialConfig: PartialConfiguration (необязательно) - Переопределяет настройки конфигурации по умолчанию для этого перевода. Та же структура, что и в методе translate().

Promise, который разрешается в переведенную строку.

```javascript
try {
  const translatedText = await frenglish.translateString('Hello, world!', 'fr');
  console.log('Translated text:', translatedText);
} catch (error) {
  console.error('Error translating string:', error.message);
}
```

- Вызывает ошибку, если целевой язык не поддерживается.
- Вызывает ошибку, если запрос на перевод не удается или если опрос превышает максимально допустимое время.

### upload

```javascript
upload(content: string, filename: string): Promise<void>
```

Загружает файлы для использования в качестве базового сравнения для переводов. Это может помочь в оптимизации переводов, предоставляя контекст.

files: FileContentWithLanguage[] - Массив файлов с информацией о содержимом и языке.
Возвращает:

Promise, который разрешается, когда файлы успешно загружены.

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

- Вызывает ошибку, если загрузка не удается.

### getTranslationContent

```javascript
getTranslationContent(translationId: number): Promise<TranslationResponse[]>
```

Получает переведенный контент для завершенного запроса на перевод.

- translationId: number - Уникальный идентификатор запроса на перевод.

Promise, который разрешается в массив объектов TranslationResponse.
Пример:

```javascript
try {
  const translationContent = await frenglish.getTranslationContent(translationId);
  console.log('Translation content:', translationContent);
} catch (error) {
  console.error('Error getting translation content:', error.message);
}
```

- Вызывает ошибку, если запрос не удается.

### getDefaultConfiguration

```javascript
getDefaultConfiguration(): Promise<string>
```

Получает конфигурацию по умолчанию для SDK Frenglish.

### Параметры:

Нет.

Promise, который разрешается в объект Configuration.

```javascript
try {
  const defaultConfig = await frenglish.getDefaultConfiguration();
  console.log('Default configuration:', defaultConfig);
} catch (error) {
  console.error('Error getting default configuration:', error.message);
}
```

### getSupportedLanguages

```javascript
getSupportedLanguages(): Promise<string[]>
```

Получает список языков, поддерживаемых API Frenglish.

Promise, который разрешается в массив поддерживаемых кодов языков.
Пример:

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

Получает список типов файлов, поддерживаемых API Frenglish.

Promise, который возвращает массив поддерживаемых расширений типов файлов.
Пример:

```javascript
try {
  const supportedFileTypes = await frenglish.getSupportedFileTypes();
  console.log('Supported file types:', supportedFileTypes);
} catch (error) {
  console.error('Error getting supported file types:', error.message);
}
```

### registerWebhook

```javascript
registerWebhook(webhookUrl: string): Promise<void>
```

Регистрирует URL вебхука для получения уведомлений, когда перевод завершен. Это необязательно, но полезно для асинхронной обработки результатов перевода.

- webhookUrl: string - URL конечной точки вашего вебхука, куда вы хотите получать уведомления.

Promise, который выполняется, когда вебхук успешно зарегистрирован.

```javascript
await frenglish.registerWebhook('https://yourdomain.com/webhook-endpoint');
```

- Вызывает ошибку, если регистрация не удается, например, из-за недопустимого URL или сетевых проблем.