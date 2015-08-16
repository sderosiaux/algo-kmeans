import { assignToNearestCluster, initClusters } from './helpers';
import Cluster from './cluster';
import Point from './point';

export { Point, Cluster };

export default function(points, { nbClusters, initCentroids }) {
  const clusters = initClusters(points, {
    nbClusters,
    initCentroids,
  });

  const assignToNearest = (p) => {
    assignToNearestCluster(clusters, p);
  };

  do {
    clusters.forEach(c => c.dirty = false);
    points.forEach(assignToNearest);
    clusters.forEach(c => c.computeCentroid());
  } while (clusters.some(c => c.dirty));

  return clusters;
}
