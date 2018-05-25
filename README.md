ember-aframe-shim
==============================================================================

[![Greenkeeper badge](https://badges.greenkeeper.io/ember-vr/ember-aframe-shim.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-aframe-shim.svg)](https://badge.fury.io/js/ember-aframe-shim)
[![Build Status](https://travis-ci.org/ember-vr/ember-aframe-shim.svg?branch=master)](https://travis-ci.org/ember-vr/ember-aframe-shim)
![Ember Version](https://embadge.io/v1/badge.svg?start=2.12.0)

An Ember.js shim for [A-Frame](https://aframe.io)

Installation
------------------------------------------------------------------------------

```
ember install ember-aframe-shim
```


Usage
------------------------------------------------------------------------------

```js
import AFrame from 'aframe';

console.log(AFrame.scenes.length);
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-aframe-shim`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
