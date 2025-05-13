---
id: sdk-quickstart
sidebar_position: 1
description: Aprende a usar el SDK de Frenglish para integrar la traducción automática de contenido en tus aplicaciones
---

# Inicio rápido del SDK

## Introducción
El SDK de Frenglish es una herramienta potente que permite a los desarrolladores integrar la traducción automática de archivos de contenido en sus aplicaciones. Este SDK gestiona todo el proceso de traducción, desde enviar archivos para traducir hasta recuperar el contenido traducido.

## Instalación

```bash
npm install @frenglish/sdk
```

## Inicio rápido

```javascript
import { FrenglishSDK } from '@frenglish/sdk';

// Initialize the SDK with your API key
const sdk = FrenglishSDK('your_api_key');

// Example: Translate content
async function translateContent() {
  try {
    const result = await sdk.translate(
      ['Hello world', 'Welcome to our app'],
      true, // isFullTranslation
      ['welcome.txt', 'greeting.txt']
    );
    console.log('Translation result:', result);
  } catch (error) {
    console.error('Translation failed:', error);
  }
}
```

## Características principales

### Traducción

```javascript
// Translate multiple strings
const result = await sdk.translate(
  content: string[],           // Array of content to translate
  isFullTranslation?: boolean, // Whether to perform a full translation
  filenames?: string[],        // Optional filenames for the content
  partialConfig?: PartialConfiguration // Optional configuration overrides
);

// Translate a single string
const translated = await sdk.translateString(
  content: string | string[],            // String or string[] to translate
  lang: string,                          // Target language code
  partialConfig?: PartialConfiguration
);
```

### Gestión de proyectos

```javascript
// Get project information
const project = await sdk.getProjectInformation();

// Update project name
await sdk.updateProjectName('New Project Name');

// Toggle project active status
await sdk.setProjectActiveStatus(true);

// Toggle test mode
await sdk.setTestMode(true);
```

### Configuración

```javascript
// Get default configuration
const config = await sdk.getDefaultConfiguration();

// Update configuration
await sdk.updateConfiguration({
  originLanguage: 'en',
  languages: ['fr', 'es'],
  rules: 'Use a casual tone'
});

// Get supported languages
const languages = await sdk.getSupportedLanguages();

// Get supported file types
const fileTypes = await sdk.getSupportedFileTypes();
```

### Gestión de archivos

```javascript
// Upload files for translation
const uploadResult = await sdk.upload([
  {
    content: 'Hello world',
    language: 'en'
  }
]);

// Get project's text map
const textMap = await sdk.getTextMap();
```

## Referencia de métodos del SDK

### Métodos de traducción

1.  **translate**
    - Descripción: Traduce múltiples cadenas o bloques de contenido a todos los idiomas de destino configurados
    - Parámetros:
      - `content`: string\[] - Arreglo de contenido a traducir
      - `isFullTranslation`: boolean (opcional) - Indica si se realiza una traducción completa
      - `filenames`: string\[] (opcional) - Nombres de archivo para el contenido
      - `partialConfig`: PartialConfiguration (opcional) - Configuración personalizada
    - Devuelve: `Promise<{ translationId: number, content: TranslationResponse[] }>`

2.  **translateString**
    - Descripción: Traduce una sola cadena a un idioma de destino específico
    - Parámetros:
      - `content`: string | string \[] - Cadena única a traducir o un arreglo de cadenas a traducir
      - `lang`: string - Código del idioma de destino
      - `partialConfig`: PartialConfiguration (opcional) - Configuración personalizada
    - Devuelve: `Promise<string | string[] | undefined>`

3.  **getTranslationStatus**
    - Descripción: Verifica el estado actual de una solicitud de traducción (por ejemplo, completada, en progreso, cancelada)
    - Parámetros:
      - `translationId`: number - ID de la traducción a verificar
    - Devuelve: `Promise<TranslationStatus>`

4.  **getTranslationContent**
    - Descripción: Recupera el contenido traducido de una traducción completada
    - Parámetros:
      - `translationId`: number - ID de la traducción a recuperar
    - Devuelve: `Promise<TranslationResponse[]>`

### Métodos de gestión de proyectos

1.  **getProjectInformation**
    - Descripción: Recupera información detallada sobre el proyecto actual
    - Devuelve:`Promise<Project>`

2.  **updateProjectName**
    - Descripción: Actualiza el nombre del proyecto actual
    - Parámetros:
      - `updatedProjectName`: string - Nuevo nombre del proyecto
    - Devuelve: `Promise<Project>`

3.  **setProjectActiveStatus**
    - Descripción: Activa o desactiva el estado activo del proyecto
    - Parámetros:
      - `isActive`: boolean - Nuevo estado activo
    - Devuelve: `Promise<Project>`

4.  **setTestMode**
    - Descripción: Activa o desactiva el modo de prueba para el proyecto, útil para probar sin consumir créditos de la API
    - Parámetros:
      - `isTestMode`: boolean - Nuevo estado de modo de prueba
    - Devuelve: `Promise<Project>`

### Métodos de configuración

1.  **getDefaultConfiguration**
    - Descripción: Recupera la configuración por defecto del proyecto
    - Devuelve: `Promise<Configuration>`

2.  **updateConfiguration**
    - Descripción: Actualiza la configuración del proyecto
    - Parámetros:
      - `partiallyUpdatedConfig`: PartialConfiguration - Actualizaciones de configuración
    - Devuelve: `Promise<Configuration>`

3.  **getProjectSupportedLanguages**
    - Descripción: Obtiene la lista de idiomas soportados por el proyecto y el idioma de origen
    - Devuelve: `Promise<{ languages: string[], originLanguage: string }>`

4.  **getSupportedLanguages**
    - Descripción: Obtiene todos los idiomas soportados por el servicio de Frenglish
    - Devuelve: `Promise<string[]>`

5.  **getSupportedFileTypes**
    - Descripción: Obtiene todos los tipos de archivos que pueden ser procesados para traducción
    - Devuelve: `Promise<string[]>`

### Métodos de gestión de archivos

1.  **upload**
    - Descripción: Sube archivos para traducción, normalmente usados como archivos base para comparar
    - Parámetros:
      - `files`: FileContentWithLanguage\[] - Arreglo de archivos a subir
    - Devuelve: `Promise<{ message: string, originFilesInfo: Array<{ fileId: string, originS3Version: string }> }>`

2.  **getTextMap**
    - Descripción: Recupera el mapa de textos del proyecto, que contiene las correspondencias de contenido para mantener la coherencia
    - Devuelve: `Promise<{ content: FlatJSON[] } | null>`

### Métodos de gestión de dominios

1.  **getProjectDomain**
    - Descripción: Obtiene la URL de dominio asociada al proyecto actual
    - Devuelve: `Promise<string>`

2.  **getPublicAPIKeyFromDomain**
    - Descripción: Recupera la clave pública de API asociada a un dominio dado
    - Parámetros:
      - `domainURL`: string - URL del dominio para obtener la clave de API
    - Devuelve: `Promise<string>`

## Tipos de configuración

```ts
// Define the PartialConfiguration type
type PartialConfiguration = {
  originLanguage?: string;
  languages?: string[];
  rules?: string;
  languageSpecificRules?: Record<string, string>;
  // ... other configuration options
};
```