import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";

export class AbTorus extends THREE.Object3D implements AbPrimitive {
  constructor(
    center: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    radius: number = 1,
    tubeRadius: number = 1,
    arcAngleRad: number = Math.PI * 2
  ) {
    super();
    this.material = new THREE.MeshLambertMaterial({
      color: "rgb(255, 0, 0)",
    });

    this.center_ = center;
    this.radius_ = radius;
    this.tubeRadius_ = tubeRadius;
    this.arcAngleRad_ = arcAngleRad;

    this.geometry = new THREE.TorusGeometry(
      radius,
      tubeRadius,
      undefined,
      undefined,
      arcAngleRad
    );

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.add(this.mesh);
  }

  get center(): THREE.Vector3 {
    return this.center_;
  }

  set center(value: THREE.Vector3) {
    this.center_ = value;
    this.updatePosition();
  }

  get radius(): number {
    return this.radius_;
  }

  set radius(value: number) {
    this.radius_ = value;
    this.updateGeometry();
  }

  get tubeRadius(): number {
    return this.tubeRadius_;
  }

  set tubeRadius(value: number) {
    this.tubeRadius_ = value;
    this.updateGeometry();
  }

  get arcAngleRad(): number {
    return this.arcAngleRad_;
  }

  set arcAngleRad(value: number) {
    this.arcAngleRad_ = value;
    this.updateGeometry();
  }

  private updatePosition() {
    this.mesh.position.copy(this.center_);
  }

  private updateGeometry() {
    this.mesh.geometry = new THREE.TorusGeometry(
      this.radius_,
      this.tubeRadius_,
      undefined,
      undefined,
      this.arcAngleRad_
    );
  }

  geometry: THREE.TorusGeometry;
  material: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;
  private radius_: number;
  private tubeRadius_: number;
  private arcAngleRad_: number;
  private center_: THREE.Vector3;
}
