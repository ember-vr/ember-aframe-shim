import { module, test } from 'qunit';
import AFRAME from 'aframe';
import THREE from 'three';

module('Acceptance | application', function() {
  module('aframe', function() {
    test('import works', function(assert) {
      assert.ok(AFRAME.version);
    });

    test('global is available', function(assert) {
      assert.ok(window.AFRAME.version);
    });
  });

  module('three', function() {
    test('import works', function(assert) {
      assert.ok(THREE.REVISION);
    });

    test('global is available', function(assert) {
      assert.ok(window.THREE.REVISION);
    });
  });
});
