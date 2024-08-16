import * as THREE from 'three';

/**
 * GalaxyGeometryFactory is responsible for generating the geometry of the galaxy.
 * It creates the positions, colors, scales, and randomness attributes for the galaxy's particles.
 */
export default class GalaxyGeometryFactory {
    /**
     * Creates the geometry for the galaxy based on the provided parameters.
     * @param {GalaxyParameters} parameters - The parameters to use for generating the geometry.
     * @returns {THREE.BufferGeometry} - The generated geometry.
     */
    static createGeometry(parameters) {
        const geometry = new THREE.BufferGeometry();

        // Arrays to hold the attributes of the particles
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);
        const scales = new Float32Array(parameters.count * 1);
        const randomness = new Float32Array(parameters.count * 3);

        const insideColor = new THREE.Color(parameters.insideColor);
        const outsideColor = new THREE.Color(parameters.outsideColor);

        // Loop through each particle to calculate its attributes
        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            // Calculate a random distance from the center for the particle
            const radius = Math.random() * parameters.radius;

            // Determine the angle of the particle within its branch
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

            // Apply randomness to the particle's position
            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            // positions[i3    ] = Math.cos(branchAngle) * radius + randomX
            // positions[i3 + 1] = randomY
            // positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ

            // Set the position of the particle in 3D space
            positions[i3    ] = Math.cos(branchAngle) * radius ;
            positions[i3 + 1] = 0;
            positions[i3 + 2] = Math.sin(branchAngle) * radius ;

            // Store the randomness in a separate attribute
            randomness[i3    ] = randomX;
            randomness[i3 + 1] = randomY;
            randomness[i3 + 2] = randomZ;

            // Interpolate the color based on the distance from the center
            const mixedColor = insideColor.clone();
            mixedColor.lerp(outsideColor, radius / parameters.radius);

            colors[i3    ] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            // Assign a random scale to the particle
            scales[i] = Math.random();
        }

        // Assign the calculated attributes to the geometry
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

        return geometry;
    }
}
