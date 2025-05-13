---
id: sdk-quickstart
sidebar_position: 1
description: FrenglishのSDKを使って、アプリケーションに自動翻訳機能を組み込む方法を学ぼう
---

# SDKクイックスタート

## はじめに
Frenglish SDKは、開発者がアプリケーションに自動翻訳機能を組み込むための強力なツールです。このSDKは、ファイルの翻訳依頼から翻訳結果の取得まで、翻訳プロセス全体を管理します。

## インストール方法

```bash
npm install @frenglish/sdk
```

## クイックスタート

```javascript
import { FrenglishSDK } from '@frenglish/sdk';

// Initialize the SDK with your API key
const sdk = FrenglishSDK('your_api_key');

// Example: Translate content
async function translateContent() {
  try {
    const result = await sdk.translate(
      ['Hello world', 'Welcome to our app'],
      true, // isFullTranslation
      ['welcome.txt', 'greeting.txt']
    );
    console.log('Translation result:', result);
  } catch (error) {
    console.error('Translation failed:', error);
  }
}
```

## 主な機能

### 翻訳

```javascript
// Translate multiple strings
const result = await sdk.translate(
  content: string[],           // Array of content to translate
  isFullTranslation?: boolean, // Whether to perform a full translation
  filenames?: string[],        // Optional filenames for the content
  partialConfig?: PartialConfiguration // Optional configuration overrides
);

// Translate a single string
const translated = await sdk.translateString(
  content: string | string[],            // String or string[] to translate
  lang: string,                          // Target language code
  partialConfig?: PartialConfiguration
);
```

### プロジェクト管理

```javascript
// Get project information
const project = await sdk.getProjectInformation();

// Update project name
await sdk.updateProjectName('New Project Name');

// Toggle project active status
await sdk.setProjectActiveStatus(true);

// Toggle test mode
await sdk.setTestMode(true);
```

### 設定

```javascript
// Get default configuration
const config = await sdk.getDefaultConfiguration();

// Update configuration
await sdk.updateConfiguration({
  originLanguage: 'en',
  languages: ['fr', 'es'],
  rules: 'Use a casual tone'
});

// Get supported languages
const languages = await sdk.getSupportedLanguages();

// Get supported file types
const fileTypes = await sdk.getSupportedFileTypes();
```

### ファイル管理

```javascript
// Upload files for translation
const uploadResult = await sdk.upload([
  {
    content: 'Hello world',
    language: 'en'
  }
]);

// Get project's text map
const textMap = await sdk.getTextMap();
```

## SDKメソッドリファレンス

### 翻訳メソッド

1.  **translate**
    - 説明：複数の文字列やコンテンツブロックを、設定されたすべての対象言語に翻訳します
    - パラメータ：
      - `content`: string\[] - 翻訳するコンテンツの配列
      - `isFullTranslation`: boolean（オプション）- 完全な再翻訳を行うかどうか
      - `filenames`: string\[]（オプション）- コンテンツのファイル名
      - `partialConfig`: PartialConfiguration（オプション）- 設定の上書き
    - 戻り値：`Promise<{ translationId: number, content: TranslationResponse[] }>`

2.  **translateString**
    - 説明：単一の文字列を指定した対象言語に翻訳します
    - パラメータ：
      - `content`: string | string \[] - 翻訳する単一の文字列、または複数文字列の配列
      - `lang`: string - 対象言語コード
      - `partialConfig`: PartialConfiguration（オプション）- 設定の上書き
    - 戻り値：`Promise<string | string[] | undefined>`

3.  **getTranslationStatus**
    - 説明：翻訳リクエストの現在のステータス（例：完了、進行中、キャンセル済み）を確認します
    - パラメータ：
      - `translationId`: number - チェックしたい翻訳のID
    - 戻り値：`Promise<TranslationStatus>`

4.  **getTranslationContent**
    - 説明：完了した翻訳の翻訳済みコンテンツを取得します
    - パラメータ：
      - `translationId`: number - 取得したい翻訳のID
    - 戻り値：`Promise<TranslationResponse[]>`

### プロジェクト管理メソッド

1.  **getProjectInformation**
    - 説明：現在のプロジェクトの詳細情報を取得します
    - 戻り値：`Promise<Project>`

2.  **updateProjectName**
    - 説明：現在のプロジェクト名を更新します
    - パラメータ：
      - `updatedProjectName`: string - 新しいプロジェクト名
    - 戻り値：`Promise<Project>`

3.  **setProjectActiveStatus**
    - 説明：プロジェクトのアクティブ状態を有効または無効にします
    - パラメータ：
      - `isActive`: boolean - 新しいアクティブ状態
    - 戻り値：`Promise<Project>`

4.  **setTestMode**
    - 説明：テストモードを切り替えます。APIクレジットを消費せずにテストしたい場合に便利です。
    - パラメータ：
      - `isTestMode`: boolean - 新しいテストモード状態
    - 戻り値：`Promise<Project>`

### 設定メソッド

1.  **getDefaultConfiguration**
    - 説明：プロジェクトのデフォルト設定を取得します
    - 戻り値：`Promise<Configuration>`

2.  **updateConfiguration**
    - 説明：プロジェクトの設定を更新します
    - パラメータ：
      - `partiallyUpdatedConfig`: PartialConfiguration - 設定の更新内容
    - 戻り値：`Promise<Configuration>`

3.  **getProjectSupportedLanguages**
    - 説明：プロジェクトで対応している言語一覧と元の言語を取得します
    - 戻り値：`Promise<{ languages: string[], originLanguage: string }>`

4.  **getSupportedLanguages**
    - 説明：Frenglishサービスで対応している全ての言語を取得します
    - 戻り値：`Promise<string[]>`

5.  **getSupportedFileTypes**
    - 説明：翻訳処理が可能な全てのファイルタイプを取得します
    - 戻り値：`Promise<string[]>`

### ファイル管理メソッド

1.  **upload**
    - 説明：翻訳用のファイルをアップロードします。通常は比較用のベースファイルとして使います
    - パラメータ：
      - `files`: FileContentWithLanguage\[] - アップロードするファイルの配列
    - 戻り値：`Promise<{ message: string, originFilesInfo: Array<{ fileId: string, originS3Version: string }> }>`

2.  **getTextMap**
    - 説明：プロジェクトのテキストマップを取得します。これは一貫性のためのテキスト内容のマッピングです
    - 戻り値：`Promise<{ content: FlatJSON[] } | null>`

### ドメイン管理メソッド

1.  **getProjectDomain**
    - 説明：現在のプロジェクトに紐づくドメインURLを取得します
    - 戻り値：`Promise<string>`

2.  **getPublicAPIKeyFromDomain**
    - 説明：指定したドメインに紐づくパブリックAPIキーを取得します
    - パラメータ：
      - `domainURL`: string - APIキーを取得したいドメインURL
    - 戻り値：`Promise<string>`

## 設定タイプ

```ts
// Define the PartialConfiguration type
type PartialConfiguration = {
  originLanguage?: string;
  languages?: string[];
  rules?: string;
  languageSpecificRules?: Record<string, string>;
  // ... other configuration options
};
```