---
id: FAQ
sidebar_position: 4
description: Häufig gestellte Fragen
slug: /FAQ
---

# FAQ

## Wie weiß ich, dass die Qualität gut ist?
Der Frenglish-Bot durchläuft folgende Validierungsschritte:
- Mehrere Reflexions- und Überprüfungsschleifen, um sicherzustellen, dass die Übersetzung Ihren Vorgaben entspricht und natürlich klingt
- Verfügt über eine implizite Lernfunktion, um sich selbst Regeln auf Basis manuell geänderter Übersetzungsdateien beizubringen.
- Übersetzungen werden jedes Quartal von menschlichen Übersetzern auf Qualität geprüft
- Es werden regelmäßig METEOR-Scores (standardisierte Übersetzungsqualitätstests) durchgeführt; dabei wird der Inhalt in die Zielsprache und zurück übersetzt. Ein Score wird vergeben, indem die Originalwerte mit den Rückübersetzungen verglichen werden
- Unsere Dokumentation und Website wurden vollständig vom Frenglish-Bot übersetzt! Die Übersetzungsqualität ist also transparent und dient als Maßstab für das, was Sie erwarten können.

## Wie lange dauert es, bis meine Übersetzungsdateien fertig sind?
Das hängt davon ab, wie viele Zeichen übersetzt werden müssen. In der Regel können Sie mit etwa 1 Minute pro Datei rechnen. Das liegt daran, dass der Frenglish-Bot mehrere Validierungsschritte durchläuft, um eine hohe Übersetzungsqualität sicherzustellen, bevor das Ergebnis ausgegeben wird.

## Nicht alles in meiner Datei muss übersetzt werden. Wie wird entschieden, was übersetzt wird?
Der Frenglish-Bot übersetzt je nach Dateityp nur relevante Inhalte. Zum Beispiel:

**Markdown-Dateien**
- Code wird nicht übersetzt

**PO-Dateien**
- Kommentare, msgid und andere PO-Metadaten werden nicht übersetzt und zählen nicht als übersetzter Inhalt

**JSON-Dateien**
- Schlüssel werden nicht übersetzt, nur die Werte werden übersetzt

## Unterstützen Sie nur französische Übersetzungen?
Nein, der Name "Frenglish" wurde gewählt, um die Herkunft des Unternehmens aus Quebec zu repräsentieren. Viele Quebecer verwenden den Begriff "Frenglish", um ihre Art zu sprechen zu beschreiben (indem sie Französisch und Englisch in einem natürlichen Dialog mischen).

Wir unterstützen folgende Sprachen:

Afrikaans, Arabisch, Armenisch, Aserbaidschanisch, Weißrussisch, Bosnisch, Bulgarisch, Katalanisch, Chinesisch, Kroatisch, Tschechisch, Dänisch, Niederländisch, Englisch, Estnisch, Finnisch, Französisch, Galizisch, Deutsch, Griechisch, Hebräisch, Hindi, Ungarisch, Isländisch, Indonesisch, Italienisch, Japanisch, Kannada, Kasachisch, Koreanisch, Lettisch, Litauisch, Mazedonisch, Malaiisch, Marathi, Maori, Nepali, Norwegisch, Persisch, Polnisch, Portugiesisch, Rumänisch, Russisch, Serbisch, Slowakisch, Slowenisch, Spanisch, Suaheli, Schwedisch, Tagalog, Tamil, Thailändisch, Türkisch, Ukrainisch, Urdu, Vietnamesisch und Walisisch.

## Was passiert, wenn ich einen PR von Frenglish schließe?
Die Inhalte dieses PR werden in zukünftigen Frenglish-PRs NICHT übersetzt. Schließen Sie einen Frenglish-PR nur, wenn Sie nicht möchten, dass dieser Inhalt von Frenglish übersetzt wird. Sie können den Text im Frenglish-PR jederzeit bearbeiten und mergen.

## Werden Code-Snippets übersetzt?
Nein, Code-Snippets werden nicht übersetzt und zählen NICHT zu Ihrem Übersetzungswort-Kontingent.

## Wie funktioniert das mit dem Überschreiten des Kontingents?
Sie werden jedes Mal mit 100 $ für das angesammelte Überschreiten des Kontingents in einem Zeitraum belastet, oder für das, was beim Start eines neuen Zeitraums überschritten wurde.

## Was passiert, wenn ich meinen Plan UPGRADE, NACHDEM ich das Kontingent überschritten habe?
Der Betrag, den Sie im vorherigen Plan für das Überschreiten ausgegeben haben, wird für diesen Monat gutgeschrieben. Das heißt, wenn Sie im PRO-Plan 50 $ Überschreitung hatten, werden die ersten 50 $ Überschreitung im neuen Plan nicht berechnet.