// Uniform variables that stay constant for all vertices during a single draw call
uniform float uSize; // Controls the base size of the points representing stars/particles
uniform float uTime; // Used to animate the galaxy over time, controlling the rotation and movement

// Attributes that are unique to each vertex (or particle in this case)
attribute float aScale; // Individual scale for each particle, affecting its size
attribute vec3 aRandomness; // Random offset for each particle's position, adding variation to the galaxy
attribute float aRadii; // Distance of the particle from the center of the galaxy
attribute float axisTilt; // Tilt angle for the rotation axis of the particle, used for creating spiral arms

// Varying variables that will be passed to the fragment shader
varying vec3 vColor; // Color of the particle, passed from the vertex shader to the fragment shader

// Function to rotate a 2D vector (used for rotating positions in the XZ plane)
vec2 rotate2D(vec2 v, float theta) {
    float x = v.x * cos(theta) - v.y * sin(theta); // Rotate x-coordinate
    float y = v.x * sin(theta) + v.y * cos(theta); // Rotate y-coordinate (actually z in 3D context)
    return vec2(x, y); // Return the rotated vector
}

void main() {
    // Calculate the model position of the vertex
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Calculate the current angle of the particle in the XZ plane
    float angle = atan(modelPosition.x, modelPosition.z);
    
    // Calculate new X and Z coordinates based on the particle's radius and animation time
    float x = 1.5 * sin(angle + 0.2 * uTime / aRadii) * aRadii;
    float z = cos(angle + 0.2 * uTime / aRadii) * aRadii;

    // Apply rotation to the XZ position using the axis tilt, aligning particles with the spiral arms
    modelPosition.x = rotate2D(vec2(x, z), axisTilt).x;
    modelPosition.z = rotate2D(vec2(x, z), axisTilt).y;

    // Apply randomness to the particle's position, giving it a more chaotic appearance
    modelPosition.xyz += aRandomness;

    // Transform the model position to view space and then to clip space for rendering
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    // Set the size of the point, scaling it based on its individual scale and distance from the camera
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z); // Size attenuation based on depth

    // Pass the color to the fragment shader
    vColor = color;
}
