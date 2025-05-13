---
id: Translate docusaurus
sidebar_position: 4
---

# Traduire docusaurus
Pour un exemple de structure i18n avec Docusaurus, jette un œil à [la doc de Frenglish](https://github.com/viv-cheung/frenglish-docs).

Sinon, traduisons `docs/intro.md` en français.

## Configurer i18n
Modifie `docusaurus.config.js` pour ajouter le support du fichier de traduction `fr` :

```js title="docusaurus.config.js"
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

## Traduire un doc
Copie le fichier `docs/intro.md` dans le dossier `i18n/fr` :

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

Traduis `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` en français.

## Lance ton site localisé
Lance ton site avec le fichier de traduction français :

```bash
npm run start -- locale fr
```

Ton site localisé sera accessible à [http://localhost:3000/fr/](http://localhost:3000/fr/) et la page `Getting Started` sera traduite.

:::attention

En développement, tu peux utiliser seulement une langue à la fois.

:::

## Ajouter un menu déroulant de langues
Pour naviguer facilement entre les langues, ajoute un menu déroulant de langues.

Modifie le fichier `docusaurus.config.js` :

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

Le menu déroulant de langues apparaît maintenant dans ta barre de navigation :

![Menu déroulant de langues](./img/localeDropdown.png)

## Construire ton site localisé
Construis ton site pour une langue spécifique :

```bash
npm run build -- locale fr
```

Ou construis ton site pour inclure toutes les langues en même temps :

```bash
npm run build
```