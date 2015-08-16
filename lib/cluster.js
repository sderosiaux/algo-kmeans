'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('./');

var Cluster = (function () {
  function Cluster(centroid) {
    _classCallCheck(this, Cluster);

    this.centroid = centroid;
    this.points = [];
    this.dirty = false;
  }

  Cluster.prototype.contains = function contains(point) {
    for (var i = this.points.length - 1; i >= 0; i--) {
      if (this.points[i].equals(point)) {
        return true;
      }
    }

    return false;
  };

  Cluster.prototype.addPoint = function addPoint(point) {
    this.points.push(point);
    if (point.cluster) {
      point.cluster.removePoint(point);
    }
    point.cluster = this;
    this.dirty = true;
  };

  Cluster.prototype.removePoint = function removePoint(point) {
    this.points.splice(this.points.indexOf(point), 1);
    this.dirty = true;
  };

  Cluster.prototype.computeCentroid = function computeCentroid() {
    this.centroid = new _.Point(this.points.map(function (p) {
      return p.x;
    }).reduce(function (a, b) {
      return a + b;
    }) / this.points.length, this.points.map(function (p) {
      return p.y;
    }).reduce(function (a, b) {
      return a + b;
    }) / this.points.length, this.points.map(function (p) {
      return p.z;
    }).reduce(function (a, b) {
      return a + b;
    }) / this.points.length);
  };

  return Cluster;
})();

exports['default'] = Cluster;
module.exports = exports['default'];