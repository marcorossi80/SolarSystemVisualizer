# Solar System Visualizer

An interactive, accurate-scale visualization of our solar system with planet positions as of April 1, 2025. The application shows the sun, planets, and major satellites (moons) in their proper positions and orbits.

## Features

- **Accurate Planet Positions**: Calculated positions using astronomical formulas for April 1, 2025
- **True to Scale Mode**: Toggle between accurate astronomical scale and enhanced visibility
- **Interactive Controls**: Zoom, pan, and explore the solar system
- **Elliptical Orbits**: Shows the proper eccentricity of each planet's orbit
- **Satellite Visualization**: Displays up to three major satellites per planet
- **Animation**: Controls for playing time forward with adjustable speed
- **Mobile Responsive**: Works on desktop and mobile devices
- **Static HTML/JS Version**: Deployable directly to GitHub Pages

## Deployment

The application is ready to be deployed to GitHub Pages. You can deploy it by:

1. Push the content of the `public` directory to your GitHub repository
2. Enable GitHub Pages in your repository settings
3. The site will be available at: https://marcorossi80.github.io/SolarSystemVisualizer/

## How to Access in Replit

You can access the application directly in Replit:

- **Live Preview**: Use the web_application_feedback_tool to view the application
- **Direct Files**: Access `public/solar-system.html` in the file browser

## Technical Details

- Built with HTML5 Canvas and plain JavaScript (no dependencies)
- Astronomical calculations based on algorithms from "Astronomical Algorithms" by Jean Meeus
- Orbital elements updated with time-dependent terms to account for orbital precession
- Supports elliptical orbits with proper eccentricity values

## Next Steps

Potential enhancements you might consider:

1. Add dwarf planets like Pluto, Ceres, etc.
2. Include asteroid belt visualization
3. Add more detailed information about each celestial body
4. Implement orbit traces to show the complete path
5. Create an educational mode with guided tours