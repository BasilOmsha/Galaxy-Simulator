import * as THREE from 'three';
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera';

let instance = null

export default class Experience {
    constructor(canvas) {

        // Singleton.Allows to import the Experience wherever we need it in our code and then instantiate it to retrieve the first instance.
        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })

    }

    resize() {
        // console.log('resize occured')
        this.camera.resize()
    }

    update() {
        this.camera.update()
    }

}