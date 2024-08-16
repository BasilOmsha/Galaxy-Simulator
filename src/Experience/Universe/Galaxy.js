import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Galaxy
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance
    }
}