import * as THREE from 'three'
import Experience from "./Experience"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    constructor() {

        // Experience instantiated here because we need access to its properties which are Sizes, scene and canvas classes
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()

    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        // this.instance.position.set(1, 3, 1)
        this.instance.position.x = 3
        this.instance.position.y = 3
        this.instance.position.z = 3
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    // called from parent class (Experience)
    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }

}