---
id: cli-quickstart
sidebar_position: 4
description: Learn how to use Frenglish's CLI to streamline your translation workflow
slug: /CLI
---

# CLI User Guide

## Introduction

The Frenglish CLI (Command Line Interface) is a powerful tool that allows you to integrate translation commands of content files directly into their workflow. With the Frenglish CLI, you can easily submit files for translation, upload existing translations, check translation status, and retrieve translated content, all from your terminal. The main use cases are for one-time translations, when you want to maintain a base version of translations, or when you don't want to automate the translation process into your build pipeline.

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js** installed on your machine (version 14 or higher recommended)
- **npm** (Node Package Manager) for package installation
- **Git** for version control (optional but recommended)
- A **Frenglish API key** (Sign up on the Frenglish platform to obtain one)

## Installation

Install the Frenglish CLI globally using npm:

```bash
npm install -g frenglish
```

## Configuration

1. Create a `.env` file in your project root directory. You get the FRENGLISH_API_KEY from www.frenglish.ai when you create a new project. It will be under the "Developer Settings" tab:

```
FRENGLISH_API_KEY=your_api_key_here
ORIGIN_LANGUAGE_TRANSLATION_PATH=/path-to-your-origin-language-folder
TRANSLATION_PATH = /path-to-your-locale-files-folder(parent)
```

Example:
```
TRANSLATION_PATH = 'src/locales'
FRENGLISH_API_KEY = $2b$10$a1CHcIhEX96FiuSsTqxqOe45WjR5kuHNzx1RGQTZR1eyszYg/JO5S
ORIGIN_LANGUAGE_TRANSLATION_PATH = 'src/locales/en'
```

Replace `your_api_key_here` with your actual Frenglish API key and set the correct path for `ORIGIN_LANGUAGE_TRANSLATION_PATH`. This path is where all your origin language locales are stored.

2. Ensure your `.gitignore` file includes `.env` to keep your API key secure.

## Basic Usage

The basic syntax for the Frenglish CLI is:

```bash
frenglish translate
```

1. Send all files in your specified translation path
2. Translate content that was modified compared to previous translations
3. Wait for the translation to complete
4. Save the translated files in the appropriate language subdirectories

This will process all files in the directory specified by `ORIGIN_LANGUAGE_TRANSLATION_PATH` in your `.env` file.

## Uploading Existing Translations

Before initiating new translations, it's best practice to upload any existing translated files. This allows Frenglish to maintain a base version of translations and only translate future changes. To upload existing translations:

```bash
frenglish upload
```

This will upload all your translated files as a reference for future translations. The future translations will only detect the changes made to files in the origin language and translate those sections.

For example if you specified `TRANSLATION_PATH` as `src/locales`, it will match and upload all the "fr" and "es" files with the "en" files if "en" is the origin language:

src/locales/
│
├── en/
│   ├── demo.json
│   ├── howto.json
│   └── about.json
│
├── fr/
│   ├── demo.json
│   ├── howto.json
│   └── about.json
│
└── es/
    ├── demo.json
    ├── howto.json
    └── about.json

This command will:
1. Scan the specified directories for language-specific subdirectories
2. Upload all files found in these subdirectories to Frenglish
3. Match the translated files with their corresponding origin language files

**Note**: It's crucial to provide a path that includes both the origin language and target language directories to ensure proper matching of files.

## Workflow Examples

1. Uploading existing translations and translating changed files:
   a. Upload your existing translations:
      ```bash
      frenglish upload
      ```
   b. Make changes to your content files in the specified translation directory.
   c. Run the Frenglish CLI to translate only the changed files:
      ```bash
      frenglish translate
      ```
   d. Frenglish will identify changed files and initiate the translation process.
   e. Once completed, you'll find the updated translated files in language-specific subdirectories.

2. Translating changed files:
   a. Make changes to your content files in the specified translation directory.
   b. Run the Frenglish CLI:
      ```bash
      frenglish translate
      ```
   c. renglish will identify changed files and initiate the translation process.
   d. Once completed, you'll find the translated files in language-specific subdirectories.

## Troubleshooting

If you encounter any issues:

1. Ensure your `.env` file is correctly set up and in the right location.
2. Check that your API key is valid and has the necessary permissions.
3. Verify that the `ORIGIN_LANGUAGE_TRANSLATION_PATH` is correct and accessible.
4. Check that your configuration for this project is completed (project should have a green circle)
5. When uploading existing translations, make sure the provided path includes both origin and target language directories.

If problems persist, please contact Frenglish support for further assistance.