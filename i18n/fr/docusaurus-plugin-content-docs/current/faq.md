---
id: FAQ
sidebar_position: 4
description: Foire aux questions
slug: /FAQ
---

# FAQ

## Comment savoir si la qualité est bonne ?
Le bot Frenglish suit les étapes de validation suivantes :
- Plusieurs boucles de réflexion et de révision pour s’assurer que la traduction respecte tes règles et sonne naturel
- Fonction d’apprentissage automatique implicite pour s’adapter aux règles à partir des fichiers de traduction modifiés manuellement
- Les traductions sont envoyées à des traducteurs humains pour validation de qualité chaque trimestre
- Un score METEOR (test standardisé de qualité de traduction) est effectué régulièrement ; ce test traduit le contenu dans la langue cible puis le retraduit dans la langue d’origine. Un score est donné en comparant les valeurs originales et les valeurs retraduites
- Notre documentation et notre site web ont été entièrement traduits par le bot Frenglish ! Donc, la qualité de la traduction est visible et c’est la référence à laquelle tu peux t’attendre.

## Combien de temps dois-je prévoir pour que mes fichiers de traduction soient complétés ?
Ça dépend du nombre de caractères à traduire. En général, tu peux t’attendre à environ 1 minute par fichier. C’est parce que le bot Frenglish passe par plusieurs étapes de validation pour garantir une traduction de qualité avant de donner un résultat.

## Tout dans mon fichier n’a pas besoin d’être traduit, comment choisissez-vous quoi traduire ?
Le bot Frenglish ne traduira que le contenu pertinent selon le type de fichier. Par exemple :

**Fichiers Markdown**
- Le code ne sera pas traduit

**Fichiers PO**
- Les commentaires, msgid et autres métadonnées po ne seront pas traduits ni comptés comme du contenu traduit

**Fichiers JSON**
- Les clés ne seront pas traduites, seulement les valeurs

## Tu ne supportes que les traductions en français?
Non, le nom « Frenglish » a été choisi pour représenter ses origines québécoises. Beaucoup de Québécois utilisent le terme « Frenglish » pour décrire la façon dont ils parlent (en mélangeant le français et l’anglais dans une conversation naturelle).

On prend en charge les langues suivantes :

Afrikaans, arabe, arménien, azerbaïdjanais, biélorusse, bosniaque, bulgare, catalan, chinois, croate, tchèque, danois, néerlandais, anglais, estonien, finnois, français, galicien, allemand, grec, hébreu, hindi, hongrois, islandais, indonésien, italien, japonais, kannada, kazakh, coréen, letton, lituanien, macédonien, malais, marathi, maori, népalais, norvégien, persan, polonais, portugais, roumain, russe, serbe, slovaque, slovène, espagnol, swahili, suédois, tagalog, tamoul, thaï, turc, ukrainien, ourdou, vietnamien et gallois.

## Que se passe-t-il si je ferme une PR de Frenglish ?
Le contenu de cette PR NE sera PAS traduit dans les futures PR Frenglish. Ferme une PR Frenglish seulement si tu ne veux pas que ce contenu soit traduit par Frenglish. Tu peux toujours modifier le texte dans la PR Frenglish et la fusionner

## Est-ce que les extraits de code sont traduits ?
Non, les extraits de code ne sont pas traduits et NE comptent PAS dans ton quota de mots traduits

## Comment fonctionne le dépassement de quota ?
Tu es facturé à chaque tranche de 100 $ de dépassement accumulée pendant une période, ou pour tout dépassement restant au début d’une nouvelle période.

## Que se passe-t-il si je change de forfait APRÈS avoir dépassé mon quota ?
Le montant de dépassement que tu as dépensé sur ton ancien forfait sera crédité pour ce mois-ci. Donc, si tu dépenses 50 $ de dépassement en PRO, les premiers 50 $ de dépassement sur ton nouveau forfait ne seront pas facturés