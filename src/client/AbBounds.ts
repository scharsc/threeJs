
import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";

export class AbBounds extends THREE.Object3D implements AbPrimitive {
    constructor(
       min: THREE.Vector3 = new THREE.Vector3(Infinity, Infinity, Infinity),
       max: THREE.Vector3 = new THREE.Vector3(
        -Infinity,
        -Infinity,
        -Infinity
      )
    ) {
      super();
        this.material = new THREE.MeshLambertMaterial({
          color: "rgb(255, 0, 0)",
        });
        this.min_ = min;
        this.max_ = max;
        this.mesh = new THREE.Mesh(AbBounds.geometry, this.material);
        this.updateMesh();
        this.add(this.mesh);  
    }

    set min (value: THREE.Vector3) {
        this.min_ = value;
        this.updateMesh();
    }

    get min () {
        return this.min_;
    }

    set max (value: THREE.Vector3) {
        this.max_ = value;
        this.updateMesh();
    }

    get max () {
        return this.max_;
    }

    private updateMesh()
    {
      this.mesh.position.lerpVectors(this.min_,this.max_, 0.5);
      this.mesh.scale.subVectors(this.max_, this.min_);
    }

    static geometry: THREE.BoxGeometry = new THREE.BoxGeometry();

    material: THREE.MeshLambertMaterial;
    mesh: THREE.Mesh;
    private min_: THREE.Vector3;
    private max_: THREE.Vector3;

  
}