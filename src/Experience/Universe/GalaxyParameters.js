import * as THREE from 'three';

/**
 * GalaxyParameters is responsible for holding all the configuration settings for the Galaxy.
 * These parameters determine the visual appearance and behavior of the galaxy.
 */
export default class GalaxyParameters {
    constructor() {


        // Internal storage of parameters
        this._count = 200000;
        this._size = 0.005;
        this._blending = THREE.AdditiveBlending;
        this._lerp = 2;
        this._radius = 5;
        this._branches = 3;
        this._spin = 1;
        this._randomness = 0.5;
        this._randomnessPower = 3;
        this._sigma= 1.75;  // Standard Deviation
        this._mu= 1.0; // Stand for Mean
        this._insideColor = new THREE.Color('#ff6030');
        this._outsideColor = new THREE.Color('#1b3984');
    }

    // Getter and Setter for `count`
    get count() {
        return this._count;
    }

    set count(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Count must be a positive number');
        }
        this._count = value;
    }

    // Getter and Setter for `size`
    get size() {
        return this._size;
    }

    set size(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Size must be a positive number');
        }
        this._size = value;
    }

    // Getter and Setter for `blending`
    get blending() {
        return this._blending;
    }

    set blending(value) {
        if (!(value instanceof THREE.Blending)) {
            throw new Error('Blending must be a valid THREE.Blending type');
        }
        this._blending = value;
    }

    // Getter and Setter for `lerp`
    get lerp() {
        return this._lerp;
    }

    set lerp(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Lerp must be a positive number');
        }
        this._lerp = value;
    }


    // Getter and Setter for `radius`
    get radius() {
        return this._radius;
    }

    set radius(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Radius must be a positive number');
        }
        this._radius = value;
    }

    // Getter and Setter for `branches`
    get branches() {
        return this._branches;
    }

    set branches(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Branches must be a positive integer');
        }
        this._branches = Math.floor(value);
    }

    // Getter and Setter for `spin`
    get spin() {
        return this._spin;
    }

    set spin(value) {
        if (typeof value !== 'number') {
            throw new Error('Spin must be a number');
        }
        this._spin = value;
    }

    // Getter and Setter for `randomness`
    get randomness() {
        return this._randomness;
    }

    set randomness(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new Error('Randomness must be a non-negative number');
        }
        this._randomness = value;
    }

    // Getter and Setter for `randomnessPower`
    get randomnessPower() {
        return this._randomnessPower;
    }

    set randomnessPower(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Randomness power must be a positive number');
        }
        this._randomnessPower = value;
    }

    // Getter and Setter for `sigma`
    get sigma() {
        return this._sigma;
    }

    set sigma(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Sigma must be a positive number');
        }
        this._sigma = value;
    }

    // Getter and Setter for `mu`
    get mu() {
        return this._mu;
    }

    set mu(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Mu must be a positive number');
        }
        this._mu = value;
    }

    // Getter and Setter for `insideColor`
    get insideColor() {
        return this._insideColor;
    }

    set insideColor(value) {
        if (!(value instanceof THREE.Color)) {
            throw new Error('Inside color must be an instance of THREE.Color');
        }
        this._insideColor = value;
    }

    // Getter and Setter for `outsideColor`
    get outsideColor() {
        return this._outsideColor;
    }

    set outsideColor(value) {
        if (!(value instanceof THREE.Color)) {
            throw new Error('Outside color must be an instance of THREE.Color');
        }
        this._outsideColor = value;
    }

    /**
     * Updates the parameters with new values.
     * @param {Object} newParams - Object containing new parameter values.
     */
    update(newParams) {
        for (let key in newParams) {
            if (this.hasOwnProperty('_' + key)) {
                this[key] = newParams[key];
            }
        }
    }

    //         // The number of stars/particles in the galaxy
    //         this.count = 200000;

    //         // Size of each star/particle
    //         this.size = 0.005;

    //         // Blending mode for the galaxy material (e.g., AdditiveBlending for glowing effects)
    //         this.blending = THREE.AdditiveBlending;

    //         // Radius of the galaxy
    //         this.radius = 5;

    //         // Number of branches or arms in the galaxy
    //         this.branches = 3;

    //         // Spin factor of the galaxy, affecting how the branches twist
    //         this.spin = 1;

    //         // Randomness factor for star/particle positions
    //         this.randomness = 0.5;

    //         // Controls the distribution of randomness
    //         this.randomnessPower = 3;

    //         // The color of the stars/particles closer to the center
    //         this.insideColor = '#ff6030';

    //         // The color of the stars/particles further from the center
    //         this.outsideColor = '#1b3984';
    //     }

    //     /**
    //      * Updates the parameters with new values.
    //      * @param {Object} newParams - Object containing new parameter values.
    //      */
    //     update(newParams) {
    //         Object.assign(this, newParams);
    //        }

}
