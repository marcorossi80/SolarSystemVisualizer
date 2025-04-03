# Solar System Visualizer

This interactive visualization shows the positions of the planets and their major satellites in our solar system as of April 1, 2025. The simulation is based on accurate astronomical calculations.

## Features
- View all planets in their accurate positions
- Toggle between true astronomical scale and enhanced scale for better visibility
- Zoom and pan the view to explore planets
- See satellites (moons) around each planet
- Animate the progression of time to watch planetary motion

## About the Satellite Visualization

The latest update improves the visibility of satellites (moons) around the planets. Each planet displays up to 3 of its largest satellites with:
- Increased size for better visibility
- White outline to make them stand out
- Permanent name labels for easy identification
- Accurate orbital positions relative to their parent planet

## Instructions

To see the satellites:
1. Click on a planet to select it
2. Use the zoom controls to zoom in on the planet
3. Look for small white-outlined dots with name labels orbiting the planet
4. Satellite names appear directly next to them when zoomed in or when the planet is selected
5. You can also hover over a satellite to see additional details

## Technical Details

The visualization uses HTML5 Canvas for rendering and JavaScript for astronomical calculations. Planet positions are calculated using Keplerian orbital elements with necessary adjustments for planetary perturbations.