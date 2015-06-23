export default class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.cluster = null;
    }

    distanceTo(point) {
        var dx = point.x - this.x;
        var dy = point.y - this.y;
        var dz = point.z - this.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    distanceToCentroid() {
        return this.cluster ? this.distanceTo(this.cluster.centroid) : null;
    }

    equals(point) {
        return this.x === point.x && this.y === point.y && this.z === point.z;
    }
}
