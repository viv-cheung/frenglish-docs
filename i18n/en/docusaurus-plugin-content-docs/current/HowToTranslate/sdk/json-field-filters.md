# JSON key filters (SDK)

Translate **only** the JSON fields you want. Use `keyFilters` in the SDK call to include human‑visible strings (labels, headings) and exclude structural keys (ids, slugs, routes, etc.).

---

## Quick start

```ts
import { FrenglishSDK } from '@frenglish/sdk'

const fr = FrenglishSDK(process.env.FRENGLISH_API_KEY!)

await fr.translate(
  [JSON.stringify(myJson)],      // content array
  false,                         // full file vs. delta
  ['config.json'],               // file identifiers
  {
    keyFilters: {
      includeFilters: [
        'title', 'subtitle', 'label',
        'sections.*.heading',
      ],
      excludeFilters: [
        'id', 'slug', 'path', 'url',
        'routes', 'pages', 'keys',
      ],
    },
  }
)
```

> **Rule of thumb:** Include human‑visible text; exclude keys that drive routing, lookups, or program logic.

---

## Types (from `packages/utils/src/types/configuration.ts`)

```ts
export interface Configuration {
  id: number;
  projectID: number;
  originLanguage: string | null;
  languages: string[] | null;
  languageSelector: LanguageSelector | null;
  excludedTranslationBlocks: ExcludedTranslationBlock[] | null;
  rules: string | null;
  knowledgeBaseFiles: string[];
  autoMergeToBaseBranch: boolean;
  rulesPerLanguage: Rule[] | null;
  oneTimeTranslation: boolean;
  keyFilters: Filter | null;              // ← use this
  createdAt: string | null;
  lastModifiedAt: string | null;
}

export type PartialConfiguration = Partial<Configuration>;

export interface Filter {
  includeFilters: string[] | null;
  excludeFilters: string[] | null;
}
```

Pass `keyFilters` in the **per‑call `PartialConfiguration`** argument to `translate(...)` or `translateString(...)`.

---

## Pattern syntax

* Paths are **dot‑separated**: `meta.title`, `profile.bio`.
* `*` wildcard matches across segments and arrays:

  * `sections.*.heading` → `sections[0].heading`, `sections[1].heading`, …
  * `*.meta.title` → any `meta.title` regardless of prefix.
* **Precedence**: `excludeFilters` win over `includeFilters`.
* **Conflicts**: the same pattern in both lists should error.

---

## Examples (generic)

### CMS content

Translate author‑facing text; skip machine fields.

```ts
keyFilters: {
  includeFilters: ['fields.*.label', 'fields.*.placeholder', 'helpText'],
  excludeFilters: ['fields.*.id', 'fields.*.name', 'fields.*.key']
}
```

### App settings

Localize what users read; ignore technical defaults.

```ts
keyFilters: {
  includeFilters: ['settings.*.title', 'settings.*.description'],
  excludeFilters: ['settings.*.key', 'settings.*.default']
}
```

### Navigation data

Keep structure intact; translate only visible labels.

```ts
keyFilters: {
  includeFilters: ['nav.*.group', 'nav.*.label'],
  excludeFilters: ['nav.*.path', 'nav.*.slug', 'nav.*.children']
}
```

---

## Minimal end‑to‑end

```ts
const raw = await fs.readFile('input.json', 'utf8')
const out = await fr.translate([raw], false, ['input.json'], {
  keyFilters: {
    includeFilters: ['*.title', '*.subtitle', '*.label'],
    excludeFilters: ['*.id', '*.slug', '*.path', '*.url']
  }
})

await fs.writeFile('output.json', out.content[0], 'utf8')
```

---

*Use `keyFilters` to keep translations safe, predictable, and code‑review friendly.*
