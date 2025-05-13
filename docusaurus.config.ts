import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';

const config: Config = {
  title: 'Frenglish',
  tagline: 'Set up once, Continuous Translations Forever',
  favicon: '/assets/favicon.ico',

  url: 'https://frenglish.ai',
  baseUrl: '/',

  organizationName: 'viv-cheung',
  projectName: 'frenglish-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'de', 'ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./i18n/en/docusaurus-plugin-content-docs/current/sidebars.ts'),
          path: 'i18n/en/docusaurus-plugin-content-docs/current',
          editLocalizedFiles: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: '/assets/logo_no_bg.png',
    navbar: {
      title: 'Frenglish',
      logo: {
        alt: 'Frenglish',
        src: '/assets/logo_no_bg.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/viv-cheung/frenglish-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Frenglish. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    path.resolve(__dirname, 'custom-webpack-plugin'),
  ],

  clientModules: [
    require.resolve('./src/clientModules/i18nLoader.js'),
  ],
};

export default config;
