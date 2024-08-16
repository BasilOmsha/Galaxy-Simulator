<!-- ctrl shift v -->
# Galaxy-Simulator
Galaxy simulation with Three.js and OpenGL Shading Language
This project is a 3D galaxy simulation built using Three.js. The simulation creates a procedural galaxy with customizable parameters, allowing for real-time manipulation and visualization of galaxy properties.

## Table of Contents

- [Galaxy-Simulator](#galaxy-simulator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)

## Installation

To get started with the galaxy simulation, you'll need to have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:
   ```bash
   git clone https://github.com/BasilOmsha/galaxy-simulation.git

2. Navigate into the project directory:
   ```bash
   cd galaxy-simulation

3. Install the dependencies:
   ```bash
   npm i

4. Start the development server:
   ```bash
   npm run start

## Usage

Once the project is running, you can interact with the galaxy simulation directly in the browser. The GUI controls (powered by lil-gui) allow you to adjust various parameters of the galaxy, including the number of stars, size, randomness, colors, and more.

## Project Structure
```
├── src
│ ├── Experience
│ │ ├── Experience.js # Main entry point for the experience
│ │ ├── Camera.js # Camera setup and control
│ │ ├── Renderer.js # WebGL renderer setup
│ │ ├── Universe
│ │ │ ├── Galaxy.js # Main Galaxy class
│ │ │ ├── GalaxyParameters.js # Galaxy configuration parameters
│ │ │ ├── GalaxyGeometryFactory.js # Factory for creating galaxy geometry
│ │ │ ├── GalaxyMaterialFactory.js # Factory for creating galaxy material
│ │ ├── Utils
│ │ │ ├── Debug.js # Debugging utility
│ │ │ ├── Sizes.js # Handle window resizing
│ │ │ ├── Time.js # Time management and animation control
│ │ │ ├── EventEmitter.js # Event handling utility
│ ├── shaders
│ │ ├── galaxy
│ │ │ ├── vertex.glsl # Vertex shader for the galaxy
│ │ │ ├── fragment.glsl # Fragment shader for the galaxy
│ ├── script.js # Main script entry point
│ └── styles.css # Styling for the web page
├── package.json
└── README.md # Project readme file
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

- **Angle Calculation**: The angle is computed using atan(modelPosition.x, modelPosition.z), which gives the angular position of a star relative to the galaxy center.

- **Distance Calculation**: distanceToCenter is the distance from the star to the center of the galaxy.

- **Angle Offset**: This value adjusts the angle over time (uTime), and it depends inversely on distanceToCenter. This means that stars closer to the center (smaller distanceToCenter) will have a larger angleOffset and therefore will rotate faster.

Here, stars closer to the center (with a smaller distanceToCenter) rotate faster due to the inverse relationship between angleOffset and distanceToCenter. This accurately simulates the differential rotation seen in real galaxies. However, this simulation approach naturally leads to the winding problem: as the inner stars rotate faster, the spiral arms of the galaxy gradually wind up more tightly. Over time, this causes the spiral arms to lose their distinct shape and blend into the rest of the galaxy, reducing their visual clarity.

To fully address this issue and maintain the distinctness of the spiral arms, additional mechanisms, such as simulating spiral arms as density waves (Implementing density waves theory) (where stars move in and out of the arms), would need to be implemented. Currently, the shader code provides a good rotational effect but does not solve the winding problem, meaning that without intervention, the spiral arms become less distinct over time.
