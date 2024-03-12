/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked', 'plugin:@typescript-eslint/stylistic-type-checked'],
    plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
    root: true,
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        jsx: true,
        useJSXTextNode: true,
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true
    },

    rules: {
        'no-control-regex': 0,
        'no-undef': 0,
        'no-unused-vars': 'warn',
        'react/prop-types': 0,
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase']
            }
        ],
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/explicit-member-accessibility': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-restricted-imports': 'warn',
        '@typescript-eslint/no-restricted-imports': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
