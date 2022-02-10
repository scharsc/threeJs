import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { AbScene } from "./AbScene";

export class AbView {
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  camera: THREE.PerspectiveCamera;
  scene: AbScene;
  htmlElement: HTMLElement;

  constructor(
    scene: AbScene,
    htmlElement: HTMLElement = document.body,
    cameraPosition = new THREE.Vector3(10, 10, 10),
    cameraTarget = new THREE.Vector3(0, 0, 0)
  ) {
    this.htmlElement = htmlElement;
    this.scene = scene;
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

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(new THREE.Color(0x222222));
    this.renderer.setPixelRatio(window.devicePixelRatio);
    htmlElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    htmlElement.addEventListener(
      "resize",
      this.onWindowResize.bind(this),
      false
    );
  }

  onWindowResize() {
    this.camera.aspect =
      this.htmlElement.offsetWidth / this.htmlElement.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.htmlElement.offsetWidth,
      this.htmlElement.offsetHeight
    );
    this.render();
  }

  render() {
    this.renderer.render(this.scene.scene, this.camera);
  }
}

export class AbApplication {
  constructor() {}

  addView(htmlElement: HTMLElement) {
    this.views.push(new AbView(this.scene, htmlElement));
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    for (var view of this.views) {
      view.render();
    }
  }

  scene: AbScene = new AbScene();
  views: AbView[] = [];
}
