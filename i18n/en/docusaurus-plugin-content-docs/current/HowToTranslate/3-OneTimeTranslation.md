---
id: oneTimeTranslation
sidebar_position: 3
description: One Time Translation
slug: /one-time-translation
---

# One Time Translation
One time Translations allow you to re-translate entirely all or specific files. This can be useful to improve the rules provided or to have Frenglish review outdated manually translated files.


## Using Frenglish.ai

Once you have configured your translation settings (see [configuration](1-Configuration.md)), click on the green "One-Time Translation" button.

![General Configuration](../../../../../assets/general-configuration.png)

1. Select files for one-time translation
    - Option 1: Click **All** option to translate all your files from the translation path.
    - Option 2: Click **specify paths** to translate only certain files

2. Enter your branch name you want to translate from. The Frenglish bot will create a new Pull Request from that branch you specificed
3.  Select the languages you want to translate to
4.  Click "Translate Now" whenever you're ready!

## Translating all files locally
You can also translate or re-translate all files locally if you have a [local config (`frenglishConfig.json`)](1-Configuration.md#manage-translation-settings-in-your-repository)

### First time translation
If you commit the `frenglishConfig.json` file for the first time, and the target language translation files do not exist, all your files will be translated in the new languages

### When updating your `frenglishConfig.json`
If you commit a change in the `frenglishConfig.json` and there are no translation files or folder that exist for the target languages, we will translate all your origin language files.

For instance, pushing a commit where you added `ja` to your `languages` array would initiate a translation of all your files to Japanase by Frenglish.

Example: `common.json` will be translated in a newly created `ja` folder since in the `frenglishConfig.json` now has `ja` specified in the `languages` array: 

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```

### Re-translating existing translation files
If there are existing translation files you wish to re-translate entirely, you will simply need to delete them. The next commit will re-translate all the origin language files that are now missing in the target languages.  

Example, `common.json` will be translated in the `fr` folder since `common.json` was deleted from the `fr` folder: 

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
        │  fr/
        │  ├─ 
```
