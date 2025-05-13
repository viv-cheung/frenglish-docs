---
id: method-descriptions
sidebar_position: 2
description: Aprende a usar el SDK de Frenglish para integrar la traducción automática de contenido en tus aplicaciones
---

# Descripción de funciones

## Introducción
El SDK de Frenglish es una herramienta potente que permite a los desarrolladores integrar la traducción automática de contenido en sus aplicaciones. Este SDK gestiona todo el proceso de traducción, desde enviar el contenido hasta recuperar el contenido traducido. Este documento proporciona información detallada sobre cómo usar cada método del SDK.

## Instalación
Consulta la [Guía de inicio rápido](./quickstart.md#installation) para instrucciones de instalación.

## Métodos del SDK

### translate

```javascript
translate(contents: string[], isFullTranslation: boolean, filenames: string[], partialConfig: PartialConfiguration): Promise<RequestTranslationResponse>
```

Envía contenido para traducir. Este método gestiona automáticamente el proceso de sondeo y devuelve el contenido traducido al finalizar.

#### Parámetros:

- content: string\[] - Un arreglo de textos a traducir. Cada elemento representa una pieza de contenido distinta.
- fullTranslation: boolean (opcional, por defecto false) - Controla el comportamiento de la traducción:
  - Cuando es false (por defecto): Optimiza la traducción revisando el contenido previamente traducido en la base de datos. Solo traduce el contenido nuevo o modificado, reduciendo tiempo y costos.
  - Cuando es true: Fuerza la retraducción completa de todo el contenido, ignorando traducciones existentes.
- filenames: string\[] (opcional) - Un arreglo de nombres de archivo que corresponde a cada elemento de contenido. Se usa para rastrear e identificar traducciones dentro de tu proyecto. Si se proporciona, debe coincidir en longitud con el arreglo de contenido. Los nombres de archivo deben incluir la extensión (por ejemplo, .json).
- partialConfig: PartialConfiguration (opcional) - Permite sobrescribir la configuración por defecto para esta traducción. Puede incluir:
  ```typescript
  {
    originLanguage?: string,      // Source language code
    languages?: string[],         // Target language codes
    rules?: string,              // General translation rules
    autoMergeToBaseBranch?: boolean,  // Auto-merge setting
    implicitRules?: ImplicitRule[],    // Array of implicit translation rules
    rulesPerLanguage?: Rule[],    // Language-specific rules
    useThisConfig?: boolean,      // Whether to use this config
    keyFilters?: {               // Filters for translation keys
      includeFilters: string[],
      excludeFilters: string[]
    } | null
  }
  ```

#### Devuelve:
Una Promesa que se resuelve en un objeto RequestTranslationResponse que contiene:
- translationId: number - Identificador único de la solicitud de traducción.
- content?: TranslationResponse\[] - Arreglo de objetos TranslationResponse, cada uno representa el contenido traducido para un idioma específico.

#### Ejemplo:

```javascript
const contents = [
  '{"hello": "Hello, world!"}',
  '{"goodbye": "Goodbye, world!"}'
];
const filenames = ['greetings.json', 'farewells.json'];
const partialConfig = {
  languages: ['fr', 'es'],
  rules: 'use an informal tone'
};

try {
  const translation = await frenglish.translate(contents, false, filenames, partialConfig);
  if (translation && translation.content) {
    console.log('Translation completed:', translation.content);
  } else {
    console.log('Translation in progress or failed.');
  }
} catch (error) {
  console.error('Translation error:', error.message);
}
```

#### Errores:

- Lanza un error si la solicitud de traducción falla o si el sondeo excede el tiempo máximo permitido.
- Lanza un error si la traducción es cancelada.

### translateString

```javascript
translateString(text: string, targetLanguage: string, partialConfig: PartialConfiguration): Promise<string>
```

#### Parámetros:

- content: string - El texto a traducir.
- lang: string - El código del idioma de destino (por ejemplo, 'fr' para francés).
- partialConfig: PartialConfiguration (opcional) - Permite sobrescribir la configuración por defecto para esta traducción. Tiene la misma estructura que en el método translate().

#### Devuelve:
Una Promesa que se resuelve en la cadena traducida.

#### Ejemplo:

```javascript
try {
  const translatedText = await frenglish.translateString('Hello, world!', 'fr');
  console.log('Translated text:', translatedText);
} catch (error) {
  console.error('Error translating string:', error.message);
}
```

#### Errores:

- Lanza un error si el idioma de destino no es compatible.
- Lanza un error si la solicitud de traducción falla o si el sondeo excede el tiempo máximo permitido.

### upload

```javascript
upload(content: string, filename: string): Promise<void>
```

Sube archivos para usarlos como base de comparación para las traducciones. Esto puede ayudar a optimizar las traducciones proporcionando contexto.

#### Parámetros:
files: FileContentWithLanguage\[] - Un arreglo de archivos con información de contenido e idioma.
Devuelve:

Una Promesa que se resuelve cuando los archivos se han subido correctamente.

#### Ejemplo:

```javascript
const files = [
  {
    language: 'en',
    filename: 'app.json',
    content: '{"welcome": "Welcome to the app!"}'
  }
];

try {
  await frenglish.upload(files);
  console.log('Files uploaded successfully.');
} catch (error) {
  console.error('Error uploading files:', error.message);
}
```

#### Errores:

- Lanza un error si la subida falla.

### getTranslationContent

```javascript
getTranslationContent(translationId: number): Promise<TranslationResponse[]>
```

Recupera el contenido traducido de una solicitud de traducción completada.

#### Parámetros:

- translationId: number - El identificador único de la solicitud de traducción.

#### Devuelve:
Una Promesa que se resuelve en un arreglo de objetos TranslationResponse.
Ejemplo:

```javascript
try {
  const translationContent = await frenglish.getTranslationContent(translationId);
  console.log('Translation content:', translationContent);
} catch (error) {
  console.error('Error getting translation content:', error.message);
}
```

#### Errores:

- Lanza un error si la solicitud falla.

### getDefaultConfiguration

```javascript
getDefaultConfiguration(): Promise<string>
```

Recupera la configuración por defecto del SDK de Frenglish.

### Parámetros:
Ninguno.

#### Devuelve:
Una Promesa que se resuelve en un objeto Configuration.

#### Ejemplo:

```javascript
try {
  const defaultConfig = await frenglish.getDefaultConfiguration();
  console.log('Default configuration:', defaultConfig);
} catch (error) {
  console.error('Error getting default configuration:', error.message);
}
```

#### Errores:

- Lanza un error si la solicitud falla.

### getSupportedLanguages

```javascript
getSupportedLanguages(): Promise<string[]>
```

Recupera una lista de idiomas compatibles con la API de Frenglish.

#### Parámetros:
Ninguno.

#### Devuelve:
Una Promesa que se resuelve en un arreglo de códigos de idioma soportados.
Ejemplo:

```javascript
try {
  const supportedLanguages = await frenglish.getSupportedLanguages();
  console.log('Supported languages:', supportedLanguages);
} catch (error) {
  console.error('Error getting supported languages:', error.message);
}
```

### getSupportedFileTypes

```javascript
getSupportedFileTypes(): Promise<string[]>
```

Recupera una lista de tipos de archivo compatibles con la API de Frenglish.

#### Parámetros:
Ninguno.

#### Devuelve:
Una Promesa que se resuelve en un arreglo de extensiones de tipos de archivo soportados.
Ejemplo:

```javascript
try {
  const supportedFileTypes = await frenglish.getSupportedFileTypes();
  console.log('Supported file types:', supportedFileTypes);
} catch (error) {
  console.error('Error getting supported file types:', error.message);
}
```

#### Errores:

- Lanza un error si la solicitud falla.

### registerWebhook

```javascript
registerWebhook(webhookUrl: string): Promise<void>
```

Registra una URL de webhook para recibir notificaciones cuando una traducción esté completada. Esto es opcional pero útil para manejar resultados de traducción de forma asíncrona.

#### Parámetros:

- webhookUrl: string - La URL de tu endpoint de webhook donde quieres recibir notificaciones.

#### Devuelve:
Una Promesa que se resuelve cuando el webhook se ha registrado correctamente.

#### Ejemplo:

```javascript
await frenglish.registerWebhook('https://yourdomain.com/webhook-endpoint');
```

#### Errores:

- Lanza un error si el registro falla, por ejemplo, por una URL inválida o problemas de red.