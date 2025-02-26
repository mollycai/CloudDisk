import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist', '.eslintrc.cjs', 'commitlint.config.cjs'],
  },
  {
    // 针对 TypeScript 和 JSX 文件的配置
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser, // 使用 @typescript-eslint/parser 解析 TypeScript
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // 启用 JSX 支持
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // 引入 @typescript-eslint 插件
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules, // 应用 @typescript-eslint 推荐规则
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'internal', 'object', 'type'],
          pathGroups: [
            {
              pattern: 'react*',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '@/utils/**',
              group: 'parent',
              position: 'after',
            },
            {
              pattern: '@/apis/**',
              group: 'parent',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-this-alias': [
        'error',
        {
          allowedNames: ['that'],
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-debugger': 'warn',
    },
  },
  prettier,
);
