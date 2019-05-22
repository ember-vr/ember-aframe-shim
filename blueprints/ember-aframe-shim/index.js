'use strict';

module.exports = {
  normalizeEntityName() {},

  async afterInstall() {
    let devDependencies = await require('pkg-conf')('devDependencies');

    return await this.addPackageToProject('aframe', devDependencies['aframe']);
  }
};
