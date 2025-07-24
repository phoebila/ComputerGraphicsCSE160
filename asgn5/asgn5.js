// Phoebe Royer
// Asgn5

import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {OBJLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/MTLLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

// GLOBAL VARIABLES ------------------------
let canvas;
let scene;
let renderer;
let camera;
let sTex;
let shapes = [];

// Global tex var
let loader;

// map var
const map = [
  [1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //1
  [1,0,1,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //2
  [1,0,1,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //3
  [1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //4
  [1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //5
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //6
  [1,1,0,2,2,0,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //7
  [0,1,0,2,2,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //8
  [0,1,0,2,2,0,1,0,0,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //9
  [0,1,0,2,2,0,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //10
  [0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //11
  [0,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //12
  [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //13
  [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //14
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //15
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //16
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //17
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //18
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //19
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //20
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //21
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //22
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //23 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //24
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //25
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //26
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //27
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //28
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //29
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //30
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //31
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //32
]

function setupTHREE(){
  scene = new THREE.Scene();
  canvas = document.querySelector('#c');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(canvas.width, canvas.height);
  loader = new THREE.TextureLoader();
}

function genScene(){
  // Make ground grass
  const planeSize = 50;
 
  const texture0 = loader.load('./resources/Grass_Block.jpg');
  texture0.wrapS = THREE.RepeatWrapping;
  texture0.wrapT = THREE.RepeatWrapping;
  texture0.magFilter = THREE.NearestFilter;
  const repeats = planeSize / 2;
  texture0.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
      map: texture0,
      side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -.5;
  mesh.position.set(16,-0.5,16)
  scene.add(mesh);

  // Make skybox
  
  const skyLoader = new THREE.CubeTextureLoader();
sTex = skyLoader.load([
  './resources/skyBox.jpg',
      './resources/skyBox.jpg',
  './resources/skyBox.jpg',
      './resources/skyBox.jpg',
  './resources/skyBox.jpg',
  './resources/skyBox.jpg',
]);
  scene.background = sTex;

  // Make Cylinders
  const lcMat = new THREE.MeshPhongMaterial({color: 0x965d35});
  makeCylinder(lcMat,-1,0,-1);

  const rcMat = new THREE.MeshPhongMaterial({color: 0x965d35});
  makeCylinder(rcMat,-1.5,0,2.5);

  // Make Sphere
  const lSphMat = new THREE.MeshPhongMaterial({color: 0x6d437d});
  makeSphere(lSphMat, 7, 8, 3.5, 2);

  // Load up Blocky World
  loader.load('./resources/Dirt_Block.jpg', (texture4) => {
      const material4 = new THREE.MeshPhongMaterial({
        map: texture4,
      });
      for(const x in map) {
          for(const z in map[x]) {
              if(map[x][z] > 0) {
                  let y = map[x][z];
                  for(let i = 0; i < y; i++) {
                      makeCube(material4, x, i, z);
                  }
              }
          }
      }
  });

  // make diamond
    loader.load('./resources/Dirt_Block.jpg', (texture3) => {
        const material3 = new THREE.MeshPhongMaterial({
          map: texture3,
        });
        shapes.push(makeSphere(material3,10,4,4,1.25,1.25,1.25));
    });

  // Add Cat
  const mtlLoader = new MTLLoader();  
  mtlLoader.load('./resources/12221_Cat_v1_l3.mtl', (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load('./resources/12221_Cat_v1_l3.obj', (root) => {
          scene.add(root);
          root.position.x = 1;
          root.position.y = -.5;
          root.position.z = 5;

          root.scale.x = 3/146.33593546453204
          root.scale.y = 3/146.33593546453204
          root.scale.z = 3/146.33593546453204;

          root.rotation.x = -1.5708;
          root.rotation.z = -3;
      });
  });
  
  // Add Ambient Light
  const aColor = 0xd489f0;
  const aIntensity = 0.3;
  const aLight = new THREE.AmbientLight(aColor, aIntensity);
  scene.add(aLight);

  // Add Direction Light
  const dColor = 0xFFFFFF;
  const dIntensity = 1.0;
  const dLight = new THREE.DirectionalLight(dColor, dIntensity);
  dLight.position.set(16, 7, 16);
  dLight.target.position.set(16, 0, 16);
  dLight.target.updateMatrixWorld();
  scene.add(dLight);

  const pColor = 0xf097f0;
  const pIntensity = 1.0;
  const pLight = new THREE.PointLight(pColor, pIntensity);
  pLight.position.set(26, 2, 15);
  scene.add(pLight);

}

function initCamera() {
  const fov = 75;
  const aspect = canvas.width/canvas.height;  // the canvas default
  const near = 0.1;
  const far = 300;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(5,16,5)

  const controls = new OrbitControls(camera, canvas);
	controls.target.set(16, 0, 16);
	controls.update();
}

function genFog(){
  const near = 1;
    const far = 70;
    const color = 'lightpink';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);
}

function main() {
  
   // Set up Three for rendering
   setupTHREE();

   // Scene Objects get made
   genScene();

   // Camera
   initCamera();

   // Fog
   genFog();

  requestAnimationFrame(updateScene); //used for draw and update scene
  // renderShapes();
}

function updateScene(time){

  time *= 0.001;  // convert time to seconds

  // Dynamically resize canvas per frame
  if(canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      camera.aspect = canvas.width/canvas.height;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.width, canvas.height);
  }

  // Draw Sky
  scene.background = sTex;

  shapes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
  });
 
  // Draw Scene
  renderer.render(scene, camera);

  requestAnimationFrame(updateScene);

 }

 function makeCube(material, x = 0, y = 0, z = 0, boxWidth = 1, boxHeight = 1, boxDepth = 1) {
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
 
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
 
  return cube;
}

function makeCylinder(material, x = 0, y = 0, z = 0, rT = 1, rB = 1, h = 3, rS = 12) {
  const geometry = new THREE.CylinderGeometry(rT, rB, h, rS);

  const cylinder = new THREE.Mesh(geometry, material);

  scene.add(cylinder);

  cylinder.position.x = x;
  cylinder.position.y = y;
  cylinder.position.z = z;

  return cylinder;
}
function makeSphere(material, x = 0, y = 0, z = 0, r = 1, wS = 12, h = 12) {
  const geometry = new THREE.SphereGeometry(r, wS, h);

  const sphere = new THREE.Mesh(geometry, material);

  scene.add(sphere);

  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = z;

  return sphere;
}

// Call Main
main();