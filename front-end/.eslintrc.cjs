module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'commitlint.config.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'internal',
          'object',
          'type'
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: '@/components/**',
            group: 'parent',
            position: 'before'
          },
          {
            pattern: '@/utils/**',
            group: 'parent',
            position: 'after'
          },
          {
            pattern: '@/apis/**',
            group: 'parent',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowedNames: ['that']
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error']
      }
    ],
    'no-debugger': 'warn'
  }
};
