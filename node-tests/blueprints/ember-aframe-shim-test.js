'use strict';

const fs = require('fs');
var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerate = blueprintHelpers.emberGenerate;

var expect = require('ember-cli-blueprint-test-helpers/chai').expect;

function getDevDependencies() {
  let packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return Object.keys(packageJSON.devDependencies);
}

describe('Acceptance: ember generate and destroy ember-aframe-shim', function() {
  setupTestHooks(this, {
    disableMocking: true,
    timeout: 300000
  });

  it('ember-aframe-shim', function() {
    return emberNew().then(() => {
      expect(getDevDependencies()).to.not.contain('aframe');
    }).then(() => emberGenerate(['ember-aframe-shim'])).then(() => {
      expect(getDevDependencies()).to.contain('aframe');
    });
  });
});
