import * as THREE from 'three';
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera';
import Renderer from './Renderer';
import Galaxy from './Universe/Galaxy';
import Debug from './Utils/Debug';

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
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.galaxy = new Galaxy()

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
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
        this.galaxy.update()
    }

}