// eslint-disable-next-line no-undef
module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: 'packages/main/tsconfig.json',
      },
    },
  },
}
