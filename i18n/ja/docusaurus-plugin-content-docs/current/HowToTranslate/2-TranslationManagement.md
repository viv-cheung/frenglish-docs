---
id: translationFilesManagement
sidebar_position: 2
description: 翻訳ファイルの構成方法
slug: /translation-files-management
---

# 翻訳ファイルの管理

## 自動翻訳のための翻訳ファイルの構成方法

### オプション1:

- 元言語のフォルダ名は言語コード（例: "en"）にする
- 元言語フォルダ内には翻訳が必要なファイルのみを入れる
- これらのファイル名に元言語フォルダ名を含める必要はありません（例: intro.md, about.json, contactUs.po）

**ディレクトリ構成例**
- 翻訳ファイルは以下のように整理されます。この例の翻訳パスは `docs/locales/*` です:

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

### オプション2:

- すべての子ファイルが翻訳・言語ファイルであることを示すような、`locales` や `languages` などの親フォルダを作成する
- 各ファイル名に言語コードを含める
- この方法では、指定した元言語のファイルは翻訳されません。ターゲット言語コードを含むファイルのみが翻訳されます

**ディレクトリ構成例**
- 翻訳ファイルは以下のように整理されます。この例の翻訳パスは `docs/locales/*` です:

```plaintext
    docs/
    ├─ locales/
        ├─ en_common.json
        │  en_about.json
        ├─ fr_common.json
        │  fr_about.json
```