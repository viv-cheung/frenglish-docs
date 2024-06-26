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
    component: ComponentCreator('/docs', '9b0'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '298'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'f77'),
            routes: [
              {
                path: '/docs/category/tutorial---extras',
                component: ComponentCreator('/docs/category/tutorial---extras', 'b09'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/FAQ',
                component: ComponentCreator('/docs/FAQ', 'dc0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/quickstart',
                component: ComponentCreator('/docs/quickstart', '79e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Tutorial - Extras/Translate your docs with Docusaurus',
                component: ComponentCreator('/docs/Tutorial - Extras/Translate your docs with Docusaurus', '2f4'),
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
