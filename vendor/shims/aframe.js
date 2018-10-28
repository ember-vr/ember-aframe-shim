(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['AFRAME'],
      __esModule: true,
    };
  }

  define('aframe', [], vendorModule);
})();
