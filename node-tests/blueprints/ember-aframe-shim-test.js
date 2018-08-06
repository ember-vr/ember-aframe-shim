'use strict';

const fs = require('fs');
const {
  setupTestHooks,
  emberNew,
  emberGenerate
} = require('ember-cli-blueprint-test-helpers/helpers');
const { expect } = require('ember-cli-blueprint-test-helpers/chai');

function getDevDependencies() {
  let packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return Object.keys(packageJSON.devDependencies);
}

describe('Acceptance: ember generate and destroy ember-aframe-shim', function() {
  setupTestHooks(this, {
    disabledTasks: [],
    timeout: 300000
  });

  it('ember-aframe-shim', function() {
    return emberNew().then(() => {
      expect(getDevDependencies()).to.not.contain('aframe');
      return emberGenerate(['ember-aframe-shim']);
    }).then(() => {
      expect(getDevDependencies()).to.contain('aframe');
    });
  });
});
