---
id: Quickstart
sidebar_position: 2
description: Quickstart guide
slug: /quickstart
---

# Démarrage rapide

**Outil de traduction intégré**
1. Téléchargez l'[application GitHub Frenglish](https://github.com/apps/frenglish-translation) et cliquez sur **Installer** sur votre dépôt.
2. Créez une configuration Frenglish dans le répertoire racine de votre dépôt (`frenglishConfig.json`) et collez le contenu suivant dans le fichier :

```json
{
    "originLanguage": "en",
    "languages": ["fr", "ja", "es"],
    "rules": "Do not translate Frenglish",
    "translationPaths": ["docs/locales/*"],
    "autoMergeToBaseBranch": false,
    "rulesPerLanguage": [
      {
         "language": "fr",
         "rules": "French rule 1"
      },
      {
         "language": "ja",
         "rules": "Japanese rule 1"
      }
     ],
    "useThisConfig": true
}
```

**originLanguage** : Spécifiez la langue d'origine de votre document/page web. C'est la langue que vous mettrez régulièrement à jour pour ajouter du nouveau contenu.
**languages** : Spécifiez toutes les langues que vous souhaitez prendre en charge dans un tableau de chaînes de caractères.
**rules** : Dans une chaîne de caractères, spécifiez toutes les règles de traduction que vous souhaitez. Ces règles seront appliquées à tous les fichiers de traduction.
**translationPaths** : Spécifiez tous les chemins que vous souhaitez que le bot Frenglish parcoure pour traduire tous les fichiers dans ce répertoire.
**autoMergeToBaseBranch** : Option booléenne - **False** créera une Pull Request sur une nouvelle branche basée sur la branche où vous avez modifié un fichier de locale de langue d'origine. **True** fusionnera automatiquement les nouveaux fichiers de locale dans votre branche.

**Structure de répertoire d'exemple**
   - Les fichiers de traduction seront organisés comme suit :

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
        │  └─ about.json
        ├─ fr/
        │  ├─ common.json
        │  └─ about.json
```

**Exemple où apporter des modifications**
   - Apportez une modification dans le fichier suivant en changeant du texte :

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```

- Enregistrez le fichier, faites un commit et poussez les modifications.
   - Allez dans l'onglet **Pull Requests** pour voir votre nouvelle PR de traduction créée à partir de votre branche de base ou voyez le commit de locale directement dans votre branche.

3. **Pull Requests automatisées**
   - Tout commit affectant les "translationPaths" spécifiés déclenchera Frenglish pour créer une pull request avec les fichiers de traduction mis à jour dans les langues désignées.
   - Les modifications apportées aux fichiers de langue non d'origine ne déclencheront pas de nouvelles traductions.