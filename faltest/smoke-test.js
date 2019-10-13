'use strict';

const { setUpWebDriver } = require('@faltest/lifecycle');
const { promisify } = require('util');
const request = promisify(require('request'));
const assert = require('assert');
const { percySnapshot } = require('@percy/webdriverio');
const { URL } = require('url');
const { repository } = require('../package');
const Server = require('ember-cli-test-server');
const ci = require('ci-info')

describe('smoke', function() {
  setUpWebDriver.call(this);

  before(async function() {
    if (ci.isCI) {
      this.url = await new Promise(resolve => {
        (async function getUrl() {
          let commit;
          if (ci.isPR) {
            commit = process.env.TRAVIS_PULL_REQUEST_SHA;
          } else {
            commit = process.env.TRAVIS_COMMIT;
          }

          let { pathname } = new URL(repository);

          let [, org, name] = pathname.match(/^\/(.+)\/(.+)\.git$/);

          let repo = `${org}/${name}`;

          let { body } = await request({
            url: `https://api.github.com/repos/${repo}/statuses/${commit}`,
            headers: {
              'User-Agent': repo
            },
            json: true
          });

          let status = body.find(status => status.context === `netlify/${name}/deploy-preview`);

          let fallback = `https://${name}.netlify.com`;

          if (!status) {
            resolve(fallback);
          } else if (status.state !== 'pending') {
            resolve(status.target_url);
          } else {
            setTimeout(getUrl, 1000);
          }
        })();
      });
    } else {
      this.server = new Server();

      let port = await this.server.start();

      this.url = `http://localhost:${port}`;
    }
  });

  beforeEach(async function() {
    await this.browser.url(this.url);
  });

  after(async function() {
    if (this.server) {
      await this.server.stop();
    }
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
