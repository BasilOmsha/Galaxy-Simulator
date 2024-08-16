import * as THREE from 'three'
import Experience from '../../Experience'
// import vertexShader from './Shaders/galaxyVertexShader.glsl'
// import fragmentShader from './Shaders/galaxyFragmentShader.glsl'
import GalaxyParameters from './GalaxyParameters';
import GalaxyGeometryFactory from './GalaxyGeometryFactory';
import GalaxyMaterialFactory from './GalaxyMaterialFactory';

export default class Galaxy {
    constructor() {
        // Access the existing singleton instance of Experience
        this.experience = window.experience || new Experience();
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance
        this.debug = this.experience.debug

        // Setup
        // this.setParameters()
        // this.generateGalaxy()
        this.parameters = new GalaxyParameters(); // Initialize galaxy parameters
        this.init(); // Initialize the galaxy
        this.setupDebugUI(); // Setup the debug UI if enabled
    }

    /**
     * Initializes the galaxy by creating its geometry, material, and adding it to the scene.
     */
    init() {
        // Create Geometry
        this.geometry = GalaxyGeometryFactory.createGeometry(this.parameters);

        // Create Material
        this.material = GalaxyMaterialFactory.createMaterial(this.parameters, this.renderer);

        // Create Points and add them to the scene
        this.points = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.points);
    }

    /**
     * Sets up the debug UI to allow real-time parameter adjustments.
     */
    setupDebugUI() {
        if (this.debug.active) {
            // console.log('Debug UI is active and being set up');
            const folder = this.debug.ui.addFolder('Galaxy');

            // Add controls for each parameter and regenerate the galaxy on change
            folder.add(this.parameters, 'count').min(100).max(1000000).step(100).name('Number of Stars').onFinishChange(() => this.regenerate());
            // folder.add(this.parameters, 'size').min(0.001).max(0.1).step(0.001).name('Star Size').onFinishChange(() => this.regenerate());
            folder.add(this.parameters, 'radius').min(0.01).max(20).step(0.10).name('Galaxy Size').onFinishChange(() => this.regenerate());
            folder.add(this.parameters, 'branches').min(2).max(20).step(1).name('Number of Arms').onFinishChange(() => this.regenerate());
            // folder.add(this.parameters, 'spin').min(-5).max(5).step(0.1).name('Arm Twist').onFinishChange(() => this.regenerate());
            folder.add(this.parameters, 'randomness').min(0).max(2).step(0.001).name('Star Spread').onFinishChange(() => this.regenerate());
            folder.add(this.parameters, 'randomnessPower').min(1).max(10).step(0.001).name('Spread Intensity').onFinishChange(() => this.regenerate());
            folder.addColor(this.parameters, 'insideColor').name('Center Color').onFinishChange(() => this.regenerate());
            folder.addColor(this.parameters, 'outsideColor').name('Outer Color').onFinishChange(() => this.regenerate());

        }
    }


    /**
     * Updates the galaxy, particularly its animation over time.
     */
    update() {
        // Update the uTime uniform to animate the galaxy
        this.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    }

    /**
     * Disposes of the galaxy's resources (geometry and material) when it's no longer needed.
     */
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
        this.scene.remove(this.points);
    }

    /**
     * Regenerates the galaxy with new parameters, effectively recreating it.
     * @param {Object} newParams - New parameters to apply to the galaxy.
     */
    regenerate(newParams) {
        this.dispose(); // Dispose of the old galaxy
        this.parameters.update(newParams); // Update parameters
        this.init(); // Reinitialize the galaxy with new parameters
    }

    // setParameters() {
    //     this.parameters = {}
    //     this.parameters.count = 200000
    //     this.parameters.size = 0.005
    //     this.parameters.blending = THREE.AdditiveBlending,
    //     this.parameters.radius = 5
    //     this.parameters.branches = 3
    //     this.parameters.spin = 1
    //     this.parameters.randomness = 0.5
    //     this.parameters.randomnessPower = 3
    //     this.parameters.insideColor = '#ff6030'
    //     this.parameters.outsideColor = '#1b3984'
    // }

    // generateGalaxy = () => {
    //     if (this.points) {
    //         this.geometry.dispose()
    //         this.material.dispose()
    //         this.scene.remove(this.points)
    //     }

    //     /**
    //      * Geometry
    //      */
    //     this.geometry = new THREE.BufferGeometry()

    //     const positions = new Float32Array(this.parameters.count * 3)
    //     const colors = new Float32Array(this.parameters.count * 3)
    //     const scales = new Float32Array(this.parameters.count * 1)
    //     const randomness = new Float32Array(this.parameters.count * 3)

    //     const insideColor = new THREE.Color(this.parameters.insideColor)
    //     const outsideColor = new THREE.Color(this.parameters.outsideColor)

    //     for (let i = 0; i < this.parameters.count; i++) {
    //         const i3 = i * 3

    //         // Position
    //         const radius = Math.random() * this.parameters.radius

    //         const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2

    //         // Randomness
    //         const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
    //         const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
    //         const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius

    //         // positions[i3    ] = Math.cos(branchAngle) * radius + randomX
    //         // positions[i3 + 1] = randomY
    //         // positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ

    //         positions[i3] = Math.cos(branchAngle) * radius
    //         positions[i3 + 1] = 0
    //         positions[i3 + 2] = Math.sin(branchAngle) * radius

    //         randomness[i3] = randomX
    //         randomness[i3 + 1] = randomY
    //         randomness[i3 + 2] = randomZ

    //         // Color
    //         const mixedColor = insideColor.clone()
    //         mixedColor.lerp(outsideColor, radius / this.parameters.radius)

    //         colors[i3] = mixedColor.r
    //         colors[i3 + 1] = mixedColor.g
    //         colors[i3 + 2] = mixedColor.b

    //         // Scale
    //         scales[i] = Math.random();
    //     }

    //     this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    //     this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    //     this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    //     this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))

    //     /**
    //      * Material
    //      */
    //     this.material = new THREE.ShaderMaterial({
    //         depthWrite: false,
    //         blending: this.parameters.blending,
    //         vertexColors: true,
    //         vertexShader: vertexShader,
    //         fragmentShader: fragmentShader,
    //         uniforms: {
    //             uTime: { value: 0 },
    //             uSize: { value: 30 * this.renderer.getPixelRatio() },
    //         }
    //     })

    //     /**
    //      * Points
    //      */
    //     this.points = new THREE.Points(this.geometry, this.material)
    //     this.scene.add(this.points)
    // }

    // update() {
    //     // Update the uTime uniform to animate the galaxy
    //     this.material.uniforms.uTime.value += this.experience.time.delta * 0.001
    // }
}