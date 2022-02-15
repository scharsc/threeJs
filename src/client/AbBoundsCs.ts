import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";
import { AbBounds } from "./AbBounds";

export class AbBoundsCs extends THREE.Object3D implements AbPrimitive {
  constructor(
    public localBounds: AbBounds,
    lcsToWcs: THREE.Matrix4 | undefined
  ) {
    super();
    this.add(this.localBounds.mesh);
    this.localBounds.matrixAutoUpdate = false;
    if (lcsToWcs) {
      this.lcsToWcs = lcsToWcs;
    }
  }

  get lcsToWcs() {
    return this.localBounds.matrix;
  }

  set lcsToWcs(lcsToWcs: THREE.Matrix4) {
    this.localBounds.matrix.copy(lcsToWcs);
    this.localBounds.matrixWorldNeedsUpdate = true;
  }
}
