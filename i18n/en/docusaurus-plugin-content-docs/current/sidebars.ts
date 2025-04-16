import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
      items: [
        'HowToTranslate/configuration',
        'HowToTranslate/translationFilesManagement',
        {
          type: 'category',
          label: 'SDK',
          items: [
            'HowToTranslate/sdk/sdk-quickstart',
            'HowToTranslate/sdk/method-descriptions',
            'HowToTranslate/sdk/github-action',
          ],
        },
        {
          type: 'category',
          label: 'CLI',
          items: ['HowToTranslate/cli/cli-quickstart'],
        },
        {
          type: 'category',
          label: 'Translate your Website',
          items: [
            'HowToTranslate/website-support/website-configuration',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tutorial',
      items: ['Tutorial - Extras/Translate docusaurus'],
    },
    {
      type: 'doc',
      id: 'FAQ',
      label: 'FAQ',
    },
  ],
};

export default sidebars;