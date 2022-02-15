import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { AbSphere } from "./AbSphere";
import { AbCylinderFinite } from "./AbCylinderFinite";
import { AbScene } from "./AbScene";
import { AbLineSegment } from "./AbLineSegment";
import { AbRegion } from "./AbRegion";
import { AbPointCloud } from "./AbPointCloud";
import { AbConeFinite } from "./AbConeFinite";
import { AbBoundsCs } from "./AbBoundsCs";
import { AbBounds } from "./AbBounds";

function randomPoint(
  pMin: THREE.Vector3 = new THREE.Vector3(-1, -1, -1),
  pMax: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
) {
  const delta = pMax.clone().sub(pMin);
  return new THREE.Vector3(
    Math.random() * delta.x,
    Math.random() * delta.y,
    Math.random() * delta.z
  ).add(pMin);
}

function randomUniform(a: number = 0, b: number = 1) {
  return a + Math.random() * (b - a);
}

function randomNormal(mu: number = 0, sigma: number = 1) {
  var u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  var x = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mu + x * sigma;
}

function randomDirection() {
  return new THREE.Vector3(
    randomNormal(),
    randomNormal(),
    randomNormal()
  ).normalize();
}

function randomRigidTrafo(
  pMin: THREE.Vector3 = new THREE.Vector3(-1, -1, -1),
  pMax: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
) {
  let trafo = new THREE.Matrix4().makeTranslation(
    randomUniform(pMin.x, pMax.x),
    randomUniform(pMin.y, pMax.y),
    randomUniform(pMin.z, pMax.z)
  );
  return trafo.multiply(
    new THREE.Matrix4().makeRotationAxis(
      randomDirection(),
      randomUniform(0, 2 * Math.PI)
    )
  );
}

function randomBounds(
  pMin: THREE.Vector3 = new THREE.Vector3(-1, -1, -1),
  pMax: THREE.Vector3 = new THREE.Vector3(1, 1, 1),
  scaleRange: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
) {
  let halfScale = scaleRange.clone().multiplyScalar(0.5);
  let center = randomPoint(
    pMin.clone().add(halfScale),
    pMax.clone().sub(halfScale)
  );
  let halfExtent = randomPoint(new THREE.Vector3(0, 0, 0), halfScale);
  let p1 = new THREE.Vector3().subVectors(center, halfExtent);
  let p2 = new THREE.Vector3().addVectors(center, halfExtent);

  return new AbBounds(p1, p2);
}

function randomBoundsCs(
  pMin: THREE.Vector3 = new THREE.Vector3(-1, -1, -1),
  pMax: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
) {
  return new AbBoundsCs(
    randomBounds(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)),
    randomRigidTrafo(pMin, pMax)
  );
}

function randomLineSegment(
  pMin: THREE.Vector3 = new THREE.Vector3(-1, -1, -1),
  pMax: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
) {
  return new AbLineSegment(randomPoint(pMin, pMax), randomPoint(pMin, pMax));
}

function randomCylinderFinite(
  radiusMin: number = 0.01,
  radiusMax: number = 1,
  pMin: THREE.Vector3 = new THREE.Vector3(-1, -1, -1),
  pMax: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
) {
  return new AbCylinderFinite(
    randomLineSegment(pMin, pMax),
    randomUniform(radiusMin, radiusMax)
  );
}

function randomConeFinite(
  radiusMin: number = 0.01,
  radiusMax: number = 1,
  pMin: THREE.Vector3 = new THREE.Vector3(-1, -1, -1),
  pMax: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
) {
  return new AbConeFinite(
    randomLineSegment(pMin, pMax),
    1.0,
    randomUniform(radiusMin, radiusMax)
  );
}

function randomSphere(
  radiusMin: number = 0.01,
  radiusMax: number = 1,
  pMin: THREE.Vector3 = new THREE.Vector3(-1, -1, -1),
  pMax: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
) {
  return new AbSphere(
    randomPoint(pMin, pMax),
    randomUniform(radiusMin, radiusMax)
  );
}

export class AbApplication {
  constructor(
    htmlElement: HTMLElement = document.body,
    cameraPosition = new THREE.Vector3(10, 10, 10),
    cameraTarget = new THREE.Vector3(0, 0, 0)
  ) {
    this.scene = new AbScene();
    // setup camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
    this.camera.lookAt(cameraTarget);

    // setup up renderer
    this.htmlElement = htmlElement;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.htmlElement.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    document.addEventListener("mousedown", this.onMouseDown.bind(this));

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;

    this.stats = Stats();
    this.htmlElement.appendChild(this.stats.dom);
  }

  createRandomSpheres(count: number = 5000) {
    for (var i = 0; i < count; ++i) {
      this.scene.addPrimitive(
        randomSphere(
          0.1,
          0.2,
          new THREE.Vector3(-5, 0, -5),
          new THREE.Vector3(5, 2.5, 5)
        )
      );
    }
  }

  createRandomCylinders(count: number = 5000) {
    for (var i = 0; i < count; ++i) {
      this.scene.addPrimitive(
        randomCylinderFinite(
          0.1,
          0.2,
          new THREE.Vector3(-5, 2.5, -5),
          new THREE.Vector3(5, 5, 5)
        )
      );
    }
  }

  createRandomBounds(count: number = 5000) {
    for (var i = 0; i < count; ++i) {
      this.scene.addPrimitive(
        randomBounds(
          new THREE.Vector3(-5, 5, -5),
          new THREE.Vector3(5, 7.25, 5)
        )
      );
    }
  }

  createRandomBoundsCs(count: number = 5000) {
    for (var i = 0; i < count; ++i) {
      this.scene.addPrimitive(
        randomBoundsCs(
          new THREE.Vector3(-5, 10.0, -5),
          new THREE.Vector3(5, 12.5, 5)
        )
      );
    }
  }

  createRegions() {
    const boundaryPoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ];

    const hole = [
      new THREE.Vector2(0.1, 0.1),
      new THREE.Vector2(0.9, 0.1),
      new THREE.Vector2(0.9, 0.9),
      new THREE.Vector2(0.1, 0.9),
    ];

    const region = new AbRegion(boundaryPoints, [hole]);
    region.translateX(10);
    this.scene.addPrimitive(region);
  }

  createRandomCones(count: number = 500) {
    for (var i = 0; i < count; ++i) {
      this.scene.addPrimitive(
        randomConeFinite(
          0.1,
          0.2,
          new THREE.Vector3(-5, 7.5, -5),
          new THREE.Vector3(5, 10, 5)
        )
      );
    }
  }

  createRandomPointCloud(numPoints: number = 100000, pointSize: number = 0.1) {
    const positions: number[] = [];
    const colors: number[] = [];
    const normals: number[] = [];

    const color = new THREE.Color();

    for (let i = 0; i < numPoints; i++) {
      // positions
      const x = randomUniform(-10, 10);
      const y = randomUniform(-10, 10);
      const z = randomUniform(-10, 10);
      positions.push(x, y, z);

      // normals
      const nx = randomNormal();
      const ny = randomNormal();
      const nz = randomNormal();
      const l = 1.0 / Math.sqrt(nx * nx + ny * ny + nz * nz);
      normals.push(l * nx, l * ny, l * nz);

      // colors
      color.setRGB(Math.random(), Math.random(), Math.random());
      colors.push(color.r, color.g, color.b);
    }
    const pc = new AbPointCloud(pointSize, positions, [], colors);
    this.scene.addPrimitive(pc);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.render();
    this.stats.update();
  }

  render() {
    this.renderer.render(this.scene.scene, this.camera);
  }

  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    var mouse3D = new THREE.Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    this.raycaster.setFromCamera(mouse3D, this.camera);

    //var intersects = this.raycaster.intersectObjects(this.scene.scene,true);
    //console.log(intersects);
    //if (intersects.length > 0) {

    //      intersects[0].select();
    //   }
  }

  raycaster: THREE.Raycaster = new THREE.Raycaster();

  scene: AbScene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  htmlElement: HTMLElement;

  stats: Stats;
}
