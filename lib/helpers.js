'use strict';

exports.__esModule = true;
exports.initClusters = initClusters;
exports.assignToNearestCluster = assignToNearestCluster;

var _tools = require('./tools');

var _ = require('./');

function initClusters(p, _ref) {
  var nbClusters = _ref.nbClusters;
  var initCentroids = _ref.initCentroids;

  var clusters = [];
  var points = p.slice(); // clone

  function haveClusterWithCentroid(point) {
    for (var i = clusters.length - 1; i >= 0; i--) {
      if (clusters[i].centroid.equals(point)) {
        return true;
      }
    }
    return false;
  }

  if (nbClusters) {
    // create the clusters with a random centroid inside
    var pickRandomPoint = (0, _tools.unique)(points);
    for (var i = nbClusters - 1; i >= 0; i--) {
      var point = pickRandomPoint();
      if (haveClusterWithCentroid(point)) {
        i++;
        continue;
      }

      var cluster = new _.Cluster(point);
      clusters.push(cluster);
    }

    // we need at least the expected number of clusters
    if (clusters.length !== nbClusters) {
      throw Error('Not enough different point coordinates to create clusters');
    }
  } else if (initCentroids) {
    clusters = initCentroids.map(function (init) {
      return new _.Cluster(init);
    });
  }

  return clusters;
}

function assignToNearestCluster(clusters, point) {
  var minDistance = null;
  var nearestCluster = null;
  for (var i = clusters.length - 1; i >= 0; i--) {
    var cluster = clusters[i];
    var distance = point.distanceTo(cluster.centroid);

    if (minDistance === null || distance < minDistance) {
      minDistance = distance;
      nearestCluster = cluster;
    }
  }

  if (point.cluster !== nearestCluster) {
    nearestCluster.addPoint(point);
  }
}