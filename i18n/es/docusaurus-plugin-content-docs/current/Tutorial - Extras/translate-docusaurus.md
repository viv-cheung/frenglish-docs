---
id: Translate docusaurus
sidebar_position: 4
---

# Traducir docusaurus
Para ver un ejemplo de cómo estructurar i18n con Docusaurus, revisa la [documentación de Frenglish](https://github.com/viv-cheung/frenglish-docs).

De lo contrario, traduzcamos `docs/intro.md` al francés.

## Configura i18n
Modifica `docusaurus.config.js` para agregar soporte al archivo de traducción `fr`:

```js title="docusaurus.config.js"
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

## Traduce un documento
Copia el archivo `docs/intro.md` a la carpeta `i18n/fr`:

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

Traduce `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` al francés.

## Inicia tu sitio localizado
Inicia tu sitio usando el archivo de traducción en francés:

```bash
npm run start -- locale fr
```

Tu sitio localizado estará disponible en [http://localhost:3000/fr/](http://localhost:3000/fr/) y la página `Getting Started` estará traducida.

:::caution

En desarrollo, solo puedes usar un idioma a la vez.

:::

## Agrega un menú desplegable de idiomas
Para navegar fácilmente entre idiomas, agrega un menú desplegable de idiomas.

Modifica el archivo `docusaurus.config.js`:

```js title="docusaurus.config.js"
export default {
  themeConfig: {
    navbar: {
      items: [
        // highlight-start
        {
          type: 'localeDropdown',
        },
        // highlight-end
      ],
    },
  },
};
```

Ahora el menú desplegable de idiomas aparece en tu barra de navegación:

![Menú desplegable de idiomas](./img/localeDropdown.png)

## Compila tu sitio localizado
Compila tu sitio para un idioma específico:

```bash
npm run build -- locale fr
```

O compila tu sitio para incluir todos los idiomas a la vez:

```bash
npm run build
```