---
id: translationFilesManagement
sidebar_position: 2
description: So strukturierst du Übersetzungsdateien
slug: /translation-files-management
---

# Verwaltung von Übersetzungsdateien

## So strukturierst du deine Übersetzungsdateien für automatische Übersetzungen

### Variante 1:

- Der Ordner für die Ausgangssprache sollte mit dem Sprachcode benannt werden (z. B. "en")
- Die Dateien im Ordner der Ausgangssprache sollten nur die zu übersetzenden Dateien enthalten
- Diese Dateien müssen nicht den Namen des Ausgangssprachen-Ordners enthalten (z. B. intro.md, about.json, contactUs.po)

**Beispiel für eine Verzeichnisstruktur**
- Die Übersetzungsdateien werden wie folgt organisiert. Der Übersetzungspfad für dieses Beispiel wäre `docs/locales/*`:

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

### Variante 2:

- Lege einen übergeordneten Ordner an, z. B. `locales`, `languages` oder einen anderen Namen, der darauf hinweist, dass alle Unterordner Übersetzungs-/Sprachdateien enthalten
- Benenne jede Datei mit dem Sprachcode im Dateinamen
- Bei dieser Methode werden keine der angegebenen Ausgangssprachen übersetzt. Alle Dateien mit Zielsprachen-Codes werden übersetzt.

**Beispiel für eine Verzeichnisstruktur**
- Die Übersetzungsdateien werden wie folgt organisiert. Der Übersetzungspfad für dieses Beispiel wäre `docs/locales/*`:

```plaintext
    docs/
    ├─ locales/
        ├─ en_common.json
        │  en_about.json
        ├─ fr_common.json
        │  fr_about.json
```