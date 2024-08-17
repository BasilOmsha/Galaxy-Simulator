import * as THREE from 'three';
import Experience from '../../Experience';
import GalaxyParameters from '../GalaxyParameters';
import AdvancedGalaxyGeoFactory from './AdvancedGalaxyGeoFactory'
import AdvancedGalaxyMaterialFactory from './AdvancdeGalaxyMatFactory';


export default class AdvancedGalaxy {
    constructor() {
        this.experience = window.experience || new Experience();
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer.instance;
        this.debug = this.experience.debug

        this.params = new GalaxyParameters(); // Initialize galaxy parameters
        this.params.count = 300000;
        this.params.size = 40;
        this.params.branches = 20;
        this.params.randomness = 2;
        this.init();
        this.setupDebugUI(); // Add this line to initialize the debug UI
    }

    init() {
        this.generateGalaxy();
    }

    generateGalaxy() {

        if (this.points) {
           this.dispose();
        }

        this.geometry = AdvancedGalaxyGeoFactory.createGeometry(this.params);

        // Create Material
        this.material = AdvancedGalaxyMaterialFactory.createMaterial(this.params, this.renderer);

        // Points
        this.points = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.points);
        // Create Geometry

    }

    setupDebugUI() {
        if (this.debug.active) {
            const folder = this.debug.ui.addFolder('Advanced Galaxy');

            folder.add(this.params, 'count').min(100).max(1000000).step(100).name('Number of Stars').onFinishChange(() => this.generateGalaxy());
            folder.add(this.params, 'size').min(1).max(100).step(1).name('Star Size').onFinishChange(() => this.generateGalaxy());
            folder.add(this.params, 'branches').min(2).max(100).step(1).name('Elliptical spread').onFinishChange(() => this.generateGalaxy());
            folder.add(this.params, 'randomness').min(0).max(10).step(0.1).name('Star Spread').onFinishChange(() => this.generateGalaxy());
            folder.add(this.params, 'lerp').min(0.1).max(10).step(0.1).name('Color offset').onFinishChange(() => this.generateGalaxy());
            folder.add(this.params, 'sigma').min(0.001).max(2).step(0.001).name('Distribution σ').onFinishChange(() => this.generateGalaxy());
            folder.add(this.params, 'mu').min(0.001).max(5).step(0.001).name('Distribution μ').onFinishChange(() => this.generateGalaxy());
            folder.addColor(this.params, 'insideColor').name('Center Color').onFinishChange(() => this.generateGalaxy());
            folder.addColor(this.params, 'outsideColor').name('Outer Color').onFinishChange(() => this.generateGalaxy());
            // Add a button to generate the galaxy
            folder.add({ generate: () => this.generateAndSetActiveGalaxy() }, 'generate').name('Generate an Advanced Galaxy');
            this.dispose();
        }
    }

    generateAndSetActiveGalaxy() {
        this.experience.setActiveGalaxy(this);  // Set this galaxy as the active one
        this.init();  // Generate the galaxy
    }

    update() {
        this.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    }

    dispose() {
        this.geometry.dispose();
        this.material.dispose();
        this.scene.remove(this.points);
    }

}
