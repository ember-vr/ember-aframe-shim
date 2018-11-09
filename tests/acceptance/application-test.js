import { module, test } from 'qunit';
import AFRAME from 'aframe';

module('Acceptance | application', function() {
  test('import works', function(assert) {
    assert.ok(AFRAME.version);
  });

  test('global is available', function(assert) {
    assert.ok(window.AFRAME.version);
  });
});
