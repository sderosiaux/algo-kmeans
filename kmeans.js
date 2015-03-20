// ----------------------------------------------------------------------------

module.exports = (points, { nbClusters, initCentroids }) => {
    var clusters = initClusters(points, { nbClusters, initCentroids });

    do {
    	clusters.forEach(c => c.dirty = false);
	    points.forEach(p => assignToNearestCluster(clusters, p));
	    clusters.forEach(c => c.computeCentroid());
	} while(clusters.some(c => c.dirty));

    return clusters;
}

// ----------------------------------------------------------------------------

function initClusters(points, { nbClusters, initCentroids }) {
    var clusters = [];
	points = points.slice(); // clone

    function haveClusterWithCentroid(point) {
        for (var i = clusters.length - 1; i >= 0; i--) {
            if (clusters[i].centroid.equals(point)) {
                return true;
            }
        }
        return false;
    }

    function swap(array, i, j) {
    	var tmp = array[i];
    	array[i] = array[j];
    	array[j] = tmp;
    }

    function pickUniqueAmong(arr) {
    	var maxLength = arr.length;
    	return function() {
    		// Fisher–Yates
    		var randomIndex = (Math.random() * maxLength--) | 0;
    		var item = arr[randomIndex];
    		swap(arr, randomIndex, maxLength);
    		return item;
    	}
    }

    if (nbClusters) {

	    // create the clusters with a random centroid inside
	    var pickRandomPoint = pickUniqueAmong(points);
	    for (var i = nbClusters - 1; i >= 0; i--) {
			var point = pickRandomPoint();
	        if (haveClusterWithCentroid(point)) {
	            i++;
	            continue;
	        }

	        var cluster = new Cluster(point);
	        clusters.push(cluster);
	    }

		// we need at least the expected number of clusters
	    if (clusters.length != nbClusters) {
	        throw Error('Not enough different point coordinates to create clusters');
	    }

	} else if (initCentroids) {

		clusters = initCentroids.map(p => new Cluster(p));

	}

    return clusters;
}

function assignToNearestCluster(clusters, point) {
    var minDistance = null;
    var nearestCluster = null;
    for (var i = clusters.length - 1; i >= 0; i--) {
        var cluster = clusters[i];
        var distance = point.distanceTo(cluster.centroid)

        if (minDistance === null || distance < minDistance) {
            minDistance = distance;
            nearestCluster = cluster;
        }
    };

    if (point.cluster !== nearestCluster) {
 	   nearestCluster.addPoint(point);
	}
}

// ----------------------------------------------------------------------------

module.exports.Cluster = Cluster;

function Cluster(centroid) {
    this.centroid = centroid;
    this.points = [];
    this.dirty = false;
};

Cluster.prototype.contains = function(point) {
    for (var i = this.points.length - 1; i >= 0; i--) {
        if (this.points[i].equals(point)) {
            return true;
        }
    }

    return false;
};

Cluster.prototype.addPoint = function(point) {
    this.points.push(point);
    if (point.cluster) {
    	point.cluster.removePoint(point);
    }
    point.cluster = this;
    this.dirty = true;
};

Cluster.prototype.removePoint = function(point) {
	this.points.splice(this.points.indexOf(point), 1);
	this.dirty = true;
};

Cluster.prototype.computeCentroid = function() {
	this.centroid = new Point(
		this.points.map(p => p.x).reduce((a, b) => (a + b))/ this.points.length,
		this.points.map(p => p.y).reduce((a, b) => (a + b)) / this.points.length,
		this.points.map(p => p.z).reduce((a, b) => (a + b)) / this.points.length
	);
};

// ----------------------------------------------------------------------------

module.exports.Point = Point;

function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.cluster = null;
}

Point.prototype.distanceTo = function(point) {
    var dx = point.x - this.x;
    var dy = point.y - this.y;
    var dz = point.z - this.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

Point.prototype.distanceToCentroid = function() {
	return this.cluster ? this.distanceTo(this.cluster.centroid) : null;
};

Point.prototype.equals = function(point) {
	return this.x === point.x && this.y === point.y && this.z === point.z;
};