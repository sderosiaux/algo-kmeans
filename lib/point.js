"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = (function () {
  function Point(x, y, z) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
    this.z = z;
    this.cluster = null;
  }

  Point.prototype.distanceTo = function distanceTo(point) {
    var dx = point.x - this.x;
    var dy = point.y - this.y;
    var dz = point.z - this.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  Point.prototype.distanceToCentroid = function distanceToCentroid() {
    return this.cluster ? this.distanceTo(this.cluster.centroid) : null;
  };

  Point.prototype.equals = function equals(point) {
    return this.x === point.x && this.y === point.y && this.z === point.z;
  };

  return Point;
})();

exports["default"] = Point;
module.exports = exports["default"];