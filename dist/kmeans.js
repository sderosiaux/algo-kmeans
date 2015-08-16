(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["kmeans"] = factory();
	else
		root["kmeans"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _helpers = __webpack_require__(3);

	var _cluster = __webpack_require__(1);

	var _cluster2 = _interopRequireDefault(_cluster);

	var _point = __webpack_require__(2);

	var _point2 = _interopRequireDefault(_point);

	exports.Point = _point2['default'];
	exports.Cluster = _cluster2['default'];

	exports['default'] = function (points, _ref) {
	  var nbClusters = _ref.nbClusters;
	  var initCentroids = _ref.initCentroids;

	  var clusters = _helpers.initClusters(points, {
	    nbClusters: nbClusters,
	    initCentroids: initCentroids
	  });

	  var assignToNearest = function assignToNearest(p) {
	    _helpers.assignToNearestCluster(clusters, p);
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _point = __webpack_require__(2);

	var _point2 = _interopRequireDefault(_point);

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
	    this.centroid = new _point2['default'](this.points.map(function (p) {
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

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.initClusters = initClusters;
	exports.assignToNearestCluster = assignToNearestCluster;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _tools = __webpack_require__(4);

	var _cluster = __webpack_require__(1);

	var _cluster2 = _interopRequireDefault(_cluster);

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
	    var pickRandomPoint = _tools.unique(points);
	    for (var i = nbClusters - 1; i >= 0; i--) {
	      var point = pickRandomPoint();
	      if (haveClusterWithCentroid(point)) {
	        i++;
	        continue;
	      }

	      var cluster = new _cluster2['default'](point);
	      clusters.push(cluster);
	    }

	    // we need at least the expected number of clusters
	    if (clusters.length !== nbClusters) {
	      throw Error('Not enough different point coordinates to create clusters');
	    }
	  } else if (initCentroids) {
	    clusters = initCentroids.map(function (init) {
	      return new _cluster2['default'](init);
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _uniqueJs = __webpack_require__(5);

	var _uniqueJs2 = _interopRequireDefault(_uniqueJs);

	exports['default'] = {
	  unique: _uniqueJs2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ }
/******/ ])
});
;