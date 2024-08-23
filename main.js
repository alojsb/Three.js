import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initial setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
camera.position.z = 5;
//let intersects = [];
let intersectObj;

// orbit controls
new OrbitControls(camera, renderer.domElement);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	//console.log(pointer.x + ", " + pointer.y);
}

// mesh
const geometry = new THREE.BufferGeometry();

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array([
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2

	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0,  // v5

	 1.0,  1.0,  1.0, // v6
	-1.0,  1.0,  1.0, // v7
	 0.0,  2.0,  1.0, // v8
]);

const colors = new Float32Array([
	 0.54, 0.08, 0.22, // v0
	 0.54, 0.08, 0.22, // v1
	 0.54, 0.08, 0.22, // v2

	 0.77, 0.38, 0.15, // v3
	 0.77, 0.38, 0.15, // v4
	 0.77, 0.38, 0.15, // v5

	 0.13, 0.58, 0.05, // v6
	 0.13, 0.58, 0.05, // v7
	 0.13, 0.58, 0.05, // v8
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
	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	// affects all intersecting objects
	// for ( let i = 0; i < intersects.length; i ++ ) {
	// 	intersects[ i ].object.material.color.set( 0x0000ff );
	// }

	// affects nearest intersecting object
	if (intersects.length > 0 && pointer.x && pointer.y) {
        if (intersectObj != intersects[ 0 ].object) {
            // notice new object
            intersectObj = intersects[ 0 ].object;
            intersectObj.material.color.setHex( 0xff0000 );
        }
	}
	else {
        // reset color
        if (intersectObj) {
            intersectObj.material.color.setHex( 0xffffff );
            intersectObj = null;
        }
	}
	//console.log(intersects);
	renderer.render( scene, camera );
}

window.addEventListener( 'pointermove', onPointerMove );