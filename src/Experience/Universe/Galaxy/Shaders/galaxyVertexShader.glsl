uniform float uTime;
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {

    /**
    * Position
    */
    // Compute the position of the vertex in the model's space
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // spin
    // Calculate the angle of the point around the Y-axis
    float angle = atan(modelPosition.x, modelPosition.z);

    // Calculate the distance of the point from the center of the model in the XZ plane
    float distanceToCenter = length(modelPosition.xz);

     // Calculate the offset angle to create a spinning effect, 
    // dependent on the distance to the center and time
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;

    // Apply the angle offset to the current angle
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;  // Update the X position based on the new angle
    modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness
    // Apply randomness to the position to make each point unique
    modelPosition.xyz += aRandomness; // or:
    // modelPosition.x += aRandomness.x;
    // modelPosition.y += aRandomness.y;
    // modelPosition.z += aRandomness.z;

    vec4 viewPosition = viewMatrix * modelPosition; // Transform the model position to the view space
    vec4 projectedPosition = projectionMatrix * viewPosition; // Project the view space position to clip space (camera space)
    gl_Position = projectedPosition; // Set the final position of the vertex in clip space

    /**
    * Size
    */
    // Set the size of the point, affected by the global size and the individual scale
    gl_PointSize = uSize * aScale; 

    /*
    * The mvPosition corresponds to the position of the vertex once the modelMatrix and 
    *the viewMatrix have been applied. In our case, it's our viewPosition variable.
    */
    // gl_PointSize *= ( scale / - mvPosition.z );
    // Apply size attenuation based on the distance from the camera
    // This ensures that points further from the camera appear smaller
    gl_PointSize *= ( 1.0 / - viewPosition.z );// provides size attenuation

    /**
    * Color
    */
    vColor = color;
}