---
id: method-descriptions
sidebar_position: 2
description: Erfahre, wie du das Frenglish SDK nutzen kannst, um automatische Übersetzungen von Inhalten in deine Anwendungen zu integrieren.
---

# Funktionsbeschreibungen

## Einführung
Das Frenglish SDK ist ein leistungsstarkes Werkzeug, mit dem Entwickler automatische Übersetzungen von Inhalten in ihre Anwendungen integrieren können. Das SDK übernimmt den gesamten Übersetzungsprozess – vom Einreichen der Inhalte bis zum Abrufen der Übersetzung. Dieses Dokument bietet detaillierte Informationen zur Nutzung der einzelnen Methoden im SDK.

## Installation
Siehe die [Schnellstart-Anleitung](./quickstart.md#installation) für Installationshinweise.

## SDK-Methoden

### translate

```javascript
translate(contents: string[], isFullTranslation: boolean, filenames: string[], partialConfig: PartialConfiguration): Promise<RequestTranslationResponse>
```

Sendet Inhalte zur Übersetzung. Diese Methode übernimmt das Polling automatisch und gibt die übersetzten Inhalte zurück, sobald sie fertig sind.

#### Parameter:

- content: string\[] – Ein Array von Textinhalten, die übersetzt werden sollen. Jedes Element steht für einen separaten Inhalt.
- fullTranslation: boolean (optional, Standardwert: false) – Steuert das Übersetzungsverhalten:
  - Wenn false (Standard): Optimiert die Übersetzung, indem bereits übersetzte Inhalte in der Datenbank überprüft werden. Nur neue oder geänderte Inhalte werden übersetzt, was Zeit und Kosten spart.
  - Wenn true: Erzwingt eine vollständige Neuübersetzung aller Inhalte und ignoriert vorhandene Übersetzungen.
- filenames: string\[] (optional) – Ein Array von Dateinamen, das jedem Inhalt zugeordnet ist. Dient zur Nachverfolgung und Identifikation der Übersetzungen im Projekt. Falls angegeben, muss die Länge mit dem Content-Array übereinstimmen. Die Dateinamen sollten Dateiendungen enthalten (z. B. .json).
- partialConfig: PartialConfiguration (optional) – Überschreibt die Standardkonfiguration für diese Übersetzung. Kann beinhalten:
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

#### Rückgabewert:
Ein Promise, das auf ein RequestTranslationResponse-Objekt mit folgenden Inhalten aufgelöst wird:
- translationId: number – Eindeutige Kennung für die Übersetzungsanfrage.
- content?: TranslationResponse\[] – Array von TranslationResponse-Objekten, jeweils für übersetzte Inhalte in einer bestimmten Sprache.

#### Beispiel:

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

#### Fehler:

- Löst einen Fehler aus, wenn die Übersetzungsanfrage fehlschlägt oder das Polling die maximal erlaubte Zeit überschreitet.
- Löst einen Fehler aus, wenn die Übersetzung abgebrochen wird.

### translateString

```javascript
translateString(text: string, targetLanguage: string, partialConfig: PartialConfiguration): Promise<string>
```

#### Parameter:

- content: string – Der zu übersetzende Text.
- lang: string – Der Sprachcode der Zielsprache (z. B. 'fr' für Französisch).
- partialConfig: PartialConfiguration (optional) – Überschreibt die Standardkonfiguration für diese Übersetzung. Gleiche Struktur wie bei der translate()-Methode.

#### Rückgabewert:
Ein Promise, das auf den übersetzten String aufgelöst wird.

#### Beispiel:

```javascript
try {
  const translatedText = await frenglish.translateString('Hello, world!', 'fr');
  console.log('Translated text:', translatedText);
} catch (error) {
  console.error('Error translating string:', error.message);
}
```

#### Fehler:

- Löst einen Fehler aus, wenn die Zielsprache nicht unterstützt wird.
- Löst einen Fehler aus, wenn die Übersetzungsanfrage fehlschlägt oder das Polling die maximal erlaubte Zeit überschreitet.

### upload

```javascript
upload(content: string, filename: string): Promise<void>
```

Lädt Dateien hoch, die als Basisvergleich für Übersetzungen dienen. Dies kann helfen, Übersetzungen durch Kontext zu optimieren.

#### Parameter:
files: FileContentWithLanguage\[] – Ein Array von Dateien mit Inhalt und Sprachinformation.
Rückgabewert:

Ein Promise, das aufgelöst wird, wenn die Dateien erfolgreich hochgeladen wurden.

#### Beispiel:

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

#### Fehler:

- Löst einen Fehler aus, wenn das Hochladen fehlschlägt.

### getTranslationContent

```javascript
getTranslationContent(translationId: number): Promise<TranslationResponse[]>
```

Ruft die übersetzten Inhalte für eine abgeschlossene Übersetzungsanfrage ab.

#### Parameter:

- translationId: number – Die eindeutige Kennung der Übersetzungsanfrage.

#### Rückgabewert:
Ein Promise, das auf ein Array von TranslationResponse-Objekten aufgelöst wird.
Beispiel:

```javascript
try {
  const translationContent = await frenglish.getTranslationContent(translationId);
  console.log('Translation content:', translationContent);
} catch (error) {
  console.error('Error getting translation content:', error.message);
}
```

#### Fehler:

- Löst einen Fehler aus, wenn die Anfrage fehlschlägt.

### getDefaultConfiguration

```javascript
getDefaultConfiguration(): Promise<string>
```

Ruft die Standardkonfiguration für das Frenglish SDK ab.

### Parameter:
Keine.

#### Rückgabewert:
Ein Promise, das auf ein Configuration-Objekt aufgelöst wird.

#### Beispiel:

```javascript
try {
  const defaultConfig = await frenglish.getDefaultConfiguration();
  console.log('Default configuration:', defaultConfig);
} catch (error) {
  console.error('Error getting default configuration:', error.message);
}
```

#### Fehler:

- Löst einen Fehler aus, wenn die Anfrage fehlschlägt.

### getSupportedLanguages

```javascript
getSupportedLanguages(): Promise<string[]>
```

Ruft eine Liste der vom Frenglish API unterstützten Sprachen ab.

#### Parameter:
Keine.

#### Rückgabewert:
Ein Promise, das auf ein Array unterstützter Sprachcodes aufgelöst wird.
Beispiel:

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

Ruft eine Liste der vom Frenglish API unterstützten Dateitypen ab.

#### Parameter:
Keine.

#### Rückgabewert:
Ein Promise, das auf ein Array unterstützter Dateiendungen aufgelöst wird.
Beispiel:

```javascript
try {
  const supportedFileTypes = await frenglish.getSupportedFileTypes();
  console.log('Supported file types:', supportedFileTypes);
} catch (error) {
  console.error('Error getting supported file types:', error.message);
}
```

#### Fehler:

- Löst einen Fehler aus, wenn die Anfrage fehlschlägt.

### registerWebhook

```javascript
registerWebhook(webhookUrl: string): Promise<void>
```

Registriert eine Webhook-URL, um Benachrichtigungen zu erhalten, wenn eine Übersetzung abgeschlossen ist. Dies ist optional, aber nützlich für die asynchrone Verarbeitung von Übersetzungsergebnissen.

#### Parameter:

- webhookUrl: string – Die URL deines Webhook-Endpunkts, an den Benachrichtigungen gesendet werden sollen.

#### Rückgabewert:
Ein Promise, das aufgelöst wird, wenn der Webhook erfolgreich registriert wurde.

#### Beispiel:

```javascript
await frenglish.registerWebhook('https://yourdomain.com/webhook-endpoint');
```

#### Fehler:

- Löst einen Fehler aus, wenn die Registrierung fehlschlägt, z. B. wegen einer ungültigen URL oder Netzwerkproblemen.