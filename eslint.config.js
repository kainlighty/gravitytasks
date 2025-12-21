import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importX from 'eslint-plugin-import-x'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist', 'build', 'coverage', 'node_modules']),

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'jsx-a11y': jsxA11y,
            'import-x': importX,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
        settings: {
            react: { version: 'detect' },
            'import-x/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],

            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            'import-x/order': [
                'warn',
                {
                    groups: [
                        ['builtin', 'external'],
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'type',
                    ],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import-x/no-duplicates': 'warn',
            'import-x/newline-after-import': 'warn',

            'jsx-a11y/anchor-is-valid': 'warn',

            'no-undef': 'off',
        },
    },

    {
        files: [
            '**/*.config.{js,ts}',
            'eslint.config.js',
            'vite.config.{js,ts}',
            'postcss.config.js',
            'scripts/**/*.{js,ts}',
        ],
        languageOptions: { globals: { ...globals.node } },
    },
])
