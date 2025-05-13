---
id: translationFilesManagement
sidebar_position: 2
description: Cómo estructurar los archivos de traducción
slug: /translation-files-management
---

# Gestión de archivos de traducción

## Cómo estructurar tus archivos de traducción para traducciones automáticas

### Opción 1:

- La carpeta del idioma de origen debe llamarse con el código del idioma (ejemplo: "en")
- Los archivos dentro de la carpeta del idioma de origen solo deben contener los archivos necesarios para la traducción
- Estos archivos no necesitan contener el nombre de la carpeta del idioma de origen (ejemplo: intro.md, about.json, contactUs.po)

**Ejemplo de estructura de directorios**
- Los archivos de traducción se organizarán de la siguiente manera. La ruta de traducción para este ejemplo sería `docs/locales/*`:

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
        │  └─ about.json
        ├─ fr/
        │  ├─ common.json
        │  └─ about.json
```

### Opción 2:

- Crea una carpeta principal llamada `locales`, `languages` o un nombre que indique que todos los archivos hijos son de traducción/idioma
- Nombra cada archivo con el código de idioma en el nombre del archivo
- Usando este método, ninguno de los idiomas de origen declarados será traducido. Todos los archivos que contengan códigos de idiomas de destino serán traducidos

**Ejemplo de estructura de directorios**
- Los archivos de traducción se organizarán de la siguiente manera. La ruta de traducción para este ejemplo sería `docs/locales/*`:

```plaintext
    docs/
    ├─ locales/
        ├─ en_common.json
        │  en_about.json
        ├─ fr_common.json
        │  fr_about.json
```