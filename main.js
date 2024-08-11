import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// initialize
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;
const rotationSpeed = 0.0005;

// orbit controls
new OrbitControls(camera, renderer.domElement);

// tetrahedron
const geo = new THREE.TetrahedronGeometry(2);
const mat = new THREE.MeshNormalMaterial();
const obj = new THREE.Mesh(geo, mat);
scene.add(obj);


// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff);
directionalLight.position.set(-2, 0, 0);
scene.add( directionalLight );

// render loop
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
