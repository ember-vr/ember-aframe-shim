import { module, test } from 'qunit';
import AFrame from 'aframe';

module('Acceptance | application', function() {
  test('import works', function(assert) {
    assert.equal(AFrame.scenes.length, 0);
  });

  test('global is available', function(assert) {
    assert.equal(window.AFRAME.scenes.length, 0);
  });
});
