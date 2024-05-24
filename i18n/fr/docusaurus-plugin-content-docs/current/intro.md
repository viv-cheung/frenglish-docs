---
sidebar_position: 1
description: Frenglish is designed to help your business enter new markets quickly with automated translations.
slug: /
---

# Introduction {#introduction}

⚡️ Frenglish helps you generate new translation content or keep existing translations up to date **in no time**.

💸 Keeping all your locale files up to date is expensive and time-consuming. Using Frenglish's integrated automation tool, you can forget about maintaining any of your supported languages. 

💥 If your website uses i18n, our tool will directly generate and maintain your locale files.

## How does it work? {#howitworks}

**Integrated Translation Tool**
1. Download the [Frenglish GitHub App](https://github.com/apps/frenglish-translation-app) and click **Install** on your repository.
2. Create a Frenglish config in the root directory of your repository (`frenglishConfig.json`) and paste the following content into the file:

```json
{
    "originLanguage": "en",
    "languages": ["fr", "ja", "es"],
    "rules": "Do not translate Frenglish",
    "translationPaths": ["docs/locales/*"],
    "autoMergeToBaseBranch": false
}
```

**originLanguage**: Specify the origin language of your document/webpage. This is the language that you will regularly update to add new content.
**languages**: Specify all the languages you want to support in a string array.
**rules**: In a string, specify all the translation rules you want. These rules will be applied to all translation files.
**translationPaths**: Specify all the paths you want the Frenglish bot to parse through to translate all the files in that directory.
**autoMergeToBaseBranch**: Boolean option - **False** will create a Pull Request on a new branch based on the branch where you edited an origin language locale file. **True** will auto-merge the new locale files into your branch.

**Example Directory Structure**
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

**Example where to make changes**
   - Make a change in the following file by changing some text:

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```

   - Save the file, make a commit, and push the changes.
   - Go to your **Pull Requests**  tab to see your new translation PR created from your base branch or see the locale commit directly in your branch.

3. **Automated Pull Requests**
   - Any commit affecting the specified "translationPaths" will trigger Frenglish to create a pull request with updated translation files in the designated languages.
   - Changes made to non-origin language files will not trigger new translations.

## Frenglish's commitment {#commitment}

We ensure this tool is easy to use by dogfooding (using the Frenglish bot internally) our product regularly. This website is open-source for you to see how we implemented i18n for our webpages and serves as an example of the quality of our translations. Additionally, you can see how the bot creates the PRs for locale files.

We ensure great translation quality by going through many iterations of AI reflection, reviews, and learnings. If you make any modifications to a locale file that is not in the origin language, our AI will implicitly learn from these changes and apply them in future translations.

We regularly perform quality assurance tests on our translation files by running standardized translation tests like the METEOR score, sending them to human translators, and continuously gathering user feedback.

## Features {#features}

Frenglish is built with a strong focus on the developer and content manager experience.

- **Locale File Support**:
  - The Frenglish bot supports any of the following file formats (all translated locale files will be keeping the same file type format):
    - PO files (.po)
    - Markdown (.md, .mdx)
    - JSON (.json)
    - HTML (.html)
    - Doc files (.docx)
- **Docusaurus Example**:
  - Frenglish utilizes Docusaurus to display all the documentation (view the code to see how it works!)
- **Developer experience**:
  - Integrate the Frenglish bot onto your repository in seconds and have the set up complete in minutes
  - Never worry about translations again
  - All users that have access to your repository will have the translation support
- **Natural Learning**:
  - The longer you use Frenglish, the more attuned our bot will be to your needs. The Frenglish bot learns anytime you make a change in a non-origin locale file and applies those learnings to all future translations.
  - The bot runs through multiple reflections and reviews to reassess translations and see how it can improve them before you see the final translation files.
- **Quick lead times**:
  - Compared to other translation services on the market, no matter how many translation files you need, they will be ready in minutes. No need to wait days or weeks to receive your translation files!
- **Cost efficient**:
  - We only translate the strings you modified. Therefore, if you have an existing translated locale file, we will parse through that file and only translate the differences between the origin and translated locale file. This is all done automatically for you, so there is nothing you need to specify.
  - We designed this product for start-ups and companies that don't want to spend a big budget on translations. We want your company to succeed and to unlock new audiences ASAP with low cost.

## User feedback {#feedback}

For new feature requests, you can create an issue on our [Frenglish repository](https://github.com/viv-cheung/frenglish-website-vite) or feel free to reach out to us directly at support@frenglish.ai. We look forward to hear from you! 