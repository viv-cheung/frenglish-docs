---
id: cli-quickstart
sidebar_position: 4
description: Aprende cómo usar la CLI de Frenglish para agilizar tu flujo de trabajo de traducción
slug: /CLI
---

# Guía rápida de la CLI

## Introducción
Una potente interfaz de línea de comandos para gestionar traducciones con Frenglish.ai. Esta herramienta CLI te ayuda a administrar tus proyectos de traducción, configurar ajustes y generar traducciones para tus archivos de localización, todo desde tu terminal.

## Características

- 🔐 Autenticación segura con Frenglish.ai
- 📦 Gestión de proyectos (crea nuevos proyectos o usa existentes)
- 🌍 Soporte multilingüe
- 📂 Navegación interactiva de directorios para selección de archivos
- ⚙️ Opciones de configuración flexibles
- 🔄 Soporte para traducciones completas e incrementales
- 🧪 Modo de prueba con soporte para datos simulados
- 💾 Persistencia de configuración local. Todos tus cambios de configuración y proyecto aparecerán igual en Frenglish.ai

## Instalación

```bash
npm install -g @frenglish/cli
```

## Uso

### Comandos básicos

```bash
# Login and initiate interactive translation flow
frenglish login

# Translate files based on .env setup
frenglish translate
```

## Flujo interactivo
Cuando ejecutes `frenglish login`, se te guiará por un proceso interactivo de configuración y traducción:
1. **Autenticación**: Abre tu navegador para iniciar sesión de forma segura
2. **Selección de proyecto**: Elige crear un nuevo proyecto o usar uno existente
3. **Configuración**: Configura, actualiza o confirma tus ajustes de traducción:
   - Nombre del proyecto
   - Idioma de origen
   - Idiomas de destino
   - Rutas de traducción
   - Reglas de traducción
4. **Traducción**: Opción para iniciar la traducción inmediatamente

## Configuración local
El flujo interactivo de la CLI guarda tu configuración en `frenglish.config.json` en la raíz de tu proyecto. Esto incluye:
- Nombre del proyecto
- Rutas de traducción
- Ajustes de idioma
- Reglas de traducción

y más

## Ejemplos de comandos si no quieres la experiencia interactiva

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

### Opciones de traducción
Al ejecutar `frenglish translate`, puedes usar las siguientes opciones:

```bash
--apiKey <key>           # Frenglish API key (or set via FRENGLISH_API_KEY)
--path <path>           # Custom path for translation
--isFullTranslation     # Perform a full translation (overwrites existing translations)
--partialConfig <json>  # Partial config as JSON string or file path
```

#### Variables de entorno \[OPCIONAL]
Esto es opcional porque si no cambias tu archivo .env, crearemos un frenglish.config.json en tu directorio raíz que almacenará todos tus ajustes de configuración.

```bash
FRENGLISH_API_KEY=<your_api_key>
TRANSLATION_PATH=<path_to_source_files>
TRANSLATION_OUTPUT_PATH=<path_for_translated_files>
EXCLUDED_TRANSLATION_PATH=<json_array_of_excluded_paths>
```

## Soporte
Para más información, visita [https://www.frenglish.ai](https://www.frenglish.ai)