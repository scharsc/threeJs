import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";
import { AbBounds } from "./AbBounds";

export class AbBoundsCs extends THREE.Object3D implements AbPrimitive {
  constructor(
    public localBounds: AbBounds,
    lcsToWcs: THREE.Matrix4 | undefined
  ) {
    super();

    if (lcsToWcs) {
      this.localBounds.matrixAutoUpdate = false;
      this.lcsToWcs = lcsToWcs;
    }
    this.add(this.localBounds);
  }

  get lcsToWcs() {
    return this.localBounds.matrix;
  }

  set lcsToWcs(lcsToWcs: THREE.Matrix4) {
    this.localBounds.matrix.copy(lcsToWcs);
    this.matrixWorldNeedsUpdate=true;
  }
}
