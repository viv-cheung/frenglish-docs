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

## Règles et filtres de clés
Les options de configuration qui déterminent _ce qui_ est traduit et _comment_ peuvent être regroupées sous les règles et les filtres de clés. Vous pouvez les transmettre via `partialConfig` lors de l'appel à `translate()` ou `translateString()`, ou les définir dans le tableau de bord de votre projet.

### Règles de traduction

- **rules** (chaîne de caractères, optionnelle) – Instructions générales pour le traducteur (ex. : ton, terminologie, style). Appliquées à toutes les langues cibles, sauf si elles sont remplacées par des règles spécifiques à une langue.
- **rulesPerLanguage** (tableau de `{ language, rules }`, optionnel) – Remplace les règles pour certaines langues cibles. Chaque entrée contient un code langue (ex : `"fr"`) et une chaîne `rules`. Utile si une locale nécessite un style ou une terminologie différente.
- **implicitRules** (tableau, optionnel) – Règles implicites structurées appliquées par le pipeline de traduction.

### Filtres d'inclusion et d'exclusion (filtres de clés)
Les filtres de clés déterminent quelles **clés** de votre JSON (ou autre contenu structuré) sont envoyées à la traduction. Ils s'appliquent au chemin de la clé (ex : clé de premier niveau `"title"` ou chemin imbriqué comme `"meta.description"`).
-   **keyFilters** (objet ou `null`, optionnel) :
    - **includeFilters** – Tableau de motifs. Lorsqu'il n'est **pas vide**, seules les clés dont le chemin correspond à **au moins un** de ces motifs sont traduites. Toutes les autres clés restent inchangées.
    - **excludeFilters** – Tableau de motifs. Les clés dont le chemin correspond à **l'un** de ces motifs **ne sont pas** traduites ; elles restent dans la langue d'origine.
    - Si `includeFilters` et `excludeFilters` sont tous deux `null` ou vides, **toutes** les clés sont traduites (aucun filtrage).
    - **Comportement si les deux sont définis :** L'inclusion est appliquée en premier (seules les clés correspondantes sont candidates) ; puis l'exclusion est appliquée (les clés correspondantes sont retirées de cet ensemble). Ainsi, une clé est traduite uniquement si elle correspond à un motif d'inclusion (si des inclusions sont présentes) et ne correspond à aucun motif d'exclusion.

-   **keyFiltersPerLanguage** (tableau de `{ language, keyFilters }`, optionnel) – Remplace les filtres de clés par langue cible. Chaque entrée contient un code langue et un objet `keyFilters` avec ses propres `includeFilters` et `excludeFilters`. Si vous ne définissez pas de filtre par langue pour une langue, le filtre global `keyFilters` est utilisé pour cette langue.

**Format des motifs :** Chaque motif est un chemin de clé séparé par des points (ex : `title`, `meta.description`). Le chemin de clé d'une entrée est comparé à ces motifs. Un segment peut être `*` pour correspondre à n'importe quelle clé à ce niveau (ex : `meta.*` correspond à `meta.title`, `meta.description`, etc.). Vous ne pouvez pas utiliser le même motif à la fois en inclusion et en exclusion.

**Cas d'utilisation typiques :**
- **Inclure uniquement certaines clés :** Définissez `includeFilters` avec les motifs des clés que vous souhaitez traduire (ex : `["title", "meta.label"]`). Tout le reste reste non traduit.
- **Exclure des clés sensibles ou non traduisibles :** Définissez `excludeFilters` avec les motifs des clés à ne pas traduire (ex : `["internalId", "code", "url"]`). Toutes les autres clés sont traduites.
- **Clés différentes selon la langue :** Utilisez `keyFiltersPerLanguage` pour que, par exemple, une langue ne reçoive qu'un sous-ensemble de clés tandis qu'une autre reçoive toutes les clés.

**Exemple : JSON d'entrée vs sortie avec filtres**

Supposons que la langue d'origine soit l'anglais et que vous traduisiez en français. JSON d'entrée :

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

- **Avec `includeFilters: ["title", "meta.label"]`** — Seuls ces chemins de clés sont traduits ; le reste reste dans la langue d'origine :

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

- **Avec `excludeFilters: ["id", "code"]`** — Tout est traduit sauf les clés dont le chemin contient `id` ou `code` :

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

Vous pouvez transmettre des filtres de clés dans `partialConfig` lors de l'appel à `translate()` ; voir les paramètres de [translate](#translate) et l'exemple ci-dessous dans cette section.

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
- partialConfig : PartialConfiguration (optionnel) - Remplace les paramètres de configuration par défaut pour cette traduction. Principales options :
  - **originLanguage**, **languages** – Codes des langues source et cibles.
  - **rules**, **rulesPerLanguage**, **implicitRules** – Règles de traduction (voir [Règles et filtres de clés](#rules-and-key-filters)).
  - **keyFilters** – `{ includeFilters: string[], excludeFilters: string[] } | null` pour inclure ou exclure des clés de la traduction (voir [Filtres d'inclusion et d'exclusion](#include-and-exclude-filters-key-filters)).
  - **keyFiltersPerLanguage** – Remplacements par langue pour les filtres de clés (voir [Filtres d'inclusion et d'exclusion](#include-and-exclude-filters-key-filters)).
  - **autoMergeToBaseBranch**, **useThisConfig** – Autres options de comportement.

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

**Exemple avec filtres d'inclusion/exclusion** (traduire uniquement certaines clés, ou en exclure d'autres) :

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