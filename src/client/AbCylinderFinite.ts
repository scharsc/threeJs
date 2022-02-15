import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";
import { AbLineSegment } from "./AbLineSegment";

export class AbCylinderFinite extends THREE.Object3D implements AbPrimitive {
  constructor(axis: AbLineSegment = new AbLineSegment(), radius: number = 1) {
    super();
    this.material = new THREE.MeshLambertMaterial({
      color: "rgb(230, 230, 230)",
    });
    this.mesh = new THREE.Mesh(AbCylinderFinite.geometry, this.material);
    this.mesh.position.copy(axis.center);
    this.radius_ = radius;
    this.axis_ = axis;
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

  set radius(value: number) {
    this.radius_ = value;
    this.updateMesh();
  }

  get radius() {
    return this.radius_;
  }

  private updateMesh()
  {
    this.mesh.scale.set(this.radius_, this.axis_.height, this.radius_);
    const delta = this.axis_.start.clone().sub(this.axis_.end).normalize();
    const zAxis = new THREE.Vector3(0, 1, 0);
    const dir = zAxis.clone().cross(delta).normalize();
    this.mesh.setRotationFromAxisAngle(dir, zAxis.angleTo(delta));
  }

  static geometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(
    1.0,
    1.0,
    1.0,
    15,
    1,
    true
  );

  material: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;
  private radius_: number;
  private axis_: AbLineSegment;
}
