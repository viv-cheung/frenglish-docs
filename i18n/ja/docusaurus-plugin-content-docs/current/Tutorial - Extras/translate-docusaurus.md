---
id: Translate docusaurus
sidebar_position: 4
---

# docusaurusを翻訳する
Docusaurusでi18nをどう構成するかの例は、[Frenglishのドキュメント](https://github.com/viv-cheung/frenglish-docs)を参考にしてください。

それでは、`docs/intro.md`をフランス語に翻訳してみましょう。

## i18nを設定する
`docusaurus.config.js`を編集して`fr`翻訳ファイルをサポートしましょう:

```js title="docusaurus.config.js"
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

## ドキュメントを翻訳する
`docs/intro.md`ファイルを`i18n/fr`フォルダにコピーします:

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

`i18n/fr/docusaurus-plugin-content-docs/current/intro.md`をフランス語に翻訳しましょう。

## ローカライズサイトを起動する
フランス語翻訳ファイルでサイトを起動します:

```bash
npm run start -- locale fr
```

ローカライズされたサイトは[http://localhost:3000/fr/](http://localhost:3000/fr/)でアクセスでき、`Getting Started`ページも翻訳されています。

:::注意

開発中は、一度に1つの言語しか使えません。

:::

## ロケールドロップダウンを追加する
言語間をスムーズに移動できるように、ロケールドロップダウンを追加しましょう。

`docusaurus.config.js`ファイルを編集します:

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

これでナビバーにロケールドロップダウンが表示されます:

![ロケールドロップダウン](./img/localeDropdown.png)

## ローカライズサイトをビルドする
特定のロケール用にサイトをビルドします:

```bash
npm run build -- locale fr
```

または、すべてのロケールを一度に含めてビルドします:

```bash
npm run build
```