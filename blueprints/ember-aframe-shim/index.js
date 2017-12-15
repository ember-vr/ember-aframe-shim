/* eslint-env node */
'use strict';

module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    let pkg = require('../../package.json');

    return this.addPackageToProject('aframe', pkg.devDependencies['aframe']);
  }
};
