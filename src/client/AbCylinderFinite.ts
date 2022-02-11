import * as THREE from "three";
import { AbPrimitive } from "./AbPrimitive";
import {AbLineSegment } from "./AbLineSegment";


export class AbCylinderFinite extends THREE.Object3D implements AbPrimitive {
    constructor(
      public axis: AbLineSegment = new AbLineSegment(),
      public radius: number = 1
    ) {
      super();
      this.material = new THREE.MeshLambertMaterial({ color: "rgb(230, 230, 230)" });
      this.mesh = new THREE.Mesh(AbCylinderFinite.geometry, this.material);
      this.mesh.position.copy(axis.center);
      this.radius_ = radius;
      this.mesh.scale.set(this.radius_, axis.height, this.radius_);
      const delta = axis.start.clone().sub(axis.end).normalize();
      const zAxis = new THREE.Vector3(0, 1, 0);
      const dir = zAxis.clone().cross(delta).normalize();
      this.mesh.setRotationFromAxisAngle(dir, zAxis.angleTo(delta));
      this.axis_ = axis;
      this.add(this.mesh);
    }
  
    static geometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(
      1.0,
      1.0,
      1.0,
      15,
      1,true
    );
  
    
  
    material: THREE.MeshLambertMaterial;
    mesh: THREE.Mesh;
    private radius_: number;
    private axis_: AbLineSegment;
  }