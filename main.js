import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.01;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

const scene = new THREE.Scene();

const caster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


const shapes = {

  icosahedrons: [
    makeIcosahedron(new THREE.IcosahedronGeometry(2882 / 2000, 5), new THREE.MeshStandardMaterial({
      vertexColors: true
    }))
  ],

};

scene.add(new THREE.AmbientLight(0xffffff, 1));

function onClick(event) {

  event.preventDefault();

  mouse.x = (event.clientX / renderer.domElement.offsetWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.offsetHeight) * 2 + 1;

  caster.setFromCamera(mouse, camera);

  const intersects = caster.intersectObjects(scene.children);

  if (intersects.length > 0) {

    const intersection = intersects[0];

    const colorAttribute = intersection.object.geometry.getAttribute('color');
    const face = intersection.face;

    const color = new THREE.Color(Math.random() * 0xff0000);

    colorAttribute.setXYZ(face.a, color.r, color.g, color.b);
    colorAttribute.setXYZ(face.b, color.r, color.g, color.b);
    colorAttribute.setXYZ(face.c, color.r, color.g, color.b);

    colorAttribute.needsUpdate = true;

  }

}

function makeIcosahedron(geometry, materials, x = 0, y = 0) {

  const icosahedron = new THREE.Mesh(geometry, materials);

  const positionAttribute = geometry.getAttribute('position');
  const colors = [];

  for (let i = 0; i < positionAttribute.count; i++) {

    colors.push(1, 1, 1); // add for each vertex color data

  }

  const colorAttribute = new THREE.Float32BufferAttribute(colors, 3);
  geometry.setAttribute('color', colorAttribute);

  icosahedron.position.x = x;
  icosahedron.position.y = y;

  scene.add(icosahedron);

  return icosahedron;

}

function render() {

  requestAnimationFrame(render);

  renderer.render(scene, camera);

}

window.addEventListener("click", onClick, false);

render();
