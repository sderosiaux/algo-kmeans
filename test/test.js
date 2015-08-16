import { expect } from 'chai';
import kmeans, { Point } from '../src';

describe('kmeans algorithm', () => {
  const points = [
    new Point(-8, 0, 0),
    new Point(-10, 0, 0),
    new Point(-12, 0, 0),
    new Point(0, 10, 0),
    new Point(0, 5, 0),
    new Point(0, 10, 0),
  ];

  const initCentroids = [new Point(-7.55, 0, 0), new Point(0, 8.9, 0)];
  const nbClusters = initCentroids.length;
  const clusters = kmeans(points, { initCentroids });

  it('should have the expected count of clusters and points', () => {
    expect(clusters).to.have.length.of(nbClusters);
    expect(clusters[0].points).to.have.length.of(3);
    expect(clusters[1].points).to.have.length.of(3);
  });

  it('should have clusters with different centroids', () => {
    expect(clusters[0].centroid.equals(clusters[1].centroid)).to.be.false;
  });

  it('should have clusters containing the expected points', () => {
    const c1 = clusters.filter(c => c.contains(points[0]))[0];
    expect(c1.contains(points[0])).to.be.true;
    expect(c1.contains(points[1])).to.be.true;
    expect(c1.contains(points[2])).to.be.true;

    const c2 = clusters.filter(c => c.contains(points[3]))[0];
    expect(c2.contains(points[3])).to.be.true;
    expect(c2.contains(points[4])).to.be.true;
    expect(c2.contains(points[5])).to.be.true;
  });

  it('should compute the right centroid', () => {
    const c1 = clusters.filter(c => c.contains(points[0]))[0];
    expect(c1.centroid.equals(new Point((-8 - 10 - 12) / 3, 0, 0))).to.be.true;

    const c2 = clusters.filter(c => c.contains(points[3]))[0];
    expect(c2.centroid.equals(new Point(0, (10 + 5 + 10) / 3, 0))).to.be.true;
  });

  it('should contains clusters which points are the nearest', () => {
    points.forEach(p => {
      const centroidDistance = p.distanceToCentroid();
      clusters
        .filter(c => c !== p.cluster) // check other clusters
        .forEach(c => { // check that the distance is further than the one we found
          expect(p.distanceTo(c.centroid) > centroidDistance).to.be.true;
        });
    });
  });

  it('should work on a large random dataset', () => {
    const manyPoints = [];
    for (let i = 100; i >= 0; i--) {
      manyPoints.push(new Point(
        50 - Math.random() * 100,
        50 - Math.random() * 100,
        50 - Math.random() * 100,
      ));
    }

    const manyClusters = kmeans(manyPoints, { nbClusters: 5 });
    manyPoints.forEach(p => {
      const centroidDistance = p.distanceToCentroid();
      manyClusters
        .filter(c => c !== p.cluster) // check other clusters
        .forEach(c => { // check that the distance is further than the one we found
          expect(p.distanceTo(c.centroid) > centroidDistance).to.be.true;
        });
    });
  });
});
