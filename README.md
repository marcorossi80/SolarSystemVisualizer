# Solar System Visualizer

An interactive, scientifically accurate visualization of our Solar System showing planet positions as of April 1, 2025. This project displays all planets with proper orbital paths, allowing users to explore the scale and structure of our planetary system.

## Features

- ✅ **Accurate Planet Positions**: Planets are positioned according to their orbital elements for the displayed date (default: April 1, 2025)
- ✅ **True Astronomical Scale**: Toggle between true scale (realistic planet sizes and distances) and enhanced visibility scale
- ✅ **Realistic Visuals**: Planets rendered with gradients, atmospheric effects, and Saturn's rings
- ✅ **Interactive Controls**: Zoom, pan, and navigate through the solar system
- ✅ **Time Animation**: Animate planet movements over time with adjustable speed
- ✅ **Detailed Information**: Interactive information panel with details about each celestial body
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **GitHub Pages Deployment**: Easily deploy to GitHub Pages with provided scripts

## Live Demo

Visit the live demo: [Solar System Visualizer](https://marcorossi80.github.io/SolarSystemVisualizer/)

## Technical Details

This visualization uses:
- React with TypeScript for the application
- Canvas API for rendering
- Mathematical orbital calculations based on Keplerian elements
- GitHub Actions for automatic deployment

## Usage

### Navigation

- **Pan**: Click and drag to move around
- **Zoom**: Use mouse wheel or zoom controls
- **Reset View**: Click the home button to reset to default view
- **Toggle Scale**: Switch between true astronomical scale and enhanced visibility
- **Animate**: Play/pause to animate planetary motion
- **Speed Control**: Adjust animation speed from 0.5x to 10x

### Viewing Information

Click on any planet in the legend to view detailed information:
- Physical characteristics (diameter, distance from Sun)
- Orbital parameters (semi-major axis, eccentricity, inclination)
- Special features (rings, atmospheric composition)

## Development

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/marcorossi80/SolarSystemVisualizer.git
   cd SolarSystemVisualizer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Deployment

To deploy to GitHub Pages:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Run the deployment script:
   ```
   ./deploy-to-github.sh
   ```

Alternatively, push to the main branch and GitHub Actions will automatically deploy.

## License

MIT License - See LICENSE file for details

## Acknowledgements

- Planet data sourced from NASA's astronomical databases
- Orbital calculations based on Keplerian elements
- Special thanks to the open-source astronomy community