"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sphere = exports.CylinderFinite = exports.BoundsCs = exports.Bounds = exports.LineSegment = void 0;
class LineSegment {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.type = "linesegment";
    }
}
exports.LineSegment = LineSegment;
class Bounds {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.type = "bounds";
    }
}
exports.Bounds = Bounds;
class BoundsCs {
    constructor(localBounds, lcsToWcs) {
        this.localBounds = localBounds;
        this.lcsToWcs = lcsToWcs;
        this.type = "boundscs";
    }
}
exports.BoundsCs = BoundsCs;
class CylinderFinite {
    constructor(axis, radius) {
        this.axis = axis;
        this.radius = radius;
        this.type = "cylinderfinite";
    }
}
exports.CylinderFinite = CylinderFinite;
class Sphere {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
        this.type = "sphere";
    }
}
exports.Sphere = Sphere;
