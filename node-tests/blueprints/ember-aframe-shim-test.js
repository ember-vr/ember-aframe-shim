'use strict';

const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const {
  setupTestHooks,
  emberNew,
  emberGenerate,
} = require('ember-cli-blueprint-test-helpers/helpers');
const { expect } = require('ember-cli-blueprint-test-helpers/chai');

async function getDevDependencies() {
  let packageJSON = JSON.parse(await readFile('package.json', 'utf8'));
  return Object.keys(packageJSON.devDependencies);
}

describe('Acceptance: ember generate and destroy ember-aframe-shim', function () {
  setupTestHooks(this, {
    disabledTasks: [],
    timeout: 300000,
  });

  it('ember-aframe-shim', async function () {
    await emberNew();

    expect(await getDevDependencies()).to.not.contain('aframe');

    await emberGenerate(['ember-aframe-shim']);

    expect(await getDevDependencies()).to.contain('aframe');
  });
});
