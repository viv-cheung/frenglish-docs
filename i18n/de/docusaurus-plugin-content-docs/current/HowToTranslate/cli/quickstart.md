---
id: cli-quickstart
sidebar_position: 4
description: So nutzt du das CLI von Frenglish, um deinen Übersetzungs-Workflow zu optimieren
slug: /CLI
---

# CLI Schnellstart

## Einführung
Ein leistungsstarkes Kommandozeilen-Tool zur Verwaltung von Übersetzungen mit Frenglish.ai. Mit diesem CLI-Tool kannst du Übersetzungsprojekte verwalten, Einstellungen konfigurieren und Übersetzungen für deine Lokalisierungsdateien direkt im Terminal generieren.

## Funktionen

- 🔐 Sichere Authentifizierung mit Frenglish.ai
- 📦 Projektverwaltung (neue Projekte erstellen oder bestehende nutzen)
- 🌍 Unterstützung mehrerer Sprachen
- 📂 Interaktive Verzeichnisauswahl für die Dateiauswahl
- ⚙️ Flexible Konfigurationsmöglichkeiten
- 🔄 Unterstützung für vollständige und inkrementelle Übersetzungen
- 🧪 Testmodus mit Unterstützung für Mock-Daten
- 💾 Lokale Konfigurationsspeicherung. Alle deine Konfigurations- und Projektänderungen werden auch auf Frenglish.ai übernommen.

## Installation

```bash
npm install -g @frenglish/cli
```

## Nutzung

### Grundlegende Befehle

```bash
# Login and initiate interactive translation flow
frenglish login

# Translate files based on .env setup
frenglish translate
```

## Interaktiver Ablauf
Wenn du `frenglish login` ausführst, wirst du durch einen interaktiven Einrichtungs- und Übersetzungsprozess geführt:
1. **Authentifizierung**: Öffnet deinen Browser für einen sicheren Login
2. **Projektauswahl**: Wähle, ob du ein neues Projekt erstellen oder ein bestehendes verwenden möchtest
3. **Konfiguration**: Richte deine Übersetzungseinstellungen ein, aktualisiere oder bestätige sie:
   - Projektname
   - Ausgangssprache
   - Zielsprachen
   - Übersetzungspfade
   - Übersetzungsregeln
4. **Übersetzung**: Möglichkeit, direkt mit der Übersetzung zu starten

## Lokale Konfiguration
Der interaktive CLI-Ablauf speichert deine Einstellungen in `frenglish.config.json` im Projektverzeichnis. Enthalten sind:
- Projektname
- Übersetzungspfade
- Spracheinstellungen
- Übersetzungsregeln

und mehr

## Beispielbefehle, wenn du den interaktiven Ablauf nicht nutzen möchtest

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

### Übersetzungsoptionen
Beim Ausführen von `frenglish translate` kannst du folgende Optionen verwenden:

```bash
--apiKey <key>           # Frenglish API key (or set via FRENGLISH_API_KEY)
--path <path>           # Custom path for translation
--isFullTranslation     # Perform a full translation (overwrites existing translations)
--partialConfig <json>  # Partial config as JSON string or file path
```

#### Umgebungsvariablen \[OPTIONAL]
Das ist optional, weil – wenn du deine .env-Datei nicht änderst – wir eine frenglish.config.json im Projektverzeichnis anlegen, in der alle Einstellungen gespeichert werden.

```bash
FRENGLISH_API_KEY=<your_api_key>
TRANSLATION_PATH=<path_to_source_files>
TRANSLATION_OUTPUT_PATH=<path_for_translated_files>
EXCLUDED_TRANSLATION_PATH=<json_array_of_excluded_paths>
```

## Support
Weitere Informationen findest du unter [https://www.frenglish.ai](https://www.frenglish.ai)