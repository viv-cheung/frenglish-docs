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

## Reglas y filtros clave
Las opciones de configuración que controlan _qué_ se traduce y _cómo_ pueden agruparse bajo reglas y filtros clave. Puedes pasarlas mediante `partialConfig` al llamar a `translate()` o `translateString()`, o configurarlas en el panel de tu proyecto.

### Reglas de traducción

- **rules** (cadena, opcional): Instrucciones generales para el traductor (por ejemplo, tono, terminología, estilo). Se aplican a todos los idiomas de destino a menos que se sobrescriban con reglas específicas por idioma.
- **rulesPerLanguage** (arreglo de `{ language, rules }`, opcional): Sobrescribe las reglas para idiomas de destino específicos. Cada entrada tiene un código de idioma (por ejemplo, `"fr"`) y una cadena de `rules`. Útil cuando una localización necesita un estilo o terminología diferente.
- **implicitRules** (arreglo, opcional): Reglas implícitas estructuradas aplicadas por el sistema de traducción.

### Filtros de inclusión y exclusión (filtros clave)
Los filtros clave controlan qué **claves** de tu JSON (u otro contenido estructurado) se envían a traducir. Se aplican a la ruta de la clave (por ejemplo, clave de nivel superior `"title"` o ruta anidada como `"meta.description"`).
-   **keyFilters** (objeto o `null`, opcional):
    - **includeFilters** – Arreglo de patrones. Cuando **no está vacío**, solo se traducen las claves cuya ruta coincide con **al menos uno** de estos patrones. Todas las demás claves permanecen sin cambios.
    - **excludeFilters** – Arreglo de patrones. Las claves cuya ruta coincide con **cualquiera** de estos patrones **no** se traducen; permanecen en el idioma original.
    - Si tanto `includeFilters` como `excludeFilters` están en `null` o vacíos, **todas** las claves se traducen (sin filtrado).
    - **Comportamiento cuando ambos están configurados:** Primero se aplica el filtro de inclusión (solo las claves coincidentes son candidatas); luego se aplica el de exclusión (las claves coincidentes se eliminan de ese conjunto). Así, una clave solo se traduce si coincide con un patrón de inclusión (cuando hay inclusiones) y no coincide con ningún patrón de exclusión.

-   **keyFiltersPerLanguage** (arreglo de `{ language, keyFilters }`, opcional): Sobrescribe los filtros clave por idioma de destino. Cada entrada tiene un código de idioma y un objeto `keyFilters` con sus propios `includeFilters` y `excludeFilters`. Si no configuras un filtro por idioma para un idioma, se usa el filtro global `keyFilters` para ese idioma.

**Formato de patrón:** Cada patrón es una ruta de clave separada por puntos (por ejemplo, `title`, `meta.description`). La ruta de la clave de una entrada se compara con estos patrones. Un segmento puede ser `*` para coincidir con cualquier clave en ese nivel (por ejemplo, `meta.*` coincide con `meta.title`, `meta.description`, etc.). No puedes usar el mismo patrón en inclusión y exclusión.

**Casos de uso típicos:**
- **Incluir solo ciertas claves:** Configura `includeFilters` con los patrones de las claves que deseas traducir (por ejemplo, `["title", "meta.label"]`). Todo lo demás queda sin traducir.
- **Excluir claves sensibles o no traducibles:** Configura `excludeFilters` con los patrones de las claves que no deben traducirse (por ejemplo, `["internalId", "code", "url"]`). Todas las demás claves se traducen.
- **Claves diferentes por idioma:** Usa `keyFiltersPerLanguage` para que, por ejemplo, un idioma reciba solo un subconjunto de claves mientras que otro reciba todas las claves.

**Ejemplo: JSON de entrada vs salida con filtros**

Supón que el idioma original es inglés y traduces al francés. JSON de entrada:

```json
{
  "id": "user-42",
  "title": "Welcome",
  "meta": {
    "label": "Home",
    "code": "H1"
  }
}
```

- **Con `includeFilters: ["title", "meta.label"]`** — Solo esas rutas de clave se traducen; el resto permanece en el idioma original:

```json
{
  "id": "user-42",
  "title": "Bienvenue",
  "meta": {
    "label": "Accueil",
    "code": "H1"
  }
}
```

- **Con `excludeFilters: ["id", "code"]`** — Todo se traduce excepto las claves cuya ruta contiene `id` o `code`:

```json
{
  "id": "user-42",
  "title": "Bienvenue",
  "meta": {
    "label": "Accueil",
    "code": "H1"
  }
}
```

Puedes pasar filtros clave en `partialConfig` al llamar a `translate()`; consulta los parámetros de [translate](#translate) y el ejemplo a continuación en esa sección.

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
- partialConfig: PartialConfiguration (opcional) - Sobrescribe la configuración predeterminada para esta traducción. Opciones principales:
  - **originLanguage**, **languages** – Códigos de idioma de origen y destino.
  - **rules**, **rulesPerLanguage**, **implicitRules** – Reglas de traducción (ver [Reglas y filtros clave](#rules-and-key-filters)).
  - **keyFilters** – `{ includeFilters: string[], excludeFilters: string[] } | null` para incluir o excluir claves de la traducción (ver [Filtros de inclusión y exclusión](#include-and-exclude-filters-key-filters)).
  - **keyFiltersPerLanguage** – Sobrescribe los filtros clave por idioma (ver [Filtros de inclusión y exclusión](#include-and-exclude-filters-key-filters)).
  - **autoMergeToBaseBranch**, **useThisConfig** – Otras opciones de comportamiento.

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

**Ejemplo con filtros de inclusión/exclusión** (solo traducir ciertas claves o excluir otras):

```javascript
// Only translate keys matching these patterns; leave all other keys unchanged
const partialConfigInclude = {
  languages: ['fr'],
  keyFilters: {
    includeFilters: ['title', 'description', 'meta.*'],
    excludeFilters: null
  }
};

// Translate all keys except those matching these patterns
const partialConfigExclude = {
  languages: ['fr'],
  keyFilters: {
    includeFilters: null,
    excludeFilters: ['internalId', 'code', 'url']
  }
};

const translation = await frenglish.translate(contents, false, filenames, partialConfigExclude);
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