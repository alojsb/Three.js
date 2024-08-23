import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initial setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
camera.position.z = 15;
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

// set up mesh
const geometry = new THREE.IcosahedronGeometry(12, 48);
const material = new THREE.MeshBasicMaterial ( {
	color: 0xffffff,
	wireframe: true
	//vertexColors: true,
	//side: THREE.DoubleSide,
} );
//const material = new THREE.MeshBasicMaterial();
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
	console.log(intersects);
	renderer.render( scene, camera );
}

window.addEventListener( 'pointermove', onPointerMove );