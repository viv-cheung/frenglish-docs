---
id: method-descriptions
sidebar_position: 2
description: Apprends à utiliser le SDK Frenglish pour intégrer la traduction automatique de contenu dans tes applications
---

# Descriptions des fonctions

## Introduction
Le SDK Frenglish est un outil puissant qui permet aux développeurs d’intégrer la traduction automatique de contenu dans leurs applications. Ce SDK gère tout le processus de traduction, de l’envoi du contenu à traduire jusqu’à la récupération du contenu traduit. Ce document donne des infos détaillées sur chaque méthode du SDK.

## Installation
Réfère-toi au [Guide de démarrage rapide](./quickstart.md#installation) pour les instructions d’installation.

## Méthodes du SDK

### translate

```javascript
translate(contents: string[], isFullTranslation: boolean, filenames: string[], partialConfig: PartialConfiguration): Promise<RequestTranslationResponse>
```

Envoie du contenu à traduire. Cette méthode gère automatiquement le polling et retourne le contenu traduit une fois terminé.

#### Paramètres :

- content: string\[] - Un tableau de textes à traduire. Chaque élément représente un morceau de contenu distinct.
- fullTranslation: boolean (optionnel, par défaut false) - Contrôle le comportement de la traduction :
  - Quand c’est false (par défaut) : Optimise la traduction en vérifiant le contenu déjà traduit dans la base de données. Seul le contenu nouveau ou modifié est traduit, ce qui réduit le temps et les coûts.
  - Quand c’est true : Force une retraduction complète de tout le contenu, sans tenir compte des traductions existantes.
- filenames: string\[] (optionnel) - Un tableau de noms de fichiers correspondant à chaque élément de contenu. Sert à suivre et identifier les traductions dans ton projet. Si fourni, doit avoir la même longueur que le tableau de contenu. Les noms de fichiers doivent inclure les extensions (ex : .json).
- partialConfig: PartialConfiguration (optionnel) - Permet de remplacer les paramètres de configuration par défaut pour cette traduction. Peut inclure :
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

#### Retourne :
Une Promise qui retourne un objet RequestTranslationResponse contenant :
- translationId: number - Identifiant unique pour la demande de traduction.
- content?: TranslationResponse\[] - Tableau d’objets TranslationResponse, chacun représentant le contenu traduit pour une langue spécifique.

#### Exemple :

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

#### Erreurs :

- Lance une erreur si la demande de traduction échoue ou si le polling dépasse le temps maximal autorisé.
- Lance une erreur si la traduction est annulée.

### translateString

```javascript
translateString(text: string, targetLanguage: string, partialConfig: PartialConfiguration): Promise<string>
```

#### Paramètres :

- content: string - Le texte à traduire.
- lang: string - Le code de la langue cible (ex : 'fr' pour le français).
- partialConfig: PartialConfiguration (optionnel) - Permet de remplacer les paramètres de configuration par défaut pour cette traduction. Même structure que la méthode translate().

#### Retourne :
Une Promise qui retourne la chaîne traduite.

#### Exemple :

```javascript
try {
  const translatedText = await frenglish.translateString('Hello, world!', 'fr');
  console.log('Translated text:', translatedText);
} catch (error) {
  console.error('Error translating string:', error.message);
}
```

#### Erreurs :

- Lance une erreur si la langue cible n’est pas supportée.
- Lance une erreur si la demande de traduction échoue ou si le polling dépasse le temps maximal autorisé.

### upload

```javascript
upload(content: string, filename: string): Promise<void>
```

Téléverse des fichiers à utiliser comme base de comparaison pour les traductions. Ça peut aider à optimiser les traductions en fournissant du contexte.

#### Paramètres :
files: FileContentWithLanguage\[] - Un tableau de fichiers avec leur contenu et la langue.
Retourne :

Une Promise qui se résout quand les fichiers sont téléversés sans problème.

#### Exemple :

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

#### Erreurs :

- Lance une erreur si le téléversement échoue.

### getTranslationContent

```javascript
getTranslationContent(translationId: number): Promise<TranslationResponse[]>
```

Récupère le contenu traduit pour une demande de traduction terminée.

#### Paramètres :

- translationId: number - L’identifiant unique pour la demande de traduction.

#### Retourne :
Une Promise qui retourne un tableau d’objets TranslationResponse.
Exemple :

```javascript
try {
  const translationContent = await frenglish.getTranslationContent(translationId);
  console.log('Translation content:', translationContent);
} catch (error) {
  console.error('Error getting translation content:', error.message);
}
```

#### Erreurs :

- Lance une erreur si la demande échoue.

### getDefaultConfiguration

```javascript
getDefaultConfiguration(): Promise<string>
```

Récupère la configuration par défaut du SDK Frenglish.

### Paramètres :
Aucun.

#### Retourne :
Une Promise qui retourne un objet Configuration.

#### Exemple :

```javascript
try {
  const defaultConfig = await frenglish.getDefaultConfiguration();
  console.log('Default configuration:', defaultConfig);
} catch (error) {
  console.error('Error getting default configuration:', error.message);
}
```

#### Erreurs :

- Lance une erreur si la demande échoue.

### getSupportedLanguages

```javascript
getSupportedLanguages(): Promise<string[]>
```

Récupère la liste des langues supportées par l’API Frenglish.

#### Paramètres :
Aucun.

#### Retourne :
Une Promise qui retourne un tableau de codes de langues supportées.
Exemple :

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

Récupère la liste des types de fichiers supportés par l’API Frenglish.

#### Paramètres :
Aucun.

#### Retourne :
Une Promise qui retourne un tableau d’extensions de fichiers supportées.
Exemple :

```javascript
try {
  const supportedFileTypes = await frenglish.getSupportedFileTypes();
  console.log('Supported file types:', supportedFileTypes);
} catch (error) {
  console.error('Error getting supported file types:', error.message);
}
```

#### Erreurs :

- Lance une erreur si la demande échoue.

### registerWebhook

```javascript
registerWebhook(webhookUrl: string): Promise<void>
```

Enregistre une URL de webhook pour recevoir des notifications quand une traduction est terminée. C’est optionnel mais pratique pour gérer les résultats de traduction de façon asynchrone.

#### Paramètres :

- webhookUrl: string - L’URL de ton endpoint webhook où tu veux recevoir les notifications.

#### Retourne :
Une Promise qui se résout quand le webhook est enregistré avec succès.

#### Exemple :

```javascript
await frenglish.registerWebhook('https://yourdomain.com/webhook-endpoint');
```

#### Erreurs :

- Lance une erreur si l’enregistrement échoue, par exemple à cause d’une URL invalide ou d’un problème réseau.