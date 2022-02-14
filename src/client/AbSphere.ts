import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";

export class AbSphere extends THREE.Object3D implements AbPrimitive {
  constructor(
    center: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    radius: number = 1
  ) {
    super();
    this.material = new THREE.MeshLambertMaterial({ color: "rgb(255, 0, 0)" });
    this.mesh = new THREE.Mesh(AbSphere.geometry, this.material);
    this.mesh.position.copy(center);
    this.radius_ = radius;
    this.mesh.scale.set(this.radius_, this.radius_, this.radius_);
    this.add(this.mesh);
  }

  get center(): THREE.Vector3 {
    return this.mesh.position;
  }

  set center(value: THREE.Vector3) {
    this.mesh.position.copy(value);
  }

  get radius(): number {
    return this.radius_;
  }

  set radius(value: number) {
    this.radius_ = value;
    this.mesh.scale.set(this.radius_, this.radius_, this.radius_);
  }

  static geometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry(
    1.0,
    3
  );

  material: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;
  private radius_: number;
}
