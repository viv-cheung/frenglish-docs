---
id: website-quickstart
sidebar_position: 2
description: Comment traduire automatiquement ton site web
slug: /website-quickstart
---

# Démarrage rapide
Frenglish.ai offre la traduction de site web en temps réel grâce à un système de proxy inversé. Quand des visiteurs accèdent à ton site, notre worker Cloudflare intercepte la requête, récupère ton contenu original, le traduit, puis sert la version traduite dans la langue préférée du visiteur.

## Configuration de la traduction de site web
![Configuration du site web](../../../../../../assets/website-configuration.png)
1.  **Prépare ton projet**
    - Connecte-toi à ton tableau de bord Frenglish.ai
    - Configure les langues cibles que tu veux
    - Active ton projet
    - Va dans l’onglet Site web

2.  **Enregistre ton domaine**
    - Ajoute le domaine de ton site dans l’onglet Site web
    - Copie la configuration DNS fournie

3.  **Configure les paramètres DNS**
    - Va sur la page de gestion DNS de ton fournisseur de domaine
    - Suis les instructions affichées sur la page de configuration de ton projet sur Frenglish

## Tester sans domaine
Si tu veux tester la traduction sans configurer le DNS, tu peux ajouter notre extrait JavaScript dans le body de ton site :

```html
<script src="https://frenglish.ai/frenglish.bundle.js" strategy="beforeInteractive"></script>
<script id="frenglish-init" strategy="afterInteractive">
   window.frenglishSettings = {
      api_key: "your-public-api-key",
   };
   if (window.Frenglish) {
      window.Frenglish.initialize(window.frenglishSettings);
   }
</script>
```

## Comment ça fonctionne

1. Quand un utilisateur visite ton site, notre système détecte sa langue préférée
2. La requête passe par notre worker Cloudflare
3. Le worker va chercher ton contenu original
4. Le contenu est automatiquement traduit dans la langue préférée de l’utilisateur
5. La version traduite est servie à l’utilisateur

Tes pages traduites seront accessibles à des URLs spécifiques à chaque langue :
- Original : `example.com/`
- Français : `example.com/fr/`
- Espagnol : `example.com/es/`
- (Autres langues selon la configuration de ton projet)

## Avantages de cette approche

- La configuration prend quelques minutes, aucun changement dans ton code nécessaire
- Traduction en temps réel sans avoir à maintenir plusieurs versions du site
- Détection et redirection automatique selon la langue
- Aucune modification de la structure de ton site web
- Des URLs optimisées pour le SEO pour chaque langue
- Cette traduction côté serveur est essentielle pour un bon SEO localisé

## Avantages SEO
Notre système de traduction est conçu pour maximiser la visibilité de ton site sur les moteurs de recherche dans différentes langues et régions :
1.  **URLs localisées**
    - Chaque version linguistique a sa propre structure d’URL (ex. : `example.com/fr/`, `example.com/es/`)
    - Les moteurs de recherche reconnaissent ces URLs comme des versions localisées distinctes de ton contenu

2.  **Balises HTML de langue appropriées**
    - On met automatiquement à jour l’attribut `<html lang="...">` pour chaque langue
    - Des balises meta spécifiques à chaque langue sont ajoutées pour aider les moteurs de recherche à comprendre la langue du contenu

3.  **Implémentation hreflang**
    - Ajout automatique des balises `<link rel="alternate" hreflang="...">`
    - Aide les moteurs de recherche à comprendre la relation entre tes pages traduites
    - Assure que la bonne version linguistique s’affiche dans les résultats de recherche selon la localisation et la langue de l’utilisateur

4.  **Localisation du contenu**
    - Tout le contenu est bien traduit, y compris les titres meta, descriptions meta et mots-clés meta
    - Aide à améliorer le classement dans les résultats locaux pour chaque langue cible
    - Maintient la valeur SEO sur toutes les versions linguistiques

5.  **Traduction côté serveur**
    - Le contenu est traduit avant d’arriver chez l’utilisateur
    - Les robots SEO reçoivent directement le contenu traduit, ce qui leur permet de l’indexer tout de suite

Toutes ces optimisations aident les moteurs de recherche à bien indexer ton contenu multilingue, ce qui peut améliorer ton classement dans les résultats locaux et élargir ton audience internationale.