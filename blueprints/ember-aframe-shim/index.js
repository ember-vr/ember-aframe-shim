'use strict';

module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return require('pkg-conf')('devDependencies').then(devDependencies => {
      return this.addPackageToProject('aframe', devDependencies['aframe']);
    });
  }
};
