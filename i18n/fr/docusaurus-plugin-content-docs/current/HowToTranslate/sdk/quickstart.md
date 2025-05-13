---
id: sdk-quickstart
sidebar_position: 1
description: Apprends à utiliser le SDK Frenglish pour intégrer la traduction automatique de contenu dans tes applications
---

# Démarrage rapide du SDK

## Introduction
Le SDK Frenglish est un outil puissant qui te permet, en tant que développeur, d’intégrer la traduction automatique de fichiers de contenu dans tes applications. Ce SDK gère tout le processus de traduction, de l’envoi des fichiers à la récupération du contenu traduit.

## Installation

```bash
npm install @frenglish/sdk
```

## Démarrage rapide

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

## Fonctionnalités principales

### Traduction

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

### Gestion de projet

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

### Gestion des fichiers

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

## Référence des méthodes du SDK

### Méthodes de traduction

1.  **translate**
    - Description : Traduit plusieurs textes ou blocs de contenu vers toutes les langues cibles configurées
    - Paramètres :
      - `content`: string\[] - Tableau de contenu à traduire
      - `isFullTranslation`: boolean (optionnel) - Indique si une traduction complète doit être effectuée
      - `filenames`: string\[] (optionnel) - Noms de fichiers pour le contenu
      - `partialConfig`: PartialConfiguration (optionnel) - Surcharges de configuration
    - Retourne : `Promise<{ translationId: number, content: TranslationResponse[] }>`

2.  **translateString**
    - Description : Traduit une seule chaîne vers une langue cible spécifique
    - Paramètres :
      - `content`: string | string \[] - Chaîne à traduire ou tableau de chaînes à traduire
      - `lang`: string - Code de la langue cible
      - `partialConfig`: PartialConfiguration (optionnel) - Surcharges de configuration
    - Retourne : `Promise<string | string[] | undefined>`

3.  **getTranslationStatus**
    - Description : Vérifie le statut actuel d’une demande de traduction (ex : terminée, en cours, annulée)
    - Paramètres :
      - `translationId`: number - ID de la traduction à vérifier
    - Retourne : `Promise<TranslationStatus>`

4.  **getTranslationContent**
    - Description : Récupère le contenu traduit pour une traduction terminée
    - Paramètres :
      - `translationId`: number - ID de la traduction à récupérer
    - Retourne : `Promise<TranslationResponse[]>`

### Méthodes de gestion de projet

1.  **getProjectInformation**
    - Description : Récupère des infos détaillées sur le projet actuel
    - Retourne :`Promise<Project>`

2.  **updateProjectName**
    - Description : Met à jour le nom du projet actuel
    - Paramètres :
      - `updatedProjectName`: string - Nouveau nom du projet
    - Retourne : `Promise<Project>`

3.  **setProjectActiveStatus**
    - Description : Active ou désactive le statut actif du projet
    - Paramètres :
      - `isActive`: boolean - Nouveau statut actif
    - Retourne : `Promise<Project>`

4.  **setTestMode**
    - Description : Active ou désactive le mode test pour le projet, pratique pour tester sans consommer de crédits API
    - Paramètres :
      - `isTestMode`: boolean - Nouveau statut du mode test
    - Retourne : `Promise<Project>`

### Méthodes de configuration

1.  **getDefaultConfiguration**
    - Description : Récupère les paramètres de configuration par défaut du projet
    - Retourne : `Promise<Configuration>`

2.  **updateConfiguration**
    - Description : Met à jour les paramètres de configuration du projet
    - Paramètres :
      - `partiallyUpdatedConfig`: PartialConfiguration - Mises à jour de la configuration
    - Retourne : `Promise<Configuration>`

3.  **getProjectSupportedLanguages**
    - Description : Récupère la liste des langues prises en charge par le projet ainsi que la langue d'origine
    - Retourne : `Promise<{ languages: string[], originLanguage: string }>`

4.  **getSupportedLanguages**
    - Description : Récupère toutes les langues supportées par le service Frenglish
    - Retourne : `Promise<string[]>`

5.  **getSupportedFileTypes**
    - Description : Récupère tous les types de fichiers pouvant être traités pour la traduction
    - Retourne : `Promise<string[]>`

### Méthodes de gestion des fichiers

1.  **upload**
    - Description : Téléverser des fichiers pour la traduction, généralement utilisés comme fichiers de base pour la comparaison
    - Paramètres :
      - `files`: FileContentWithLanguage\[] - Tableau de fichiers à téléverser
    - Retourne : `Promise<{ message: string, originFilesInfo: Array<{ fileId: string, originS3Version: string }> }>`

2.  **getTextMap**
    - Description : Récupère la carte des textes du projet, qui contient les correspondances de contenu pour assurer la cohérence
    - Retourne : `Promise<{ content: FlatJSON[] } | null>`

### Méthodes de gestion de domaine

1.  **getProjectDomain**
    - Description : Récupère l’URL de domaine associée au projet actuel
    - Retourne : `Promise<string>`

2.  **getPublicAPIKeyFromDomain**
    - Description : Récupère la clé API publique associée à un domaine donné
    - Paramètres :
      - `domainURL` : string - URL du domaine pour obtenir la clé API
    - Retourne : `Promise<string>`

## Types de configuration

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