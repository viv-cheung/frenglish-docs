---
id: website-quickstart
sidebar_position: 2
description: So richten Sie die automatische Übersetzung Ihrer Website ein
slug: /website-quickstart
---

# Schnellstart
Frenglish.ai bietet Echtzeit-Website-Übersetzung über ein Reverse-Proxy-System. Wenn Besucher Ihre Website aufrufen, fängt unser Cloudflare Worker die Anfrage ab, ruft Ihren Originalinhalt ab, übersetzt ihn und liefert die übersetzte Version in der bevorzugten Sprache des Nutzers aus.

## Einrichtung der Website-Übersetzung
![Website-Konfiguration](../../../../../../assets/website-configuration.png)
1.  **Projekt vorbereiten**
    - Melden Sie sich in Ihrem Frenglish.ai-Dashboard an
    - Konfigurieren Sie Ihre gewünschten Zielsprachen
    - Aktivieren Sie Ihr Projekt
    - Navigieren Sie zum Tab "Website"

2.  **Domain registrieren**
    - Fügen Sie Ihre Website-Domain im Tab "Website" hinzu
    - Kopieren Sie die bereitgestellte DNS-Konfiguration

3.  **DNS-Einstellungen konfigurieren**
    - Gehen Sie zur DNS-Verwaltungsseite Ihres Domain-Anbieters
    - Folgen Sie den Anweisungen auf Ihrer Projekt-Website-Konfigurationsseite bei Frenglish

## Testen ohne Domain
Wenn Sie die Übersetzungsfunktion testen möchten, ohne DNS zu konfigurieren, können Sie unser JavaScript-Snippet in den HTML-Body-Bereich Ihrer Website einfügen:

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

## So funktioniert es

1. Wenn ein Nutzer Ihre Website besucht, erkennt unser System seine bevorzugte Sprache
2. Die Anfrage wird über unseren Cloudflare Worker geleitet
3. Der Worker ruft Ihren Originalinhalt ab
4. Der Inhalt wird automatisch in die bevorzugte Sprache des Nutzers übersetzt
5. Die übersetzte Version wird dem Nutzer ausgeliefert

Ihre übersetzten Seiten sind unter sprachspezifischen URLs verfügbar:
- Original: `example.com/`
- Französisch: `example.com/fr/`
- Spanisch: `example.com/es/`
- (Weitere Sprachen wie in Ihrem Projekt konfiguriert)

## Vorteile dieses Ansatzes

- Die Einrichtung dauert nur wenige Minuten, es sind keine Änderungen am Code erforderlich
- Echtzeit-Übersetzung, ohne separate Sprachversionen verwalten zu müssen.
- Automatische Spracherkennung und Weiterleitung
- Keine Änderungen an der bestehenden Website-Struktur notwendig
- SEO-freundliche URLs für jede Sprache
- Diese serverseitige Übersetzung ist ein Muss für gute lokalisierte SEOs

## SEO-Vorteile
Unser Übersetzungssystem ist darauf ausgelegt, die Sichtbarkeit Ihrer Website in Suchmaschinen über verschiedene Sprachen und Regionen hinweg zu maximieren:
1.  **Lokalisierte URLs**
    - Jede Sprachversion hat ihre eigene URL-Struktur (z. B. `example.com/fr/`, `example.com/es/`)
    - Suchmaschinen erkennen diese als eigenständige, lokalisierte Versionen Ihres Inhalts

2.  **Korrekte HTML-Sprach-Tags**
    - Wir aktualisieren das `<html lang="...">`-Attribut für jede Sprache automatisch
    - Sprachspezifische Meta-Tags werden hinzugefügt, damit Suchmaschinen die Sprache des Inhalts erkennen können

3.  **Hreflang-Implementierung**
    - Automatisches Hinzufügen von `<link rel="alternate" hreflang="...">`-Tags
    - Hilft Suchmaschinen, die Beziehung zwischen Ihren übersetzten Seiten zu verstehen
    - Stellt sicher, dass die richtige Sprachversion in den Suchergebnissen angezeigt wird – je nach Standort und Spracheinstellung des Nutzers

4.  **Inhaltslokalisierung**
    - Alle Inhalte werden korrekt übersetzt, einschließlich Meta-Titel, Beschreibungen und Keywords
    - Hilft, das Ranking in lokalen Suchergebnissen für jede Zielsprache zu verbessern
    - Erhält den SEO-Wert über alle Sprachversionen hinweg

5.  **Serverseitige Übersetzung**
    - Der Inhalt wird übersetzt, bevor er an den Client ausgeliefert wird
    - SEO-Crawler erhalten den übersetzten Inhalt sofort und können ihn indexieren

Diese Optimierungen helfen Suchmaschinen, Ihre mehrsprachigen Inhalte korrekt zu indexieren, was Ihre Platzierungen in lokalen Suchergebnissen verbessern und ein größeres internationales Publikum erreichen kann.