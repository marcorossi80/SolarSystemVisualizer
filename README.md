# Solar System Visualizer

An interactive JavaScript visualization of the solar system showing the positions of planets as of April 1, 2025.

## Features

- 🪐 Accurate planetary positions based on astronomical calculations
- 🔭 Interactive zoom and pan to explore the solar system
- 📏 Toggle between true astronomical scale and enhanced visibility scale
- ⏱️ Animation with adjustable speed to see planetary motion
- 🛰️ Elliptical orbits that accurately represent planetary paths
- 📅 Real-time date display during animation

## Technical Details

This visualization uses JavaScript and the HTML5 Canvas API to render the solar system. Planet positions are calculated using:

- Keplerian orbital elements
- Numerical solution of Kepler's equation
- Conversion to cartesian coordinates

### Astronomical Data

The model includes:
- The Sun and all eight planets
- Accurate orbital parameters (semi-major axis, eccentricity, inclination, etc.)
- Proper scaling of planetary sizes and orbital distances

## Usage

### Controls

- **Zoom**: Mouse wheel or zoom buttons
- **Pan**: Click and drag to move the view
- **Reset View**: Return to the default view
- **Scale Toggle**: Switch between true scale and enhanced visibility
- **Animation**: Play/pause planetary motion
- **Speed Control**: Adjust animation speed from 0.5x to 10x

## Development

### Running Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/SolarSystemVisualizer.git

# Navigate to the project directory
cd SolarSystemVisualizer

# Start a local server
python -m http.server 5000
```

Then open http://localhost:5000 in your browser.

### Deployment

The project includes deployment scripts for GitHub Pages:

- Manual deployment: `./deploy-to-github.sh`
- Automated deployment via GitHub Actions workflow

## License

MIT