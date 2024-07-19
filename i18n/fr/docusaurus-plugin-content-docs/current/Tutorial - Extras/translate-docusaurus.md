---
id: Translate docusaurus
sidebar_position: 4
---

fr + fr-translated # Traduire docusaurus

fr + fr-translated Pour un exemple de structuration de l'i18n avec Docusaurus, consultez [les docs de Frenglish](https://github.com/viv-cheung/frenglish-docs).

fr + fr-translated Sinon, traduisons `docs/intro.md` en français.

fr + fr-translated ## Configurer i18n

fr + fr-translated Modifiez `docusaurus.config.js` pour ajouter la prise en charge du fichier de traduction `fr` :

```js title="docusaurus.config.js"
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

fr + fr-translated ## Traduire un document

fr + fr-translated Copiez le fichier `docs/intro.md` dans le dossier `i18n/fr` :

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

fr + fr-translated Traduisez `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` en français.

fr + fr-translated ## Démarrez votre site localisé

fr + fr-translated Démarrez votre site sur le fichier de traduction français :

```bash
npm run start -- --locale fr
```

fr + fr-translated Votre site localisé est accessible à [http://localhost:3000/fr/](http://localhost:3000/fr/) et la page `Getting Started` est traduite.

fr + fr-translated :::attention

fr + fr-translated En développement, vous ne pouvez utiliser qu'une seule langue à la fois.

fr + fr-translated :::

fr + fr-translated ## Ajouter un menu déroulant de langue

fr + fr-translated Pour naviguer sans interruption entre les langues, ajoutez un menu déroulant de langue.

fr + fr-translated Modifiez le fichier `docusaurus.config.js` :

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

fr + fr-translated Le menu déroulant de langue apparaît maintenant dans votre barre de navigation :

fr + fr-translated ![Menu déroulant de langue](./img/localeDropdown.png)

fr + fr-translated ## Construisez votre site localisé

fr + fr-translated Construisez votre site pour une langue spécifique :

```bash
npm run build -- --locale fr
```

fr + fr-translated Ou construisez votre site pour inclure toutes les langues à la fois :

```bash
npm run build
```