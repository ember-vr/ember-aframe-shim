import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.dom('#aframe-import-scenes-length').hasText('0');
    assert.dom('#aframe-global-scenes-length').hasText('0');
  });
});
