---
id: translate-docs
sidebar_position: 2
---

Traduisons `docs/intro.md` en français.

## Configurer i18n

Modifiez `docusaurus.config.js` pour ajouter la prise en charge de la locale `fr` :

```js title="docusaurus.config.js"
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

## Traduire un document

Copiez le fichier `docs/intro.md` dans le dossier `i18n/fr` :

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

Traduisez `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` en français.

## Démarrez votre site localisé

Démarrez votre site en locale française :

```bash
npm run start -- --locale fr
```

Votre site localisé est accessible à [http://localhost:3000/fr/](http://localhost:3000/fr/) et la page `Getting Started` est traduite.

:::attention

En développement, vous ne pouvez utiliser qu'une seule locale à la fois.

:::

## Ajouter un menu déroulant de locale

Pour naviguer facilement entre les langues, ajoutez un menu déroulant de locale.

Modifiez le fichier `docusaurus.config.js` :

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

Le menu déroulant de locale apparaît maintenant dans votre barre de navigation :

![Menu déroulant de locale](./img/localeDropdown.png)

## Construisez votre site localisé

Construisez votre site pour une locale spécifique :

```bash
npm run build -- --locale fr
```

Ou construisez votre site pour inclure toutes les locales à la fois :

```bash
npm run build
```