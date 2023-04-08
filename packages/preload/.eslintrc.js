// eslint-disable-next-line no-undef
module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // It is recommended to disable undefined checks for TypeScript projects
    'no-undef': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: 'packages/preload/tsconfig.json',
      },
    },
  },
}
