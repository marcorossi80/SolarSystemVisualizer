// Astronomical constants
const AU = 149597870.7; // Astronomical Unit in km

// Interface for celestial body position
interface Position {
  x: number;
  y: number;
}

// Interface for orbital elements
interface OrbitalElements {
  a: number;  // semi-major axis (AU)
  e: number;  // eccentricity
  i: number;  // inclination (degrees)
  L: number;  // mean longitude (degrees)
  lp: number; // longitude of perihelion (degrees)
  o: number;  // longitude of ascending node (degrees)
}

// Interface for celestial body
export interface CelestialBody {
  name: string;
  radius: number;
  color: string;
  distance: number;
  orbit: OrbitalElements;
  AU: number;
  position: Position;
  gradient?: boolean;
  rings?: boolean;
}

/**
 * Calculate the position of a planet based on its orbital elements
 * @param planet Orbital elements of the planet
 * @param date Target date for calculation
 * @returns {Position} x, y coordinates
 */
function calculatePosition(planet: OrbitalElements, date: Date): Position {
  // Number of days since J2000.0 (January 1, 2000, 12:00 UTC)
  const j2000 = new Date('January 1, 2000 12:00:00 UTC');
  const daysSinceJ2000 = (date.getTime() - j2000.getTime()) / (1000 * 60 * 60 * 24);
  
  // Simple orbital period calculation (in Earth days)
  const period = 365.25 * Math.pow(planet.a, 1.5); // Kepler's third law
  
  // Mean anomaly (M) calculation
  const M = (planet.L - planet.lp + (daysSinceJ2000 * 360 / period)) % 360;
  const M_rad = M * Math.PI / 180;
  
  // Solve Kepler's equation iteratively for eccentric anomaly (E)
  let E = M_rad;
  let delta = 1;
  while (Math.abs(delta) > 1e-6) {
    delta = E - planet.e * Math.sin(E) - M_rad;
    E = E - delta / (1 - planet.e * Math.cos(E));
  }
  
  // True anomaly (v)
  const v = 2 * Math.atan(Math.sqrt((1 + planet.e) / (1 - planet.e)) * Math.tan(E / 2));
  
  // Heliocentric distance
  const r = planet.a * (1 - planet.e * Math.cos(E));
  
  // Convert to cartesian coordinates
  const xh = r * (Math.cos(planet.o * Math.PI / 180) * Math.cos(v + planet.lp * Math.PI / 180 - planet.o * Math.PI / 180) - 
                  Math.sin(planet.o * Math.PI / 180) * Math.sin(v + planet.lp * Math.PI / 180 - planet.o * Math.PI / 180) * Math.cos(planet.i * Math.PI / 180));
  const yh = r * (Math.sin(planet.o * Math.PI / 180) * Math.cos(v + planet.lp * Math.PI / 180 - planet.o * Math.PI / 180) + 
                  Math.cos(planet.o * Math.PI / 180) * Math.sin(v + planet.lp * Math.PI / 180 - planet.o * Math.PI / 180) * Math.cos(planet.i * Math.PI / 180));
  
  return {
    x: xh,
    y: yh
  };
}

/**
 * Calculate planet positions for a given date
 * @param date Date to calculate positions for
 * @returns Array of celestial bodies with positions
 */
export function calculatePlanetPositions(date: Date): CelestialBody[] {
  // Planet data with real dimensions and orbital elements for April 1, 2025
  const celestialBodies: CelestialBody[] = [
    { 
      name: 'Sun', 
      radius: 696340,
      color: '#FDB813',
      gradient: true,
      distance: 0,
      // Simplified orbital elements for April 1, 2025
      orbit: { a: 0, e: 0, i: 0, L: 0, lp: 0, o: 0 },
      AU: AU,
      position: { x: 0, y: 0 }
    },
    { 
      name: 'Mercury', 
      radius: 2439.7,
      color: '#BDBDBD',
      distance: 0.387 * AU,
      // Mercury orbital elements for April 1, 2025
      orbit: { a: 0.387, e: 0.206, i: 7.005, L: 252.3, lp: 77.5, o: 48.3 },
      AU: AU,
      position: { x: 0, y: 0 }
    },
    { 
      name: 'Venus', 
      radius: 6051.8,
      color: '#E6E6B8',
      distance: 0.723 * AU,
      orbit: { a: 0.723, e: 0.007, i: 3.39, L: 181.2, lp: 131.6, o: 76.7 },
      AU: AU,
      position: { x: 0, y: 0 }
    },
    { 
      name: 'Earth', 
      radius: 6371,
      color: '#2E71B8',
      distance: 1.0 * AU,
      orbit: { a: 1.0, e: 0.017, i: 0.0, L: 100.5, lp: 102.9, o: 0.0 },
      AU: AU,
      position: { x: 0, y: 0 }
    },
    { 
      name: 'Mars', 
      radius: 3389.5,
      color: '#D14C32',
      distance: 1.524 * AU,
      orbit: { a: 1.524, e: 0.093, i: 1.85, L: 19.4, lp: 336.1, o: 49.6 },
      AU: AU,
      position: { x: 0, y: 0 }
    },
    { 
      name: 'Jupiter', 
      radius: 69911,
      color: '#E3A857',
      distance: 5.203 * AU,
      orbit: { a: 5.203, e: 0.048, i: 1.31, L: 20.5, lp: 14.8, o: 100.5 },
      AU: AU,
      position: { x: 0, y: 0 }
    },
    { 
      name: 'Saturn', 
      radius: 58232,
      color: '#E5DACE',
      rings: true,
      distance: 9.555 * AU,
      orbit: { a: 9.555, e: 0.054, i: 2.49, L: 42.4, lp: 92.4, o: 113.7 },
      AU: AU,
      position: { x: 0, y: 0 }
    },
    { 
      name: 'Uranus', 
      radius: 25362,
      color: '#99CCCE',
      distance: 19.22 * AU,
      orbit: { a: 19.22, e: 0.047, i: 0.77, L: 314.1, lp: 170.9, o: 74.0 },
      AU: AU,
      position: { x: 0, y: 0 }
    },
    { 
      name: 'Neptune', 
      radius: 24622,
      color: '#3A75C4',
      distance: 30.11 * AU,
      orbit: { a: 30.11, e: 0.009, i: 1.77, L: 304.4, lp: 44.9, o: 131.8 },
      AU: AU,
      position: { x: 0, y: 0 }
    }
  ];

  // Calculate positions for each planet (except the Sun)
  for (let i = 1; i < celestialBodies.length; i++) {
    celestialBodies[i].position = calculatePosition(celestialBodies[i].orbit, date);
  }

  return celestialBodies;
}
