var expect = require('chai').expect;
var kmeans = require('../kmeans');
var Cluster = require('../kmeans').Cluster;
var Point = require('../Point.js');

describe('kmeans algorithm', () => {

    var points = [
        new Point(-8, 0, 0),
        new Point(-10, 0, 0),
        new Point(-12, 0, 0),
        new Point(0, 10, 0),
        new Point(0, 5, 0),
        new Point(0, 10, 0)
    ];

    var initCentroids = [new Point(-7.55, 0, 0), new Point(0, 8.9, 0)];
    var nbClusters = initCentroids.length;
    var clusters = kmeans(points, {
        initCentroids
    });

    it('should have the expected count of clusters and points', () => {
        expect(clusters).to.have.length.of(nbClusters);
        expect(clusters[0].points).to.have.length.of(3);
        expect(clusters[1].points).to.have.length.of(3);
    });

    it('should have clusters with different centroids', function() {
        expect(clusters[0].centroid.equals(clusters[1].centroid)).to.be.false;
    });

    it('should have clusters containing the expected points', () => {
        var c1 = clusters.filter(c => c.contains(points[0]))[0];
        expect(c1.contains(points[0])).to.be.true;
        expect(c1.contains(points[1])).to.be.true;
        expect(c1.contains(points[2])).to.be.true;

        var c2 = clusters.filter(c => c.contains(points[3]))[0];
        expect(c2.contains(points[3])).to.be.true;
        expect(c2.contains(points[4])).to.be.true;
        expect(c2.contains(points[5])).to.be.true;
    });

    it('should compute the right centroid', function() {
        var c1 = clusters.filter(c => c.contains(points[0]))[0];
        expect(c1.centroid.equals(new Point((-8 - 10 - 12) / 3, 0, 0))).to.be.true;

        var c2 = clusters.filter(c => c.contains(points[3]))[0];
        expect(c2.centroid.equals(new Point(0, (10 + 5 + 10) / 3, 0))).to.be.true;
    });

    it('should contains clusters which points are the nearest', function() {
        points.forEach(p => {
            var centroidDistance = p.distanceToCentroid();
            clusters
                .filter(c => c !== p.cluster) // check other clusters
            .forEach(c => { // check that the distance is further than the one we found
                expect(p.distanceTo(c.centroid) > centroidDistance).to.be.true;
            })
        })
    });

    it('should work on a large random dataset', function() {
    	var points = [];
    	for (var i = 100; i >= 0; i--) {
    		points.push(new Point(50 - Math.random() * 100, 50 - Math.random() * 100, 50 - Math.random() * 100));
    	};

    	var clusters = kmeans(points, { nbClusters: 5 });
    	points.forEach(p => {
            var centroidDistance = p.distanceToCentroid();
            clusters
                .filter(c => c !== p.cluster) // check other clusters
            .forEach(c => { // check that the distance is further than the one we found
                expect(p.distanceTo(c.centroid) > centroidDistance).to.be.true;
            })
        })
    })



});
