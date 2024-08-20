
# Galaxy-Simulator

This project is a 3D galaxy simulation built using Three.js and OpenGL Shading Language. The simulation creates a procedural galaxy with customizable parameters, allowing for real-time manipulation and visualization of galaxy properties.

## Table of Contents

- [Galaxy-Simulator](#galaxy-simulator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Main Components](#main-components)
  - [Customization](#customization)
  - [Technical Details](#technical-details)
  - [Winding Problem in the Galaxy Simulation](#winding-problem-in-the-galaxy-simulation)
    - [How the Shader Code Relates](#how-the-shader-code-relates)
  - [How the Advanced Galaxy Simulation Solves the Winding Problem](#how-the-advanced-galaxy-simulation-solves-the-winding-problem)

## Installation

To get started with the galaxy simulation, you'll need to have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:
   ```bash
   git clone https://github.com/BasilOmsha/galaxy-simulation.git
   ```

2. Navigate into the project directory:
   ```bash
   cd galaxy-simulation
   ```

3. Install the dependencies:
   ```bash
   npm i
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Once the project is running, you can interact with the galaxy simulation directly in the browser. The GUI controls (powered by lil-gui) allow you to adjust various parameters of the galaxy, including the number of stars, size, randomness, colors, and more.

## Project Structure

```
├── src
│   ├── Experience
│   │   ├── Experience.js                    # Main entry point for the experience
│   │   ├── Camera.js                        # Camera setup and control
│   │   ├── Renderer.js                      # WebGL renderer setup
│   │   ├── Universe
│   │   │   ├── GalaxyParameters.js          # Galaxy configuration parameters
│   │   │   ├── Galaxy
│   │   │   │   ├── Galaxy.js                # Main Galaxy class
│   │   │   │   ├── GalaxyGeometryFactory.js # Factory for creating basic galaxy geometry
│   │   │   │   ├── GalaxyMaterialFactory.js # Factory for creating basic galaxy material
│   │   │   │   ├── Shaders
│   │   │   │   │   ├── galaxyVertexShader.glsl   # Vertex shader for the basic galaxy
│   │   │   │   │   ├── galaxyFragmentShader.glsl # Fragment shader for the basic galaxy
│   │   │   ├── AdvancedGalaxy
│   │   │   │   ├── AdvancedGalaxy.js                # Main Advanced Galaxy class
│   │   │   │   ├── AdvancedGalaxyGeoFactory.js      # Factory for creating advanced galaxy geometry
│   │   │   │   ├── AdvancedGalaxyMatFactory.js      # Factory for creating advanced galaxy material
│   │   │   │   ├── Shaders
│   │   │   │   │   ├── galaxyVertexShader.glsl      # Vertex shader for the advanced galaxy
│   │   │   │   │   ├── galaxyFragmentShader.glsl    # Fragment shader for the advanced galaxy
│   │   ├── Utils
│   │   │   ├── Debug.js                     # Debugging utility
│   │   │   ├── Sizes.js                     # Handle window resizing
│   │   │   ├── Time.js                      # Time management and animation control
│   │   │   ├── EventEmitter.js              # Event handling utility
│   │   │   ├── MathUtils.js                 # Mathematical utilities like log-normal distribution
│   ├── script.js                                # Main script entry point
│   ├── styles.css                               # Styling for the web page
│   ├── index.html                               # The main HTML file for the project
├── package.json                             # Dependencies and scripts for the project
├── package-lock.json                        # Lockfile for npm dependencies
├── vite.config.js                           # Configuration file for Vite
├── .gitignore                               # Git ignore file
└── README.md                                # Project readme file
```

## Main Components

- **Experience.js**: The main entry point that initializes the scene, camera, renderer, and the galaxy.
- **Galaxy.js**: Handles the creation, update, and regeneration of the galaxy based on user-defined parameters.
- **GalaxyParameters.js**: Contains all the configurable parameters for the galaxy, with validation and getters/setters.
- **GalaxyGeometryFactory.js**: Generates the geometry of the galaxy, including particle positions, colors, and other attributes.
- **GalaxyMaterialFactory.js**: Creates the material used to render the galaxy, including shaders and uniforms.
- **Shaders**: Custom GLSL shaders (`vertex.glsl` and `fragment.glsl`) used by `GalaxyMaterialFactory` to control the appearance and behavior of the galaxy particles.
- **Debug.js**: Manages the debug interface, allowing real-time updates to galaxy parameters through a GUI.

## Customization

You can customize the galaxy by adjusting the parameters in the GUI, such as:

- **count**: Number of stars/particles in the galaxy.
- **size**: Size of each star/particle.
- **radius**: Radius of the galaxy.
- **branches**: Number of branches in the galaxy.
- **spin**: Spin factor of the galaxy.
- **randomness**: Degree of randomness in particle positions.
- **colors**: Adjust the inside and outside colors of the galaxy.

These parameters are managed by the `GalaxyParameters` class, and changes can be applied through the GUI or directly in the code.

## Technical Details

- **Three.js**: The core library used for 3D rendering and managing the scene, camera, and objects.
- **lil-gui**: A lightweight GUI for real-time manipulation of parameters within the browser.
- **WebGL Shaders**: Custom shaders (written in GLSL) for rendering the galaxy particles with specific effects and behaviors.

## Winding Problem in the Galaxy Simulation

The winding problem is a concept from astrophysics related to the differential rotation of galaxies. In simple terms, it's the idea that if the spiral arms of a galaxy were made of fixed material (like stars), those arms would wind up tighter and tighter over time because the material closer to the center of the galaxy orbits faster than the material farther out.

### How the Shader Code Relates
The shader code is responsible for simulating the movement and appearance of stars in a galaxy. Let's break it down:

```glsl
// Spin calculation
float angle = atan(modelPosition.x, modelPosition.z);
float distanceToCenter = length(modelPosition.xz);
float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
angle += angleOffset;
modelPosition.x = cos(angle) * distanceToCenter;
modelPosition.z = sin(angle) * distanceToCenter;
```

- **Angle Calculation**: The angle is computed using `atan(modelPosition.x, modelPosition.z)`, which gives the angular position of a star relative to the galaxy center.

- **Distance Calculation**: `distanceToCenter` is the distance from the star to the center of the galaxy.

- **Angle Offset**: This value adjusts the angle over time (`uTime`), and it depends inversely on `distanceToCenter`. This means that stars closer to the center (smaller `distanceToCenter`) will have a larger `angleOffset` and therefore will rotate faster.

Here, stars closer to the center (with a smaller `distanceToCenter`) rotate faster due to the inverse relationship between `angleOffset` and `distanceToCenter`. This accurately simulates the differential rotation seen in real galaxies. However, this simulation approach naturally leads to the winding problem as the inner stars rotate faster, the spiral arms of the galaxy gradually wind up more tightly. Over time, this causes the spiral arms to lose their distinct shape and blend into the rest of the galaxy, reducing their visual clarity.

~~To fully address this issue and maintain the distinctness of the spiral arms, additional mechanisms, such as simulating spiral arms as density waves (Implementing density waves theory) (where stars move in and out of the arms), would need to be implemented. Currently, the shader code provides a good rotational effect but does not solve the winding problem, meaning that without intervention, the spiral arms become less distinct over time.~~


## How the Advanced Galaxy Simulation Solves the Winding Problem

The Advanced Galaxy simulation integrates sophisticated techniques that significantly improve upon the basic galaxy model, addressing the winding problem more effectively. Here's a comparison of the approaches used in both simulations.

1. **Dynamic Position Adjustment**
   
   - **Basic Galaxy**: In the Basic Galaxy simulation, the positions of stars are calculated based on a fixed spiral pattern. The stars rotate over time with an adjustment that accounts for their distance from the center and a time component. However, this differential rotation, where inner stars rotate faster than outer ones, leads to the winding problem, where the spiral arms become increasingly wound up and eventually lose their distinct shape.

   ```glsl
   float distanceToCenter = length(modelPosition.xz);
   float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
   angle += angleOffset;
   modelPosition.x = cos(angle) * distanceToCenter;
   modelPosition.z = sin(angle) * distanceToCenter;
   ```

   - **Advanced Galaxy**: In the Advanced Galaxy simulation, the shader dynamically adjusts the position of stars based on their distance from the center (`aRadii`) and a time component (`uTime`). This prevents the spiral arms from winding up too tightly and ensures that they maintain their shape as stars move.

   ```glsl
   float x = 1.5 * sin(angle + 0.2 * uTime / aRadii) * aRadii;
   float z = cos(angle + 0.2 * uTime / aRadii) * aRadii;
   ```

2. **Axis Tilt Application**

   - **Basic Galaxy**: The Basic Galaxy does not incorporate axis tilt in its calculations. Stars are placed along a spiral, but there is no mechanism to ensure they align with the spiral arms as the galaxy rotates, which can lead to a breakdown of the spiral structure over time.

   - **Advanced Galaxy**: In contrast, the Advanced Galaxy applies an axis tilt after calculating the new star positions. This tilt aligns the stars with the spiral arms, maintaining the coherence of the spiral structure.

   ```glsl
   modelPosition.x = rotate2D(vec2(x, z), axisTilt).x;
   modelPosition.z = rotate2D(vec2(x, z), axisTilt).y;
   ```

3. **Controlled Randomness**
   
   - **Basic Galaxy**: In the Basic Galaxy, randomness is introduced in the star positions using a simple power function. This randomness is calculated in JavaScript and passed to the vertex shader, where it's applied directly to each star's position.

   ```js
   // Basic Galaxy: Randomness Calculation in JavaScript
   const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
   const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
   const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

   randomness[i3    ] = randomX;
   randomness[i3 + 1] = randomY;
   randomness[i3 + 2] = randomZ;
   ```

   ```glsl
   modelPosition.xyz += aRandomness;
   ```

   - **Advanced Galaxy**: In the Advanced Galaxy, randomness is generated using a log-normal distribution. This approach provides a more controlled and realistic distribution of stars, which helps in maintaining the spiral arms' structure while still allowing for natural-looking scatter.

   ```js
   // Advanced Galaxy: Log-Normal Randomness Calculation in JavaScript
   const randomX = generateSingleLogNormalDistance(params.mu, params.sigma) * params.randomness;
   const randomY = generateSingleLogNormalDistance(params.mu, params.sigma) * params.randomness;
   const randomZ = generateSingleLogNormalDistance(params.mu, params.sigma) * params.randomness;

   randomness[i3    ] = randomX;
   randomness[i3 + 1] = randomY;
   randomness[i3 + 2] = randomZ;
   ```

   ```glsl
   modelPosition.xyz += aRandomness;
   ```

4. **Geometry Handling and Initial Setup**

   - **Basic Galaxy**: In the Basic Galaxy, the geometry setup is simpler. Stars are positioned based on basic trigonometric functions and assigned colors and scales, but without the detailed consideration of how they fit within the spiral structure over time.

   ```js
   const radius = Math.random() * parameters.radius;
   const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
   positions[i3] = Math.cos(branchAngle) * radius;
   positions[i3 + 1] = 0;
   positions[i3 + 2] = Math.sin(branchAngle) * radius;
   ```

   - **Advanced Galaxy**: The Advanced Galaxy builds on this by carefully calculating the radius and position of each star based on its branch, applying an axis tilt, and incorporating advanced randomness. This setup ensures that each star contributes to the overall spiral structure in a way that persists over time.

   ```js
   // Assign an axis tilt for this particle based on its branch
   axisTilt[i] = possibleTilts[i % params.branches];
   // more code...
   const radius = (i % params.branches) / 10;
   positions[i3] = 1.5 * Math.sin(i) * radius;
   positions[i3 + 1] = 0;
   positions[i3 + 2] = Math.cos(i) * radius;
   axisTilt[i] = possibleTilts[i % params.branches];
   ```

