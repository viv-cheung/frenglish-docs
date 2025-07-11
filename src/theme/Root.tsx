import React, { useEffect, useState } from 'react';
import { I18nProvider } from '@lingui/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { initI18nSync, initI18nAsync } from '@site/src/i18n';
import { i18n } from '@lingui/core';

const isBrowser = typeof window !== 'undefined';

export default function Root({ children }: { children: React.ReactNode }) {
  const {
    i18n: { currentLocale = 'en' },
  } = useDocusaurusContext();

  // --- 1. Do a *sync* init in every environment ----------------------------
  initI18nSync(currentLocale);

  // --- 2. In the browser we may still want the lazy chunk ------------------
  const [ready, setReady] = useState(true);          // already initialised!

  useEffect(() => {
    // swap to the async chunk only if locale changes (rare)
    initI18nAsync(currentLocale).then(() => setReady(true));
  }, [currentLocale]);

  // Never return null: SSR markup & client tree stay in-sync
  if (!ready) return <div />;                        // tiny placeholder ok

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
