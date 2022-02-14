import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { AbSphere } from "./AbSphere";
import { AbCylinderFinite } from "./AbCylinderFinite";
import { AbScene } from "./AbScene";
import {AbLineSegment} from "./AbLineSegment";


function randomPoint(pMin:THREE.Vector3=new THREE.Vector3(-1,-1,-1), pMax:THREE.Vector3=new THREE.Vector3(1,1,1))
{
  const delta = pMax.clone().sub(pMin);
  return new THREE.Vector3(
    Math.random() * delta.x,
    Math.random() * delta.y,
    Math.random() * delta.z
  ).add(pMin);
}

function randomUniform(a:number=0, b:number=1)
{
  return a + Math.random()*(b-a);
}

function randomLineSegment(
  pMin:THREE.Vector3=new THREE.Vector3(-1,-1,-1),
  pMax:THREE.Vector3=new THREE.Vector3(1,1,1),
 )
{
  return new AbLineSegment(randomPoint(pMin,pMax), randomPoint(pMin,pMax));
}


function randomCylinderFinite(radiusMin:number=.01, radiusMax:number=1,
  pMin:THREE.Vector3=new THREE.Vector3(-1,-1,-1),
pMax:THREE.Vector3=new THREE.Vector3(1,1,1))
{
  return new AbCylinderFinite(
    randomLineSegment(pMin,pMax),
    randomUniform(radiusMin,radiusMax)
  );
}

function randomSphere(radiusMin:number=.01, radiusMax:number=1,  
  pMin:THREE.Vector3=new THREE.Vector3(-1,-1,-1),
 pMax:THREE.Vector3=new THREE.Vector3(1,1,1))
{
  return new AbSphere(
    randomPoint(pMin,pMax),
    randomUniform(radiusMin, radiusMax)
  )
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


  createRandomScene(count: number = 5000) {
    for (var i = 0; i < count; ++i) {
      this.scene.addPrimitive(randomSphere(0.1,0.20,new THREE.Vector3(-5,0,-5), new THREE.Vector3(5,2.5,5)));
    }
  }

  createRandomScene2(count: number = 5000) {
    for (var i = 0; i < count; ++i) {
      this.scene.addPrimitive(randomCylinderFinite(0.1,0.2,new THREE.Vector3(-5,2.5,-5), new THREE.Vector3(5,5,5)));
    }
  }
  createScene3()
  {
    
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
    //var intersects = this.raycaster.intersectObjects(this.scene.objects);
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
