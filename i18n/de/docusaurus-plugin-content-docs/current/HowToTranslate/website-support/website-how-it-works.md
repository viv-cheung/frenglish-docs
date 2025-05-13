---
id: website-how-it-works
sidebar_position: 2
description: So funktioniert unser Sofort-Website-Übersetzungsdienst
slug: /website-how-it-works
---

# So funktioniert es
Unser System für die sofortige Website-Übersetzung ist so konzipiert, dass es möglichst nahtlos funktioniert. In diesem Leitfaden erklären wir die technischen Details im Hintergrund, damit Sie genau wissen, was passiert, wenn jemand Ihre Website über unseren Übersetzungs-Proxy besucht.

## DNS-Einrichtung
Um unseren Dienst zu nutzen, müssen Sie lediglich Ihren DNS auf unseren Cloudflare Worker zeigen lassen. Das bedeutet, dass Sie Ihre DNS-A- oder CNAME-Einträge aktualisieren, um Ihren Traffic über unsere Proxy-Schicht zu leiten.

Wenn Ihre Website zum Beispiel ursprünglich bei Vercel oder Netlify gehostet wurde, ersetzen Sie einfach den DNS-Eintrag, der auf deren Edge-Server zeigte, durch einen Eintrag, der auf unseren zeigt. Sie müssen Ihren Code nicht ändern oder etwas neu bereitstellen.

Wenn Sie unseren Dienst nicht mehr nutzen möchten, machen Sie die DNS-Änderung einfach rückgängig und zeigen Ihre Einträge wieder auf Ihren ursprünglichen Anbieter – so einfach ist das.

## So funktioniert der Reverse Proxy
Wenn ein Nutzer Ihre Website besucht, laufen alle Anfragen über den Frenglish Cloudflare Worker, der als Reverse Proxy agiert.

So läuft der Anfrageprozess ab:

<div style={{ textAlign: 'center' }}>
  <div style={{ display: 'inline-block', textAlign: 'left' }}>
    <img src="/assets/cloudflare_worker_diag.png" alt="Cloudflare Worker Architektur" width="800" />

    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1px' }}>
      Cloudflare Worker Architektur
    </div>
  </div>
</div>

1.  **Sprachprüfung**\
    Der Proxy prüft die URL, ob ein Sprachcode enthalten ist (z. B. `/fr/about`).

2.  **Erkennung der Ursprungssprache**\
    Wenn die Anfrage bereits in Ihrer Ursprungssprache (meist Englisch) ist, leiten wir sie an Ihren Originalserver weiter und liefern den Inhalt unverändert aus.

3.  **Übersetzungsprozess**\
    Wenn die angeforderte Sprache von der Ursprungssprache abweicht, prüfen wir, ob bereits eine Übersetzung in unserem Edge-Cache vorhanden ist.
    - Wenn **im Cache**, wird die übersetzte Version sofort ausgeliefert.
    - Wenn **nicht im Cache**, holen wir den Originalinhalt, stellen ihn zur Übersetzung in die Warteschlange und liefern in der Zwischenzeit die unübersetzte Version (meist Englisch) aus. Sobald die Übersetzung fertig ist, erhalten zukünftige Nutzer die übersetzte und gecachte Version.
    - Wenn **nicht im Cache**, aber bereits übersetzt, holen wir sie aus Amazon S3, wo alle Übersetzungen doppelt verschlüsselt gespeichert werden.

4.  **Caching**\
    Wir nutzen das globale Edge-Caching von Cloudflare, damit Übersetzungen überall auf der Welt schnell ausgeliefert werden. Unser Caching ist „serve while revalidating“, das heißt, auch wenn eine Übersetzung aktualisiert wird, wird der alte Inhalt sofort angezeigt, während im Hintergrund die neue Version vorbereitet wird.

## Was passiert, wenn unsere API ausfällt?
Sollte unsere Übersetzungs-API vorübergehend nicht verfügbar sein, sehen Ihre Nutzer weiterhin Ihren Originalinhalt in der Standardsprache. Wir haben unser Proxy-System so konzipiert, dass es bei einem Ausfall der Übersetzungsdienste automatisch und reibungslos auf die Originalsprache zurückfällt, sodass Ihre Website stets funktioniert, selbst wenn der Übersetzungsdienst unterbrochen ist.

## Frenglish Bundle
Wir fügen Ihrer Seite außerdem ein kleines JavaScript-Bundle hinzu, das **Frenglish Bundle** genannt wird. Dieses Skript ermöglicht mehrere Funktionen:
- **Clientseitige Übersetzung**: Es erkennt neuen Inhalt, der nach dem initialen Laden der Seite erscheint (z. B. durch JavaScript eingefügt oder per AJAX geladen), und übersetzt ihn automatisch mithilfe gecachter Übersetzungen.
- **Sprachumschalter-UI**: Das Bundle fügt Ihrer Seite automatisch ein Standard-Widget zum Umschalten der Sprache hinzu.\
  Sie können das Aussehen und die Platzierung dieses Umschalters mit unserem **language toggle builder** anpassen.

<div style={{ textAlign: 'center' }}>
  <div style={{ display: 'inline-block', textAlign: 'left' }}>
    <img src="/assets/language-selector-config.png" alt="language toggle builder" width="500" />

    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1px' }}>
      Konfiguration des Sprachwählers
    </div>
  </div>
</div>

## Den Worker selbst hosten
Wenn Sie den Cloudflare Worker lieber selbst auf Ihrem eigenen Cloudflare-Konto hosten möchten, um die volle Kontrolle zu haben, unterstützen und beraten wir Sie gerne. [Kontaktieren Sie uns hier](https://www.frenglish.ai/en/contact), um mehr zu erfahren.

## Funktioniert es mit JavaScript-lastigen Frameworks wie React, Vue oder Next.js?
Ja. Das Frenglish-Bundle überwacht DOM-Änderungen und übersetzt Inhalte, sobald sie clientseitig gerendert werden. Dazu gehört auch Inhalt, der durch clientseitige Navigation in SPA-Frameworks geladen wird. Wir unterstützen außerdem serverseitige Übersetzungen für vorgerenderte Seiten.

## Wird meine Seite dadurch langsamer?
Nein. Frenglish ist auf Geschwindigkeit optimiert. Da alles über Cloudflare am Edge bereitgestellt und aggressiv zwischengespeichert wird, erleben Nutzer kaum Verzögerungen. Das JavaScript-Bundle ist winzig und blockiert nichts.

## Wie lange werden Übersetzungen zwischengespeichert?
Übersetzte Inhalte werden standardmäßig eine Stunde lang zwischengespeichert. Sie können den Cache leeren, indem Sie `?frenglish_cache_bust` an eine beliebige URL anhängen. Dadurch wird der Übersetzungscache für Ihre gesamte Seite gelöscht und neue Inhalte werden abgerufen.\
Zum Beispiel: `https://example.com?frenglish_cache_bust`.