'use strict';

const { setUpWebDriver } = require('@faltest/lifecycle');
const Server = require('ember-cli-test-server');
const assert = require('assert');
const { percySnapshot } = require('@percy/webdriverio');

describe('smoke', function() {
  setUpWebDriver.call(this);

  before(async function() {
    this.server = new Server();

    this.port = await this.server.start();
  });

  beforeEach(async function() {
    await this.browser.url(`http://localhost:${this.port}`);
  });

  after(async function() {
    await this.server.stop();
  });

  it('works', async function() {
    let src = await this.browser.executeAsync(done => {
      // eslint-disable-next-line no-undef
      let image360 = document.getElementById('image-360');

      function fadeComplete() {
        image360.removeEventListener('animationcomplete__fadeback', fadeComplete);

        let src = image360.getAttribute('material').src.id;

        done(src);
      }

      image360.addEventListener('animationcomplete__fadeback', fadeComplete);

      // eslint-disable-next-line no-undef
      document.getElementById('sechelt-entity').click();
    });

    assert.strictEqual(src, 'sechelt');

    await this.browser.execute(() => {
      function canvasToImage(canvas) {
        let scene = canvas.parentElement;
        let canvasData = scene.components.screenshot.getCanvas('perspective').toDataURL();

        // eslint-disable-next-line no-undef
        let image = document.createElement('img');
        image.src = canvasData;
        image.classList.add('a-canvas');

        scene.setAttribute('data-percy-modified', true);
        scene.style = 'display: none';
        scene.parentElement.appendChild(image);
      }

      // eslint-disable-next-line no-undef
      for (let canvas of document.querySelectorAll('canvas')) {
        canvasToImage(canvas);
      }
    });

    await percySnapshot(this.browser._browser, this.test.fullTitle());
  });
});
