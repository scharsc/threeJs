import { Matrix4, Vector3Tuple as Point } from "three";

export interface Primitive {
  type: string;
}

export class LineSegment implements Primitive {
  type: string = "linesegment";
  constructor(public start: Point, public end: Point) {}
}

export class Bounds implements Primitive {
  type: string = "bounds";
  constructor(public min: Point, public max: Point) {}
}

export class BoundsCs implements Primitive {
  type: string = "boundscs";
  constructor(public localBounds: Bounds, public lcsToWcs: Matrix4) {}
}

export class CylinderFinite implements Primitive {
  type: string = "cylinderfinite";
  constructor(public axis: LineSegment, public radius: number) {}
}

export class Sphere implements Primitive {
  type: string = "sphere";
  constructor(public center: Point, public radius: number) {}
}
