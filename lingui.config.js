module.exports = {
    locales: ['en', 'fr', 'es', 'ja', 'de'],
    sourceLocale: 'en',
    catalogs: [
      {
        path: 'src/locales/{locale}/messages',
        include: ['src'],
      },
    ],
    format: 'po',
  }
  