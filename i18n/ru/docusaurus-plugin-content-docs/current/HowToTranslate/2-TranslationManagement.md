---
id: translationFilesManagement
sidebar_position: 2
description: How to structure translation files
slug: /translation-files-management
---

Управление файлами перевода

Как структурировать файлы перевода для автоматических переводов

Вариант 1:

- Папка с исходным языком должна называться кодом языка (например, "en")
- Файлы внутри папки с исходным языком должны содержать только файлы, требующие перевода
- Эти файлы не должны содержать имя папки с исходным языком (например, intro.md, about.json, contactUs.po)

**Пример структуры каталога**
   - Файлы перевода будут организованы следующим образом. Путь перевода для этого примера будет `docs/locales/*`:

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

Вариант 2:
- Иметь родительскую папку, называемую `locales` или `languages` или имя, символизирующее, что все дочерние файлы являются файлами перевода/языка
- Назовите каждый файл с кодом языка в имени файла
- Используя этот метод, ни один из объявленных исходных языков не будет переведен. Все файлы, содержащие коды целевых языков, будут переведены

**Пример структуры каталога**
   - Файлы перевода будут организованы следующим образом. Путь перевода для этого примера будет `docs/locales/*`:

```plaintext
    docs/
    ├─ locales/
        ├─ en_common.json
        │  en_about.json
        ├─ fr_common.json
        │  fr_about.json
```

Как управляются автоматические переводы

Если вы внесете какие-либо изменения в любой из ваших файлов на исходном языке (например, `en/common.json`), бот Frenglish обнаружит эти изменения и переведет их в соответствующие файлы целевого языка. Бот Frenglish создаст новые файлы или папки, если не обнаружит существующих файлов целевого языка.

**Пример, где вносить изменения**
   - Внесите изменения в следующий файл, изменив некоторый текст:

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```

- Сохраните файл, сделайте коммит и отправьте изменения с помощью git.
   - Перейдите на вкладку **Pull Requests** на Github, чтобы увидеть ваш новый PR перевода, созданный Frenglish из вашей основной ветки.

**Автоматические Pull Requests**
   - Любой коммит в папке исходного языка "translationPaths" вызовет создание pull request от Frenglish с обновленными файлами перевода на указанных языках.
   - Изменения, внесенные в файлы не на исходном языке, не вызовут новых переводов.