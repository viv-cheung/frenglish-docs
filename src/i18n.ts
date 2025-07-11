import { i18n } from '@lingui/core';

/**
 * Synchronous init — used by the server renderer.
 * We *don’t* need make-plural; the compiled catalog already contains the
 * plural-function Lingui needs.
 */
export function initI18nSync(locale = 'en') {
  let messages;
  try {
    messages = require(`./locales/${locale}/messages.js`).messages;
  } catch {
    messages = require('./locales/en/messages.js').messages;
    locale = 'en';
  }

  i18n.load(locale, messages);   // pluralFn comes from the catalog itself
  i18n.activate(locale);
  return i18n;
}

/**
 * Async init for the browser (splits each locale into its own chunk).
 */
export async function initI18nAsync(locale = 'en') {
  const { messages } = await import(
    /* webpackChunkName: "i18n-[index]" */ `./locales/${locale}/messages.js`
  );

  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
}
