import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// helper functions
function HexToVertexColor(hex) {
	return [
		parseInt(hex.slice(1, 3), 16) / 256,
		parseInt(hex.slice(3, 5), 16) / 256,
		parseInt(hex.slice(5, 7), 16) / 256,
	]
}

function colorTriangle(col) {
	return HexToVertexColor(col).concat(HexToVertexColor(col)).concat(HexToVertexColor(col))
}

// initial setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
camera.position.z = 5;

// orbit controls
new OrbitControls(camera, renderer.domElement);

// mesh
const geometry = new THREE.BufferGeometry();

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2

	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0  // v5
] );

const colors = new Float32Array([
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2

	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0  // v5
]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.MeshBasicMaterial ( {
	color: 0xffffff,
	vertexColors: true,
	side: THREE.DoubleSide,
} );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// renderer
function animate() {
	renderer.render( scene, camera );
}