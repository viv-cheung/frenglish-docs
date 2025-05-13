# Cómo configurar GitHub Action
Esta guía te llevará paso a paso para configurar una GitHub Action que traduzca automáticamente el contenido de tu repositorio usando el SDK de Frenglish.

## Requisitos previos

1. Un repositorio de GitHub donde quieras implementar las traducciones
2. Una clave API privada de Frenglish (obtenla en [www.frenglish.ai](http://www.frenglish.ai) bajo tu proyecto cli/sdk en la pestaña de configuración de desarrollador)

## Pasos de configuración

1.  **Crea el archivo de flujo de trabajo de GitHub Action**

    Crea un nuevo archivo en tu repositorio en `.github/workflows/frenglish-translation.yml` y copia el código de GitHub Action proporcionado (ver código abajo).

<details>
  <summary>Mostrar código del flujo de trabajo **GitHub Action** para copiar</summary>

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

2.  **Configura la clave API de Frenglish**

    Guarda tu clave API de Frenglish como un secreto de GitHub:

    a. Ve a tu repositorio en GitHub
    b. Haz clic en "Settings" > "Secrets and variables" > "Actions"
    c. Haz clic en "New repository secret"
    d. Nombre: `FRENGLISH_API_KEY`
    e. Valor: Tu clave API privada de Frenglish
    f. Haz clic en "Add secret"

3.  **Crea el script de traducción**

    Crea un nuevo archivo en `.github/scripts/translate.js`. Este script usará el SDK de Frenglish para realizar las traducciones.

    Copia el script de traducción que puedes instalar en `.github/scripts/translate.js`:

<details>
  <summary>Mostrar código de **.github/scripts/translate.js** para copiar</summary>

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

:::caution

Asegúrate de ajustar los parámetros dentro de la sección `🔧 REQUIRED CONFIGURATION` en el script anterior

:::
4\.  **Instala las dependencias del SDK de Frenglish**

Usa tu gestor de paquetes favorito para instalar Frenglish:

```bash
npm install @frenglish/cli @frenglish/sdk @frenglish/utils
```

o

```bash
yarn add @frenglish/cli @frenglish/sdk @frenglish/utils
```

o

```bash
pnpm add @frenglish/cli @frenglish/sdk @frenglish/utils
```

5.  **Haz commit y sube tus cambios**

    Agrega los nuevos archivos a tu repositorio:

    ```bash
    git add .github/workflows/frenglish-translation.yml .github/scripts/translate.js
    git commit -m "Add Frenglish translation GitHub Action"
    git push
    ```

6.  **Verifica la acción**

    Después de subir tus cambios:
    a. Ve a tu repositorio en GitHub
    b. Haz clic en la pestaña "Actions"
    c. Deberías ver el flujo de trabajo "Frenglish Translation" ejecutándose

## Cómo funciona
La GitHub Action funciona de la siguiente manera:
1.  **Pull Requests (Internos)**:
    - Traduce los cambios en cada evento de pull request (`opened`, `synchronize`, `reopened`) para ramas dentro del mismo repositorio (por ejemplo, de la rama de feature a la rama principal).

2.  **Pull Requests (Externos/Forks)**:
    - Las traducciones **solo se activan cuando un pull request externo (de un fork)** se fusiona en la rama principal.

3.  **Push directos a la rama principal**:
    - La acción traduce los cambios para los pushes directos a la rama principal a menos que:
      - El commit haya sido hecho por `github-actions[bot]`.
      - Cualquier mensaje de commit dentro del push contenga la frase `chore(i18n): update translations`.
      - El mensaje de commit comience con `Merge ` (los commits de merge se omiten).

4.  **Ediciones desde el panel**:
    - Si las traducciones de un archivo se editan manualmente desde el panel de Frenglish, la siguiente ejecución de la GitHub Action sincronizará automáticamente esas traducciones actualizadas con los archivos correspondientes del repositorio.

5.  **Determinación de cambios**:
    - Para pull requests, la acción compara los cambios contra el punto de bifurcación (commit ancestro común).
    - Para pushes directos, la comparación se hace contra el commit anterior en la rama principal.

6.  **Gestión de operaciones de archivos**:
    - Si se detectan cambios (incluyendo renombres o eliminaciones), la acción sincronizará estas operaciones en todos los directorios de idiomas.

7.  **Ejecución de la traducción**:
    - Ejecuta el proceso de traducción usando el SDK de Frenglish, formatea los archivos traducidos y realiza un solo commit consolidado con los resultados de la traducción.

## Personalización

- Puedes ajustar el disparador en el archivo de workflow para ejecutarlo en ramas o eventos específicos.
- Modifica el script `translate.js` para manejar diferentes tipos de archivos o procesos de traducción según lo necesites.
- Actualiza el paso de creación del pull request si quieres cambiar cómo se envían las traducciones para revisión.

## Solución de problemas
Si encuentras algún problema:
1. Revisa los registros de la Acción en la pestaña de GitHub Actions para ver mensajes de error.
2. Asegúrate de que tu clave privada de la API de Frenglish esté correctamente configurada en los secretos del repositorio.
3. Verifica que tu script `translate.js` esté usando correctamente el SDK de Frenglish.
4. Si las traducciones no se ejecutan como esperas, verifica que tus mensajes de commit no incluyan `chore(i18n): update translations` y asegúrate de que los commits no sean realizados por `github-actions[bot]`, ya que esto previene intencionalmente la ejecución de traducciones.

Recuerda mantener tu clave de API de Frenglish en secreto y nunca la subas directamente a tu repositorio.