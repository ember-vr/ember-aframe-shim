'use strict';

const packageName = 'aframe';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    const resolve = require('resolve');

    let { root } = this.project;

    let absolutePath = resolve.sync(packageName, { basedir: root });
    let nodeModulesPath = absolutePath.substr(root.length + 1);

    this.import(nodeModulesPath, {
      // we need aframe to run immediately
      // (because components are run immediately and depend on aframe)
      // and be importable
      // using: [{ transformation: 'amd', as: packageName }]
    });
    this.import(`vendor/shims/${packageName}.js`);
  }
};
