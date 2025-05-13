# Comment configurer une GitHub Action
Ce guide va t’expliquer comment mettre en place une GitHub Action pour traduire automatiquement le contenu de ton dépôt avec le SDK Frenglish.

## Prérequis

1. Un dépôt GitHub où tu veux activer les traductions
2. Une clé API privée Frenglish (obtiens-la sur [www.frenglish.ai](http://www.frenglish.ai) dans l’onglet paramètres développeur de ton projet cli/sdk)

## Étapes de configuration

1.  **Crée le fichier de workflow GitHub Action**

    Crée un nouveau fichier dans ton dépôt à `.github/workflows/frenglish-translation.yml` et copie le code GitHub Action fourni dedans (voir le code ci-dessous).

<details>
  <summary>Afficher le code du workflow **GitHub Action** à copier</summary>

  ```yaml
  # ------------------------------------------------------------------------------
  # Frenglish Translation GitHub Action
  #
  # Workflow summary
  # - PRs - Internal: always translate the diff to the PR base.
  #     • Example 1: Open PR => feature_1 → main
  #     • Example 2: Open PR => feature_1_fix → feature_1
  #
  # - PRs - External: Only translate when external PR is merged
  #     • Example: merge PR => fork → main (from a contributor fork)
  #
  # - Default‑branch pushes: translate unless
  #     a) author is github‑actions[bot], or
  #     b) the push includes a commit with “chore(i18n): update translations”
  #     • Example: Hotfix push → main
  #
  # - Diff logic: compares to fork-point for PRs, or previous commit on main for direct pushes.
  # - If changes are found: handles file renames/deletes, runs translation and formatting,
  #   then commits and pushes a single update from the bot.
  # ------------------------------------------------------------------------------

  name: Frenglish Translation
  on:
    # Run once per pull‑request (feature → any target)
    pull_request:
      types: [opened, synchronize, reopened]

    # Run again only when commits land on the default branch (e.g. master/main)
    push:
      branches:
        - '**' # We filter below

  permissions:
    contents: read

  jobs:
    translate_and_format:
      # Run if (a) it’s a PR  OR  (b) it’s a push *and* the ref equals the repo’s default branch
      if: >-
        github.event_name == 'pull_request' ||
        (
          github.event_name == 'push' &&
          github.ref == format('refs/heads/{0}', github.event.repository.default_branch) &&
          !contains(github.event.head_commit.author.name, 'github-actions[bot]') &&
          !startsWith(github.event.head_commit.message, 'Merge ')
        )
      runs-on: ubuntu-latest
      permissions:
        contents: write
        pull-requests: write
      steps:
        # We check if commit message include `chore(i18n): update translations` and assume it's been fully translated if so
        - name: Detect translation commit in push range 
          id: detect
          if: github.event_name == 'push' # PRs always run
          run: | 
            echo "Looking for 'chore(i18n): update translations' between ${{ github.event.before }}..${{ github.sha }}"
            if git log --format=%B ${{ github.event.before }}..${{ github.sha }} | grep -qF 'chore(i18n): update translations'; then
              echo "skip=true" >> "$GITHUB_OUTPUT"
            else
              echo "skip=false" >> "$GITHUB_OUTPUT"
            fi

        - name: Checkout code
          if: steps.detect.outputs.skip != 'true'
          uses: actions/checkout@v4
          with:
            token: ${{ secrets.GITHUB_TOKEN }}
            fetch-depth: 0

        - name: Setup Node.js
          if: steps.detect.outputs.skip != 'true'
          uses: actions/setup-node@v3
          with:
            node-version: '18' # Or your preferred Node.js version >= 16

        - name: Install dependencies
          if: steps.detect.outputs.skip != 'true'
          run: |
            # Ensure you have a package.json and package-lock.json
            # Add @frenglish/sdk to your package.json: npm install @frenglish/sdk --save
            npm install

        - name: Setup Git User
          if: steps.detect.outputs.skip != 'true'
          run: |
            git config --global user.email "github-actions[bot]@users.noreply.github.com"
            git config --global user.name "github-actions[bot]"

        - name: Get Language Configuration
          if: steps.detect.outputs.skip != 'true'
          id: get_lang_config
          run: node .github/scripts/fetch-frenglish-configuration.js
          env:
            FRENGLISH_API_KEY: ${{ secrets.FRENGLISH_API_KEY }}
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

        # --- Step to Handle Renamed/Deleted Files ---
        - name: Handle Renamed and Deleted Source Files
          if: steps.detect.outputs.skip != 'true'
          id: handle_changes
          run: |
            set -e # Exit immediately if a command exits with a non-zero status.

            # Get target languages and commit SHAs
            # SOURCE_DIR_RAW from get_lang_config is now IGNORED for path determination
            TARGET_DIRS_STRING="${{ steps.get_lang_config.outputs.target_langs }}"
            BEFORE_SHA="${{ github.event.before }}"
            CURRENT_SHA="${{ github.sha }}"

            # --- Define the source path CONSISTENTLY with translate.js ---
            # ORIGIN_LANGUAGE_DIR in translate.js is path.resolve('.'), so we use '.' here.
            EFFECTIVE_SOURCE_PATH="."
            echo "Source file location for rename/delete check: Root Directory (.)"

            # --- Validate Target Languages ---
            if [ -z "$TARGET_DIRS_STRING" ]; then
                echo "::warning::No target languages determined. Rename/delete actions for target directories will be skipped."
                echo "processed_changes=false" >> $GITHUB_OUTPUT
                exit 0
            fi
            read -r -a TARGET_DIRS <<< "$TARGET_DIRS_STRING"
             if [ ${#TARGET_DIRS[@]} -eq 0 ]; then
                echo "::warning::No target languages parsed. Rename/delete actions for target directories will be skipped."
                echo "processed_changes=false" >> $GITHUB_OUTPUT
                exit 0
             fi

            # --- List of top-level files/dirs to EXCLUDE from rename/delete handling ---
            # Add any other known non-locale files/folders residing in your root directory
            # Use trailing slash for directories to avoid matching files starting with the same name
            EXCLUDED_PATTERNS=(
              'package.json'
              'package-lock.json'
              'node_modules/'
              'frenglish.config.json'
              '.github/'
              '.git/'
              '.gitignore'
              'README.md'
              # Add other files/dirs like 'vite.config.js', 'tsconfig.json', etc. if they exist in root
            )
            echo "Excluding patterns: ${EXCLUDED_PATTERNS[*]}"


            # --- Check for Renamed/Deleted Files in the Root Directory ---
            echo "Checking for renamed/deleted files in '$EFFECTIVE_SOURCE_PATH' between $BEFORE_SHA and $CURRENT_SHA..."
            processed_any_change=false

            # Use NUL delimiters, check within the root directory (.)
            git diff --name-status --find-renames -z $BEFORE_SHA $CURRENT_SHA -- "$EFFECTIVE_SOURCE_PATH" | while IFS= read -r -d $'\0' status && IFS= read -r -d $'\0' old_path && IFS= read -r -d $'\0' new_path; do
              # Handle cases where new_path might not be present (for deletions)
              if [ -z "$new_path" ]; then
                new_path=$old_path
              fi

              # --- Calculate relative paths (already relative to root) ---
              relative_old_path="$old_path"
              relative_new_path="$new_path"

              # --- Filter out EXCLUDED top-level files/directories ---
              is_excluded=false
              for pattern in "${EXCLUDED_PATTERNS[@]}"; do
                 # Check if old_path starts with or exactly matches the pattern
                 if [[ "$old_path" == "$pattern"* ]]; then
                   is_excluded=true
                   echo "Skipping excluded file/path based on pattern '$pattern': $old_path"
                   break # Exit inner loop once matched
                 fi
              done
              if [ "$is_excluded" = true ]; then
                continue # Skip to the next file in the diff
              fi
              # --- End of exclusion filter ---

              # Proceed only if the file wasn't excluded
              echo "Detected potentially relevant change: Status=$status, Old Path=$old_path, New Path=$new_path"

              for TARGET_DIR in "${TARGET_DIRS[@]}"; do # Iterate over array elements correctly
                # Ensure target *directory* exists (e.g., 'ja', 'es')
                if [ ! -d "$TARGET_DIR" ]; then
                  echo "::warning::Target directory '$TARGET_DIR' not found. Skipping for this language."
                  continue
                fi

                # Construct target paths using the relative path from root
                target_old_path="$TARGET_DIR/$relative_old_path"

                if [[ "$status" == D* ]]; then
                  # Delete corresponding file in target dir IF it exists
                  if [ -f "$target_old_path" ]; then
                    echo "Deleting corresponding file: $target_old_path"
                    git rm "$target_old_path"
                    processed_any_change=true
                  else
                    # It's okay if the target file doesn't exist, don't warn loudly.
                     echo "Corresponding file for deletion not found (or already deleted): $target_old_path"
                  fi
                elif [[ "$status" == R* ]]; then
                  # Rename corresponding file in target dir IF it exists
                  target_new_path="$TARGET_DIR/$relative_new_path"
                  target_new_path_dir=$(dirname "$target_new_path")

                  if [ -f "$target_old_path" ]; then
                    # Create parent directory for target if needed
                    if [ ! -d "$target_new_path_dir" ]; then
                        echo "Creating directory for renamed file: $target_new_path_dir"
                        mkdir -p "$target_new_path_dir"
                    fi
                    echo "Renaming corresponding file: $target_old_path -> $target_new_path"
                    git mv "$target_old_path" "$target_new_path"
                    processed_any_change=true
                  else
                     # It's okay if the target file doesn't exist, don't warn loudly.
                     echo "Corresponding file for rename not found: $target_old_path"
                  fi
                fi # End status check (D or R)
              done # end loop target dirs
            done # end loop git diff

            # Output based on the flag
            echo "processed_changes=$processed_any_change" >> $GITHUB_OUTPUT
          env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

        - name: Run translation script (Writes/Updates files)
          if: steps.detect.outputs.skip != 'true'
          env:
            FRENGLISH_API_KEY: ${{ secrets.FRENGLISH_API_KEY }}
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          run: node .github/scripts/translate.js

        - name: Stage ALL changes (new, modified, deleted, renamed)
          if: steps.detect.outputs.skip != 'true'
          run: |
            echo "Staging all tracked changes (adds, modifications, deletes, renames)..."
            git add . # This stages all changes in the working directory

        - name: Commit changes
          if: steps.detect.outputs.skip != 'true'
          id: commit
          run: |
            # Check index status after all operations (add, rm, mv)
            # Use --cached to check staged changes specifically
            if git diff --cached --quiet; then
               echo "No changes staged for commit."
               echo "changes_committed=false" >> $GITHUB_OUTPUT
            else
              echo "Committing translation updates, formatting, renames, and deletions..."
              # Use the dynamically fetched source language in the commit message
              COMMIT_SOURCE_LANG="${{ steps.get_lang_config.outputs.source_lang }}" # Capture output first
              git commit -m "chore(i18n): update translations [${COMMIT_SOURCE_LANG:-unknown}]" \
                         -m "Sync file structure, format locales. Branch: ${{ github.ref_name }}"
              echo "changes_committed=true" >> $GITHUB_OUTPUT
              git show --stat # Show commit details
            fi

        - name: Push changes
          # run only when we actually committed something
          if: steps.detect.outputs.skip != 'true' && steps.commit.outputs.changes_committed == 'true'
          env:
            # use head branch for PRs, ref_name for normal pushes
            TARGET_REF: ${{ github.event_name == 'pull_request' && github.event.pull_request.head.ref || github.ref_name }}
          run: |
            echo "Pushing changes to origin/${TARGET_REF}..."
            git push origin HEAD:${TARGET_REF}
  ```
</details>

2.  **Configure la clé API Frenglish**

    Enregistre ta clé API Frenglish comme secret GitHub :

    a. Va sur ton dépôt GitHub
    b. Clique sur « Paramètres » > « Secrets et variables » > « Actions »
    c. Clique sur « Nouveau secret de dépôt »
    d. Nom : `FRENGLISH_API_KEY`
    e. Valeur : ta clé API privée Frenglish
    f. Clique sur « Ajouter le secret »

3.  **Crée le script de traduction**

    Crée un nouveau fichier à `.github/scripts/translate.js`. Ce script va utiliser le SDK Frenglish pour faire les traductions.

    Copie le script de traduction que tu peux installer dans `.github/scripts/translate.js` :

<details>
  <summary>Afficher le code **.github/scripts/translate.js** à copier</summary>

  ```javascript
  const { execSync } = require('child_process');
  const fs = require('fs').promises;
  const path = require('path');

  // ==================================================================================================
  // 🔧 REQUIRED CONFIGURATION – YOU MUST MODIFY THESE VALUES TO CONFIGURE THEIR TRANSLATION PATHS 🔧
  // ==================================================================================================

  // Path to your original language files (e.g., English source content)
  const ORIGIN_LANGUAGE_DIR = path.resolve('.');

  // Path where translated files will be saved (Base directory)
  const TRANSLATION_OUTPUT_DIR = path.resolve('.');

  // List of files or directories to exclude from processing
  const EXCLUDED_FILES = ['package.json', 'package-lock.json', 'node_modules'];

  // ============================================================
  // MODIFY BELOW THIS LINE FOR CUSTOM GITHUB ACTIONS
  // ============================================================

  (async () => {
      const sdkModule = await import('@frenglish/sdk');
      const FrenglishSDK = sdkModule.FrenglishSDK;
      if (!FrenglishSDK) throw new Error('FrenglishSDK not found in module exports.');

      const FRENGLISH_API_KEY = process.env.FRENGLISH_API_KEY;
      if (!FRENGLISH_API_KEY) {
          console.error('❌  FRENGLISH_API_KEY environment variable not set. Aborting action.');
          process.exit(1);
      }
      const frenglish = FrenglishSDK(FRENGLISH_API_KEY);

      async function getDefaultBranch() {
          try {
              const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}`, {
                  headers: {
                      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                      'Accept': 'application/vnd.github.v3+json'
                  }
              });
              const data = await response.json();
              return data.default_branch;
          } catch (error) {
              console.error(`❌  Failed to retrieve default branch: ${error.message}`);
              return 'main';
          }
      }

      async function isSupportedFile(filePath) {
          try {
              const relativeToOrigin = path.relative(ORIGIN_LANGUAGE_DIR, path.resolve(filePath));
              if (relativeToOrigin.startsWith('..') || relativeToOrigin === '') {
                  return false;
              }

              if (EXCLUDED_FILES.some(excluded => filePath.includes(excluded))) {
                  console.log(`⏭️  Skipping (excluded): ${filePath}`);
                  return false;
              }

              const config = await frenglish.getDefaultConfiguration();
              const languageCodes = await frenglish.getSupportedLanguages();
              const originLanguage = config.originLanguage.toLowerCase();

              const pathParts = filePath.split(path.sep);
              const languageDirIndex = pathParts.findIndex(part =>
                  part.toLowerCase() === originLanguage ||
                  languageCodes.some(lang => lang.toLowerCase() === part.toLowerCase())
              );

              if (languageDirIndex !== -1 && pathParts[languageDirIndex].toLowerCase() !== originLanguage) {
                  console.log(`⏭️  Skipping (translated dir): ${filePath}`);
                  return false;
              }

              const supportedFileTypes = await frenglish.getSupportedFileTypes();
              const validFileTypes = supportedFileTypes.filter(type => type && type.length > 0);
              const ext = path.extname(filePath).toLowerCase().replace('.', '');

              const isSupported = ext && validFileTypes.includes(ext);
              return isSupported;
          } catch (error) {
              console.error(`❌  Error checking file support for ${filePath}: ${error.message}`);
              return false;
          }
      }

      // Compares files changed in a PR (or files changed with a commit directly to default branch)
      async function getChangedFiles() {
          try {
              const isPR = !!process.env.GITHUB_BASE_REF;
              const currentBranch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF.replace('refs/heads/', '');
              const defaultBranch = await getDefaultBranch();

              if (!isPR && currentBranch !== defaultBranch) {
                  return [];
              }

              // Figure out what we’re diffing against
              const baseBranch = isPR ? process.env.GITHUB_BASE_REF : defaultBranch;

              let baseSha;
              if (isPR) {
                  execSync(`git fetch --depth=1 origin ${baseBranch}:${baseBranch}`);
                  baseSha = execSync(`git merge-base ${baseBranch} HEAD`).toString().trim();
              } else {
                  baseSha = process.env.GITHUB_EVENT_BEFORE || execSync('git rev-parse HEAD^').toString().trim();
              }

              console.log(`🔀  Diff base: ${baseBranch} @ ${baseSha}`);
              console.log(`🔝  Head     : ${currentBranch} @ HEAD`);

              const output = execSync(`git diff --diff-filter=ACM --name-only ${baseSha} HEAD`).toString().trim();
              const changedFiles = output ? output.split('\n') : [];
              const supportedFiles = [];

              for (const file of changedFiles) {
                  if (await isSupportedFile(file)) supportedFiles.push(file);
              }

              console.log(`📦  Files queued for translation (${supportedFiles.length}): ${supportedFiles.join(', ') || 'None'}`);
              return supportedFiles;
          } catch (error) {
              console.error(`❌  Error getting changed files: ${error.message}`);
              return [];
          }
      }

      async function translateAndWriteFiles() {
          try {
              const config = await frenglish.getDefaultConfiguration();
              const originLanguage = config.originLanguage.toLowerCase();
              const filesToTranslate = await getChangedFiles();

              if (!filesToTranslate.length) {
                  console.log('ℹ️  No eligible files found for translation. Exiting.');
                  return;
              }

              const fileContents = await Promise.all(filesToTranslate.map(async (file) => {
                  try {
                      const content = await fs.readFile(file, 'utf-8');
                      // Use path relative to ORIGIN_LANGUAGE_DIR as the fileId
                      const fileId = path.relative(ORIGIN_LANGUAGE_DIR, file);
                      return { fileId: fileId, content: content };
                  } catch (readError) {
                      console.error(`❌ Error reading file ${file}:`, readError.message);
                      return null;
                  }
              }));

              const validFileContents = fileContents.filter(fc => fc !== null);
              if (validFileContents.length === 0) {
                  console.log('⚠️  No readable file contents detected. Exiting.');
                  return;
              }

              const filenames = validFileContents.map(file => file.fileId);
              const contents = validFileContents.map(file => file.content);

              console.log(`🚀  Initiating translation for ${filenames.length} file(s).`);
              const translation = await frenglish.translate(contents, false, filenames);
              console.log(`📤  Translation request submitted. ID: ${translation.translationId}`);

              for (const languageData of translation.content) {
                  const language = languageData.language;
                  // Skip writing files for the origin language if they are returned
                  if (language === originLanguage) {
                      console.log(`⏩  Skipping origin language (${language}).`);
                      continue;
                  }

                  const languageOutputDir = path.join(TRANSLATION_OUTPUT_DIR, language);
                  try {
                      await fs.mkdir(languageOutputDir, { recursive: true });
                  } catch (mkdirError) {
                      console.error(`❌  Unable to create directory ${languageOutputDir}: ${mkdirError.message}`);
                      continue;
                  }

                  for (const translatedFile of languageData.files) {
                      const translatedFilePath = path.join(languageOutputDir, translatedFile.fileId);

                      try {
                          await fs.mkdir(path.dirname(translatedFilePath), { recursive: true });
                      } catch (mkdirError) {
                          console.error(`❌  Unable to create subdirectory ${path.dirname(translatedFilePath)}: ${mkdirError.message}`);
                          continue;
                      }

                      // Write the file content if not empty
                      if (translatedFile.content && translatedFile.content.length > 0) {
                          try {
                              await fs.writeFile(translatedFilePath, translatedFile.content, 'utf8');
                              console.log(`✅  Written: ${translatedFilePath}`);
                          } catch (writeError) {
                              console.error(`❌  Error writing ${translatedFilePath}: ${writeError.message}`);
                          }
                      } else {
                          console.warn(`⚠️  Empty content for ${translatedFile.fileId} (${language}). Skipping.`);
                      }
                  }
              }

              console.log('🏁  Translation workflow complete. Git operations will be handled by the Action.');
          } catch (error) {
              console.error('❌  Translation process failed:', error);
              if (error.response?.data) {
                  console.error('🔍  Frenglish API details:', error.response.data);
              }
              process.exit(1);
          }
      }

      translateAndWriteFiles();
  })();
  ```
</details>

:::attention

Assure-toi d’ajuster les paramètres dans la section `🔧 CONFIGURATION REQUISE` du script ci-dessus

:::
4\.  **Installe les dépendances du SDK Frenglish**

Utilise ton gestionnaire de paquets préféré pour installer Frenglish :

```bash
npm install @frenglish/cli @frenglish/sdk @frenglish/utils
```

ou

```bash
yarn add @frenglish/cli @frenglish/sdk @frenglish/utils
```

ou

```bash
pnpm add @frenglish/cli @frenglish/sdk @frenglish/utils
```

5.  **Valide et pousse tes changements**

    Ajoute les nouveaux fichiers à ton dépôt :

    ```bash
    git add .github/workflows/frenglish-translation.yml .github/scripts/translate.js
    git commit -m "Add Frenglish translation GitHub Action"
    git push
    ```

6.  **Vérifie l’Action**

    Après avoir poussé tes changements :
    a. Va sur ton dépôt GitHub
    b. Clique sur l’onglet « Actions »
    c. Tu devrais voir le workflow « Frenglish Translation » en cours d’exécution

## Comment ça fonctionne
La GitHub Action fonctionne comme ceci :
1.  **Pull Requests (interne)** :
    - Traduit les changements à chaque événement pull request (`opened`, `synchronize`, `reopened`) pour les branches du même dépôt (ex : branche feature vers branche principale).

2.  **Pull Requests (externe/fork)** :
    - Les traductions sont **déclenchées seulement quand une pull request externe (d’un fork)** est fusionnée dans la branche par défaut.

3.  **Pushs directs sur la branche par défaut** :
    - L’Action traduit les changements pour les pushs directs sur la branche par défaut sauf si :
      - Le commit est fait par `github-actions[bot]`.
      - Un message de commit dans le push contient la phrase `chore(i18n): update translations`.
      - Le message du commit commence par `Merge ` (les commits de fusion sont ignorés).

4.  **Modifications via le tableau de bord** :
    - Si des traductions sont modifiées manuellement via le tableau de bord Frenglish, la prochaine exécution de la GitHub Action synchronisera automatiquement ces traductions mises à jour dans les fichiers du dépôt.

5.  **Détection des changements** :
    - Pour les pull requests, l’Action compare les changements avec le fork-point (l’ancêtre commun du commit).
    - Pour les pushs directs, la comparaison se fait avec le commit précédent sur la branche par défaut.

6.  **Gestion des opérations sur les fichiers** :
    - Si des changements (y compris des renommages ou suppressions) sont détectés, l’Action synchronisera ces opérations dans tous les dossiers de langues.

7.  **Exécution de la traduction** :
    - Il exécute le processus de traduction avec le SDK Frenglish, formate les fichiers traduits, puis fait un seul commit regroupé avec les résultats de la traduction.

## Personnalisation

- Tu peux ajuster le déclencheur dans le fichier de workflow pour qu’il s’exécute sur certaines branches ou événements.
- Modifie le script `translate.js` pour gérer différents types de fichiers ou processus de traduction selon tes besoins.
- Mets à jour l’étape de création de pull request si tu veux changer la façon dont les traductions sont soumises pour révision.

## Dépannage
Si tu rencontres des problèmes :
1. Vérifie les journaux de l’Action dans l’onglet GitHub Actions pour voir les messages d’erreur.
2. Assure-toi que ta clé API privée Frenglish est bien configurée dans les secrets du dépôt.
3. Vérifie que ton script `translate.js` utilise bien le SDK Frenglish.
4. Si les traductions ne se déclenchent pas comme prévu, assure-toi que tes messages de commit n’incluent pas `chore(i18n): update translations` et que les commits ne sont pas faits par `github-actions[bot]`, car ces cas empêchent volontairement le lancement des traductions.

N’oublie pas de garder ta clé API Frenglish secrète et de ne jamais la commettre directement dans ton dépôt.