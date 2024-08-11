import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

new OrbitControls(camera, renderer.domElement);

var geometry = new THREE.CylinderGeometry(1, 1, 3, 24, 1, false);
var material = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: new THREE.Color("red")
    },
    color2: {
      value: new THREE.Color("purple")
    }
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
  wireframe: false
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);



render();

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}