# Algo-kmeans ![build status](https://travis-ci.org/chtefi/algo-kmeans.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/chtefi/algo-kmeans/badge.svg?branch=master&service=github)](https://coveralls.io/github/chtefi/algo-kmeans?branch=master) [![Dependency Status](https://david-dm.org/chtefi/algo-kmeans.svg)](https://david-dm.org/chtefi/algo-kmeans) [![devDependency Status](https://david-dm.org/chtefi/algo-kmeans/dev-status.svg)](https://david-dm.org/chtefi/algo-kmeans#info=devDependencies) 

Simple implementation of the k-means clustering method.

### How to use

```javascript
import kmeans, { Point } from 'algo-kmeans';

// generate random points
const points = [];
for (var i = 100; i >= 0; i--) {
	points.push(new Point(50 - Math.random() * 100,
                        50 - Math.random() * 100,
                        50 - Math.random() * 100));
};
// kmeans asking for 5 clusters
const clusters = kmeans(points, { nbClusters: 5 });
// clusters.centroid = { x, y, z }
// clusters.points = [ { x, y, z }, { x, y, z }, ... ]

// kmeans with 2 clusters which init centroid is predefined
const clusters = kmeans(points, {
  initCentroids: [
    new Point(0, 5, 10),
    new Point(10, -12, 0)
  ]
});
```

### Install

With [npm](https://npmjs.org) do:

```
npm install algo-kmeans
```

### Commands

```
Lifecycle scripts included in algo-kmeans:
  test
    _mocha --compilers js:babel/register
  prepublish
    npm run build && npm run build:umd

available via `npm run-script`:
  build
    babel src --out-dir lib
  clean
    rimraf lib dist
  build:umd
    webpack src/index.js dist/kmeans.js && set NODE_ENV=production&& webpack src/index.js dist/kmeans.min.js
  test:watch
    _mocha watch
  test:cov
    babel-node ./node_modules/isparta/bin/isparta cover ./node_modules/mocha/bin/_mocha
  lint
    eslint src test
```
### License

MIT
