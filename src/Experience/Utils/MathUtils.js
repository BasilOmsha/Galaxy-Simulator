/**
 * Generates a single log-normal distance based on the given mean (mu) and standard deviation (sigma).
 * 
 * @param {number} mu - The mean of the log-normal distribution.
 * @param {number} sigma - The standard deviation of the log-normal distribution.
 * @returns {number} - A random value from the log-normal distribution, adjusted to potentially be negative.
 */
export function generateSingleLogNormalDistance(mu, sigma) {
    // Generate a uniformly distributed random number
    let u = Math.random();

    // Apply the log-normal transformation
    let logNormal = Math.exp(mu + sigma * Math.sqrt(-2 * Math.log(u)));

    // Adjust the value to create a distance, and randomly decide its sign
    let x = 1 / logNormal;

    // Return the value, randomly multiplied by -1 to allow for negative distances
    return Math.random() < 0.5 ? x : -x;
}

/**
 * Generates a random value following a half-Gaussian distribution.
 * 
 * @param {number} std - The standard deviation of the half-Gaussian distribution.
 * @returns {number} - A positive random value from the half-Gaussian distribution.
 */
export function randomHalfGaussian(std) {
    // Generate a standard normal distributed random number using the Box-Muller transform
    let standardNormal = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());

    // Return the absolute value, scaled by the standard deviation
    return Math.abs(standardNormal * std);
}
