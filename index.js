/* jshint node: true */
'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-aframe-shim',

  treeForVendor() {
    return new Funnel('node_modules/aframe/dist', {
      files: ['aframe-master.js'],
      destDir: 'aframe'
    });
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
