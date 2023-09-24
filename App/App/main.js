import * as THREE from "./three.js/build/three.module.js"
import {OrbitControls} from "./three.js/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "./three.js/examples/jsm/loaders/GLTFLoader.js"

const width = window.innerWidth
const height = window.innerHeight

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width, height)
renderer.shadowMap.enabled = true
const camera = new THREE.PerspectiveCamera(45, width / height);

camera.position.z = 10
camera.position.y = 5

const camera1 = new THREE.PerspectiveCamera(45, width / height);
const camera2 = new THREE.PerspectiveCamera(45, width / height);
const camera3 = new THREE.PerspectiveCamera(45, width / height);
const camera4 = new THREE.PerspectiveCamera(45, width / height);
camera1.position.set(100, 100, 100)
camera2.position.set(100, 100, -100)
camera3.position.set(-100, 100, -100)
camera4.position.set(-100, 100, 100)
const cameras = [camera1, camera2, camera3, camera4]
let cameraidx = 0

const controls = new OrbitControls(camera, renderer.domElement)
const controls1 = new OrbitControls(cameras[0], renderer.domElement)
const controls2 = new OrbitControls(cameras[1], renderer.domElement)
const controls3 = new OrbitControls(cameras[2], renderer.domElement)
const controls4 = new OrbitControls(cameras[3], renderer.domElement)

document.body.appendChild(renderer.domElement)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 70, 40);
scene.add(directionalLight);
directionalLight.shadow.camera.left =-100
directionalLight.shadow.camera.right =100
directionalLight.shadow.camera.bottom =-100
directionalLight.shadow.camera.top =100

const color = 0xFFFFFF;
const intensity = 0.3;
const ambientLight = new THREE.AmbientLight(color, intensity);
ambientLight.position.set(2,2,2)
scene.add(ambientLight);

directionalLight.castShadow = true
// const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight );
// scene.add( directionalLightHelper );

const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(shadowHelper)

const cylinderGeometry = new THREE.CylinderGeometry( 5, 5, 20, 40 ); 
const cylinderMaterial = new THREE.MeshStandardMaterial( {color: 0xA9A9A9, flatShading: true} ); 
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
cylinder.position.set(0,15,30)
cylinder.castShadow = true
scene.add( cylinder );

const coneGeometry = new THREE.ConeGeometry( 5, 10, 30 ); 
const coneMaterial = new THREE.MeshStandardMaterial( {color: 0x800000, flatShading: true} );
const cone = new THREE.Mesh(coneGeometry, coneMaterial );
cone.position.set(0,30,30)
cone.castShadow = true
scene.add( cone );

const sphereGeometry = new THREE.SphereGeometry( 10, 32, 16 ); 
const sphereMaterial = new THREE.MeshPhongMaterial( {color: 0xD3D3D3, flatShading: true} ); 
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set(50,35,30)
sphere.castShadow = true
scene.add( sphere );

const torusGeometry = new THREE.TorusGeometry( 18, 3, 16, 100 ); 
const torusMaterial = new THREE.MeshPhongMaterial( {color: 0xD3D3D3, flatShading: true} ); 
const torus = new THREE.Mesh( torusGeometry, torusMaterial );
torus.position.set(50,35,30)
torus.castShadow = true
scene.add( torus );


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./public/texture/moon.jpg");

const boxGeometryAstro = new THREE.BoxGeometry(400, 2, 400)
const boxMaterialAstro = new THREE.MeshStandardMaterial({ map: texture })
const astronautBox = new THREE.Mesh(boxGeometryAstro, boxMaterialAstro)
astronautBox.position.y = 1
scene.add(astronautBox)
astronautBox.receiveShadow = true

let astronaut
let astroX = 0
let astroZ = 0
const gltfLoader = new GLTFLoader()
gltfLoader.load("./public/astronot/scene.gltf",(model)=>{
    astronaut = model.scene
    astronaut.scale.set(7,7,7)
    astronaut.traverse((child)=>{
        child.castShadow = true
    })
    scene.add(astronaut)
})

let meteor
let meteorX = 0
let meteorZ = 0
gltfLoader.load("./public/meteor/scene.gltf",(model)=>{
    meteor = model.scene
    meteor.scale.set(10,10,10)
    meteor.position.set(2,70,70)
    meteor.traverse((child)=>{
        child.castShadow = true
    })
    scene.add(meteor)
})

window.addEventListener('keypress', e=>{
    if(e.key=='a'){
        astroX+=0.5
        astronaut.rotation.set(0, 0.5*Math.PI, 0)
    }
    else if(e.key=='w'){
        astroZ+=0.5
        astronaut.rotation.set(0, 0, 0)
    }
    else if(e.key=='d'){
        astroX-=0.5
        astronaut.rotation.set(0, -0.5*Math.PI, 0)
    }
    else if(e.key=='s'){
        astroZ-=0.5
        astronaut.rotation.set(0, Math.PI, 0)
    }
})


const skyBoxTexture  = [
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("./public/stars/StarSkybox041.png"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("./public/stars/StarSkybox042.png"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("./public/stars/StarSkybox043.png"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("./public/stars/StarSkybox044.png"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("./public/stars/StarSkybox045.png"),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load("./public/stars/StarSkybox046.png"),
        side: THREE.DoubleSide
    })
]



const boxGeometry = new THREE.BoxGeometry(400, 400, 400)
const boxMaterial = new THREE.MeshStandardMaterial()
const box = new THREE.Mesh(boxGeometry, skyBoxTexture)
scene.add(box)



const interactiveObjects = [cylinder, cone, sphere, torus];
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
function onPointerMove(event){
    pointer.x = (event.clientX/window.innerWidth)*2-1
    pointer.y = -(event.clientY/window.innerHeight)*2+1
}
window.addEventListener('mousemove', onPointerMove)

window.addEventListener('keydown', function(e){
    if(e.key===32  || e.which === 32){
        console.log("hello")
        cameraidx = (cameraidx + 1)%4
    }
})


let prevHoveredObject = null

function animate(){
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects);

    if (intersects.length > 0) {
        const hoveredObject = intersects[0].object

        if (prevHoveredObject && prevHoveredObject !== hoveredObject) {
            prevHoveredObject.material.emissive.setHex(0x000000)
        }

        hoveredObject.material.emissive.setHex(0xffffff)
        prevHoveredObject = hoveredObject
    } else if (prevHoveredObject) {
        prevHoveredObject.material.emissive.setHex(0x000000)
        prevHoveredObject = null
    }
    
    renderer.render(scene, cameras[cameraidx])
    
    if(astronaut){
        astronaut.position.set(astroX, 3.75, astroZ)
    }

    if (meteor) {
        const astronautPos = new THREE.Vector3(astroX, 3.75, astroZ)
        const meteorPos = meteor.position.clone()
        const direction = astronautPos.sub(meteorPos).normalize()
        const speed = 0.1
        meteorPos.add(direction.multiplyScalar(speed))
        meteor.position.copy(meteorPos)

        meteor.rotation.x -= 0.01
    }

    torus.rotateX(0.01)
    torus.rotateY(0.01)
    requestAnimationFrame(animate)
}

animate()