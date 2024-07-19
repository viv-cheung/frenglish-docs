---
id: configuration
sidebar_position: 1
description: How to configure translation settings
slug: /configuration
---

fr + fr-translated # Configuration

fr + fr-translated ## Gérer les paramètres de traduction sur le site Frenglish.ai

fr + fr-translated Dans l'onglet \"Configuration Générale\", \n    a. Activez le \"Statut Actif du Répertoire\" et cliquez sur \"Enregistrer\"\n    b. Entrez le chemin de traduction (ex \"src/locales/*\" ) pour lequel vous souhaitez que les fichiers gèrent les traductions (tous les fichiers sous ce chemin seront traduits), cliquez sur \"Ajouter un chemin\" puis cliquez sur \"Enregistrer\".

fr + fr-translated ![Configuration Générale](../../../../../assets/general-configuration.png)

fr + fr-translated Dans l'onglet \"Configuration de la Langue\",\n    a. Sélectionnez votre langue d'origine (fichiers que vous gérez régulièrement, ex. Anglais), puis cliquez sur \"Enregistrer\"\n    b. Sélectionnez les langues que vous souhaitez prendre en charge, puis cliquez sur \"Enregistrer\"

fr + fr-translated ![Configuration de la Langue](../../../../../assets/language-configuration.png)

fr + fr-translated Optionnellement, dans l'onglet \"Configuration des Règles\",\n    a. Entrez toutes les règles générales que tous vos fichiers de traduction doivent suivre, puis cliquez sur \"Enregistrer\"\n    b. Entrez des règles spécifiques à la langue pour vos fichiers de traduction, puis cliquez sur \"Enregistrer\"

fr + fr-translated ![Configuration des Règles](../../../../../assets/rule-configuration.png)

fr + fr-translated ### Terminologie

fr + fr-translated **Langue d'Origine** : La langue d'origine de votre document/page web. C'est la langue que vous mettrez régulièrement à jour pour ajouter du nouveau contenu.

fr + fr-translated **Langues Cibles** : Toutes les langues que vous souhaitez prendre en charge

fr + fr-translated **Règles** : Toutes les règles de traduction que vous souhaitez appliquer pendant la traduction.

fr + fr-translated **Chemins de Traduction** : Tous les chemins que vous souhaitez que le bot Frenglish parcoure pour traduire les fichiers dans ce répertoire. Peut également avoir un chemin vers des fichiers spécifiques.

fr + fr-translated **Fusion Automatique** : Option pour créer une Pull Request sur une nouvelle branche basée sur la branche où vous avez modifié un fichier de traduction de la langue d'origine ou fusionnera automatiquement les nouveaux fichiers de traduction dans votre branche.

fr + fr-translated **Règles par langue** : Vous permet de spécifier des règles spécifiques à la langue pour toutes les langues que vous souhaitez prendre en charge

fr + fr-translated ## Gérer les paramètres de traduction dans votre dépôt

fr + fr-translated 1. Installez le bot Frenglish pour vos dépôts sélectionnés auxquels vous souhaitez appliquer des traductions\n2. Créez un `frenglishConfig.json` dans votre répertoire racine\n3. Configurez tous les paramètres de traduction dans le json :

```json
{
    "originLanguage": "en",
    "languages": ["fr", "ja", "es"],
    "rules": "Do not translate Frenglish",
    "translationPaths": ["docs/locales/*"],
    "autoMergeToBaseBranch": false,
    "rulesPerLanguage": [
      {
         "language": "fr",
         "rules": "French rule 1"
      },
      {
         "language": "ja",
         "rules": "Japanese rule 1"
      }
     ],
    "useThisConfig": true
}
```

fr + fr-translated **originLanguage** : Spécifiez la langue d'origine de votre document/page web. C'est la langue que vous mettrez régulièrement à jour pour ajouter du nouveau contenu.

fr + fr-translated **languages** : Spécifiez toutes les langues que vous souhaitez prendre en charge dans un tableau de chaînes.

fr + fr-translated **rules** : Dans une chaîne, spécifiez toutes les règles de traduction que vous souhaitez. Ces règles seront appliquées à tous les fichiers de traduction.

fr + fr-translated **translationPaths** : Spécifiez tous les chemins que vous souhaitez que le bot Frenglish parcoure pour traduire tous les fichiers dans ce répertoire.

fr + fr-translated **autoMergeToBaseBranch** : Option booléenne - **False** créera une Pull Request sur une nouvelle branche basée sur la branche où vous avez modifié un fichier de traduction de la langue d'origine. **True** fusionnera automatiquement les nouveaux fichiers de traduction dans votre branche.

fr + fr-translated **rulesPerLanguage** : Vous permet de spécifier des règles spécifiques à la langue pour toutes les langues que vous souhaitez prendre en charge

fr + fr-translated **useThisConfig** : Puisque nous offrons l'option de configurer votre traduction sur www.frenglish.ai, définir ce booléen garantira que vous utilisez la configuration json au lieu de celle que vous avez créée sur le site. Cependant, si nous ne trouvons pas de `frenglishConfig.json` dans votre répertoire racine, nous utiliserons les paramètres de traduction que vous avez configurés sur le site. Vous pouvez également définir cela sur \"false\", afin que nous utilisions la configuration sur le site.