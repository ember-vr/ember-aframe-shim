'use strict';

const path = require('path');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {},
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'faltest/**/*.js',
        'node-tests/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
<<<<<<< HEAD
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      })
    },

    // mocha files
    {
      files: [
        'faltest/**/*-test.js',
        'node-tests/**/*-test.js'
      ],
      env: {
        mocha: true
      }
    },

    // vendor files
    {
      files: ['vendor/**/*.js'],
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script'
      },
      env: {
        amd: true
      },
      globals: {
        Ember: 'readonly'
      },
      rules: Object.keys(Object.assign({},
        // eslint-disable-next-line node/no-extraneous-require
        require(path.resolve(path.dirname(require.resolve('eslint')), '../conf/eslint-recommended')).rules,
        require('eslint-plugin-ember').configs.recommended.rules
      )).reduce((rules, rule) => {
        rules[rule] = 'off';
        return rules;
      }, {})
=======
      extends: ['plugin:node/recommended']
>>>>>>> d6c001d... v3.17.0...v3.20.0
    }
  ]
};
