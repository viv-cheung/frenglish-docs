import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'ccf'),
    exact: true
  },
  {
    path: '/blog/about-us',
    component: ComponentCreator('/blog/about-us', '981'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '245'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '4c4'),
    exact: true
  },
  {
    path: '/blog/tags/frenglish',
    component: ComponentCreator('/blog/tags/frenglish', '562'),
    exact: true
  },
  {
    path: '/blog/tags/introduction',
    component: ComponentCreator('/blog/tags/introduction', 'c65'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'de8'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'ac2'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'dc4'),
            routes: [
              {
                path: '/docs/CLI',
                component: ComponentCreator('/docs/CLI', 'e6a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/configuration',
                component: ComponentCreator('/docs/configuration', 'c38'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FAQ',
                component: ComponentCreator('/docs/FAQ', 'aae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/HowToTranslate/sdk/github-action',
                component: ComponentCreator('/docs/HowToTranslate/sdk/github-action', '6bd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/HowToTranslate/sdk/method-descriptions',
                component: ComponentCreator('/docs/HowToTranslate/sdk/method-descriptions', 'f2f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/HowToTranslate/sdk/sdk-quickstart',
                component: ComponentCreator('/docs/HowToTranslate/sdk/sdk-quickstart', '880'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '041'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/quickstart',
                component: ComponentCreator('/docs/quickstart', '314'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/SDK',
                component: ComponentCreator('/docs/SDK', '0c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/supported-file-types',
                component: ComponentCreator('/docs/supported-file-types', '18e'),
                exact: true
              },
              {
                path: '/docs/translation-files-management',
                component: ComponentCreator('/docs/translation-files-management', '79b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Tutorial - Extras/Translate docusaurus',
                component: ComponentCreator('/docs/Tutorial - Extras/Translate docusaurus', '94f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/website-configuration',
                component: ComponentCreator('/docs/website-configuration', '7ab'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
