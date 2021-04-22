module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react-native/all',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  env: {
    'react-native/react-native': true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['react', 'react-native'],
  rules: {
    'react-native/sort-styles': 0,
    'arrow-body-style': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 0,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 0,
    'react-hooks/exhaustive-deps': 0,
    'react-native/no-single-element-style-arrays': 2,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.config.js'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        moduleDirectory: ['./', 'src', 'node_modules'],
        paths: ['src'],
      },
    },
  },
};
