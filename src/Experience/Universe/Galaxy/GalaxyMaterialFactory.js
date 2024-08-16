import * as THREE from 'three';
import vertexShader from './Shaders/galaxyVertexShader.glsl';
import fragmentShader from './Shaders/galaxyFragmentShader.glsl';

/**
 * GalaxyMaterialFactory is responsible for creating the material for the galaxy.
 * This material uses custom shaders to render the galaxy's particles.
 */
export default class GalaxyMaterialFactory {
    /**
     * Creates the material for the galaxy based on the provided parameters.
     * @param {GalaxyParameters} parameters - The parameters to use for the material.
     * @param {THREE.WebGLRenderer} renderer - The renderer to use for pixel ratio.
     * @returns {THREE.ShaderMaterial} - The generated material.
     */
    static createMaterial(parameters, renderer) {
        return new THREE.ShaderMaterial({
            depthWrite: false,
            blending: parameters.blending,
            vertexColors: true,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: 30 * renderer.getPixelRatio() },
            },
        });
    }
}
