import * as THREE from "three";

export class AbAxesHelper extends THREE.Object3D {
    constructor(size: number = 1) {
      super();
  
      this.xAxis = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 0, 0),
        size,
        0xff0000
      );
      this.add(this.xAxis);
  
      this.yAxis = new THREE.ArrowHelper(
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(0, 0, 0),
        size,
        0x00ff00
      );
      this.add(this.yAxis);
      this.zAxis = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, 0),
        size,
        0x0000ff
      );
  
      this.add(this.zAxis);
      this.translateY(0.001);
    }
  
    xAxis: THREE.ArrowHelper;
    yAxis: THREE.ArrowHelper;
    zAxis: THREE.ArrowHelper;
  }