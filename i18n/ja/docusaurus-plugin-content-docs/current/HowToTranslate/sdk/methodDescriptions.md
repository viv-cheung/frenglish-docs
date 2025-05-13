---
id: method-descriptions
sidebar_position: 2
description: FrenglishのSDKを使って、アプリケーションに自動翻訳機能を組み込む方法を学ぼう
---

# 関数の説明

## はじめに
Frenglish SDKは、開発者がアプリケーションに自動翻訳機能を組み込むための強力なツールです。このSDKは、翻訳依頼から翻訳結果の取得まで、翻訳プロセス全体を管理します。このドキュメントでは、SDK内の各メソッドの使い方を詳しく解説します。

## インストール方法
インストール方法については[クイックスタートガイド](./quickstart.md#installation)を参照してください。

## SDKメソッド一覧

### translate

```javascript
translate(contents: string[], isFullTranslation: boolean, filenames: string[], partialConfig: PartialConfiguration): Promise<RequestTranslationResponse>
```

コンテンツを翻訳に送信します。このメソッドは自動的にポーリング処理を行い、翻訳が完了したら結果を返します。

#### パラメータ：

- content: string\[] - 翻訳したいテキストの配列。各要素が個別のコンテンツを表します。
- fullTranslation: boolean（オプション、デフォルトはfalse）- 翻訳の挙動を制御します：
  - false（デフォルト）の場合：データベース内の既存の翻訳をチェックして、新規または変更されたコンテンツのみを翻訳します。これにより、翻訳時間とコストを削減できます。
  - trueの場合：既存の翻訳を無視して、すべてのコンテンツを強制的に再翻訳します。
- filenames: string\[]（オプション）- 各コンテンツに対応するファイル名の配列。プロジェクト内で翻訳を追跡・識別するために使います。指定する場合はcontent配列と同じ長さにしてください。ファイル名には拡張子（例：.json）を含めてください。
- partialConfig: PartialConfiguration（オプション）- この翻訳のデフォルト設定を上書きします。含められる内容：
  ```typescript
  {
    originLanguage?: string,      // Source language code
    languages?: string[],         // Target language codes
    rules?: string,              // General translation rules
    autoMergeToBaseBranch?: boolean,  // Auto-merge setting
    implicitRules?: ImplicitRule[],    // Array of implicit translation rules
    rulesPerLanguage?: Rule[],    // Language-specific rules
    useThisConfig?: boolean,      // Whether to use this config
    keyFilters?: {               // Filters for translation keys
      includeFilters: string[],
      excludeFilters: string[]
    } | null
  }
  ```

#### 戻り値：
Promiseで、RequestTranslationResponseオブジェクト（以下を含む）を返します：
- translationId: number - 翻訳リクエストの一意なID。
- content?: TranslationResponse\[] - 各言語ごとの翻訳結果を表すTranslationResponseオブジェクトの配列。

#### 例：

```javascript
const contents = [
  '{"hello": "Hello, world!"}',
  '{"goodbye": "Goodbye, world!"}'
];
const filenames = ['greetings.json', 'farewells.json'];
const partialConfig = {
  languages: ['fr', 'es'],
  rules: 'use an informal tone'
};

try {
  const translation = await frenglish.translate(contents, false, filenames, partialConfig);
  if (translation && translation.content) {
    console.log('Translation completed:', translation.content);
  } else {
    console.log('Translation in progress or failed.');
  }
} catch (error) {
  console.error('Translation error:', error.message);
}
```

#### エラー：

- 翻訳リクエストが失敗した場合や、ポーリングが最大許容時間を超えた場合はエラーを投げます。
- 翻訳がキャンセルされた場合もエラーを投げます。

### translateString

```javascript
translateString(text: string, targetLanguage: string, partialConfig: PartialConfiguration): Promise<string>
```

#### パラメータ：

- content: string - 翻訳したいテキスト。
- lang: string - 対象言語のコード（例：フランス語なら 'fr'）。
- partialConfig: PartialConfiguration（オプション）- この翻訳のデフォルト設定を上書きします。translate()メソッドと同じ構造です。

#### 戻り値：
Promiseで、翻訳された文字列を返します。

#### 例：

```javascript
try {
  const translatedText = await frenglish.translateString('Hello, world!', 'fr');
  console.log('Translated text:', translatedText);
} catch (error) {
  console.error('Error translating string:', error.message);
}
```

#### エラー：

- 対象言語がサポートされていない場合はエラーを投げます。
- 翻訳リクエストが失敗した場合や、ポーリングが最大許容時間を超えた場合はエラーを投げます。

### upload

```javascript
upload(content: string, filename: string): Promise<void>
```

翻訳のベース比較用としてファイルをアップロードします。これにより、コンテキストを提供して翻訳の最適化に役立ちます。

#### パラメータ：
files: FileContentWithLanguage\[] - コンテンツと言語情報を含むファイルの配列。
戻り値：

ファイルのアップロードが成功したときに解決されるPromise。

#### 例：

```javascript
const files = [
  {
    language: 'en',
    filename: 'app.json',
    content: '{"welcome": "Welcome to the app!"}'
  }
];

try {
  await frenglish.upload(files);
  console.log('Files uploaded successfully.');
} catch (error) {
  console.error('Error uploading files:', error.message);
}
```

#### エラー：

- アップロードに失敗した場合はエラーを投げます。

### getTranslationContent

```javascript
getTranslationContent(translationId: number): Promise<TranslationResponse[]>
```

完了した翻訳リクエストの翻訳済みコンテンツを取得します。

#### パラメータ：

- translationId: number - 翻訳リクエストの一意なID。

#### 戻り値：
PromiseでTranslationResponseオブジェクトの配列を返します。
例：

```javascript
try {
  const translationContent = await frenglish.getTranslationContent(translationId);
  console.log('Translation content:', translationContent);
} catch (error) {
  console.error('Error getting translation content:', error.message);
}
```

#### エラー：

- リクエストが失敗した場合はエラーを投げます。

### getDefaultConfiguration

```javascript
getDefaultConfiguration(): Promise<string>
```

Frenglish SDKのデフォルト設定を取得します。

### パラメータ：
なし。

#### 戻り値：
PromiseでConfigurationオブジェクトを返します。

#### 例：

```javascript
try {
  const defaultConfig = await frenglish.getDefaultConfiguration();
  console.log('Default configuration:', defaultConfig);
} catch (error) {
  console.error('Error getting default configuration:', error.message);
}
```

#### エラー：

- リクエストが失敗した場合はエラーを投げます。

### getSupportedLanguages

```javascript
getSupportedLanguages(): Promise<string[]>
```

Frenglish APIでサポートされている言語一覧を取得します。

#### パラメータ：
なし。

#### 戻り値：
Promiseでサポートされている言語コードの配列を返します。
例：

```javascript
try {
  const supportedLanguages = await frenglish.getSupportedLanguages();
  console.log('Supported languages:', supportedLanguages);
} catch (error) {
  console.error('Error getting supported languages:', error.message);
}
```

### getSupportedFileTypes

```javascript
getSupportedFileTypes(): Promise<string[]>
```

Frenglish APIでサポートされているファイルタイプ一覧を取得します。

#### パラメータ：
なし。

#### 戻り値：
Promiseでサポートされているファイル拡張子の配列を返します。
例：

```javascript
try {
  const supportedFileTypes = await frenglish.getSupportedFileTypes();
  console.log('Supported file types:', supportedFileTypes);
} catch (error) {
  console.error('Error getting supported file types:', error.message);
}
```

#### エラー：

- リクエストが失敗した場合はエラーを投げます。

### registerWebhook

```javascript
registerWebhook(webhookUrl: string): Promise<void>
```

翻訳が完了したときに通知を受け取るためのWebhook URLを登録します。これは任意ですが、非同期で翻訳結果を処理したい場合に便利です。

#### パラメータ：

- webhookUrl: string - 通知を受け取りたいWebhookエンドポイントのURL。

#### 戻り値：
Webhookの登録が成功したときに解決されるPromise。

#### 例：

```javascript
await frenglish.registerWebhook('https://yourdomain.com/webhook-endpoint');
```

#### エラー：

- URLが無効だったりネットワークの問題などで登録に失敗した場合はエラーを投げます。