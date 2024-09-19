---
id: cli-quickstart
sidebar_position: 4
description: Learn how to use Frenglish's CLI to streamline your translation workflow
slug: /CLI
---

# CLI User Guide

## Introduction

The Frenglish CLI (Command Line Interface) is a powerful tool that allows developers to integrate translation commands of content files directly into their workflow. With the Frenglish CLI, you can easily submit files for translation, check translation status, and retrieve translated content, all from your terminal. The main use cases are for one-time translations or when you don't want to automate the translation process into your build pipeline.

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
ORIGIN_LANGUAGE_TRANSLATION_PATH=/path/to/your/translation/directory
```

Example:
```
FRENGLISH_API_KEY=123abcdefg
ORIGIN_LANGUAGE_TRANSLATION_PATH=/src/locales/en
```

Replace `your_api_key_here` with your actual Frenglish API key and set the correct path for `ORIGIN_LANGUAGE_TRANSLATION_PATH`. This path is where all your origin language locales are stored.

2. Ensure your `.gitignore` file includes `.env` to keep your API key secure.

## Basic Usage

The basic syntax for the Frenglish CLI is:

```bash
frenglish-translate [options]
```

Without any options, the CLI will:
1. Detect changed files in your specified translation directory
2. Submit these files for translation
3. Wait for the translation to complete
4. Save the translated files in the appropriate language subdirectories
5. After you have reviewed these generated translation files, feel free to commit them into your branch

## Advanced Options

Examples:
```bash
yarn frenglish-translate
```

This will process all files in the directory specified by `ORIGIN_LANGUAGE_TRANSLATION_PATH` in your `.env` file. Use this option when you want to ensure all your content is translated, even if some files haven't changed recently.

## Workflow Examples

1. Translating only changed files:
   a. Make changes to your content files in the specified translation directory.
   b. Run the Frenglish CLI:
      ```bash
      frenglish-translate
      ```
   c. The CLI will detect changed files and initiate the translation process.
   d. Once completed, you'll find the translated files in language-specific subdirectories.

## Troubleshooting

If you encounter any issues:

1. Ensure your `.env` file is correctly set up and in the right location.
2. Check that your API key is valid and has the necessary permissions.
3. Verify that the `ORIGIN_LANGUAGE_TRANSLATION_PATH` is correct and accessible.