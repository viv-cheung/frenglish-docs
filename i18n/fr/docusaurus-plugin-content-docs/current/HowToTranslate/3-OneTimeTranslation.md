---
id: oneTimeTranslation
sidebar_position: 3
description: One Time Translation
slug: /one-time-translation
---

fr + fr-translated # Traduction Unique
Les Traductions Uniques vous permettent de retraduire entièrement tous les fichiers ou des fichiers spécifiques. Cela peut être utile pour améliorer les règles fournies ou pour que Frenglish.ai révise des fichiers obsolètes traduits manuellement.

fr + fr-translated ## Utilisation de Frenglish.ai

fr + fr-translated Une fois que vous avez configuré vos paramètres de traduction (voir [configuration](1-Configuration.md)), cliquez sur le bouton vert "Traduction Unique".

fr + fr-translated ![Configuration Générale](../../../../../assets/general-configuration.png)

fr + fr-translated 1. Sélectionnez les fichiers pour une traduction unique
    - Option 1: Cliquez sur l'option **Tout** pour traduire tous vos fichiers à partir du chemin de traduction.
    - Option 2: Cliquez sur **spécifier les chemins** pour ne traduire que certains fichiers

fr + fr-translated 2. Entrez le nom de la branche à partir de laquelle vous souhaitez traduire. Le bot Frenglish créera une nouvelle Pull Request à partir de cette branche que vous avez spécifié
3.  Sélectionnez les langues vers lesquelles vous souhaitez traduire
4.  Cliquez sur "Traduire Maintenant" dès que vous êtes prêt !

fr + fr-translated ## Traduire tous les fichiers localement
Vous pouvez également traduire ou retraduire tous les fichiers localement si vous avez une [configuration locale (`frenglishConfig.json`)](1-Configuration.md#manage-translation-settings-in-your-repository)

fr + fr-translated ### Première traduction
Si vous committez le fichier `frenglishConfig.json` pour la première fois, et que les fichiers de traduction de la langue cible n'existent pas, tous vos fichiers seront traduits dans les nouvelles langues

fr + fr-translated ### Lors de la mise à jour de votre `frenglishConfig.json`
Si vous committez une modification dans le `frenglishConfig.json` et qu'il n'y a pas de fichiers ou de dossiers de traduction existants pour les langues cibles, nous traduirons tous vos fichiers dans la langue d'origine.

fr + fr-translated Par exemple, pousser un commit où vous avez ajouté `ja` à votre tableau `languages` initierait une traduction de tous vos fichiers en japonais par Frenglish.

fr + fr-translated Exemple : `common.json` sera traduit dans un nouveau dossier `ja` puisque dans le `frenglishConfig.json` il a maintenant `ja` spécifié dans le tableau `languages` :

fr + fr-translated b. Entrez le nom de la branche à partir de laquelle vous souhaitez traduire. Le bot Frenglish créera une nouvelle Pull Request à partir de cette branche que vous avez spécifiée
    c. Sélectionnez les langues vers lesquelles vous souhaitez traduire
    d. Cliquez sur "Traduire Maintenant" dès que vous êtes prêt !

fr + fr-translated ### Retraduire des fichiers de traduction existants
S'il y a des fichiers de traduction existants que vous souhaitez retraduire entièrement, il vous suffira de les supprimer. Le prochain commit retraduira tous les fichiers de langue d'origine qui manquent maintenant dans les langues cibles.

fr + fr-translated Par exemple, `common.json` sera traduit dans le dossier `fr` puisque `common.json` a été supprimé du dossier `fr` :

fr + fr-translated Par exemple, `common.json` sera traduit dans le dossier `fr` puisque `common.json` n'existe pas dans le dossier `fr` :