/*jshint node:true*/
module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return this.addPackageToProject('aframe');
  }
};
