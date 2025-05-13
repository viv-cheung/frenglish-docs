---
id: cli-quickstart
sidebar_position: 4
description: FrenglishのCLIを使って翻訳ワークフローを効率化する方法
slug: /CLI
---

# CLI クイックスタート

## はじめに
Frenglish.aiで翻訳を管理できる強力なコマンドラインインターフェース。このCLIツールで翻訳プロジェクトの管理、設定の構成、ローカライズファイルの翻訳生成などをすべてターミナル上で行えます。

## 主な機能

- 🔐 Frenglish.aiとの安全な認証
- 📦 プロジェクト管理（新規作成や既存プロジェクトの利用）
- 🌍 複数言語のサポート
- 📂 ファイル選択のための対話型ディレクトリナビゲーション
- ⚙️ 柔軟な設定オプション
- 🔄 フル翻訳・差分翻訳の両方に対応
- 🧪 モックデータ対応のテストモード
- 💾 ローカル設定の保存。すべての設定やプロジェクトの変更はFrenglish.ai上でも同じように反映されます

## インストール方法

```bash
npm install -g @frenglish/cli
```

## 使用量

### 基本コマンド

```bash
# Login and initiate interactive translation flow
frenglish login

# Translate files based on .env setup
frenglish translate
```

## 対話型フロー
`frenglish login` を実行すると、対話形式でセットアップと翻訳プロセスが始まります:
1. **認証**: ブラウザが開いて安全にログイン
2. **プロジェクト選択**: 新しいプロジェクトを作成するか既存のものを使うか選択
3. **設定**: 翻訳設定のセットアップ・更新・確認:
   - プロジェクト名
   - 元言語
   - ターゲット言語
   - 翻訳パス
   - 翻訳ルール
4. **翻訳**: すぐに翻訳を開始するオプション

## ローカル設定
CLIの対話型フローで設定内容はプロジェクトルートの `frenglish.config.json` に保存されます。これには以下が含まれます:
- プロジェクト名
- 翻訳パス
- 言語設定
- 翻訳ルール

その他

## 対話型ではなく、コマンドで実行したい場合のコマンド例

```bash
# Basic translation with default settings
frenglish translate

# Translation with custom path
frenglish translate --path ./src/locales

# Full translation with custom configuration
frenglish translate --isFullTranslation --partialConfig '{"targetLanguages":["fr","es"]}'

# Translation using a configuration file
frenglish translate --partialConfig "./config.json"
```

### 翻訳オプション
`frenglish translate` 実行時に使えるオプションは以下の通りです:

```bash
--apiKey <key>           # Frenglish API key (or set via FRENGLISH_API_KEY)
--path <path>           # Custom path for translation
--isFullTranslation     # Perform a full translation (overwrites existing translations)
--partialConfig <json>  # Partial config as JSON string or file path
```

#### 環境変数 \[任意]
これは任意です。なぜなら、.envファイルを変更しなければ、すべての設定内容を保存するfrenglish.config.jsonがルートディレクトリに自動生成されるからです。

```bash
FRENGLISH_API_KEY=<your_api_key>
TRANSLATION_PATH=<path_to_source_files>
TRANSLATION_OUTPUT_PATH=<path_for_translated_files>
EXCLUDED_TRANSLATION_PATH=<json_array_of_excluded_paths>
```

## サポート
詳しくは [https://www.frenglish.ai](https://www.frenglish.ai) をご覧ください