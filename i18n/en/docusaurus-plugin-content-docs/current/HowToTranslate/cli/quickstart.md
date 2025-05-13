---
id: cli-quickstart
sidebar_position: 4
description: Learn how to use Frenglish's CLI to streamline your translation workflow
slug: /CLI
---

# CLI Quickstart

## Introduction

A powerful command-line interface for managing translations with Frenglish.ai. This CLI tool helps you manage your translation projects, configure settings, and generate translations for your localization files all in your terminal.

## Features

- 🔐 Secure authentication with Frenglish.ai
- 📦 Project management (create new projects or use existing ones)
- 🌍 Multi-language support
- 📂 Interactive directory navigation for file selection
- ⚙️ Flexible configuration options
- 🔄 Support for both full and incremental translations
- 🧪 Test mode with mock data support
- 💾 Local configuration persistence. All your configuration and project changes will appear the same on Frenglish.ai

## Installation

```bash
npm install -g @frenglish/cli
```

## Usage

### Basic Commands

```bash
# Login and initiate interactive translation flow
frenglish login

# Translate files based on .env setup
frenglish translate
```

## Interactive Flow

When you run `frenglish login`, you'll be guided through an interactive setup and translation process:

1. **Authentication**: Opens your browser for secure login
2. **Project Selection**: Choose to create a new project or use an existing one
3. **Configuration**: Set up, update or confirm your translation settings:
   - Project name
   - Origin language
   - Target languages
   - Translation paths
   - Translation rules
4. **Translation**: Option to start translation immediately

## Local Configuration

The CLI interactive flow saves your configuration in `frenglish.config.json` in your project root. This includes:
- Project name
- Translation paths
- Language settings
- Translation rules

and more

## Command Examples if you do not want the interactive experience

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


### Translation Options

When running `frenglish translate`, you can use the following options:

```bash
--apiKey <key>           # Frenglish API key (or set via FRENGLISH_API_KEY)
--path <path>           # Custom path for translation
--isFullTranslation     # Perform a full translation (overwrites existing translations)
--partialConfig <json>  # Partial config as JSON string or file path
```

#### Environment Variables [OPTIONAL]

The reason this is optional is because if you don't change your .env file, we will create a frenglish.config.json in your root directory that will store all your configuration settings.

```bash
FRENGLISH_API_KEY=<your_api_key>
TRANSLATION_PATH=<path_to_source_files>
TRANSLATION_OUTPUT_PATH=<path_for_translated_files>
EXCLUDED_TRANSLATION_PATH=<json_array_of_excluded_paths>
```


## Support
For more information, visit [https://www.frenglish.ai](https://www.frenglish.ai) 