import Sizes from "./Utils/Sizes"

export default class Experience {
    constructor(canvas) {

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        resize(){

        }

    }
}