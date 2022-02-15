import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";
import { AbLineSegment } from "./AbLineSegment";

export class AbConeFinite extends THREE.Object3D implements AbPrimitive {
  constructor(
    axis: AbLineSegment = new AbLineSegment(),
    radiusTop: number = 0,
    radiusBottom: number = 1
  ) {
    super();

    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(),
      new THREE.MeshLambertMaterial({
        color: "rgb(230, 230, 230)",
      })
    );
    this.axis_ = axis;
    this.radiusTop_ = radiusTop;
    this.radiusBottom_ = radiusBottom;
    this.updateMesh();
    this.add(this.mesh);
  }

  set axis(value: AbLineSegment) {
    this.axis_ = value;
    this.updateMesh();
  }

  get axis() {
    return this.axis_;
  }

  set radiusTop(value: number) {
    this.radiusTop_ = value;
    this.updateMesh();
  }

  get radiusTop() {
    return this.radiusTop_;
  }

  set radiusBottom(value: number) {
    this.radiusBottom_ = value;
    this.updateMesh();
  }

  get radiusBottom() {
    return this.radiusBottom_;
  }

  private updateMesh() {
    this.mesh.geometry = new THREE.CylinderGeometry(
      this.radiusTop_,
      this.radiusBottom_,
      this.axis_.length
    );

    this.mesh.position.copy(this.axis_.center);
    const delta = this.axis_.start.clone().sub(this.axis_.end).normalize();
    const zAxis = new THREE.Vector3(0, 1, 0);
    const dir = zAxis.clone().cross(delta).normalize();
    this.mesh.setRotationFromAxisAngle(dir, zAxis.angleTo(delta));
  }

  mesh: THREE.Mesh;
  private radiusTop_: number;
  private radiusBottom_: number;
  private axis_: AbLineSegment;
}
