import { module, test } from 'qunit';
import { visit, click, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | smoke', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await visit('/');
  });

  test('it works', async function(assert) {
    await click('#sechelt-entity');

    let src = await new Promise(resolve => {
      let material = find('#image-360').getAttribute('material');

      (function loop() {
        setTimeout(() => {
          let src = material.src.id;
          if (src !== 'city') {
            resolve(src);
          } else {
            loop();
          }
        });
     })();
    });

    assert.strictEqual(src, 'sechelt');
  });
});
