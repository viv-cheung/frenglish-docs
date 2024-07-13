---
id: FAQ
sidebar_position: 4
description: Frequently Asked Questions
slug: /FAQ
---

# FAQ

## How do you translate all your files?
Follow the steps [here](./HowToTranslate/3-OneTimeTranslation.md#manage-translation-settings-on-the-frenglishai-website)!

## How do I know the quality is good?
The Frenglish bot goes through the following validation steps:
- Multiple reflection and review loops to ensure the translation follows your specified rules and sounds natural
- Has an implicit learning feature to teach itself rules based on manually changed translation files
- Translations are sent to human translators for quality validation every quarter
- METEOR score (standardized translation quality test) are performed regularly; this test will translate content to the target language and back to its origin language. A score will be given by comparing the original values against the back-translation values
- Our docs and website have been entirely translated by the Frenglish bot! Therefore, the quality of the translation is transparent and a benchmark for what you should expect

## How long should I expect for my translation files to be completed?
This is dependent on how many characters you are translating. Typically, you could expect 1 minute per file to be translated. This is because the Frenglish bot goes through multiple validation steps to ensure the quality of the translation is high before outputting a result.

## Not everything in my file requires translation, how do you pick and choose what to translate?
The Frenglish bot will translate only relevant content depending on the file type. For example:

**Markdown Files**
- Code will not be translated

**PO Files**
- Comments, msgid, and other po meta data will not be translated or count as translated content

**JSON Files**
- Keys will not be translated and only the values will be translated

## Do you just support French translations?
No, the name "Frenglish" was chosen to represent its Quebec company origins. Many Quebecers use the term "Frenglish" to refer to how they converse (by mixing in both French and English in natural dialogue). 

We support the following languages:

Afrikaans, Arabic, Armenian, Azerbaijani, Belarusian, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Galician, German, Greek, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Marathi, Maori, Nepali, Norwegian, Persian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swahili, Swedish, Tagalog, Tamil, Thai, Turkish, Ukrainian, Urdu, Vietnamese, and Welsh.

## What happens if I closed a PR from Frenglish?
The content contained in that PR will NOT be translated in future Frenglish PRs. Only close Frenglish PR if you don't want this content to be translated by frenglish. You can always edit the text in the Frenglish PR and merge it

## Are code snippets translated?
No, code snippets are not translated and DO NOT count towards your translated words usage

## How does overage work?
You get charged every $100 in overage you accumulate during a period, or whatever overage user had when new period start

## What happens if I upgrade my plan AFTER I entered overage?
Whatever amount of overage you spent on your previous plan will be credited for this month. This means that if you spend $50 in overage in PRO, the first $50 in overage on your upgraded plan will not get charged

