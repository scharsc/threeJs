import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";

export class AbPointCloud extends THREE.Object3D implements AbPrimitive {
  constructor(
    pointSize: number = 0.005,
    positions: number[] = [],
    normals: number[] = [],
    colors: number[] = []
  ) {
    super();

    this.geometry = new THREE.BufferGeometry();
    if (positions.length > 0)
      this.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
    if (normals.length > 0)
      this.geometry.setAttribute(
        "normal",
        new THREE.Float32BufferAttribute(normals, 3)
      );
    if (colors.length > 0)
      this.geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
    this.geometry.computeBoundingSphere();
    this.material = new THREE.PointsMaterial({ size: pointSize });
    if (colors.length > 0) {
      this.material.vertexColors = true;
    } else {
      this.material.color.setHex(Math.random() * 0xffffff);
    }

    this.mesh = new THREE.Points(this.geometry, this.material);
    this.add(this.mesh);
  }

  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  mesh: THREE.Points;
}
