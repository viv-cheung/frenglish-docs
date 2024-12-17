---
id: cli-quickstart
sidebar_position: 4
description: Learn how to use Frenglish's CLI to streamline your translation workflow
slug: /CLI
---

# Быстрый старт CLI

## Введение

Frenglish CLI (интерфейс командной строки) — это мощный инструмент, который позволяет разработчикам интегрировать команды перевода файлов контента прямо в их рабочий процесс. С помощью Frenglish CLI вы можете легко отправлять файлы на перевод, загружать новые файлы, проверять статус перевода и получать переведенный контент из вашего терминала. Это руководство поможет вам начать работу с одноразовыми переводами или ручным управлением переводами вне ваших автоматизированных конвейеров сборки.

## Предварительные условия

Перед началом убедитесь, что у вас есть следующее:

- **Node.js** установлен на вашем компьютере (рекомендуется версия 14 или выше)
- **npm** (Node Package Manager) для установки пакетов
- **Git** для контроля версий (необязательно, но рекомендуется)
- **Ключ API Frenglish** (зарегистрируйтесь на платформе Frenglish, чтобы получить его)

## Установка

Установите Frenglish CLI глобально с помощью npm:

```bash
npm install -g frenglish
```

## Конфигурация

1. Создайте файл `.env` в корневом каталоге вашего проекта. Вы получите FRENGLISH_API_KEY с [www.frenglish.ai](https://www.frenglish.ai), когда создадите новый проект. Он будет находиться на вкладке **Настройки разработчика**:

```bash
FRENGLISH_API_KEY=your_api_key_here
ORIGIN_LANGUAGE_TRANSLATION_PATH=/path/to/your/translation/directory
TRANSLATION_PATH=/path/to/translation/output
```

Пример:

```bash
FRENGLISH_API_KEY=123abcdefg
ORIGIN_LANGUAGE_TRANSLATION_PATH=/src/locales/en
TRANSLATION_PATH=/src/locales
```

Замените `your_api_key_here` на ваш фактический ключ API Frenglish и установите правильные пути для `ORIGIN_LANGUAGE_TRANSLATION_PATH` (каталог, где хранятся ваши файлы на исходном языке) и `TRANSLATION_PATH` (каталог, где будут сохранены переведенные файлы).

2. Убедитесь, что ваш файл `.gitignore` включает `.env`, чтобы сохранить ваш ключ API в безопасности.

## Основное использование

Основной синтаксис для Frenglish CLI:

```bash
frenglish translate [options]
```

Без каких-либо опций, CLI будет:

1. Обнаружьте все файлы в указанной вами директории перевода (`ORIGIN_LANGUAGE_TRANSLATION_PATH`).
2. Отправьте эти файлы на перевод.
3. Дождитесь завершения перевода.
4. Сохраните переведенные файлы в соответствующих подкаталогах языков внутри `TRANSLATION_PATH`.
5. После того как вы проверите сгенерированные файлы перевода, зафиксируйте их в своей ветке управления версиями.

### Расширенное использование

Вот как вы можете использовать CLI с различными опциями для эффективного управления переводами.

### Опции команд

- **--path [string]**: Укажите пользовательский путь для перевода конкретных файлов или директорий.
  - По умолчанию: Значение `ORIGIN_LANGUAGE_TRANSLATION_PATH` в вашем файле `.env`.

```bash
  frenglish translate --path "./custom/path/file.json"
  ```

- **--isFullTranslation [boolean]**: Выполните полный перевод (переведите все файлы, даже если они не изменились).
  - По умолчанию: `false` (переводятся только измененные файлы).
  Пример:

```bash
  frenglish translate --isFullTranslation=true
  ```

- **--partialConfig [string]**: Укажите частичную конфигурацию в виде строки JSON или пути к файлу JSON.
  - Может использоваться для переопределения настроек конфигурации по умолчанию для этого перевода.
  - Принимает либо прямую строку JSON, либо путь к файлу конфигурации JSON.
  
  Примеры:

```bash
  # Using a JSON string
  frenglish translate --partialConfig='{"targetLanguages":["fr","es"]}'

  # Using a configuration file
  frenglish translate --partialConfig='./src/configs/translationConfig.json'
  ```

Пример config.json:

```json
  {
    "keyFilters": {
        "includeFilters": ["fields.*.fields"],
        "excludeFilters": []
    },
    "languages": ["fr","es"],
    "rules": "use an informal tone"
  }
  ```

Объект конфигурации может включать любые из этих свойств:

```typescript
  {
    originLanguage: string,      // Source language code
    languages: string[],         // Target language codes
    rules: string,              // General translation rules
    autoMergeToBaseBranch?: boolean,  // Auto-merge setting
    implicitRules?: ImplicitRule[],    // Array of implicit translation rules
    rulesPerLanguage: Rule[],    // Language-specific rules
    useThisConfig: boolean,      // Whether to use this config
    keyFilters: {               // Filters for translation keys
      includeFilters: string[],
      excludeFilters: string[]
    } | null
  }
  ```

- **--help**: Показать все доступные опции и их описания.
  Пример:

```bash
  frenglish translate --help
  ```

### Команды CLI
1. **Перевод файлов**:
   Основная команда для перевода файлов. Она обнаружит измененные файлы, отправит их на перевод и сохранит переведенные файлы.

```bash
   frenglish translate
   ```

Опции:
   - `--path`: Укажите файл или директорию для перевода.
   - `--isFullTranslation`: Перевести все файлы, независимо от изменений.
   Примеры:

```bash
   frenglish translate --path "./custom/path/file.json"
   frenglish translate --isFullTranslation=true
   ```

2. **Загрузка новых файлов**:
   Используйте эту команду, если хотите инициализировать перевод для существующих файлов. Например, если у вас уже есть некоторые переведенные файлы и вы не хотите переводить их снова, вы можете использовать эту команду для загрузки существующих переводов. Frenglish будет использовать эти инициализированные файлы в качестве основы, и если файл на исходном языке изменится, он переведет только измененные части для переведенных файлов.

```bash
   frenglish upload
   ```

Опции:
   - `--path`: Укажите пользовательский путь для загрузки файлов.

```bash
   frenglish upload --path ./custom/locales
   ```

## Примеры рабочих процессов

1. **Перевод измененных файлов**:
   - Внесите изменения в ваши файлы контента в указанной директории.
   - Запустите Frenglish CLI для перевода этих измененных файлов:

- CLI обнаружит измененные файлы, начнет процесс перевода и сохранит переведенные файлы в языковых подкаталогах в `TRANSLATION_PATH`.

2. **Перевод всех файлов (полный перевод)**:
   - Чтобы перевести все файлы, даже если они недавно не изменялись, используйте флаг `--isFullTranslation`:

```bash
   frenglish translate --isFullTranslation=true
   ```

3. **Перевод конкретных файлов**:
   - Чтобы перевести конкретные файлы или директории, используйте опцию `--path`:

```bash
   frenglish translate --path "./src/locales/en/specific-file.json"
   ```

4. **Загрузка новых файлов**:
   - Чтобы загрузить недавно добавленные файлы для перевода, выполните:

```bash
   frenglish upload --path "./src/locales/new_files"
   ```

## Устранение неполадок
Если вы столкнулись с какими-либо проблемами:
1. **Проверьте ваш файл `.env`**:
   Убедитесь, что ваш файл `.env` правильно настроен и находится в правильном месте. Убедитесь, что `FRENGLISH_API_KEY` и пути (`ORIGIN_LANGUAGE_TRANSLATION_PATH` и `TRANSLATION_PATH`) установлены правильно.
2. **Проверьте ваш API-ключ**:
   Убедитесь, что ваш API-ключ действителен в вашей учетной записи Frenglish.
3. **Доступ к директории**:
   Убедитесь, что указанные пути в `ORIGIN_LANGUAGE_TRANSLATION_PATH` и `TRANSLATION_PATH` верны и у вас есть необходимые разрешения для чтения и записи в эти директории.