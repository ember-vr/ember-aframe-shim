'use strict';

const { setUpWebDriver } = require('@faltest/lifecycle');
const assert = require('assert');
const percySnapshot = require('@percy/webdriverio');
const { name } = require('../package');
const Server = require('ember-cli-test-server');
const ci = require('ci-info');
const { getStatus } = require('poll-pr-status');

describe('smoke', function () {
  setUpWebDriver.call(this);

  before(async function () {
    if (ci.isCI && process.env.NETLIFY !== 'false') {
      let status = await getStatus({
        context: `netlify/${name}/deploy-preview`,
        token: process.env.POLL_PR_STATUS_TOKEN,
      });

      this.url = status ? status.target_url : `https://${name}.netlify.com`;
    } else {
      this.server = new Server();

      let port = await this.server.start();

      this.url = `http://localhost:${port}`;
    }
  });

  beforeEach(async function () {
    await this.browser.url(this.url);
  });

  after(async function () {
    if (this.server) {
      await this.server.stop();
    }
  });

  it('works', async function () {
    await this.browser.waitForInsert('#image-360');

    let src = await this.browser.executeAsync((done) => {
      // eslint-disable-next-line no-undef
      let image360 = document.getElementById('image-360');

      function fadeComplete() {
        image360.removeEventListener(
          'animationcomplete__fadeback',
          fadeComplete
        );

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
        let canvasData = scene.components.screenshot
          .getCanvas('perspective')
          .toDataURL();

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
