module.exports = {
  "env": {
    "development": {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-logical-assignment-operators",
        ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
        ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
        ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
        ["@babel/plugin-transform-runtime", { "regenerator": true }],
        "@babel/plugin-proposal-do-expressions"
      ]
    },
    "production": {
      "presets": [
        ["@babel/preset-env", { "targets": { "ie": 9 }, "forceAllTransforms": true }],
        "@babel/preset-react"
      ],
      "plugins": [
        "react-hot-loader/babel",
        "transform-react-remove-prop-types",
        "@babel/plugin-transform-react-constant-elements",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-logical-assignment-operators",
        ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
        ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
        ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
        ["@babel/plugin-transform-runtime", { "regenerator": true }],
        "@babel/plugin-proposal-do-expressions"
      ]
    },
    "test": {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-logical-assignment-operators",
        ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
        ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
        ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
        ["@babel/plugin-transform-runtime", { "regenerator": true }],
        "@babel/plugin-proposal-do-expressions"
      ]
    }
  }
};