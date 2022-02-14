import * as THREE from "three";
import { AbAxesHelper } from "./AbAxesHelper";
import { AbPrimitive } from "./AbPrimitive";

export class AbBounds3d extends THREE.Object3D implements AbPrimitive {
  constructor(
    public min: THREE.Vector3 = new THREE.Vector3(Infinity, Infinity, Infinity),
    public max: THREE.Vector3 = new THREE.Vector3(
      -Infinity,
      -Infinity,
      -Infinity
    )
  ) {
    super();
  }
}

export class AbBounds3dCs extends THREE.Object3D implements AbPrimitive {
  constructor(
    public localBounds: AbBounds3d //, //public localToWorld: THREE.Matrix4 = new THREE.Matrix4()
  ) {
    super();
  }
}

export class AbScene {
  constructor(
    background: null | THREE.Color | THREE.Texture = new THREE.Color(0xffffff)
  ) {
    this.scene = new THREE.Scene();
    this.scene.background = background;
    this.grid = new THREE.GridHelper(20, 20);
    this.scene.add(this.grid);
    this.axes = new AbAxesHelper(1);
    this.scene.add(this.axes);
    this.primitives = [];
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.scene.add(directionalLight);
  }

  addPrimitive(primitive: AbPrimitive) {
    this.primitives.push(primitive);
    this.scene.add(primitive as THREE.Object3D);
  }

  public scene: THREE.Scene;
  public grid: THREE.GridHelper;
  public axes: AbAxesHelper;
  public primitives: AbPrimitive[];
}


