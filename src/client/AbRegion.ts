import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";

export class AbRegion extends THREE.Object3D implements AbPrimitive {
  constructor(
    boundaryPoints: THREE.Vector2[],
    holes: THREE.Vector2[][] | undefined = undefined,
    lcsToWcs: THREE.Matrix4 | undefined = undefined
  ) {
    super();

    const boundaryShape = new THREE.Shape(boundaryPoints);
    if (holes) {
      for (const hole of holes) {
        const holePath = new THREE.Path(hole);
        boundaryShape.holes.push(holePath);
      }
    }

    this.mesh = new THREE.Mesh(
      new THREE.ShapeGeometry(boundaryShape),
      new THREE.MeshLambertMaterial({
        color: "rgb(255, 0, 0)",
        side: THREE.DoubleSide,
      })
    );
    this.add(this.mesh);

    if (lcsToWcs) {
      this.matrixAutoUpdate = false;
      this.matrix.copy(lcsToWcs);
      this.matrixWorldNeedsUpdate = true;
    }
  }

  mesh: THREE.Mesh;
}
