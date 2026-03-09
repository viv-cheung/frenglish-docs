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

## ルールとキー・フィルター
\_何を\_翻訳し、\_どのように\_翻訳するかを制御する設定オプションは、ルールとキー・フィルターにまとめられます。これらは `translate()` や `translateString()` を呼び出す際に `partialConfig` 経由で渡すか、プロジェクトのダッシュボードで設定できます。

### 翻訳ルール

- **rules**（文字列、省略可）– 翻訳者への一般的な指示（例：トーン、用語、スタイル）。特定の言語用のルールで上書きされない限り、すべてのターゲット言語に適用されます。
- **rulesPerLanguage**（`{ language, rules }` の配列、省略可）– 特定のターゲット言語用のルールを上書きします。各エントリは言語コード（例：`"fr"`）と `rules` 文字列を持ちます。あるロケールだけ異なるスタイルや用語が必要な場合に便利です。
- **implicitRules**（配列、省略可）– 翻訳パイプラインによって適用される構造化された暗黙のルール。

### インクルード・除外フィルター（キー・フィルター）
キー・フィルターは、JSON（または他の構造化コンテンツ）内のどの**キー**が翻訳対象になるかを制御します。これはキーのパス（例：トップレベルのキー `"title"` や、`"meta.description"` のようなネストされたパス）に適用されます。
-   **keyFilters**（オブジェクトまたは `null`、省略可）：
    - **includeFilters** – パターンの配列。**空でない場合**、パスがこれらのパターンの**いずれか**に一致するキーのみが翻訳されます。それ以外のキーは変更されません。
    - **excludeFilters** – パターンの配列。パスが**いずれか**のパターンに一致するキーは**翻訳されず**、元の言語のまま残ります。
    - `includeFilters` と `excludeFilters` の両方が `null` または空の場合、**すべて**のキーが翻訳されます（フィルタリングなし）。
    - **両方設定されている場合の動作：** まずインクルードが適用され（該当するキーのみ候補）、次に除外が適用されます（該当するキーがそのセットから除外されます）。したがって、キーが翻訳されるのは、インクルードパターンに一致し（インクルードがある場合）、かつ除外パターンのいずれにも一致しない場合のみです。

-   **keyFiltersPerLanguage**（`{ language, keyFilters }` の配列、省略可）– ターゲット言語ごとにキー・フィルターを上書きします。各エントリは言語コードと、それぞれ独自の `includeFilters` と `excludeFilters` を持つ `keyFilters` オブジェクトを持ちます。言語ごとのフィルターを設定しない場合、その言語にはグローバルな `keyFilters` が使われます。

**パターン形式：** 各パターンはドット区切りのキー・パスです（例：`title`、`meta.description`）。エントリのキー・パスがこれらのパターンと照合されます。セグメントには `*` を使って、その階層の任意のキーに一致させることができます（例：`meta.*` は `meta.title`、`meta.description` などに一致）。同じパターンをインクルードと除外の両方で使うことはできません。

**主な利用例：**
- **特定のキーのみ翻訳したい場合：** 翻訳したいキーのパターンを `includeFilters` に設定します（例：`["title", "meta.label"]`）。それ以外は翻訳されません。
- **機密情報や翻訳不要なキーを除外したい場合：** 翻訳してはいけないキーのパターンを `excludeFilters` に設定します（例：`["internalId", "code", "url"]`）。それ以外は翻訳されます。
- **言語ごとに異なるキーを翻訳したい場合：** `keyFiltersPerLanguage` を使うことで、例えばある言語には一部のキーだけ、別の言語にはすべてのキーを翻訳することができます。

**例：入力JSONとフィルター適用後の出力**

元の言語が英語で、フランス語に翻訳する場合の入力JSON：

```json
{
  "id": "user-42",
  "title": "Welcome",
  "meta": {
    "label": "Home",
    "code": "H1"
  }
}
```

- **`includeFilters: ["title", "meta.label"]` を使った場合** — これらのキー・パスのみ翻訳され、それ以外は元の言語のまま残ります：

```json
{
  "id": "user-42",
  "title": "Bienvenue",
  "meta": {
    "label": "Accueil",
    "code": "H1"
  }
}
```

- **`excludeFilters: ["id", "code"]` を使った場合** — パスに `id` または `code` を含むキー以外はすべて翻訳されます：

```json
{
  "id": "user-42",
  "title": "Bienvenue",
  "meta": {
    "label": "Accueil",
    "code": "H1"
  }
}
```

`translate()` を呼び出す際に `partialConfig` でキー・フィルターを渡すことができます。詳細は [translate](#translate) のパラメータや、下記の例をご覧ください。

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
- partialConfig: PartialConfiguration（省略可）- この翻訳のデフォルト設定を上書きします。主なオプション：
  - **originLanguage**, **languages** – 元言語とターゲット言語のコード。
  - **rules**, **rulesPerLanguage**, **implicitRules** – 翻訳ルール（[ルールとキー・フィルター](#rules-and-key-filters) を参照）。
  - **keyFilters** – `{ includeFilters: string[], excludeFilters: string[] } | null` で翻訳対象キーを指定（[インクルード・除外フィルター](#include-and-exclude-filters-key-filters) を参照）。
  - **keyFiltersPerLanguage** – 言語ごとのキー・フィルター上書き（[インクルード・除外フィルター](#include-and-exclude-filters-key-filters) を参照）。
  - **autoMergeToBaseBranch**, **useThisConfig** – その他の動作フラグ。

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

**インクルード／除外フィルターの例**（特定のキーのみ翻訳、または一部を除外）：

```javascript
// Only translate keys matching these patterns; leave all other keys unchanged
const partialConfigInclude = {
  languages: ['fr'],
  keyFilters: {
    includeFilters: ['title', 'description', 'meta.*'],
    excludeFilters: null
  }
};

// Translate all keys except those matching these patterns
const partialConfigExclude = {
  languages: ['fr'],
  keyFilters: {
    includeFilters: null,
    excludeFilters: ['internalId', 'code', 'url']
  }
};

const translation = await frenglish.translate(contents, false, filenames, partialConfigExclude);
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