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
      type: 'doc',
      label: 'Introduction',
      id: 'intro',
    },
    {
      type: 'doc',
      id: 'Quickstart',
      label: 'Quickstart',
    },
    {
      type: 'category',
      label: 'How to Translate',
      items: ['HowToTranslate/configuration', 'HowToTranslate/translationFilesManagementt', 'HowToTranslate/oneTimeTranslation'],
    },
    {
      type: 'category',
      label: 'Tutorial',
      items: ['Tutorial - Extras/Translate docusaurus'],
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ',
    },
  ],
};

export default sidebars;
