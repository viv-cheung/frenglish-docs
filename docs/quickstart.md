---
id: quickstart
sidebar_position: 2
description: Quickstart guide
slug: /quickstart
---

fr + fr-translated **Integrated Translation Tool**
1. Download the [Frenglish GitHub App](https://github.com/apps/frenglish-translation) and click **Install** on your repository.
2. Create a Frenglish config in the root directory of your repository (`frenglishConfig.json`) and paste the following content into the file:

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

fr + fr-translated **originLanguage**: Specify the origin language of your document/webpage. This is the language that you will regularly update to add new content.
**languages**: Specify all the languages you want to support in a string array.
**rules**: In a string, specify all the translation rules you want. These rules will be applied to all translation files.
**translationPaths**: Specify all the paths you want the Frenglish bot to parse through to translate all the files in that directory.
**autoMergeToBaseBranch**: Boolean option - **False** will create a Pull Request on a new branch based on the branch where you edited an origin language locale file. **True** will auto-merge the new locale files into your branch.

fr + fr-translated **Example Directory Structure**
   - Translation files will be organized as follows:

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

fr + fr-translated **Example where to make changes**
   - Make a change in the following file by changing some text:

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```

fr + fr-translated - Save the file, make a commit, and push the changes.
   - Go to your **Pull Requests**  tab to see your new translation PR created from your base branch or see the locale commit directly in your branch.

fr + fr-translated 3. **Automated Pull Requests**
   - Any commit affecting the specified "translationPaths" will trigger Frenglish to create a pull request with updated translation files in the designated languages.
   - Changes made to non-origin language files will not trigger new translations.