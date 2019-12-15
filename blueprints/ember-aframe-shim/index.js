'use strict';

module.exports = {
  normalizeEntityName() {},

  async afterInstall() {
    let devDependencies = await require('pkg-conf', {
      // Why isn't this the default?
      cwd: __dirname
    })('devDependencies');

    return await this.addPackageToProject('aframe', devDependencies['aframe']);
  }
};
