---
id: Translate docusaurus
sidebar_position: 4
---

# Docusaurus übersetzen
Ein Beispiel, wie man i18n mit Docusaurus strukturiert, finden Sie in der Dokumentation von Frenglish.

Andernfalls lassen Sie uns `docs/intro.md` ins Französische übersetzen.

## i18n konfigurieren
Bearbeiten Sie `docusaurus.config.js`, um die Unterstützung für die französische Übersetzungsdatei (`fr`) hinzuzufügen:

```js title="docusaurus.config.js"
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

## Ein Dokument übersetzen
Kopieren Sie die Datei `docs/intro.md` in den Ordner `i18n/fr`:

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

Übersetzen Sie `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` ins Französische.

## Ihre lokalisierte Seite starten
Starten Sie Ihre Seite mit der französischen Übersetzungsdatei.

```bash
npm run start -- locale fr
```

Ihre lokalisierte Seite ist unter [http://localhost:3000/fr/](http://localhost:3000/fr/) erreichbar und die Seite `Getting Started` ist übersetzt.

:::caution

Im Entwicklungsmodus können Sie jeweils nur eine Sprache gleichzeitig verwenden.

:::

## Ein Sprachwahl-Dropdown hinzufügen
Um nahtlos zwischen den Sprachen zu wechseln, fügen Sie ein Sprachwahl-Dropdown hinzu.

Bearbeiten Sie die Datei `docusaurus.config.js`:

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

Das Sprachwahl-Dropdown erscheint jetzt in Ihrer Navigationsleiste:

![Sprachwahl-Dropdown](./img/localeDropdown.png)

## Lokalisierte Seite bauen
Bauen Sie Ihre Seite für eine bestimmte Sprache:

```bash
npm run build -- locale fr
```

Oder bauen Sie Ihre Seite, um alle Sprachen gleichzeitig einzuschließen:

```bash
npm run build
```