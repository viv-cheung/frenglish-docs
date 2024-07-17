// sidebars.ts in the root directory

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// Function to load the sidebar for the given locale
const loadSidebar = (locale: string): SidebarsConfig => {
  switch (locale) {
    case 'fr':
      return require('./i18n/fr/docusaurus-plugin-content-docs/current/sidebars.ts').default;
    case 'en':
    default:
      return require('./i18n/en/docusaurus-plugin-content-docs/current/sidebars.ts').default;
  }
};

const sidebars: SidebarsConfig = loadSidebar(process.env.DOCUSAURUS_CURRENT_LOCALE || 'en');

export default sidebars;
