---
id: oneTimeTranslation
sidebar_position: 3
description: One Time Translation
slug: /one-time-translation
---

# One Time Translation

## Using Frenglish.ai

In the "General Configuration" tab,

    a. Turn on the "Repository Active Status" and click "Save"
    b. Enter the translation path (ex "src/locales/*" ) you would like the files to manage translations for (all files under that path will be translated), click "Add path" then click "Save".

In the "Language Configuration" tab,

    a. Select your origin language (files you regularly manage, ex. English), then click "Save"
    b. Select languages you want to support, then click "Save"

Optionally, in the "Rules Configuration" tab,

    a. Enter all the general rules all your translation files should follow, then click "Save"
    b. Enter language specific rules for yoru translation files, then click "Save"

You're ready to translate! Your next translation will be created on your next commit (for changes detected in your language files) or click the green "One-time Translation" to get started.

Option 1:
Click "All" option to translate all your files from the translation path.

Option 2:
Click "specify paths" to translate only certain files

    b. Enter your branch name you want to translate from. The Frenglish bot will create a new Pull Request from that branch you specificed
    c. Select the languages you want to translate to
    d. Click "Translate Now" whenever you're ready!

## Translating all files locally

1. If you commit the `frenglishConfig.json` file for the first time, and the target language translation files do not exist (or they do not belong under the target language folder) it will translate all your files. The origin language file name must match the target language file identically.
2. If you commit a change in the `frenglishConfig.json` and there are no translation files or folder that exist, we will translate all your origin language files into your target language.

Example, `common.json` will be translated in the `fr` folder since `common.json` does not exist in the `fr` folder: 

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
        │  fr/
        │  ├─ common1.json
```

Example 2, `common.json` will be translated in a newly created `fr` folder since in the `frenglishConfig.json`, it has `fr` specified in the `languages` value: 

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```
