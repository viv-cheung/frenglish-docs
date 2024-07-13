---
id: Translate docusaurus
sidebar_position: 4
---

# Traduire docusaurus

Pour un exemple de structuration de l'i18n avec Docusaurus, consultez [les docs de Frenglish](https://github.com/viv-cheung/frenglish-docs).

Sinon, traduisons `docs/intro.md` en français.

## Configurer i18n

Modifiez `docusaurus.config.js` pour ajouter la prise en charge du fichier de traduction `fr` :

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

Démarrez votre site sur le fichier de traduction français :

```bash
npm run start -- --locale fr
```

Votre site localisé est accessible à [http://localhost:3000/fr/](http://localhost:3000/fr/) et la page `Getting Started` est traduite.

:::attention

En développement, vous ne pouvez utiliser qu'une seule langue à la fois.

:::

## Ajouter un menu déroulant de langue

Pour naviguer sans interruption entre les langues, ajoutez un menu déroulant de langue.

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

Le menu déroulant de langue apparaît maintenant dans votre barre de navigation :

![Menu déroulant de langue](./img/localeDropdown.png)

## Construisez votre site localisé

Construisez votre site pour une langue spécifique :

```bash
npm run build -- --locale fr
```

Ou construisez votre site pour inclure toutes les langues à la fois :

```bash
npm run build
```