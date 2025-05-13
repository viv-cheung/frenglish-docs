---
id: translationFilesManagement
sidebar_position: 2
description: Comment structurer les fichiers de traduction
slug: /translation-files-management
---

# Gestion des fichiers de traduction

## Comment organiser tes fichiers de traduction pour des traductions automatiques

### Option 1 :

- Le dossier de la langue d’origine doit porter le code de la langue (ex : « en »)
- Les fichiers à l’intérieur du dossier de langue d’origine doivent seulement contenir les fichiers à traduire
- Ces fichiers n’ont pas besoin d’inclure le nom du dossier de langue d’origine (ex : intro.md, about.json, contactUs.po)

**Exemple de structure de répertoire**
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

### Option 2 :

- Crée un dossier parent nommé `locales`, `languages` ou un nom qui indique que tous les fichiers enfants sont des fichiers de traduction/langue
- Nomme chaque fichier avec le code de langue dans le nom du fichier
- Avec cette méthode, aucune des langues d’origine déclarées ne sera traduite. Tous les fichiers contenant des codes de langues cibles seront traduits

**Exemple de structure de répertoire**
- Les fichiers de traduction seront organisés comme suit. Le chemin de traduction pour cet exemple serait `docs/locales/*` :

```plaintext
    docs/
    ├─ locales/
        ├─ en_common.json
        │  en_about.json
        ├─ fr_common.json
        │  fr_about.json
```