import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/fr/blog',
    component: ComponentCreator('/fr/blog', '73e'),
    exact: true
  },
  {
    path: '/fr/blog/archive',
    component: ComponentCreator('/fr/blog/archive', '1a3'),
    exact: true
  },
  {
    path: '/fr/blog/first-blog-post',
    component: ComponentCreator('/fr/blog/first-blog-post', 'd2e'),
    exact: true
  },
  {
    path: '/fr/blog/long-blog-post',
    component: ComponentCreator('/fr/blog/long-blog-post', '736'),
    exact: true
  },
  {
    path: '/fr/blog/mdx-blog-post',
    component: ComponentCreator('/fr/blog/mdx-blog-post', '569'),
    exact: true
  },
  {
    path: '/fr/blog/tags',
    component: ComponentCreator('/fr/blog/tags', '679'),
    exact: true
  },
  {
    path: '/fr/blog/tags/docusaurus',
    component: ComponentCreator('/fr/blog/tags/docusaurus', 'fe2'),
    exact: true
  },
  {
    path: '/fr/blog/tags/facebook',
    component: ComponentCreator('/fr/blog/tags/facebook', 'ed8'),
    exact: true
  },
  {
    path: '/fr/blog/tags/hello',
    component: ComponentCreator('/fr/blog/tags/hello', '91d'),
    exact: true
  },
  {
    path: '/fr/blog/tags/hola',
    component: ComponentCreator('/fr/blog/tags/hola', 'f85'),
    exact: true
  },
  {
    path: '/fr/blog/welcome',
    component: ComponentCreator('/fr/blog/welcome', '9ba'),
    exact: true
  },
  {
    path: '/fr/markdown-page',
    component: ComponentCreator('/fr/markdown-page', 'f67'),
    exact: true
  },
  {
    path: '/fr/docs',
    component: ComponentCreator('/fr/docs', 'bd9'),
    routes: [
      {
        path: '/fr/docs',
        component: ComponentCreator('/fr/docs', '67b'),
        routes: [
          {
            path: '/fr/docs',
            component: ComponentCreator('/fr/docs', '473'),
            routes: [
              {
                path: '/fr/docs/category/tutorial---extras',
                component: ComponentCreator('/fr/docs/category/tutorial---extras', '8a6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/commitment',
                component: ComponentCreator('/fr/docs/commitment', 'a61'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/FAQ',
                component: ComponentCreator('/fr/docs/FAQ', 'e86'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/intro',
                component: ComponentCreator('/fr/docs/intro', 'e1f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/quickstart',
                component: ComponentCreator('/fr/docs/quickstart', '1e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/Tutorial - Extras/manage-docs-versions',
                component: ComponentCreator('/fr/docs/Tutorial - Extras/manage-docs-versions', '39a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fr/docs/Tutorial - Extras/Translate your docs with Docusaurus',
                component: ComponentCreator('/fr/docs/Tutorial - Extras/Translate your docs with Docusaurus', '53c'),
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
