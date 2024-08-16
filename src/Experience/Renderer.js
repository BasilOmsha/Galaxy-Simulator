import * as THREE from 'three'
import Experience from './Experience.js'

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        // Properties retrieved fromthe parent class (Experience)
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()

    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.outputColorSpace = THREE.LinearSRGBColorSpace;
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio) // pixel ratio was calculated in the Sizes class
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.instance.render(this.scene, this.camera.instance) // the camera property is an instance of the Camera class, not the Three.js camera
    }

}