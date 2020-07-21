module.exports = {
  env: {
    es6: true,
    // es2020: true,
    browser: true,
    node: true
    // mocha: true,
  },
  // extends: ['airbnb-base', 'prettier', 'plugin:chai-expect/recommended', 'plugin:chai-friendly/recommended'],
  extends: ['plugin:import/warnings','plugin:jsx-a11y/recommended' , "eslint:recommended", "plugin:react/recommended" ],
  // parser: '@typescript-eslint/parser',
  "parser": "babel-eslint",
  parserOptions: {
      ecmaVersion: 9,
      ecmaFeatures: {
        jsx: true
      },
      sourceType: "module"
  },
  // plugins: ['@typescript-eslint', 'prettier', 'chai-expect', 'chai-friendly'],
  plugins: ['flowtype','import', 'jsx-a11y', "react"],
  rules: {
    'import/no-duplicates': 'off',
    "jsx-a11y/label-has-associated-control": [ "warning", {
      "required": {
        "some": [ "nesting", "id"  ]
      }
    }],
    "jsx-a11y/label-has-for": [ "error", {
      "required": {
        "some": [ "nesting", "id"  ]
      }
    }],
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/click-events-have-key-events':'off',
    "react/display-name": "off",
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    "no-console": 1,
    // "jsx-a11y/rule-name": 2,
    // 'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'func-names': 'off',
    'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': ['off', 'ForOfStatement'],
    'no-use-before-define': 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    radix: ['error', 'as-needed'],
    'no-console': 'off',
    'no-continue': 'off',
    'import/no-unresolved': [2, {commonjs: true, amd: true}],
    // 'import/named': 2,
    // 'import/namespace': 2,
    // 'import/default': 2,
    'import/export': 2,
    'no-multi-assign': 'off',
  },
  overrides: [
    // {
    //   files: ['*.ts', '*.tsx', '*.js'],
    //   rules: {
    //     '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    //   },
    // },
    {
      files: ['migrations/*.js'],
      rules: {
        strict: 'off',
      },
    },
  ],
  settings: {
    'import/ignore': {
        'pattern': 'node_modules'
    },
    'import/resolver': {
      // typescript: {},
      node: {
      //   moduleDirectory: ['node_modules', 'src/'],
          paths: ['src'],
      },
    },
  },
};
