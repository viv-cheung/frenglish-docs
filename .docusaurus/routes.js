import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/fr/blog',
    component: ComponentCreator('/fr/blog', 'e61'),
    exact: true
  },
  {
    path: '/fr/blog/about-us',
    component: ComponentCreator('/fr/blog/about-us', 'b6e'),
    exact: true
  },
  {
    path: '/fr/blog/archive',
    component: ComponentCreator('/fr/blog/archive', '1a3'),
    exact: true
  },
  {
    path: '/fr/blog/tags',
    component: ComponentCreator('/fr/blog/tags', '679'),
    exact: true
  },
  {
    path: '/fr/blog/tags/frenglish',
    component: ComponentCreator('/fr/blog/tags/frenglish', '7dd'),
    exact: true
  },
  {
    path: '/fr/blog/tags/introduction',
    component: ComponentCreator('/fr/blog/tags/introduction', '5c4'),
    exact: true
  },
  {
    path: '/fr/markdown-page',
    component: ComponentCreator('/fr/markdown-page', 'f67'),
    exact: true
  },
  {
    path: '/fr/docs',
    component: ComponentCreator('/fr/docs', 'dd4'),
    routes: [
      {
        path: '/fr/docs',
        component: ComponentCreator('/fr/docs', '2a4'),
        routes: [
          {
            path: '/fr/docs',
            component: ComponentCreator('/fr/docs', '1f4'),
            routes: [
              {
                path: '/fr/docs/configuration',
                component: ComponentCreator('/fr/docs/configuration', 'b3e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/FAQ',
                component: ComponentCreator('/fr/docs/FAQ', '069'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/intro',
                component: ComponentCreator('/fr/docs/intro', '8b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/one-time-translation',
                component: ComponentCreator('/fr/docs/one-time-translation', 'ab0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/quickstart',
                component: ComponentCreator('/fr/docs/quickstart', '368'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/translation-files-management',
                component: ComponentCreator('/fr/docs/translation-files-management', 'dfa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/Tutorial - Extras/Translate docusaurus',
                component: ComponentCreator('/fr/docs/Tutorial - Extras/Translate docusaurus', 'f14'),
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
    path: '/fr/',
    component: ComponentCreator('/fr/', '663'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
