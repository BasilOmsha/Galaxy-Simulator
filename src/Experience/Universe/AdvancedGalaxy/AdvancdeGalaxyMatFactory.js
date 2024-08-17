import * as THREE from 'three';
import vertexShader from './Shaders/galaxyVertexShader.glsl';
import fragmentShader from './Shaders/galaxyFragmentShader.glsl';

export default class AdvancedGalaxyMaterialFactory {

    static createMaterial(params, renderer) {

        return new THREE.ShaderMaterial({
            depthWrite: false,
            blending: params.blending,
            vertexColors: true,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uSize: { value: params.size * renderer.getPixelRatio() },
                uTime: { value: 0 },
            },
        });
    }

}