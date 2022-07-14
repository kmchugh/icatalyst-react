module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'airbnb-typescript',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 7,
    },
    plugins: [
        'eslint-plugin-material-ui',
        'eslint-plugin-react-hooks',
        '@typescript-eslint/eslint-plugin',
    ],
    rules: {
        curly: ['error', 'all'],
        // Allow warn and error for dev environments
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                // airbnb uses 'both' which requires nesting i.e. <label><input /></label>
                // 'either' allows `htmlFor`
                assert: 'either',
            },
        ],
        'jsx-a11y/no-autofocus': 'off',
        'react/jsx-props-no-spreading': 'off',
        indent: [
            'warn', 2, {
                SwitchCase: 1
            }
        ],
        'linebreak-style': [
            'error', 'unix'
        ],
        'quotes': [
            'error', 'single'
        ],
        'semi': [
            'error', 'always'
        ]
    },
}
