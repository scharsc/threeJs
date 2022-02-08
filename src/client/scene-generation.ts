import axios from "axios";
import * as THREE from "three";

/*
function getSpheres(uuids:string[])
{
    axios
    .get<{ uuids: string[] }>("http://localhost:3000/primitives/sphere")
    .then((response) => {
      console.log(response.data.uuids);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getSphereIds() {
  let sphereuuids: string[];
  axios
    .get<{ uuids: string[] }>("http://localhost:3000/primitives/sphere")
    .then((response) => {
      console.log(response.data.uuids);
    })
    .catch((error) => {
      console.log(error);
    });
}*/

export function createSphere(center: [number, number, number], radius: number) {
  const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
  const geometry = new THREE.SphereGeometry(radius);
  geometry.translate(center[0], center[1], center[2]);
  return new THREE.Mesh(geometry, material);
}

export function createCylinder(
  start: [number, number, number],
  end: [number, number, number],
  radius: number
) {
  const point1 = new THREE.Vector3(start[0], start[1], start[2]);
  const point2 = new THREE.Vector3(end[0], end[1], end[2]);
  var HALF_PI = -Math.PI * 0.5;
  var diff = point1.sub(point2); //delta vector
  var halfLength = diff.length() * 0.5;
  console.log("length:" + halfLength);
  var geometry = new THREE.CylinderGeometry(radius, radius, halfLength * 2);
  var orientation = new THREE.Matrix4(); //a new orientation matrix to offset pivot
  orientation.lookAt(point1, point2, new THREE.Vector3(0, 1, 0)); //look at destination
  orientation = orientation.multiply(
    new THREE.Matrix4().makeRotationX(HALF_PI)
  ); //rotate 90 degs on X
  var offsetPosition = new THREE.Matrix4().identity();
  offsetPosition.setPosition(point2.add(diff.multiplyScalar(0.5))); //move by pivot offset on Y

  geometry.applyMatrix4(orientation); //apply the final matrix
  const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
  return new THREE.Mesh(geometry, material);
}

export function generateScene() {
  const scene = new THREE.Scene();
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  //scene.add(createSphere([0, 0, 0], 1));
  scene.add(createCylinder([0, 0, 0], [1, 1, 1], 0.08));
  scene.add(createCylinder([2, 2, 2], [1, 1, 1], 0.1));
  return scene;
}
