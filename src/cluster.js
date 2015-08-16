import Point from './point';

export default class Cluster {
  constructor(centroid) {
    this.centroid = centroid;
    this.points = [];
    this.dirty = false;
  }

  contains(point) {
    for (let i = this.points.length - 1; i >= 0; i--) {
      if (this.points[i].equals(point)) {
        return true;
      }
    }

    return false;
  }

  addPoint(point) {
    this.points.push(point);
    if (point.cluster) {
      point.cluster.removePoint(point);
    }
    point.cluster = this;
    this.dirty = true;
  }

  removePoint(point) {
    this.points.splice(this.points.indexOf(point), 1);
    this.dirty = true;
  }

  computeCentroid() {
    this.centroid = new Point(
      this.points.map(p => p.x).reduce((a, b) => (a + b)) / this.points.length,
      this.points.map(p => p.y).reduce((a, b) => (a + b)) / this.points.length,
      this.points.map(p => p.z).reduce((a, b) => (a + b)) / this.points.length
    );
  }
}
