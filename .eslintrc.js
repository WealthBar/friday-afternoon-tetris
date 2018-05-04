module.exports = {
  root: true,
  parser: 'typescript-eslint-parser',
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
      'node': {},
    },
  },
  rules: {
    'import/no-named-as-default': 0,
    'no-continue': 0,
    'no-shadow': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'import/no-duplicates': 0,
    'arrow-parens': ['error', 'as-needed'],
    'import/extensions': ['error', 'always', { js: 'never' }],
    'linebreak-style': ['error', 'unix'],
    'no-else-return': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-use-before-define': ['error', { functions: false }],
    'object-curly-newline': ['error', { consistent: true }],
    'quotes': ['error', 'double'],
    'semi': ['error', 'always'],
    'function-paren-newline': ['error', 'consistent'],
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
};
