'use strict';

var clamp     = require('clamp');
var fixme     = require('random-integral').fixme;
var toFixed   = require('tofixed');
var toInteger = require('to-integer');

var MAX_SAFE_INT = require('max-safe-int');

module.exports = function (options) {

  if (options) {
    if (!options.inspected) {
      options.min = fixme(options.min, 0, MAX_SAFE_INT, true);
      options.max = fixme(options.max, 0, MAX_SAFE_INT, false);
    }
  } else {
    options = {
      min: 0,
      max: MAX_SAFE_INT,
      fixed: 4
    };
  }

  var min = options.min;
  var max = options.max;

  // swap to variables
  // ref: http://stackoverflow.com/a/16201688
  if (min > max) {
    min = min ^ max;
    max = min ^ max;
    min = min ^ max;
  }

  var decimal = Math.random() * (max - min) + min;
  var fixed   = clamp(toInteger(options.fixed), 0, 17);

  return fixed
    ? parseFloat(toFixed(decimal, fixed))
    : Math.round(decimal);
};

module.exports.fixme = fixme;
