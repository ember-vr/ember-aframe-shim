/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));

    return this.addPackageToProject('aframe', pkg.devDependencies['aframe']);
  }
};
