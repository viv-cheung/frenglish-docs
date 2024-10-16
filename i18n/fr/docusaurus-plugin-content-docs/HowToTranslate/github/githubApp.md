---
id: githubApp
sidebar_position: 2
description: How github app manages your locale files
slug: /githubApp
---

# How automated translations are managed

If you make any changes in any of your origin language files (e.g. `en/common.json`), the Frenglish bot will pick up those changes and translate them in their respective target language files. The Frenglish bot will create new files or folders if they do not see that the target language files exist.

**Example where to make changes**
   - Make a change in the following file by changing some text:

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```

   - Save the file, make a commit, and push the changes using git.
   - Go to your **Pull Requests**  tab on Github to see your new translation PR created by Frenglish from your base branch.

**Automated Pull Requests**
   - Any commit in the origin language folder of "translationPaths" will trigger Frenglish to create a pull request with updated translation files in the designated languages.
   - Changes made to non-origin language files will not trigger new translations.
