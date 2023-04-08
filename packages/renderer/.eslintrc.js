// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    node: false,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'prettier',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: 'off',
    'import/extensions': 'off',
    'no-console': 'warn',
    'no-debugger': 'off',
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'vue/multi-word-component-names': 'off',
    'no-promise-executor-return': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: 'packages/renderer/tsconfig.json',
      },
    },
  },
}
