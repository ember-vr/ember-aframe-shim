'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function() {
  return {
    scenarios: [
      {
        name: 'ember-lts-3.12',
        npm: {
          devDependencies: {
            'ember-source': '~3.12.0'
          }
        }
      },
      {
        name: 'ember-lts-3.16',
        npm: {
          devDependencies: {
            'ember-source': '~3.16.0'
          }
        }
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release')
          }
        }
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta')
          }
        }
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary')
          }
        }
      },
      {
        name: 'ember-default-with-jquery',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'jquery-integration': true
          })
        },
        npm: {
          devDependencies: {
            '@ember/jquery': '^0.5.1'
          }
        }
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false
          })
        },
        npm: {
          ember: {
            edition: 'classic'
          }
        }
      },
      {
        name: 'aframe-0.5',
        npm: {
          devDependencies: {
            'aframe': '0.5'
          }
        }
      },
      {
        name: 'aframe-0.6',
        npm: {
          devDependencies: {
            'aframe': '0.6'
          }
        }
      },
      {
        name: 'aframe-0.7',
        npm: {
          devDependencies: {
            'aframe': '0.7'
          }
        }
      },
      {
        name: 'aframe-0.8',
        npm: {
          devDependencies: {
            'aframe': '0.8'
          }
        }
      },
      {
        name: 'aframe-0.9',
        npm: {
          devDependencies: {
            'aframe': '0.9'
          }
        }
      }
    ]
  };
};
