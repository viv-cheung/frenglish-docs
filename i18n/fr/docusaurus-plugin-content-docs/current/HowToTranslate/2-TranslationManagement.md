---
id: translationFilesManagement
sidebar_position: 2
description: How to structure translation files
slug: /translation-management
---

# Translation Management

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
        ├─ en/common.json
        │  en/about.json
        ├─ fr/common.json
        │  fr/about.json
```

## How automated translations are managed

If you make any changes in any of your origin language files, the Frenglish bot will pick up those changes and translate them in their respective target language files. The Frenglish bot will create new files or folders if they do not see that the target language files exist or not.

**Example where to make changes**
   - Make a change in the following file by changing some text:

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```

   - Save the file, make a commit, and push the changes using git.
   - Go to your **Pull Requests**  tab to see your new translation PR created from your base branch or see the local commit directly in your branch.

**Automated Pull Requests**
   - Any commit in the origin language folder of "translationPaths" will trigger Frenglish to create a pull request with updated translation files in the designated languages.
   - Changes made to non-origin language files will not trigger new translations.
