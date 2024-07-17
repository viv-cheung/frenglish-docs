module.exports = {
    locales: ['en', 'fr'],
    sourceLocale: 'en',
    catalogs: [
      {
        path: 'locales/{locale}/messages',
        include: ['src'],
      },
    ],
    format: 'po',
  }
  