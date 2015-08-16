"use strict";

exports.__esModule = true;
exports["default"] = unique;
function swap(array, i, j) {
  var tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function unique(arr) {
  var maxLength = arr.length;
  return function () {
    // Fisher–Yates
    var randomIndex = Math.random() * maxLength-- | 0;
    var item = arr[randomIndex];
    swap(arr, randomIndex, maxLength);
    return item;
  };
}

module.exports = exports["default"];