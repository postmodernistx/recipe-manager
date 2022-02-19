/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  "extends": [
    "plugin:vue/vue3-essential",
    'plugin:vue/strongly-recommended',
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    'curly': ['error', 'all'],
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'no-console': import.meta.env.PROD ? 'warn' : 'off',
    'no-debugger': import.meta.env.PROD ? 'warn' : 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-unused-vars': import.meta.env.PROD ? 'error' : 'warn',
    'no-unreachable': import.meta.env.PROD ? 'error' : 'warn',
    'no-undef': import.meta.env.PROD ? 'error' : 'warn',
  },
};
