# Algo-kmeans ![build status](https://travis-ci.org/chtefi/algo-kmeans.svg?branch=master) [![Dependency Status](https://david-dm.org/chtefi/algo-kmeans.svg)](https://david-dm.org/chtefi/algo-kmeans) [![devDependency Status](https://david-dm.org/chtefi/algo-kmeans/dev-status.svg)](https://david-dm.org/chtefi/algo-kmeans#info=devDependencies)

Simple implementation of the k-means clustering method.

# How to use

It's using ES6 (barely) syntax. Make sure to run it using Babel for instance.

```javascript
var kmeans = require('algo-kmeans');
var Point = require('algo-kmeans').Point;

// generate random points
var points = [];
for (var i = 100; i >= 0; i--) {
	points.push(new Point(50 - Math.random() * 100,
                          50 - Math.random() * 100,
                          50 - Math.random() * 100));
};
// kmeans asking for 5 clusters
var clusters = kmeans(points, { nbClusters: 5 });
// clusters.centroid = { x, y, z }
// clusters.points = [ { x, y, z }, { x, y, z }, ... ]

// kmeans with 2 clusters which init centroid is predefined
var clusters = kmeans(points, { initCentroids: [ new Point(0, 5, 10), new Point(10, -12, 0)] });
```

# Install

With [npm](https://npmjs.org) do:

```
npm install algo-kmeans
```

# Testing

```
npm run test
```

# TODO

- Reorganise structure (files, directories)
- Use full ES6 power
- Add eslint

# License

MIT
