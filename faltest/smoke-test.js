'use strict';

const { setUpWebDriver } = require('@faltest/lifecycle');
const Server = require('ember-cli-test-server');
const assert = require('assert');
const { percySnapshot } = require('@percy/webdriverio');

// These elements only take JS actions,
// not real WebDriver actions
class AFrameBrowser {
  constructor(browser) {
    this._browser = browser;
  }

  async click(selector) {
    await this._browser.execute(selector => {
      // eslint-disable-next-line no-undef
      document.querySelector(selector).click();
    }, selector);
  }
}

describe('smoke', function() {
  setUpWebDriver.call(this);

  before(async function() {
    this.server = new Server();

    this.port = await this.server.start();
  });

  beforeEach(async function() {
    await this.browser.url(`http://localhost:${this.port}`);

    this.aframeBrowser = new AFrameBrowser(this.browser);
  });

  after(async function() {
    await this.server.stop();
  });

  it('works', async function() {
    await this.aframeBrowser.click('#sechelt-entity');

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
