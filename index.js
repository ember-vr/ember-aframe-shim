'use strict';

const packageName = 'aframe';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    this.import('node_modules/aframe/dist/aframe-master.js', {
      // we need aframe to run immediately
      // (because components are run immediately and depend on aframe)
      // and be importable
      // using: [{ transformation: 'amd', as: packageName }]
    });
    this.import(`vendor/shims/${packageName}.js`);
    this.import(`vendor/shims/three.js`);
  }
};
