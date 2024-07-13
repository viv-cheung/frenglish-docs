import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Quickstart',
      items: ['Quickstart'],
    },
    {
      type: 'category',
      label: 'How to Translate',
      items: ['HowToTranslate/configuration', 'HowToTranslate/translationManagement', 'HowToTranslate/oneTimeTranslation'],
    },
    {
      type: 'category',
      label: 'Tutorial',
      items: ['Tutorial - Extras/Translate docusaurus'],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: ['FAQ'],
    },
  ],
};

export default sidebars;
