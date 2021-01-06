'use strict';

module.exports = {
  normalizeEntityName() {},

  async afterInstall() {
    let devDependencies = await require('pkg-conf')('devDependencies', {
      // Why isn't this the default?
      cwd: __dirname,
    });

    return await this.addPackageToProject('aframe', devDependencies['aframe']);
  },
};
