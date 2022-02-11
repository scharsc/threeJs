import * as THREE from "three";
import {AbPrimitive} from "./AbPrimitive"

export class AbLineSegment extends THREE.Object3D implements AbPrimitive {
    constructor(
      public start: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
      public end: THREE.Vector3 = new THREE.Vector3(0, 1, 0)
    ) {
      super();
    }
  
    get center(): THREE.Vector3 {
      return this.end.clone().sub(this.start).multiplyScalar(0.5).add(this.start);
    }
  
    get height(): number {
      return this.start.distanceTo(this.end);
    }
  }