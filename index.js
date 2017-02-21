/* jshint node: true */
'use strict';

const Funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-aframe-shim',

  treeForVendor(vendorTree) {
    let aframeTree = new Funnel('node_modules/aframe/dist', {
      files: ['aframe-master.js'],
      destDir: 'aframe'
    });

    return mergeTrees([vendorTree, aframeTree]);
  },

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/aframe/aframe-master.js', {
      using: [
        { transformation: 'amd', as: 'aframe' }
      ]
    });
  }
};
