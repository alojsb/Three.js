import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getFresnelMat } from "./static/src/getFresnelMat.js";

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

// axial tilt
const earthGroup = new THREE.Group();
earthGroup.rotation.z = 23.5 * Math.PI / 180;
scene.add(earthGroup);

// planet
const planetSurface = new THREE.TextureLoader().load("static/textures/earthmap1k.jpg");
const geometry = new THREE.IcosahedronGeometry(1, 8);
const material = new THREE.MeshStandardMaterial({
    map: planetSurface,
    // color: 0xdcafbb,
    // flatShading: true,
    // wireframe: true
});
const geoide = new THREE.Mesh(geometry, material);
earthGroup.add(geoide);

// nightside lights
const nightLightSurface = new THREE.TextureLoader().load("static/textures/earthlights1k.jpg");
const nightlightMaterial = new THREE.MeshStandardMaterial({
    map: nightLightSurface,
    blending: THREE.AdditiveBlending
});
const nightEarth = new THREE.Mesh(geometry, nightlightMaterial);
earthGroup.add(nightEarth);

// clouds
const cloudLayer = new THREE.TextureLoader().load("static/textures/earthcloudmap.jpg");
const cloudMaterial = new THREE.MeshStandardMaterial({
    map: cloudLayer,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.45
});
const cloudMesh = new THREE.Mesh(geometry, cloudMaterial);
cloudMesh.scale.setScalar(1.01);
earthGroup.add(cloudMesh);

// atmospheric glow
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.02);
earthGroup.add(glowMesh);

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff);
directionalLight.position.set(-2, 0, 0);
scene.add( directionalLight );

// render loop
function animate() {
    geoide.rotation.y += rotationSpeed;
    nightEarth.rotation.y += rotationSpeed;
    cloudMesh.rotation.y += rotationSpeed * 1.5;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
