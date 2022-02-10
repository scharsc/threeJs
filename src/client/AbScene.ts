import * as THREE from "three";

class AbPrimitive {
  constructor(
    public visible: boolean = true,
    public selected: boolean = false
  ) {}
}

class AbLineSegment extends AbPrimitive {
  constructor(
    public start: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    public end: THREE.Vector3 = new THREE.Vector3(0, 1, 0),
    visible: boolean = true
  ) {
    super(visible);
  }
}

class AbCylinderFinite extends AbPrimitive {
  constructor(
    public axis: AbLineSegment = new AbLineSegment(),
    public radius: number = 1,
    visible: boolean = true,
    selected: boolean = false
  ) {
    super(visible, selected);
  }
}

class AbBounds3d extends AbPrimitive {
  constructor(
    public min: THREE.Vector3 = new THREE.Vector3(Infinity, Infinity, Infinity),
    public max: THREE.Vector3 = new THREE.Vector3(
      -Infinity,
      -Infinity,
      -Infinity
    ),
    visible: boolean = true,
    selected: boolean = false
  ) {
    super(visible, selected);
  }
}

class AbBounds3dCs extends AbPrimitive {
  constructor(
    public localBounds: AbBounds3d,
    public localToWorld: THREE.Matrix4 = new THREE.Matrix4(),
    visible: boolean = true,
    selected: boolean = false
  ) {
    super(visible, selected);
  }
}

class AbRegion {
  constructor(
    public boundary: THREE.Path = new THREE.Path(),
    public holes: THREE.Path[] = []
  ) {}
}

class AbRegion3d extends AbPrimitive {
  constructor(
    public localRegion: AbRegion = new AbRegion(),
    public localToWorld: THREE.Matrix4 = new THREE.Matrix4(),
    visible: boolean = true,
    selected: boolean = false
  ) {
    super(visible, selected);
  }
}

class AbSphere extends AbPrimitive {
  constructor(
    public center: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    public radius: number = 1,
    visible: boolean = true,
    selected: boolean = false
  ) {
    super(visible, selected);
  }
}

export class AbScene {
  constructor() {
    this.scene = new THREE.Scene();
    this.grid = new THREE.GridHelper(20, 20);
    this.scene.add(this.grid);
    this.axes = new THREE.AxesHelper(1);
    this.scene.add(this.axes);
    this.primitives = [];
  }

  public scene: THREE.Scene;
  public grid: THREE.GridHelper;
  public axes: THREE.AxesHelper;
  public primitives: AbPrimitive[];
}
