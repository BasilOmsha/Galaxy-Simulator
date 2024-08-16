import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter {
    constructor() {
        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    /**
     * We could have called the tick method immediately in the constructor without the window.requestAnimationFrame,
     * but this would result in a delta equal to 0 on the first frame.
     */
    tick() {
        // console.log('tick')

        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}