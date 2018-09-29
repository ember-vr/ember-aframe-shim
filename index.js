'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

const packageName = 'aframe';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    let resolvedPath = require.resolve(packageName);
    this.dirname = path.dirname(resolvedPath);
    this.basename = path.basename(resolvedPath);

    // we need aframe to run immediately
    // (because components are run immediately and depend on aframe)
    // and be importable
    this.import(`vendor/${packageName}/${this.basename}`);
    this.import(`vendor/shims/${packageName}.js`);
  },

  treeForVendor(tree) {
    return mergeTrees([
      tree,
      new Funnel(this.dirname, {
        files: [this.basename],
        destDir: packageName
      })
    ]);
  }
};
