import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ru/blog',
    component: ComponentCreator('/ru/blog', 'f3d'),
    exact: true
  },
  {
    path: '/ru/blog/about-us',
    component: ComponentCreator('/ru/blog/about-us', '94e'),
    exact: true
  },
  {
    path: '/ru/blog/archive',
    component: ComponentCreator('/ru/blog/archive', '5c8'),
    exact: true
  },
  {
    path: '/ru/blog/tags',
    component: ComponentCreator('/ru/blog/tags', '139'),
    exact: true
  },
  {
    path: '/ru/blog/tags/frenglish',
    component: ComponentCreator('/ru/blog/tags/frenglish', '17b'),
    exact: true
  },
  {
    path: '/ru/blog/tags/introduction',
    component: ComponentCreator('/ru/blog/tags/introduction', '525'),
    exact: true
  },
  {
    path: '/ru/markdown-page',
    component: ComponentCreator('/ru/markdown-page', 'f10'),
    exact: true
  },
  {
    path: '/ru/docs',
    component: ComponentCreator('/ru/docs', '6a7'),
    routes: [
      {
        path: '/ru/docs',
        component: ComponentCreator('/ru/docs', '60b'),
        routes: [
          {
            path: '/ru/docs',
            component: ComponentCreator('/ru/docs', 'ac9'),
            routes: [
              {
                path: '/ru/docs/configuration',
                component: ComponentCreator('/ru/docs/configuration', '201'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ru/docs/FAQ',
                component: ComponentCreator('/ru/docs/FAQ', 'aac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ru/docs/intro',
                component: ComponentCreator('/ru/docs/intro', 'dd9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ru/docs/one-time-translation',
                component: ComponentCreator('/ru/docs/one-time-translation', '8d5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ru/docs/quickstart',
                component: ComponentCreator('/ru/docs/quickstart', 'b07'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ru/docs/translation-files-management',
                component: ComponentCreator('/ru/docs/translation-files-management', '759'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ru/docs/Tutorial - Extras/Translate docusaurus',
                component: ComponentCreator('/ru/docs/Tutorial - Extras/Translate docusaurus', '881'),
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
    path: '/ru/',
    component: ComponentCreator('/ru/', '89c'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
