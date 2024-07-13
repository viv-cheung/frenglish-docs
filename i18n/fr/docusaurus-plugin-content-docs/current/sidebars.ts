import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Créer une barre latérale vous permet de:
 - créer un groupe ordonné de documents
 - rendre une barre latérale pour chaque document de ce groupe
 - fournir une navigation suivante/précédente

 Les barres latérales peuvent être générées à partir du système de fichiers, ou définies explicitement ici.

 Créez autant de barres latérales que vous le souhaitez.
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
      label: 'Démarrage rapide',
      items: ['Quickstart'],
    },
    {
      type: 'category',
      label: 'Comment traduire',
      items: ['HowToTranslate/configuration', 'HowToTranslate/translationManagement', 'HowToTranslate/oneTimeTranslation'],
    },
    {
      type: 'category',
      label: 'Tutoriel',
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
