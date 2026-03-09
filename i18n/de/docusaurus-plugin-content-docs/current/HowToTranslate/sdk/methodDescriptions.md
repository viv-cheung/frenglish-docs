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

## Regeln und Schlüsselfilter
Konfigurationsoptionen, die steuern, _was_ übersetzt wird und _wie_, können unter Regeln und Schlüsselfiltern zusammengefasst werden. Sie können diese über `partialConfig` beim Aufruf von `translate()` oder `translateString()` übergeben oder in Ihrem Projekt-Dashboard festlegen.

### Übersetzungsregeln

- **rules** (String, optional) – Allgemeine Anweisungen für die Übersetzer (z. B. Tonfall, Terminologie, Stil). Gelten für alle Zielsprachen, sofern sie nicht durch sprachspezifische Regeln überschrieben werden.
- **rulesPerLanguage** (Array von `{ language, rules }`, optional) – Überschreibt Regeln für bestimmte Zielsprachen. Jeder Eintrag enthält einen Sprachcode (z. B. `"fr"`) und einen `rules`-String. Nützlich, wenn eine Sprache einen anderen Stil oder andere Begriffe benötigt.
- **implicitRules** (Array, optional) – Strukturierte implizite Regeln, die von der Übersetzungs-Pipeline angewendet werden.

### Include- und Exclude-Filter (Schlüsselfilter)
Schlüsselfilter steuern, welche **Schlüssel** in Ihrem JSON (oder anderen strukturierten Inhalten) zur Übersetzung gesendet werden. Sie beziehen sich auf den Schlüsselpfad (z. B. oberster Schlüssel `"title"` oder verschachtelter Pfad wie `"meta.description"`).
-   **keyFilters** (Objekt oder `null`, optional):
    - **includeFilters** – Array von Mustern. Wenn **nicht leer**, werden nur Schlüssel übersetzt, deren Pfad **mindestens einem** dieser Muster entspricht. Alle anderen Schlüssel bleiben unverändert.
    - **excludeFilters** – Array von Mustern. Schlüssel, deren Pfad **einem** dieser Muster entspricht, werden **nicht** übersetzt und bleiben in der Ursprungssprache.
    - Wenn sowohl `includeFilters` als auch `excludeFilters` `null` oder leer sind, werden **alle** Schlüssel übersetzt (kein Filtern).
    - **Verhalten, wenn beide gesetzt sind:** Zuerst wird Include angewendet (nur passende Schlüssel sind Kandidaten); dann wird Exclude angewendet (passende Schlüssel werden aus dieser Menge entfernt). Ein Schlüssel wird also nur übersetzt, wenn er einem Include-Muster entspricht (sofern vorhanden) und keinem Exclude-Muster entspricht.

-   **keyFiltersPerLanguage** (Array von `{ language, keyFilters }`, optional) – Überschreibt Schlüsselfilter für bestimmte Zielsprachen. Jeder Eintrag enthält einen Sprachcode und ein `keyFilters`-Objekt mit eigenen `includeFilters` und `excludeFilters`. Wenn Sie keinen sprachspezifischen Filter für eine Sprache festlegen, wird der globale `keyFilters` für diese Sprache verwendet.

**Musterformat:** Jedes Muster ist ein durch Punkte getrennter Schlüsselpfad (z. B. `title`, `meta.description`). Der Schlüsselpfad eines Eintrags wird mit diesen Mustern abgeglichen. Ein Segment kann `*` sein, um jeden beliebigen Schlüssel auf dieser Ebene zu erfassen (z. B. `meta.*` passt auf `meta.title`, `meta.description` usw.). Sie können dasselbe Muster nicht sowohl in Include als auch in Exclude verwenden.

**Typische Anwendungsfälle:**
- **Nur bestimmte Schlüssel einbeziehen:** Setzen Sie `includeFilters` auf Muster für die Schlüssel, die Sie übersetzen möchten (z. B. `["title", "meta.label"]`). Alles andere bleibt unübersetzt.
- **Sensible oder nicht zu übersetzende Schlüssel ausschließen:** Setzen Sie `excludeFilters` auf Muster für Schlüssel, die nicht übersetzt werden dürfen (z. B. `["internalId", "code", "url"]`). Alle anderen Schlüssel werden übersetzt.
- **Unterschiedliche Schlüssel pro Sprache:** Verwenden Sie `keyFiltersPerLanguage`, sodass beispielsweise eine Sprache nur eine Teilmenge der Schlüssel erhält, während eine andere alle Schlüssel bekommt.

**Beispiel: Eingabe-JSON vs. Ausgabe mit Filtern**

Angenommen, die Ursprungssprache ist Englisch und Sie übersetzen ins Französische. Eingabe-JSON:

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

- **Mit `includeFilters: ["title", "meta.label"]`** — Nur diese Schlüsselpfade werden übersetzt; der Rest bleibt in der Ursprungssprache:

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

- **Mit `excludeFilters: ["id", "code"]`** — Alles wird übersetzt, außer Schlüsseln, deren Pfad `id` oder `code` enthält:

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

Sie können Schlüsselfilter in `partialConfig` beim Aufruf von `translate()` übergeben; siehe die [translate](#translate)-Parameter und das Beispiel unten in diesem Abschnitt.

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
- partialConfig: PartialConfiguration (optional) – Überschreibt die Standardkonfigurationseinstellungen für diese Übersetzung. Hauptoptionen:
  - **originLanguage**, **languages** – Quell- und Zielsprachcodes.
  - **rules**, **rulesPerLanguage**, **implicitRules** – Übersetzungsregeln (siehe [Regeln und Schlüsselfilter](#rules-and-key-filters)).
  - **keyFilters** – `{ includeFilters: string[], excludeFilters: string[] } | null`, um Schlüssel von der Übersetzung ein- oder auszuschließen (siehe [Include- und Exclude-Filter](#include-and-exclude-filters-key-filters)).
  - **keyFiltersPerLanguage** – Sprachspezifische Überschreibungen für Schlüsselfilter (siehe [Include- und Exclude-Filter](#include-and-exclude-filters-key-filters)).
  - **autoMergeToBaseBranch**, **useThisConfig** – Weitere Verhaltensoptionen.

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

**Beispiel mit Include-/Exclude-Filtern** (nur bestimmte Schlüssel übersetzen oder andere ausschließen):

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