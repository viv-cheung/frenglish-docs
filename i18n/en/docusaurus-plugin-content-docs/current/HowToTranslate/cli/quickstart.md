---
id: cli-quickstart
sidebar_position: 4
description: Learn how to use Frenglish's CLI to streamline your translation workflow
slug: /CLI
---

# CLI Quickstart

## Introduction

The Frenglish CLI (Command Line Interface) is a powerful tool that allows developers to integrate translation commands of content files directly into their workflow. With the Frenglish CLI, you can easily submit files for translation, upload new files, check translation status, and retrieve translated content from your terminal. This guide will help you get started with one-time translations or manual translation management outside your automated build pipelines.

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

1. Create a `.env` file in your project root directory. You'll get the FRENGLISH_API_KEY from [www.frenglish.ai](https://www.frenglish.ai) when you create a new project. It will be under the **Developer Settings** tab:

```bash
FRENGLISH_API_KEY=your_api_key_here
ORIGIN_LANGUAGE_TRANSLATION_PATH=/path/to/your/translation/directory
TRANSLATION_PATH=/path/to/translation/output
```

Example:

```bash
FRENGLISH_API_KEY=123abcdefg
ORIGIN_LANGUAGE_TRANSLATION_PATH=/src/locales/en
TRANSLATION_PATH=/src/locales
```

Replace `your_api_key_here` with your actual Frenglish API key and set the correct paths for `ORIGIN_LANGUAGE_TRANSLATION_PATH` (the directory where your original language files are stored) and `TRANSLATION_PATH` (the directory where the translated files will be saved).

2. Ensure your `.gitignore` file includes `.env` to keep your API key secure.

## Basic Usage

The basic syntax for the Frenglish CLI is:

```bash
frenglish-translate [options]
```

Without any options, the CLI will:

1. Detect all files in your specified translation directory (`ORIGIN_LANGUAGE_TRANSLATION_PATH`).
2. Submit these files for translation.
3. Wait for the translation to complete.
4. Save the translated files in the appropriate language subdirectories inside `TRANSLATION_PATH`.
5. After you have reviewed the generated translation files, commit them into your version control branch.

### Advanced Usage

Here’s how you can use the CLI with different options to manage translations effectively.

### Command Options

- **--path [string]**: Specify a custom path for translating specific files or directories.
  - Default: Value of `ORIGIN_LANGUAGE_TRANSLATION_PATH` in your `.env` file.

  Example:
  ```bash
  frenglish translate --path "./custom/path/file.json"
  ```

- **--isFullTranslation [boolean]**: Perform a full translation (translate all files, even if they haven't changed).
  - Default: `false` (only changed files are translated).
  Example:
  ```bash
  frenglish translate --isFullTranslation=true
  ```
- **--help**: Display all available options and their descriptions.
  Example:
  ```bash
  frenglish translate --help
  ```
### CLI Commands
1. **Translate Files**:
   The primary command for translating files. This will detect changed files, submit them for translation, and save the translated files.
   ```bash
   frenglish translate
   ```
   Options:
   - `--path`: Specify a file or directory to translate.
   - `--isFullTranslation`: Translate all files, regardless of changes.
   Examples:
   ```bash
   frenglish translate --path "./custom/path/file.json"
   frenglish translate --isFullTranslation=true
   ```
2. **Upload New Files**:
   Use this command if you want to initialize translation for existing files. For an example, if you already have some translated files and you don't want to translate them again, you can use this command to upload existing translations. Frenglish will use these initialized files as the base and if the origin-language file changes, it will only translate the changed parts for the translated files.

   ```bash
   frenglish upload
   ```

   Options:
   - `--path`: Specify a custom path for uploading files.

   Example:
   ```bash
   frenglish upload --path ./custom/locales
   ```

## Workflow Examples

1. **Translating Changed Files**:
   - Make changes to your content files in the specified directory.
   - Run the Frenglish CLI to translate those changed files:

   ```bash
   frenglish translate
   ```

   - The CLI will detect the changed files, initiate the translation process, and save the translated files in language-specific subdirectories under `TRANSLATION_PATH`.

2. **Translating All Files (Full Translation)**:
   - To translate all files, even if they haven't changed recently, use the `--isFullTranslation` flag:
   ```bash
   frenglish translate --isFullTranslation=true
   ```
3. **Translating Specific Files**:
   - To translate specific files or directories, use the `--path` option:
   ```bash
   frenglish translate --path "./src/locales/en/specific-file.json"
   ```
4. **Uploading New Files**:
   - To upload newly added files for translation, run:
   ```bash
   frenglish upload --path "./src/locales/new_files"
   ```
## Troubleshooting
If you encounter any issues:
1. **Check Your `.env` File**:
   Ensure your `.env` file is correctly set up and in the right location. Verify that the `FRENGLISH_API_KEY` and paths (`ORIGIN_LANGUAGE_TRANSLATION_PATH` and `TRANSLATION_PATH`) are set correctly.
2. **Verify Your API Key**:
   Check that your API key is valid in your Frenglish account.
3. **Directory Access**:
   Ensure the paths specified in `ORIGIN_LANGUAGE_TRANSLATION_PATH` and `TRANSLATION_PATH` are correct and that you have the necessary permissions to read from and write to those directories.