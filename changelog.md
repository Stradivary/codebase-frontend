# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.2] - 2019-10-19]
### Added
- Changelog
- Eslint rule: no-nested-ternary
- Eslint rule: no-trailing-spaces
- Eslint rule: sonarjs/no-extra-arguments
### Changed
- Updated MUCH outdated modules (no breaking changes)
### Fixed
- css-loader deprecated config
- Build mode log
### Removed
- Eslint rule: react/jsx-handler-names

## [[1.3.1] - 2019-08-26](https://gitlab.playcourt.id/telkomdev/codebase-frontend/commit/9fffa30ba98693e1bb9b35742e4d2683d7c2448e)
### Added
- Eslint rule: eol-last
### Changed
- Development mode modular css generated classname now is configurable
- gitignore config
- Module: @material-ui/core to 4.1.1
- Module: @material-ui/icons to 4.1.0
- Module: css-loader to 3.0.0

## [[1.3.0] - 2019-05-27](https://gitlab.playcourt.id/telkomdev/codebase-frontend/commit/31e1d30e9cbb599f650d77064185c3103d6843bc)
### Added
- MUCH eslint rules
- Support of [modular CSS](https://github.com/css-modules/css-modules)
- Build mode now extract CSS to separate file
- Option to extract selected language from moment.js
- Module: connect-gzip-static
- Module: express
- Module: mini-css-extract-plugin
- Module: moment-locales-webpack-plugin
### Fixed
- npm test to pass without any test
- gzip compression config
### Changed
- Server from browsersync to express
- Eslint rules from package.json to .eslint.rc
- Babel config from package.json to babel.config.js
- Module: react to 16.8.4
- Module: babel to 7.3.4
- Module: jest to 24.3.1
- Module: compression-webpack-plugin to 2.0.0
- Module: webpack-bundle-analyzer to 3.3.2
### Removed
- .editorconfig
- .eslintignore
- .istanbul.yml
- .travis.yml
- .watchmanconfig
- .appveyor.yml
- Module: browser-sync
- Module: extract-text-webpack-plugin
- Module: hard-source-webpack-plugin

## [1.2.1] - 2019-02-19
### Added
- gzip compression
### Changed
- Update enzyme and eslint

## [1.2.0] - 2019-01-31
### Added
- precommit script
- Eslint rule: max-lines & eqeqeq
### Fixed
- Components variable naming

## [1.1.3] - 2019-01-15
### Added
- Jenkinsfile
- Sonar properties
- Dockerfile

## [1.1.2] - 2018-09-23
### Fixed
- src/pages directory naming

## [1.1.1] - 2018-09-23
### Added
- README

## [1.1.0] - 2018-08-24
### Changed
- Update modules
- Update build system
- Other fixes

## [1.0.0] - 2018-03-30
### Added
- Basically everything from [react-slingshot](https://github.com/coryhouse/react-slingshot) with various customization