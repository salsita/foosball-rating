/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const browserify = require('@cypress/browserify-preprocessor')
const tsify = require('tsify')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = on => {
  const options = {
    browserifyOptions: {
      extensions: ['.js', '.ts'],
    },
    onBundle(bundle) {
      // as cypress ran from the root tsify needs a pass to tsconfig
      bundle.plugin(tsify, { project: 'cypress' })
    },
  }
  on('file:preprocessor', browserify(options))
}
