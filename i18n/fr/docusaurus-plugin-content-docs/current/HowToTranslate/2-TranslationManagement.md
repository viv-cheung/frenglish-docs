---
id: translationFilesManagement
sidebar_position: 2
description: How to structure translation files
slug: /translation-files-management
---

fr + fr-translated # Gestion des fichiers de traduction

fr + fr-translated ## Comment structurer vos fichiers de traduction pour des traductions automatiques

fr + fr-translated ### Option 1 :

fr + fr-translated - Le dossier de la langue d'origine doit être nommé avec le code de la langue (ex. "en")
- Les fichiers à l'intérieur du dossier de la langue d'origine ne doivent contenir que les fichiers nécessaires à la traduction
- Ces fichiers n'ont pas besoin de contenir le nom du dossier de la langue d'origine (ex. intro.md, about.json, contactUs.po)

fr + fr-translated **Exemple de structure de répertoire**
   - Les fichiers de traduction seront organisés comme suit. Le chemin de traduction pour cet exemple serait `docs/locales/*` :

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

fr + fr-translated ### Option 2 :
- Avoir un dossier parent appelé `locales` ou `languages` ou un nom qui symbolise que tous les fichiers enfants sont des fichiers de traduction/langue
- Nommer chaque fichier avec le code de la langue dans le nom du fichier
- En utilisant cette méthode, aucune des langues d'origine déclarées ne sera traduite. Tous les fichiers contenant des codes de langue cible seront traduits

fr + fr-translated **Exemple de structure de répertoire**
   - Les fichiers de traduction seront organisés comme suit. Le chemin de traduction pour cet exemple serait `docs/locales/*` :

```plaintext
    docs/
    ├─ locales/
        ├─ en_common.json
        │  en_about.json
        ├─ fr_common.json
        │  fr_about.json
```

fr + fr-translated ## Comment les traductions automatiques sont gérées

fr + fr-translated Si vous apportez des modifications à l'un de vos fichiers de langue d'origine (par exemple `en/common.json`), le bot Frenglish détectera ces modifications et les traduira dans leurs fichiers de langue cible respectifs. Le bot Frenglish créera de nouveaux fichiers ou dossiers s'il ne voit pas que les fichiers de langue cible existent.

fr + fr-translated **Exemple où apporter des modifications**
   - Apportez une modification au fichier suivant en changeant du texte :

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```

fr + fr-translated - Enregistrez le fichier, faites un commit et poussez les modifications en utilisant git.
   - Allez dans l'onglet **Pull Requests** sur Github pour voir votre nouvelle PR de traduction créée par Frenglish à partir de votre branche de base.

fr + fr-translated **Pull Requests automatiques**
   - Tout commit dans le dossier de langue d'origine de "translationPaths" déclenchera Frenglish pour créer une pull request avec des fichiers de traduction mis à jour dans les langues désignées.
   - Les modifications apportées aux fichiers de langue non d'origine ne déclencheront pas de nouvelles traductions.