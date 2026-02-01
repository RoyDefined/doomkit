import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            'unused-imports': unusedImports,
        },
        rules: {
            ...prettier.rules,

            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],

            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
        },
    },
    {
        files: ['**/*.js'],
        rules: {
            ...prettier.rules,
        },
    },
];
