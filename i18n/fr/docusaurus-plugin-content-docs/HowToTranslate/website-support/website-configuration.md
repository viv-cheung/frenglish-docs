---
id: website-configuration
sidebar_position: 2
description: How to automatically translate your website
slug: /website-configuration
---

# Website Translation Configuration

Frenglish.ai provides real-time website translation through a reverse proxy system. When visitors access your website, our Cloudflare worker intercepts the request, retrieves your original content, translates it, and serves the translated version in their preferred language.

## Setting Up Website Translation

![Website Configuration](../../../../../../assets/website-configuration.png)

1. **Prepare Your Project**
   - Log in to your Frenglish.ai dashboard
   - Configure your desired target languages
   - Activate your project
   - Navigate to the Website tab

2. **Register Your Domain**
   - Add your website domain in the Website tab
   - Copy the provided DNS configuration

3. **Configure DNS Settings**
   - Go to your domain provider's DNS management page
   - Add two CNAME records:

     First record (for your original website):
     - **Name**: `origin` (or `@` if using root domain)
     - **Type**: `CNAME`
     - **Value**: Your website's domain name

     Second record (for the translation proxy):
     - **Name**: `@` (or your subdomain)
     - **Type**: `CNAME`
     - **Value**: `cloudflare.frenglish.ai`

## Testing Without a Domain

If you want to test the translation feature without configuring DNS, you can add our JavaScript snippet to your website:

```html
<script type="text/javascript" src="https://api.frenglish.ai/index.min.js"></script>
<script>
    Frenglish.initialize({
        api_key: 'your-public-api-key' 
    });
</script>
```

## How It Works

1. When a user visits your website, our system detects their preferred language
2. The request is routed through our Cloudflare worker
3. The worker fetches your original content
4. Content is automatically translated to the user's preferred language
5. The translated version is served to the user

Your translated pages will be available at language-specific URLs:
- Original: `example.com/`
- French: `example.com/fr/`
- Spanish: `example.com/es/`
- (Additional languages as configured in your project)

## Overall Benefits
- Real-time translation without maintaining separate language versions (no software development required)
- Automatic language detection and routing
- No need to modify your existing website structure
- SEO-friendly URLs for each language

## SEO Benefits

Our translation system is designed to maximize your website's search engine visibility across different languages and regions:

1. **Localized URLs**
   - Each language version has its own URL structure (e.g., `example.com/fr/`, `example.com/es/`)
   - Search engines recognize these as distinct, localized versions of your content

2. **Proper HTML Language Tags**
   - We automatically update the `<html lang="...">` attribute for each language
   - Language-specific meta tags are added to help search engines understand the content's language

3. **Hreflang Implementation**
   - Automatic addition of `<link rel="alternate" hreflang="...">` tags
   - Helps search engines understand the relationship between your translated pages
   - Ensures the correct language version is shown in search results based on the user's location and language preferences

4. **Content Localization**
   - All content is properly translated, including meta titles, descriptions, and keywords
   - Helps improve rankings in local search results for each target language
   - Maintains SEO value across all language versions

These optimizations help search engines properly index your multilingual content, potentially improving your rankings in local search results and reaching a broader international audience.
