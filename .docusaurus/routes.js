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
    component: ComponentCreator('/ru/docs', '2c9'),
    routes: [
      {
        path: '/ru/docs',
        component: ComponentCreator('/ru/docs', 'cb7'),
        routes: [
          {
            path: '/ru/docs',
            component: ComponentCreator('/ru/docs', '1ae'),
            routes: [
              {
                path: '/ru/docs/CLI',
                component: ComponentCreator('/ru/docs/CLI', '142'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
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
                path: '/ru/docs/githubApp',
                component: ComponentCreator('/ru/docs/githubApp', 'ac6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ru/docs/HowToTranslate/sdk/github-action',
                component: ComponentCreator('/ru/docs/HowToTranslate/sdk/github-action', 'b33'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ru/docs/HowToTranslate/sdk/quickstart',
                component: ComponentCreator('/ru/docs/HowToTranslate/sdk/quickstart', 'd97'),
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
                component: ComponentCreator('/ru/docs/one-time-translation', 'cd2'),
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
                path: '/ru/docs/SDK',
                component: ComponentCreator('/ru/docs/SDK', '657'),
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
