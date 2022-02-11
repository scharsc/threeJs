import * as THREE from "three";
import { Object3D, Vector3 } from "three";
import { AbAxesHelper } from "./AbAxesHelper";
import { AbPrimitive } from "./AbPrimitive";

export class AbLineSegment extends Object3D implements AbPrimitive {
  constructor(
    public start: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    public end: THREE.Vector3 = new THREE.Vector3(0, 1, 0)
  ) {
    super();
  }

  get height(): number {
    return this.start.distanceTo(this.end);
  }
}

export class AbBounds3d extends Object3D implements AbPrimitive {
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

export class AbBounds3dCs extends Object3D implements AbPrimitive {
  constructor(
    public localBounds: AbBounds3d //, //public localToWorld: THREE.Matrix4 = new THREE.Matrix4()
  ) {
    super();
  }
}

export class AbRegion {
  constructor(
    public boundary: THREE.Path = new THREE.Path(),
    public holes: THREE.Path[] = []
  ) {}
}

export class AbRegion3d extends Object3D implements AbPrimitive {
  constructor(
    public localRegion: AbRegion = new AbRegion() //public localToWorld: THREE.Matrix4 = new THREE.Matrix4()
  ) {
    super();
  }
}

export class AbCylinderFinite extends Object3D implements AbPrimitive {
  constructor(
    public axis: AbLineSegment = new AbLineSegment(),
    public radius: number = 1
  ) {
    super();
    this.material = new THREE.MeshLambertMaterial({ color: "rgb(255, 0, 0)" });
    this.mesh = new THREE.Mesh(AbCylinderFinite.geometry, this.material);
    this.mesh.position.copy(axis.start);
    this.radius_ = radius;
    this.mesh.scale.set(this.radius_, axis.height, this.radius_);
    const delta = axis.start.clone().sub(axis.end).normalize();
    const zAxis = new Vector3(0,1,0);
    const dir = zAxis.clone().cross(delta).normalize();
    this.mesh.setRotationFromAxisAngle(dir,zAxis.angleTo(delta));
    this.axis_ = axis;
    this.add(this.mesh);
  }

  static geometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(
    1.0,
    1.0,
    1.0,
    15,
    1
  );

  material: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;
  private radius_: number;
  private axis_: AbLineSegment;
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
    this.scene.add(primitive as Object3D);
  }

  public scene: THREE.Scene;
  public grid: THREE.GridHelper;
  public axes: AbAxesHelper;
  public primitives: AbPrimitive[];
}
