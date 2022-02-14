import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";

export class AbRegion extends THREE.Object3D implements AbPrimitive {
  constructor(
    boundaryPoints: THREE.Vector2[],
    holes: THREE.Vector2[][] | undefined = undefined,
    lcsToWcs: THREE.Matrix4 | undefined = undefined
  ) {
    super();
    this.material = new THREE.MeshLambertMaterial({ color: "rgb(255, 0, 0)" });
    this.material.side = THREE.DoubleSide;
    const boundaryShape = new THREE.Shape(boundaryPoints);
    if (holes) {
      for (const hole of holes) {
        const holePath = new THREE.Path(hole);
        boundaryShape.holes.push(holePath);
      }
    }
    this.geometry = new THREE.ShapeGeometry(boundaryShape);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.add(this.mesh);

    if (lcsToWcs) {
      this.matrixAutoUpdate = false;
      this.matrix.copy(lcsToWcs);
      this.matrixWorldNeedsUpdate = true;
    }
  }

  geometry: THREE.ShapeGeometry;
  material: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;
}
