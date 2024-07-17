module.exports = {
  presets: [
    require.resolve('@docusaurus/core/lib/babel/preset'),
    '@babel/preset-react',
    '@babel/preset-typescript', // Add TypeScript preset
  ],
  plugins: [
    'macros',
    '@babel/plugin-syntax-jsx',
  ],
};
