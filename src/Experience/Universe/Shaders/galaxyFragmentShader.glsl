varying vec3 vColor; // Varying variable receiving the color from the vertex shader

void main() {

    // Disc pattern
    // Calculates the distance from the current fragment to the center of the point
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // Creates a binary disc pattern where the inside of the disc is white and outside is black
    // strength = step(.5, strength);
    // Inverts the pattern to make the disc itself black and the outside white
    // strength = 1.0 - strength;
    

    // Diffuse point
    // Calculates the distance from the current fragment to the center of the point
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // Scales the distance, making the gradient sharper
    // strength *= 2.0;
    // Inverts the gradient so that the center of the point is white, fading to black at the edges
    // strength = 1.0 - strength;
    

    // Light point
    // Calculate the distance from the center of the point
    float strength = distance(gl_PointCoord, vec2(0.5));
    
    // Invert the strength, making the center strong and edges weaker
    strength = 1.0 - strength;
    
    // Raise the strength to a power to create a sharper falloff, making the point appear like a light
    strength = pow(strength, 10.0);
    

    // Final Color
    // Mix the base color (black) with the vertex color based on the calculated strength.
    // This creates a gradient effect where the color fades out towards the edges.
    vec3 color = mix(vec3(0.0), vColor, strength);
    
    // Set the final color of the fragment with full opacity
    gl_FragColor = vec4(color, 1.0);
    
    // Include additional color space transformations
    #include <colorspace_fragment>
    
}
