module.exports = {
  root: true,
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  plugins: ['prettier'],
  rules: {
    // allow reassigning param
    'no-param-reassign': [2, { props: false }],
    'linebreak-style': ['error', 'unix'],
    'import/extensions': [
      'error',
      {
        js: 'always',
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'ignore', ':': 'ignore' } },
    ],
    'no-bitwise': 'off',
  },
};
