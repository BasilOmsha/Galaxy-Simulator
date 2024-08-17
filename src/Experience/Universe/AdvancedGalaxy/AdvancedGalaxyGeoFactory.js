import * as THREE from 'three';
import { generateSingleLogNormalDistance, randomHalfGaussian } from '../../Utils/MathUtils';

/**
 * AdvancedGalaxyGeometryFactory is responsible for generating the geometry of an advanced galaxy.
 * It creates positions, colors, scales, and randomness attributes for the galaxy's particles.
 */
export default class AdvancedGalaxyGeometryFactory {

    /**
     * Creates the geometry for the galaxy based on the provided parameters.
     * @param {Object} params - The parameters to use for generating the geometry.
     * @returns {THREE.BufferGeometry} - The generated geometry.
     */
    static createGeometry(params) {
        // Initialize a new BufferGeometry object to hold the galaxy's data.
        const geometry = new THREE.BufferGeometry();

        // Arrays to hold the attributes for the galaxy's particles
        const positions = new Float32Array(params.count * 3);  // Each position has x, y, z components
        const radii = new Float32Array(params.count);  // Radii of each particle from the center
        const axisTilt = new Float32Array(params.count);  // Tilt angle for each particle's rotation axis
        const colors = new Float32Array(params.count * 3);  // RGB color components for each particle
        const scales = new Float32Array(params.count);  // Scale (size) of each particle
        const randomness = new Float32Array(params.count * 3);  // Random offset for each particle's position

        // Colors for the inner and outer regions of the galaxy
        const colorInside = new THREE.Color(params.insideColor);
        const colorOutside = new THREE.Color(params.outsideColor);

        // Calculate possible tilts for the branches of the galaxy
        const possibleTilts = [...Array(params.branches).keys()].map(
            (i) => (i * Math.PI * 2) / params.branches
        );

        // Loop through each particle to calculate its attributes
        for (let i = 0; i < params.count; i++) {
            const i3 = i * 3;  // Index multiplier for 3-component attributes (positions, colors, etc.)

            // Calculate the radius of this particle based on its branch index
            const radius = (i % params.branches) / 10;
            radii[i] = radius;

            // Position each particle in a spiral pattern based on its index
            positions[i3] = 1.5 * Math.sin(i) * radius;
            positions[i3 + 1] = 0;  // Y-position is kept at 0 for a flat galaxy
            positions[i3 + 2] = Math.cos(i) * radius;

            // Assign an axis tilt for this particle based on its branch
            axisTilt[i] = possibleTilts[i % params.branches];

            // Generate a random offset for the particle's position
            // mu: Mean of the logarithm of the particle's position distribution
            // sigma: Standard deviation of the logarithm of the particle's position distribution
            const randomX = generateSingleLogNormalDistance(params.mu, params.sigma) * params.randomness;
            const randomY = generateSingleLogNormalDistance(params.mu, params.sigma) * params.randomness;
            const randomZ = generateSingleLogNormalDistance(params.mu, params.sigma) * params.randomness;
            randomness[i3] = randomX;
            randomness[i3 + 1] = randomY;
            randomness[i3 + 2] = randomZ;

            // Interpolate color between inside and outside colors based on the radius
            const mixedColor = colorInside.clone();
            const lerpFactor = radius / params.lerp;
            mixedColor.lerp(colorOutside, lerpFactor);

            // Set the color attributes
            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            // Assign a random scale (size) to each particle
            scales[i] = Math.random();
        }

        // Assign the calculated attributes to the geometry
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
        geometry.setAttribute("aRandomness", new THREE.BufferAttribute(randomness, 3));
        geometry.setAttribute("aRadii", new THREE.BufferAttribute(radii, 1));
        geometry.setAttribute("axisTilt", new THREE.BufferAttribute(axisTilt, 1));

        return geometry;
    }
}
