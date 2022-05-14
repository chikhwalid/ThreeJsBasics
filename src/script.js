import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const canvas = document.querySelector("canvas.webgl");
const changeBtnColor = document.querySelector(".js--change--color");
const changeBtnModel = document.querySelector(".js--change--model");
const changeBtnRotationOn = document.querySelector(".js--rotation--on");
const changeBtnRotationOff = document.querySelector(".js--rotation--off");
let rotate = 0;
const colorSet = {
  color: 0xffe2ef,
};
// MODELS
const listModel = {
  box: new THREE.BoxGeometry(1, 1, 1),
  cylinder: new THREE.CylinderGeometry(1, 1, 2),
  sphere: new THREE.SphereGeometry(1, 32, 16),
};
let modelSet = listModel.box;
// CURSOR
const cursor = {
  x: 0,
  y: 0,
};
// Sizes
const sizes = {
  width: 800,
  height: 600,
};
// console.log(modelSet.cylinder);
// CREATE SCENE
const scene = new THREE.Scene();
//CREATE OBJECT
let geometry = modelSet;
const material = new THREE.MeshBasicMaterial({ color: colorSet });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//CREATE CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);
const controle = new OrbitControls(camera, canvas);
controle.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  mesh.rotation.x += rotate;
  mesh.geometry = modelSet;
  mesh.material.color.setHex(colorSet.color);
  camera.lookAt(mesh.position);
  controle.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
//CHANGE COLOR MODEL
changeBtnColor.addEventListener("click", (e) => {
  colorSet.color = Math.random() * 0xffffff;
});
//CHANGE MODEL
changeBtnModel.addEventListener("click", (e) => {
  e.preventDefault();
  const rand = Math.floor(Math.random() * 3 + 1);
  console.log(rand);
  switch (rand) {
    case 1:
      modelSet = listModel.box;
      break;
    case 2:
      modelSet = listModel.cylinder;
      break;
    case 3:
      modelSet = listModel.sphere;
      break;
  }
});
// ROTATION ON
changeBtnRotationOn.addEventListener("click", (e) => {
  e.preventDefault();
  rotate = 0.01;
});
// ROTATION OFF
changeBtnRotationOff.addEventListener("click", (e) => {
  e.preventDefault();
  rotate = 0;
});
window.addEventListener("mousemove", (e) => {
  e.preventDefault();
  cursor.x = e.clientX / sizes.width - 0.5; // avant de metre -0.5 les cords de curseur selon x trou7 m 0 a 1, mais lorsque on ajout -0.5 on vas met le centre de render a 0 et donc a gauche c -0.5 et a droite 0.5
  cursor.y = -(e.clientY / sizes.height - 0.5);
  // console.log(cursor.x, cursor.y); // e.clientX to get our cursor value
});
// /**
//  * CURSOR
//  */
// const cursor = {
//   x: 0,
//   y: 0,
// };
// window.addEventListener("mousemove", (e) => {
//   e.preventDefault();
//   cursor.x = e.clientX / sizes.width - 0.5; // avant de metre -0.5 les cords de curseur selon x trou7 m 0 a 1, mais lorsque on ajout -0.5 on vas met le centre de render a 0 et donc a gauche c -0.5 et a droite 0.5
//   cursor.y = -(e.clientY / sizes.height - 0.5);
//   //   console.log(cursor.x); // e.clientX to get our cursor value
// });

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Sizes
// const sizes = {
//   width: 800,
//   height: 600,
// };

// // Scene
// const scene = new THREE.Scene();

// // Object
// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 })
// );
// scene.add(mesh);

// // Camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// // const aspectRation = sizes.width / sizes.height; // on utilise aspectRation pour fixé le probléme de déformation de l'objet
// // const camera = new THREE.OrthographicCamera(
// //   -1 * aspectRation,
// //   1 * aspectRation,
// //   1,
// //   -1,
// //   0.1,
// //   100
// // );
// // camera.position.x = 2;
// // camera.position.y = 2;
// camera.position.z = 3;
// // camera.lookAt(mesh.position);
// scene.add(camera);

// const controls = new OrbitControls(camera, canvas); // do all the work
// controls.enableDamping = true;

// // Renderer
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);

// // Animate
// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   // Update objects
//   //   mesh.rotation.y = elapsedTime;

//   // update camera
//   //   // camera rotation for the cube
//   //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3; // cursor.x * 4,   *4 pour visualisé bien l'objet
//   //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
//   //   camera.position.y = cursor.y * Math.PI;
//   //   camera.lookAt(mesh.position);

//   // updating Controles
//   controls.update(); // dont forgot to uprate the controles in each fram
//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();
