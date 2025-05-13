---
id: sdk-quickstart
sidebar_position: 1
description: Erfahre, wie du das Frenglish SDK nutzen kannst, um automatische Übersetzungen von Inhalten in deine Anwendungen zu integrieren.
---

# SDK-Schnellstart

## Einführung
Das Frenglish SDK ist ein leistungsstarkes Werkzeug, mit dem Entwickler automatische Übersetzungen von Inhaltsdateien in ihre Anwendungen integrieren können. Das SDK übernimmt den gesamten Übersetzungsprozess – vom Einreichen der Dateien bis zum Abrufen der Übersetzungen.

## Installation

```bash
npm install @frenglish/sdk
```

## Schnellstart

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

## Kernfunktionen

### Übersetzung

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

### Projektverwaltung

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

### Konfiguration

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

### Dateiverwaltung

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

## SDK-Methodenreferenz

### Übersetzungsmethoden

1.  **translate**
    - Beschreibung: Übersetzt mehrere Strings oder Inhaltsblöcke in alle konfigurierten Zielsprachen
    - Parameter:
      - `content`: string\[] – Array von Inhalten, die übersetzt werden sollen
      - `isFullTranslation`: boolean (optional) – Gibt an, ob eine vollständige Übersetzung durchgeführt werden soll
      - `filenames`: string\[] (optional) – Dateinamen für die Inhalte
      - `partialConfig`: PartialConfiguration (optional) – Konfigurationsüberschreibungen
    - Rückgabewert: `Promise<{ translationId: number, content: TranslationResponse[] }>`

2.  **translateString**
    - Beschreibung: Übersetzt einen einzelnen String in eine bestimmte Zielsprache
    - Parameter:
      - `content`: string | string \[] – Einzelner String oder Array von Strings, die übersetzt werden sollen
      - `lang`: string – Sprachcode der Zielsprache
      - `partialConfig`: PartialConfiguration (optional) – Konfigurationsüberschreibungen
    - Rückgabewert: `Promise<string | string[] | undefined>`

3.  **getTranslationStatus**
    - Beschreibung: Prüft den aktuellen Status einer Übersetzungsanfrage (z. B. abgeschlossen, in Bearbeitung, abgebrochen)
    - Parameter:
      - `translationId`: number – ID der zu prüfenden Übersetzung
    - Rückgabewert: `Promise<TranslationStatus>`

4.  **getTranslationContent**
    - Beschreibung: Ruft die übersetzten Inhalte für eine abgeschlossene Übersetzung ab
    - Parameter:
      - `translationId`: number – ID der abzurufenden Übersetzung
    - Rückgabewert: `Promise<TranslationResponse[]>`

### Projektverwaltungs-Methoden

1.  **getProjectInformation**
    - Beschreibung: Ruft detaillierte Informationen zum aktuellen Projekt ab
    - Rückgabewert: `Promise<Project>`

2.  **updateProjectName**
    - Beschreibung: Aktualisiert den Namen des aktuellen Projekts
    - Parameter:
      - `updatedProjectName`: string – Neuer Projektname
    - Rückgabewert: `Promise<Project>`

3.  **setProjectActiveStatus**
    - Beschreibung: Aktiviert oder deaktiviert den Projektstatus
    - Parameter:
      - `isActive`: boolean – Neuer Aktivstatus
    - Rückgabewert: `Promise<Project>`

4.  **setTestMode**
    - Beschreibung: Schaltet den Testmodus für das Projekt um, nützlich zum Testen ohne Verbrauch von API-Credits
    - Parameter:
      - `isTestMode`: boolean – Neuer Testmodus-Status
    - Rückgabewert: `Promise<Project>`

### Konfigurationsmethoden

1.  **getDefaultConfiguration**
    - Beschreibung: Ruft die Standardkonfigurationseinstellungen für das Projekt ab
    - Rückgabewert: `Promise<Configuration>`

2.  **updateConfiguration**
    - Beschreibung: Aktualisiert die Konfigurationseinstellungen des Projekts
    - Parameter:
      - `partiallyUpdatedConfig`: PartialConfiguration – Konfigurationsaktualisierungen
    - Rückgabewert: `Promise<Configuration>`

3.  **getProjectSupportedLanguages**
    - Beschreibung: Ruft die Liste der vom Projekt unterstützten Sprachen sowie die Ursprungssprache ab
    - Rückgabe: `Promise<{ languages: string[], originLanguage: string }>`

4.  **getSupportedLanguages**
    - Beschreibung: Ruft alle vom Frenglish-Dienst unterstützten Sprachen ab
    - Rückgabe: `Promise<string[]>`

5.  **getSupportedFileTypes**
    - Beschreibung: Ruft alle Dateitypen ab, die für die Übersetzung verarbeitet werden können
    - Rückgabe: `Promise<string[]>`

### Dateiverwaltungs-Methoden

1.  **upload**
    - Beschreibung: Lädt Dateien zur Übersetzung hoch, typischerweise als Basisdateien zum Vergleich
    - Parameter:
      - `files`: FileContentWithLanguage\[] – Array der hochzuladenden Dateien
    - Rückgabe: `Promise<{ message: string, originFilesInfo: Array<{ fileId: string, originS3Version: string }> }>`

2.  **getTextMap**
    - Beschreibung: Ruft die Text-Map des Projekts ab, die Zuordnungen von Textinhalten für Konsistenz enthält
    - Rückgabe: `Promise<{ content: FlatJSON[] } | null>`

### Domainverwaltungs-Methoden

1.  **getProjectDomain**
    - Beschreibung: Ruft die mit dem aktuellen Projekt verknüpfte Domain-URL ab
    - Rückgabe: `Promise<string>`

2.  **getPublicAPIKeyFromDomain**
    - Beschreibung: Ruft den öffentlichen API-Schlüssel für eine angegebene Domain ab
    - Parameter:
      - `domainURL`: string – Domain-URL, für die der API-Schlüssel abgerufen werden soll
    - Rückgabe: `Promise<string>`

## Konfigurationstypen

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