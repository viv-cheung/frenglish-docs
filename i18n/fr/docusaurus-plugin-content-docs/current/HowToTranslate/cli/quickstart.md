---
id: cli-quickstart
sidebar_position: 4
description: MOCKDATA + fr-translated Learn how to use Frenglish's CLI to streamline your translation workflow
slug: /CLI
---

# fr-translated CLI Quickstart

## MOCKDATA + fr-translated Introduction
fr-translated A powerful command-line interface for managing translations with Frenglish.ai. This CLI tool helps you manage your translation projects, configure settings, and generate translations for your localization files all in your terminal.

## MOCKDATA + fr-translated Features

- fr-translated 🔐 Secure authentication with Frenglish.ai
- MOCKDATA + fr-translated 📦 Project management (create new projects or use existing ones)
- fr-translated 🌍 Multi-language support
- MOCKDATA + fr-translated 📂 Interactive directory navigation for file selection
- fr-translated ⚙️ Flexible configuration options
- MOCKDATA + fr-translated 🔄 Support for both full and incremental translations
- fr-translated 🧪 Test mode with mock data support
- MOCKDATA + fr-translated 💾 Local configuration persistence. All your configuration and project changes will appear the same on Frenglish.ai

## fr-translated Installation

```bash
npm install -g @frenglish/cli
```

## MOCKDATA + fr-translated Usage

### fr-translated Basic Commands

```bash
# Login to Frenglish.ai
frenglish login

# Translate files
frenglish translate
```

### MOCKDATA + fr-translated Translation Options
fr-translated When running `frenglish translate`, you can use the following options:

```bash
--apiKey <key>           # Frenglish API key (or set via FRENGLISH_API_KEY)
--path <path>           # Custom path for translation
--isFullTranslation     # Perform a full translation (overwrites existing translations)
--partialConfig <json>  # Partial config as JSON string or file path
```

### MOCKDATA + fr-translated Configuration
fr-translated The CLI supports configuration through:
- MOCKDATA + fr-translated Interactive prompts
- fr-translated Local configuration file (`frenglish.config.json`)
- MOCKDATA + fr-translated Environment variables
- fr-translated Command-line arguments

#### MOCKDATA + fr-translated Environment Variables \[OPTIONAL]
fr-translated The reason this is optional is because if you don't change your .env file, we will create a frenglish.config.json in your root directory that will store all your configuration settings.

```bash
FRENGLISH_API_KEY=<your_api_key>
TRANSLATION_PATH=<path_to_source_files>
TRANSLATION_OUTPUT_PATH=<path_for_translated_files>
EXCLUDED_TRANSLATION_PATH=<json_array_of_excluded_paths>
```

## MOCKDATA + fr-translated Interactive Flow
fr-translated When you run `frenglish login`, you'll be guided through an interactive setup process \[optional] or you may proceed with running Frenglish CLI commands on your own:
1. MOCKDATA + fr-translated **Authentication**: Opens your browser for secure login
2. fr-translated **Project Selection**: Choose to create a new project or use an existing one
3. MOCKDATA + fr-translated **Configuration**: Set up your translation preferences:
   - fr-translated Project name
   - MOCKDATA + fr-translated Origin language
   - fr-translated Target languages
   - MOCKDATA + fr-translated Translation paths
   - fr-translated Translation rules
4. MOCKDATA + fr-translated **Translation**: Option to start translation immediately

## fr-translated Directory Navigation
MOCKDATA + fr-translated The CLI provides an intuitive directory navigation interface:
- fr-translated Use arrow keys to navigate through directories
- MOCKDATA + fr-translated Select directories to enter them
- fr-translated Use "../" to go up one level
- MOCKDATA + fr-translated Enter custom paths when needed
- fr-translated Confirm your selection before proceeding

## MOCKDATA + fr-translated Command Examples if you do not want the interactive experience

```bash
# Basic translation with default settings
frenglish translate

# Translation with custom path
frenglish translate --path ./src/locales

# Full translation with custom configuration
frenglish translate --isFullTranslation --partialConfig '{"targetLanguages":["fr","es"]}'

# Translation using a configuration file
frenglish translate --partialConfig "./config.json"
```

## fr-translated Local Configuration
MOCKDATA + fr-translated The CLI saves your configuration in `frenglish.config.json` in your project root. This includes:
- fr-translated Project name
- MOCKDATA + fr-translated Translation paths
- fr-translated Language settings
- fr-translated Translation rules

## MOCKDATA + fr-translated Support
fr-translated For more information, visit [https://www.frenglish.ai](https://www.frenglish.ai)