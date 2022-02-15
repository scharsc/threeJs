import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";

export class AbSphere extends THREE.Object3D implements AbPrimitive {
  constructor(
    center: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    radius: number = 1
  ) {
    super();
    this.mesh = new THREE.Mesh(
      AbSphere.geometry,
      new THREE.MeshLambertMaterial({
        color: "rgb(255, 0, 0)",
      })
    );
    this.center_ = center;
    this.radius_ = radius;
    this.updateMesh();
    this.add(this.mesh);
  }

  get center(): THREE.Vector3 {
    return this.center_;
  }

  set center(value: THREE.Vector3) {
    this.center_ = value;
    this.updateMesh();
  }

  get radius(): number {
    return this.radius_;
  }

  set radius(value: number) {
    this.radius_ = value;
    this.updateMesh();
  }

  private updateMesh() {
    this.mesh.position.copy(this.center_);
    this.mesh.scale.set(this.radius_, this.radius_, this.radius_);
  }

  static geometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry(
    1.0,
    3
  );

  mesh: THREE.Mesh;
  private radius_: number;
  private center_: THREE.Vector3;
}
