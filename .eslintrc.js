module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['vue', 'html', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'curly': ['error', 'all'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'max-len': ['error', { code: 120 }],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-vars': 'warn',
    'no-unreachable': 'warn',
    'no-undef': 'warn',
  },
};
