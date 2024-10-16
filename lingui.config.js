module.exports = {
    locales: ['en', 'fr', 'ru'],
    sourceLocale: 'en',
    catalogs: [
      {
        path: 'locales/{locale}/messages',
        include: ['src'],
      },
    ],
    format: 'po',
  }
  