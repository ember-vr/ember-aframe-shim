(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['THREE'],
      __esModule: true,
    };
  }

  define('three', [], vendorModule);
})();
