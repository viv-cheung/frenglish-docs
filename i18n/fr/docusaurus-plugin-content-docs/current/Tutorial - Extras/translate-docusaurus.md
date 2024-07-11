---
id: translate-docs
sidebar_position: 2
---

fr + fr-translated Let's translate `docs/intro.md` to French.

fr + fr-translated ## Configure i18n

fr + fr-translated Modify `docusaurus.config.js` to add support for the `fr` locale:

```js title="docusaurus.config.js"
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

fr + fr-translated ## Translate a doc

fr + fr-translated Copy the `docs/intro.md` file to the `i18n/fr` folder:

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

fr + fr-translated Translate `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` in French.

fr + fr-translated ## Start your localized site

fr + fr-translated Start your site on the French locale:

```bash
npm run start -- --locale fr
```

fr + fr-translated Your localized site is accessible at [http://localhost:3000/fr/](http://localhost:3000/fr/) and the `Getting Started` page is translated.

fr + fr-translated :::caution

fr + fr-translated In development, you can only use one locale at a time.

fr + fr-translated :::

fr + fr-translated ## Add a Locale Dropdown

fr + fr-translated To navigate seamlessly across languages, add a locale dropdown.

fr + fr-translated Modify the `docusaurus.config.js` file:

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

fr + fr-translated The locale dropdown now appears in your navbar:

fr + fr-translated ![Locale Dropdown](./img/localeDropdown.png)

fr + fr-translated ## Build your localized site

fr + fr-translated Build your site for a specific locale:

```bash
npm run build -- --locale fr
```

fr + fr-translated Or build your site to include all the locales at once:

```bash
npm run build
```