import { unique } from './tools';
import Cluster from './cluster';

export function initClusters(p, { nbClusters, initCentroids }) {
  let clusters = [];
  const points = p.slice(); // clone

  function haveClusterWithCentroid(point) {
    for (let i = clusters.length - 1; i >= 0; i--) {
      if (clusters[i].centroid.equals(point)) {
        return true;
      }
    }
    return false;
  }

  if (nbClusters) {
    // create the clusters with a random centroid inside
    const pickRandomPoint = unique(points);
    for (let i = nbClusters - 1; i >= 0; i--) {
      const point = pickRandomPoint();
      if (haveClusterWithCentroid(point)) {
        i++;
        continue;
      }

      const cluster = new Cluster(point);
      clusters.push(cluster);
    }

    // we need at least the expected number of clusters
    if (clusters.length !== nbClusters) {
      throw Error('Not enough different point coordinates to create clusters');
    }
  } else if (initCentroids) {
    clusters = initCentroids.map(init => new Cluster(init));
  }

  return clusters;
}

export function assignToNearestCluster(clusters, point) {
  let minDistance = null;
  let nearestCluster = null;
  for (let i = clusters.length - 1; i >= 0; i--) {
    const cluster = clusters[i];
    const distance = point.distanceTo(cluster.centroid);

    if (minDistance === null || distance < minDistance) {
      minDistance = distance;
      nearestCluster = cluster;
    }
  }

  if (point.cluster !== nearestCluster) {
    nearestCluster.addPoint(point);
  }
}
