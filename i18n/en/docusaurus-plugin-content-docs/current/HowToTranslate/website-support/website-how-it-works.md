---
id: website-how-it-works
sidebar_position: 2
description: How our instant website translation service works
slug: /website-how-it-works
---

# How it works

Our instant website translation system is designed to be as seamless as possible. This guide explains the technical implementation details behind the scenes so you know exactly what happens when someone visits your website through our translation proxy.

## DNS Setup

To use our service, you only need to point your DNS to our Cloudflare worker. This means updating your DNS A or CNAME records to route your traffic through our proxy layer.

For example, if your website was originally hosted on Vercel or Netlify, you'd simply replace the DNS record that pointed to their edge servers with a record that points to ours. No need to change your codebase or deploy anything else.

If you ever wish to stop using our service, just reverse the DNS change and point your records back to your original provider—it's that simple.

## How the Reverse Proxy Works

When a user visits your website, all requests go through the Frenglish Cloudflare Worker acting as a reverse proxy.

This is how the request flow works:

<div style={{ textAlign: 'center' }}>
  <div style={{ display: 'inline-block', textAlign: 'left' }}>
    <img src="/assets/cloudflare_worker_diag.png" alt="Cloudflare Worker Architecture" width="800" />
    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1px' }}>
      Cloudflare Worker Architecture
    </div>
  </div>
</div>

1. **Language Check**  
   The proxy inspects the URL to see if a language code is present (e.g., `/fr/about`).

2. **Original Language Detection**  
   If the request is already in your origin language (usually English), we pass the request to your original server and return the content as-is.

3. **Translation Flow**  
   If the requested language differs from the original, we check if a translation already exists in our edge cache.

   - If **cached**, the translated version is returned instantly.
   - If **not cached**, we fetch the original content, enqueue it for translation, and serve the untranslated version (usually English) in the meantime. Once the translation is complete, future users will receive the translated and cached version.

4. **Caching**  
   We use Cloudflare's global edge caching to ensure that translations are served quickly, no matter where your users are in the world. Our caching is “serve while revalidating,” so even if a translation is updated, old content is shown immediately while new content is prepared in the background.

## What Happens if Our API Is Down?

If, for any reason, our translation API is temporarily unavailable, your users will still see your original content in its default language. We designed our proxy system to gracefully fall back so your site always works, even if translation services are interrupted.

## Frenglish Bundle

We also inject a small JavaScript bundle into your site, called the **Frenglish bundle**. This script enables several features:

- **Client-side Translation**: It detects any new content that appears after the initial page load (e.g., injected by JavaScript or loaded via AJAX) and translates it automatically using cached translations.
- **Language Switcher UI**: The bundle automatically injects a default language toggle widget into your site.  
  You can customize this switcher’s appearance and placement using our **language toggle builder**.

<div style={{ textAlign: 'center' }}>
  <div style={{ display: 'inline-block', textAlign: 'left' }}>
    <img src="/assets/language-selector-config.png" alt="language toggle builder" width="500" />
    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1px' }}>
      Language Selector Configuration
    </div>
  </div>
</div>

## Hosting the Worker Yourself

If you'd prefer to self-host the Cloudflare Worker on your own Cloudflare account for full control, we can provide guidance and support. [Contact us here](https://www.frenglish.ai/en/contact) to learn more.

## Does it work with JavaScript-heavy frameworks like React, Vue, or Next.js?

Yes. The Frenglish bundle listens to changes in the DOM and translates content as it's rendered client-side. This includes content loaded via client-side navigation in SPA frameworks. We also support server-side translation for pre-rendered pages.

## Will this slow down my site?
No. Frenglish is optimized for speed. Because everything is served at the edge via Cloudflare and cached aggressively, users will experience minimal latency. The JavaScript bundle is tiny and non-blocking.

## How long are translations cached for?
Translated content are cached for one hour, but you can bust the cache by appending `?frenglish_cache_bust` to any of your URL and it will bust the translation cache for your entire site, forcing new content to be fetched. E.g. `https://example.com?frenglish_cache_bust`. 