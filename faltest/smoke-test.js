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
    await this.browser.execute(() => {
      // eslint-disable-next-line no-undef
      document.getElementById('sechelt-entity').click();
    });

    let src = await this.browser.executeAsync(done => {
      // eslint-disable-next-line no-undef
      let material = document.getElementById('image-360').getAttribute('material');

      (function loop() {
        setTimeout(() => {
          let src = material.src.id;
          if (src !== 'city') {
            done(src);
          } else {
            loop();
          }
        });
     })();
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
