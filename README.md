# ember-aframe-shim

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-aframe-shim.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-aframe-shim.svg)](https://badge.fury.io/js/ember-aframe-shim)
[![Build Status](https://travis-ci.org/kellyselden/ember-aframe-shim.svg?branch=master)](https://travis-ci.org/kellyselden/ember-aframe-shim)

An Ember.js shim for [A-Frame](https://aframe.io).

## Installation

`ember install ember-aframe-shim`

## Usage

```js
import Ember from 'ember';
import AFrame from 'aframe'

export default Ember.Component.extend({
  version: AFrame.version
});
```
