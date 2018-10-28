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
      using: [{ transformation: 'amd', as: packageName }]
    });
  }
};
