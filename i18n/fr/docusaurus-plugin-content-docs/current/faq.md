---
id: FAQ
sidebar_position: 4
description: Frequently Asked Questions
slug: /FAQ
---

# FAQ

## Comment traduisez-vous tous vos fichiers ?
Suivez les étapes [ici](./HowToTranslate/3-OneTimeTranslation.md#manage-translation-settings-on-the-frenglishai-website) !

## Comment puis-je savoir si la qualité est bonne ?
Le bot Frenglish passe par les étapes de validation suivantes :
- Plusieurs boucles de réflexion et de révision pour s'assurer que la traduction suit vos règles spécifiées et semble naturelle
- Possède une fonctionnalité d'apprentissage implicite pour s'auto-apprendre des règles basées sur des fichiers de traduction modifiés manuellement
- Les traductions sont envoyées à des traducteurs humains pour validation de la qualité chaque trimestre
- Des scores METEOR (test de qualité de traduction standardisé) sont effectués régulièrement ; ce test traduira le contenu dans la langue cible puis de retour dans sa langue d'origine. Un score sera attribué en comparant les valeurs originales avec les valeurs de rétro-traduction
- Nos documents et notre site web ont été entièrement traduits par le bot Frenglish ! Par conséquent, la qualité de la traduction est transparente et constitue une référence pour ce à quoi vous devez vous attendre

## Combien de temps dois-je attendre pour que mes fichiers de traduction soient terminés ?
Cela dépend du nombre de caractères que vous traduisez. En général, vous pouvez vous attendre à ce qu'un fichier soit traduit en 1 minute. Ceci est dû au fait que le bot Frenglish passe par plusieurs étapes de validation pour garantir une haute qualité de traduction avant de produire un résultat.

## Tout dans mon fichier ne nécessite pas de traduction, comment choisissez-vous ce qui doit être traduit ?
Le bot Frenglish ne traduira que le contenu pertinent en fonction du type de fichier. Par exemple :

**Fichiers Markdown**
- Le code ne sera pas traduit

**Fichiers PO**
- Les commentaires, msgid et autres métadonnées po ne seront pas traduits ni comptés comme contenu traduit

**Fichiers JSON**
- Les clés ne seront pas traduites et seules les valeurs seront traduites

## Soutenez-vous uniquement les traductions en français ?
Non, le nom "Frenglish" a été choisi pour représenter ses origines québécoises. De nombreux Québécois utilisent le terme "Frenglish" pour désigner leur manière de converser (en mélangeant à la fois le français et l'anglais dans un dialogue naturel).

Nous supportons les langues suivantes :

Afrikaans, Arabe, Arménien, Azerbaïdjanais, Biélorusse, Bosnien, Bulgare, Catalan, Chinois, Croate, Tchèque, Danois, Néerlandais, Anglais, Estonien, Finnois, Français, Galicien, Allemand, Grec, Hébreu, Hindi, Hongrois, Islandais, Indonésien, Italien, Japonais, Kannada, Kazakh, Coréen, Letton, Lituanien, Macédonien, Malais, Marathi, Maori, Népali, Norvégien, Persan, Polonais, Portugais, Roumain, Russe, Serbe, Slovaque, Slovène, Espagnol, Swahili, Suédois, Tagalog, Tamoul, Thaï, Turc, Ukrainien, Ourdou, Vietnamien et Gallois.

## Que se passe-t-il si je ferme une PR de Frenglish ?
Le contenu de cette PR NE SERA PAS traduit dans les futures PR de Frenglish. Ne fermez une PR de Frenglish que si vous ne souhaitez pas que ce contenu soit traduit par Frenglish. Vous pouvez toujours modifier le texte dans la PR de Frenglish et le fusionner

## Les extraits de code sont-ils traduits ?
Non, les extraits de code ne sont pas traduits et NE comptent PAS dans votre utilisation des mots traduits

## Comment fonctionne le dépassement ?
Vous êtes facturé tous les 100 $ de dépassement que vous accumulez pendant une période, ou quel que soit le dépassement de l'utilisateur lorsque la nouvelle période commence

## Que se passe-t-il si je mets à niveau mon plan APRÈS être entré en dépassement ?
Quel que soit le montant du dépassement que vous avez dépensé sur votre plan précédent, il sera crédité pour ce mois. Cela signifie que si vous dépensez 50 $ en dépassement dans PRO, les premiers 50 $ en dépassement sur votre plan mis à niveau ne seront pas facturés