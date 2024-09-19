---
id: translationFilesManagement
sidebar_position: 2
description: How to structure translation files
slug: /translation-files-management
---

# Translation Files Management

## How to structure your translation files for automatic translations

### Option 1:

- Origin language folder should be named the language code (ex. "en")
- Files inside the origin language folder should only contain files required for translation
- These files do not need to contain the origin language folder name (ex. intro.md, about.json, contactUs.po)

**Example Directory Structure**
   - Translation files will be organized as follows. The translation path for this example would be `docs/locales/*`:

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

### Option 2:
- Have a parent folder called `locales` or `languages` or a name that symbolizes all the children files are translation/language files
- Name each file with the language code in the filename
- Using this method, none of the declared origin languages will be translated. All files containing target language codes will be translated

**Example Directory Structure**
   - Translation files will be organized as follows. The translation path for this example would be `docs/locales/*`:

```plaintext
    docs/
    ├─ locales/
        ├─ en_common.json
        │  en_about.json
        ├─ fr_common.json
        │  fr_about.json
```