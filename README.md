# Solar System Visualizer

An interactive web application showing an accurate model of our solar system with planets positioned as of April 1, 2025.

## Features

- **Astronomical Accuracy**: Calculates planet positions using real astronomical formulas and orbital elements.
- **True Scale Mode**: Shows the actual size and distance ratios in the solar system.
- **Enhanced Visibility Mode**: Makes the planets more visible while preserving their relative differences.
- **Interactive Controls**: Zoom, pan, and animate planetary motion.
- **Elliptical Orbits**: Accurately displays the elliptical shape of planetary orbits.
- **Time Animation**: Watch how planets move along their orbits with adjustable speed.

## Implementation Details

- Built using vanilla JavaScript and HTML5 Canvas
- Planetary positions calculated using Keplerian orbital mechanics
- Implements a simple physics model for animation
- Responsive design that works on multiple screen sizes

## Deployment

This project can be deployed to GitHub Pages using the provided scripts:

```bash
# For an automated build and deployment
./deploy-to-github.sh https://github.com/yourusername/repo.git

# Or manually build first
./build-for-deploy.sh
```

See the [GitHub Pages Deployment Guide](./GITHUB_PAGES_DEPLOYMENT.md) for detailed instructions.

## Technical Notes

- The application includes a SPA (Single Page Application) routing solution for GitHub Pages
- Uses the 404.html redirect technique for client-side routing
- Astronomical calculations are based on algorithms from Jean Meeus' "Astronomical Algorithms"

## License

MIT License