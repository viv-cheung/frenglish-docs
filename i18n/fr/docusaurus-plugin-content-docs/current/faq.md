---
id: faq
sidebar_position: 4
description: Frequently Asked Questions
slug: /FAQ
---

## Comment traduisez-vous tous vos fichiers ?
- Si vous soumettez le

```frenglishConfig.json```

fichier pour la première fois, et que les fichiers de langue cible n'existent pas (ou n'appartiennent pas au dossier de la langue cible), il traduira tous vos fichiers. Le nom du fichier d'origine doit correspondre exactement à celui de la langue cible.

Exemple,

```common.json```

sera traduit dans le dossier `fr` puisque

```common.json```

n'existe pas dans le dossier fr :

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
        │  fr/
        │  ├─ common1.json
```

Exemple 2,

```common.json```

sera traduit dans un nouveau dossier `fr` créé puisqu'il y a

```frenglishConfig.json```

, il a `fr` spécifié dans la valeur `languages` :

```plaintext
    docs/
    ├─ locales/
        ├─ en/
        │  ├─ common.json
```

## Comment savoir si la qualité est bonne ?
Le bot Frenglish passe par les étapes de validation suivantes :
- Plusieurs boucles de réflexion et de validation pour s'assurer que la traduction suit vos règles spécifiées et semble naturelle
- Dispose d'une fonctionnalité d'apprentissage implicite pour s'auto-apprendre des règles basées sur les fichiers de locale modifiés manuellement
- Les traductions sont envoyées à des traducteurs humains pour validation de la qualité chaque trimestre
- Des scores METEOR (test de qualité de traduction standardisé) sont effectués régulièrement ; ce test traduira le contenu dans la langue cible et retournera à sa langue d'origine. Un score sera attribué en comparant les valeurs originales aux valeurs de re-traduction
- Tous les documents que vous voyez ont été traduits par le bot Frenglish ! Par conséquent, la qualité de la traduction est transparente et une référence pour ce que vous devriez attendre

## Combien de temps dois-je attendre pour que mes fichiers de traduction soient terminés ?
Cela dépend du nombre de caractères que vous traduisez. En général, vous pouvez vous attendre à 1 minute par fichier à traduire. Cela est dû au fait que le bot Frenglish passe par plusieurs étapes de validation pour s'assurer que la qualité de la traduction est élevée avant de produire un résultat.

## Tout dans mon fichier ne nécessite pas de traduction, comment choisissez-vous ce qui doit être traduit ?
Le bot Frenglish ne traduira que le contenu pertinent en fonction du type de fichier. Par exemple :

**Fichiers Markdown**
- Le code ne sera pas traduit

**Fichiers PO**
- Les commentaires, msgid et autres métadonnées po ne seront pas traduits ou comptés comme contenu traduit

**Fichiers JSON**
- Les clés ne seront pas traduites et seules les valeurs seront traduites

## Soutenez-vous uniquement les traductions en français ?
Non, le nom "Frenglish" a été choisi pour représenter ses origines québécoises. De nombreux Québécois utilisent le terme "Frenglish" pour désigner la façon dont ils conversent (en mélangeant à la fois le français et l'anglais dans un dialogue naturel).

Nous prenons en charge les langues suivantes :

Afrikaans, Arabe, Arménien, Azerbaïdjanais, Biélorusse, Bosnien, Bulgare, Catalan, Chinois, Croate, Tchèque, Danois, Néerlandais, Anglais, Estonien, Finnois, Français, Galicien, Allemand, Grec, Hébreu, Hindi, Hongrois, Islandais, Indonésien, Italien, Japonais, Kannada, Kazakh, Coréen, Letton, Lituanien, Macédonien, Malais, Marathi, Maori, Népali, Norvégien, Persan, Polonais, Portugais, Roumain, Russe, Serbe, Slovaque, Slovène, Espagnol, Swahili, Suédois, Tagalog, Tamoul, Thaï, Turc, Ukrainien, Ourdou, Vietnamien et Gallois.

## Que se passe-t-il si je ferme une PR de Frenglish ?
Le contenu de cette PR ne sera PAS traduit dans les futures PR de Frenglish. Ne fermez une PR de Frenglish que si vous ne souhaitez pas que ce contenu soit traduit par Frenglish. Vous pouvez toujours modifier le texte dans la PR de Frenglish et la fusionner

## Les extraits de code sont-ils traduits ?
Non, les extraits de code ne sont pas traduits et ne comptent PAS dans votre utilisation des mots traduits

## Comment fonctionne le dépassement ?
Vous êtes facturé tous les 100 $ de dépassement que vous accumulez pendant une période, ou quel que soit le dépassement de l'utilisateur au début de la nouvelle période (REMARQUE : actuellement, nous ne gérons pas l'annulation pour cela, je viens de m'en rendre compte... je vais ouvrir un ticket)

## Que se passe-t-il si je mets à niveau mon plan APRÈS être entré en dépassement ?
Quel que soit le montant du dépassement que vous avez dépensé sur votre plan précédent, il sera crédité pour ce mois. Cela signifie que si vous dépensez 50 $ en dépassement dans PRO, les premiers 50 $ en dépassement sur votre plan mis à niveau ne seront pas facturés