---
id: website-how-it-works
sidebar_position: 2
description: Comment fonctionne notre service de traduction instantanée de site web
slug: /website-how-it-works
---

# Comment ça fonctionne
Notre système de traduction instantanée est conçu pour être le plus transparent possible. Ce guide explique les détails techniques derrière le rideau pour que tu comprennes exactement ce qui se passe quand quelqu’un visite ton site via notre proxy de traduction.

## Configuration DNS
Pour utiliser notre service, tu dois simplement pointer ton DNS vers notre worker Cloudflare. Ça veut dire mettre à jour tes enregistrements DNS A ou CNAME pour faire passer ton trafic par notre couche proxy.

Par exemple, si ton site était hébergé sur Vercel ou Netlify, tu n’as qu’à remplacer l’enregistrement DNS qui pointait vers leurs serveurs edge par un enregistrement qui pointe vers les nôtres. Pas besoin de toucher à ton code ou de déployer quoi que ce soit d’autre.

Si jamais tu veux arrêter d’utiliser notre service, il suffit d’annuler le changement DNS et de repointer tes enregistrements vers ton fournisseur original — c’est aussi simple que ça.

## Comment fonctionne le proxy inversé
Quand un utilisateur visite ton site, toutes les requêtes passent par le Worker Cloudflare de Frenglish qui agit comme proxy inversé.

Voici comment se déroule le flux de requête :

<div style={{ textAlign: 'center' }}>
  <div style={{ display: 'inline-block', textAlign: 'left' }}>
    <img src="/assets/cloudflare_worker_diag.png" alt="Architecture du Worker Cloudflare" width="800" />

    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1px' }}>
      Architecture du Worker Cloudflare
    </div>
  </div>
</div>

1.  **Vérification de la langue**\
    Le proxy regarde dans l’URL si un code de langue est présent (ex. : `/fr/about`).

2.  **Détection de la langue d’origine**\
    Si la requête est déjà dans ta langue d’origine (généralement l’anglais), on transmet la requête à ton serveur original et on retourne le contenu tel quel.

3.  **Flux de traduction**\
    Si la langue demandée est différente de l’originale, on vérifie si une traduction existe déjà dans notre cache edge.
    - Si **en cache**, la version traduite est retournée instantanément.
    - Si **pas en cache**, on va chercher le contenu original, on le met en file d’attente pour traduction, et on sert la version non traduite (généralement en anglais) en attendant. Une fois la traduction prête, les prochains utilisateurs recevront la version traduite et mise en cache.
    - Si **pas en cache** mais déjà traduite, on la récupère depuis Amazon S3, où toutes les traductions sont stockées avec double chiffrement.

4.  **Mise en cache**\
    On utilise la mise en cache edge globale de Cloudflare pour que les traductions soient servies rapidement, peu importe où se trouvent tes utilisateurs. Notre cache fonctionne en “serve while revalidating”, donc même si une traduction est mise à jour, l’ancien contenu s’affiche tout de suite pendant que le nouveau est préparé en arrière-plan.

## Traduction des URLs
Vous pouvez faire **traduire les URLs par langue** afin que les chemins soient localisés, et pas seulement le contenu. Par exemple :
- **Original (ex : anglais) :** `example.com/about-us`
- **Français :** `example.com/fr/a-propos`
- **Espagnol :** `example.com/es/sobre-nosotros`

Lorsque cette option est activée dans la configuration de votre projet, Frenglish maintient une correspondance entre vos chemins d'URL d'origine et leurs équivalents traduits pour chaque langue. Les liens, redirections et sitemaps utilisent alors le bon chemin localisé pour chaque locale. Cela améliore à la fois le **SEO** (les moteurs de recherche voient des URLs spécifiques à chaque langue) et **l'expérience utilisateur** (les visiteurs voient les URLs dans leur langue). Vous pouvez activer et gérer la traduction des URLs dans les paramètres **Site web** (ou configuration) de votre projet sur le tableau de bord Frenglish.

## Routage géographique
**Le routage géographique** envoie les visiteurs vers une version linguistique en fonction de leur **pays ou région**. Par exemple :
- Visiteurs de France → version française (`/fr/`)
- Visiteurs du Québec → version française canadienne (`/fr-ca/`) si vous utilisez des règles par région
- Visiteurs d'Espagne → version espagnole (`/es/`)

Vous configurez les correspondances comme pays → langue (et éventuellement région → langue, ex : Québec) dans les paramètres de votre projet. Lorsqu'un utilisateur arrive sur votre site sans langue dans le chemin (ex : `example.com/`), notre proxy peut détecter sa localisation et le rediriger vers la langue appropriée. Ainsi, de nombreux utilisateurs arrivent directement sur la bonne langue sans utiliser le sélecteur de langue. **Si un utilisateur a déjà choisi une langue** (par exemple via le sélecteur de langue), ce choix est stocké dans les cookies et **a priorité sur le routage géographique**—ainsi, les visiteurs de retour voient leur langue préférée au lieu d'être redirigés selon leur localisation. Le routage géographique est optionnel et peut être configuré dans la section **Site web** ou la zone de configuration du tableau de bord Frenglish de votre projet.

## Que se passe-t-il si notre API est hors ligne ?
Si, pour une raison quelconque, notre API de traduction est temporairement indisponible, tes utilisateurs verront quand même ton contenu original dans sa langue par défaut. On a conçu notre système proxy pour qu’il retombe toujours sur ses pattes, donc ton site reste accessible même si la traduction est interrompue.

## Frenglish Bundle
On injecte aussi un petit bundle JavaScript dans ton site, appelé le **bundle Frenglish**. Ce script active plusieurs fonctionnalités :
- **Traduction côté client** : Il détecte tout nouveau contenu qui apparaît après le chargement initial de la page (ex. : ajouté par JavaScript ou chargé via AJAX) et le traduit automatiquement en utilisant les traductions déjà en cache.
- **Interface de changement de langue** : Le bundle ajoute automatiquement un widget de changement de langue par défaut sur ton site.\nTu peux personnaliser l’apparence et l’emplacement de ce sélecteur avec notre **générateur de sélecteur de langue**.

<div style={{ textAlign: 'center' }}>
  <div style={{ display: 'inline-block', textAlign: 'left' }}>
    <img src="/assets/language-selector-config.png" alt="générateur de sélecteur de langue" width="500" />

    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1px' }}>
      Configuration du sélecteur de langue
    </div>
  </div>
</div>

## Héberger le Worker toi-même
Si tu préfères héberger toi-même le Cloudflare Worker sur ton propre compte Cloudflare pour avoir un contrôle total, on peut t’accompagner et te guider. [Contacte-nous ici](https://www.frenglish.ai/en/contact) pour en savoir plus.

## Est-ce que ça fonctionne avec des frameworks JavaScript comme React, Vue ou Next.js ?
Oui. Le bundle Frenglish surveille les changements dans le DOM et traduit le contenu au fur et à mesure qu’il est rendu côté client. Ça inclut aussi le contenu chargé via la navigation côté client dans les frameworks SPA. On prend aussi en charge la traduction côté serveur pour les pages pré-rendues.

## Est-ce que ça va ralentir mon site ?
Non. Frenglish est optimisé pour la rapidité. Comme tout est servi à la périphérie via Cloudflare et fortement mis en cache, les utilisateurs ne verront pratiquement aucune latence. Le bundle JavaScript est minuscule et non-bloquant.

## Les traductions restent en cache combien de temps ?
Le contenu traduit est mis en cache pendant une heure par défaut. Tu peux vider le cache en ajoutant `?frenglish_cache_bust` à n’importe quelle URL. Ça va effacer le cache de traduction pour tout ton site et forcer la récupération du nouveau contenu.\
Par exemple : `https://example.com?frenglish_cache_bust`.