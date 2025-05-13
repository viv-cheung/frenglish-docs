---
id: cli-quickstart
sidebar_position: 4
description: Apprends comment utiliser le CLI de Frenglish pour simplifier ton flux de traduction
slug: /CLI
---

# Démarrage rapide du CLI

## Introduction
Une interface en ligne de commande puissante pour gérer tes traductions avec Frenglish.ai. Cet outil CLI t’aide à gérer tes projets de traduction, configurer les paramètres et générer des traductions pour tes fichiers de localisation directement dans ton terminal.

## Fonctionnalités

- 🔐 Authentification sécurisée avec Frenglish.ai
- 📦 Gestion de projets (crée de nouveaux projets ou utilise ceux existants)
- 🌍 Support multilingue
- 📂 Navigation interactive dans les dossiers pour choisir les fichiers
- ⚙️ Options de configuration flexibles
- 🔄 Prise en charge des traductions complètes ou incrémentielles
- 🧪 Mode test avec prise en charge de données fictives
- 💾 Sauvegarde locale de la configuration. Toutes tes modifications de configuration et de projet seront aussi visibles sur Frenglish.ai

## Installation

```bash
npm install -g @frenglish/cli
```

## Utilisation

### Commandes de base

```bash
# Login and initiate interactive translation flow
frenglish login

# Translate files based on .env setup
frenglish translate
```

## Flux interactif
Quand tu lances `frenglish login`, tu seras guidé à travers une configuration interactive et le processus de traduction :
1. **Authentification** : Ouvre ton navigateur pour une connexion sécurisée
2. **Sélection du projet** : Choisis de créer un nouveau projet ou d’en utiliser un existant
3. **Configuration** : Configure, mets à jour ou confirme tes paramètres de traduction :
   - Nom du projet
   - Langue d’origine
   - Langues cibles
   - Chemins de traduction
   - Règles de traduction
4. **Traduction** : Possibilité de lancer la traduction immédiatement

## Configuration locale
Le flux interactif du CLI sauvegarde ta configuration dans `frenglish.config.json` à la racine de ton projet. Ça inclut :
- Nom du projet
- Chemins de traduction
- Paramètres de langue
- Règles de traduction

et plus encore

## Exemples de commandes si tu ne veux pas l’expérience interactive

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

### Options de traduction
Quand tu utilises `frenglish translate`, tu peux utiliser les options suivantes :

```bash
--apiKey <key>           # Frenglish API key (or set via FRENGLISH_API_KEY)
--path <path>           # Custom path for translation
--isFullTranslation     # Perform a full translation (overwrites existing translations)
--partialConfig <json>  # Partial config as JSON string or file path
```

#### Variables d’environnement \[OPTIONNEL]
C’est optionnel parce que si tu ne modifies pas ton fichier .env, on va créer un fichier frenglish.config.json à la racine de ton projet pour stocker tous tes paramètres de configuration.

```bash
FRENGLISH_API_KEY=<your_api_key>
TRANSLATION_PATH=<path_to_source_files>
TRANSLATION_OUTPUT_PATH=<path_for_translated_files>
EXCLUDED_TRANSLATION_PATH=<json_array_of_excluded_paths>
```

## Support
Pour plus d’infos, visite [https://www.frenglish.ai](https://www.frenglish.ai)