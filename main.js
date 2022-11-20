import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/*
1 - Scene
2 - Camera
3 - Renderer
*/

// It is like a container
const scene = new THREE.Scene()
// innerWidth / 2 and false last argument
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight)

camera.position.setZ(30)

renderer.render(scene, camera)

// object
const geometry = new THREE.BoxGeometry(8,8,8)
// material
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe:true,
})

// color of object
material.color = new THREE.Color('#F58A07')

const mesh = new THREE.Mesh( geometry, material)
scene.add(mesh)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper, gridHelper)

renderer.render(scene,camera)

const controls = new OrbitControls(camera, renderer.domElement)



function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({
        color: 'black',
    })

    const star = new THREE.Mesh( geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
}

Array(1000).fill().forEach(addStar)


function animate() {

    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.005
    mesh.rotation.z += 0.01

    controls.update()

    requestAnimationFrame( animate )
    renderer.render(scene,camera)
}

animate()