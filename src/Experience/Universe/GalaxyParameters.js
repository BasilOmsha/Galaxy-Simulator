/**
 * GalaxyParameters is responsible for holding all the configuration settings for the Galaxy.
 * These parameters determine the visual appearance and behavior of the galaxy.
 */
export default class GalaxyParameters {
    constructor() {
        // The number of stars/particles in the galaxy
        this.count = 200000;

        // Size of each star/particle
        this.size = 0.005;

        // Blending mode for the galaxy material (e.g., AdditiveBlending for glowing effects)
        this.blending = THREE.AdditiveBlending;

        // Radius of the galaxy
        this.radius = 5;

        // Number of branches or arms in the galaxy
        this.branches = 3;

        // Spin factor of the galaxy, affecting how the branches twist
        this.spin = 1;

        // Randomness factor for star/particle positions
        this.randomness = 0.5;

        // Controls the distribution of randomness
        this.randomnessPower = 3;

        // The color of the stars/particles closer to the center
        this.insideColor = '#ff6030';

        // The color of the stars/particles further from the center
        this.outsideColor = '#1b3984';
    }

    /**
     * Updates the parameters with new values.
     * @param {Object} newParams - Object containing new parameter values.
     */
    update(newParams) {
        Object.assign(this, newParams);
    }
}
