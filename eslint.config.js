import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfigWithVueTs(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  ...compat.extends('airbnb-base'),
  vueTsConfigs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
        },
        typescript: {
          project: './',
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },

    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/prefer-default-export': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      '@typescript-eslint/no-unused-vars': 'off',
      'vue/no-unused-vars': 'error',

      'no-spaced-func': 'off',
      'func-call-spacing': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'vue/require-default-prop': 'off',
    },
  },
);
