module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "plugins": [
    "react",
    "sonarjs"
  ],
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true,
    "jest": true,
    "worker": true
  },
  "rules": {
    "curly": 2,
    "eol-last": 2,
    "eqeqeq": [2, "always"],
    "import/extensions": 2,
    "indent": [2, 2, { "SwitchCase": 1 }],
    "jsx-quotes": 2,
    "max-len": [2, { "code": 180 }],
    "max-lines": [2, { "max": 300, "skipBlankLines": true, "skipComments": true }],
    "max-statements-per-line": 2,
    "no-console": 2,
    "no-debugger": 2,
    "no-nested-ternary": 2,
    "no-return-await": 2,
    "no-trailing-spaces": 2,
    "no-var": 2,
    "object-curly-spacing": [2, "always", { "arraysInObjects": false }],
    "quotes": [2, "single", { "allowTemplateLiterals": true }],
    "react/display-name": [2, { "ignoreTranspilerName": false }],
    "react/default-props-match-prop-types": 2,
    "react/forbid-prop-types": [2, { "forbid": ["any"] }],
    "react/no-danger": 0,
    "react/no-did-mount-set-state": 2,
    "react/no-direct-mutation-state": 2,
    "react/no-multi-comp": [2, { "ignoreStateless": true }],
    "react/no-unknown-property": 2,
    "react/no-unused-state": 2,
    "react/prefer-es6-class": 2,
    "react/prop-types": 2,
    "react/react-in-jsx-scope": 2,
    "react/require-default-props": 2,
    "react/self-closing-comp": 2,
    "react/sort-comp": 2,
    "react/sort-prop-types": [2, { "ignoreCase": true }],
    "react/jsx-curly-spacing": 2,
    "react/jsx-key": 2,
    "react/jsx-max-depth": [2, { "max": 5 }],
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-pascal-case": 2,
    "react/jsx-sort-default-props": [2, { "ignoreCase": true }],
    "react/jsx-sort-props": [2, { "ignoreCase": true }],
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/jsx-wrap-multilines": 2,
    "semi": [2, "always"],
    "sonarjs/cognitive-complexity": 2,
    "sonarjs/no-duplicate-string": 2,
    "sonarjs/no-extra-arguments": 2,
    "sort-keys": [2, "asc", { "caseSensitive": false, "natural": false }]
  },
  "overrides": [
    {
      "files": ["!styles.js"],
      "rules": {
        "sort-keys": 0
      }
    }
  ],
  "globals": {}
};