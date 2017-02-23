/* jshint node: true */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');

const packageName = 'aframe';

module.exports = {
  name: 'ember-aframe-shim',

  included() {
    this._super.included.apply(this, arguments);

    let resolvedPath = require.resolve(packageName);
    this.dirname = path.dirname(resolvedPath);
    this.basename = path.basename(resolvedPath);

    this.import(`vendor/${packageName}/${this.basename}`, {
      using: [
        { transformation: 'amd', as: packageName }
      ]
    });
  },

  treeForVendor() {
    return new Funnel(this.dirname, {
      files: [this.basename],
      destDir: packageName
    });
  }
};
