'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpers = require('./helpers');

var _cluster = require('./cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _point = require('./point');

var _point2 = _interopRequireDefault(_point);

exports.Point = _point2['default'];
exports.Cluster = _cluster2['default'];

exports['default'] = function (points, _ref) {
  var nbClusters = _ref.nbClusters;
  var initCentroids = _ref.initCentroids;

  var clusters = (0, _helpers.initClusters)(points, {
    nbClusters: nbClusters,
    initCentroids: initCentroids });

  var assignToNearest = function assignToNearest(p) {
    (0, _helpers.assignToNearestCluster)(clusters, p);
  };

  do {
    clusters.forEach(function (c) {
      return c.dirty = false;
    });
    points.forEach(assignToNearest);
    clusters.forEach(function (c) {
      return c.computeCentroid();
    });
  } while (clusters.some(function (c) {
    return c.dirty;
  }));

  return clusters;
};