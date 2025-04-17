'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-power-select': {
      theme: 'default',
    },
  });

  return app.toTree();
};
