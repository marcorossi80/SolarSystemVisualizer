import React, { useEffect, useRef, useState } from 'react';
import { calculatePlanetPositions } from '@/lib/planetCalculations';

interface SolarSystemProps {
  scale: number;
  panX: number;
  panY: number;
  isTrueScale: boolean;
  currentDate: Date;
  onPan: (deltaX: number, deltaY: number) => void;
  onZoom: (factor: number) => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ 
  scale, 
  panX, 
  panY, 
  isTrueScale,
  currentDate,
  onPan, 
  onZoom 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  
  // Get planet data and positions with the current date
  const celestialBodies = calculatePlanetPositions(currentDate);
  
  const draw = (context: CanvasRenderingContext2D, width: number, height: number) => {
    context.fillStyle = '#050505';
    context.fillRect(0, 0, width, height);
    
    const centerX = width / 2 + panX;
    const centerY = height / 2 + panY;
    
    // Calculate the base scale factor to fit the largest orbit in view
    const maxDistance = celestialBodies[celestialBodies.length - 1].distance;
    const baseScaleFactor = Math.min(width, height) / (maxDistance * 2.2);
    
    // Apply the user zoom scale
    const scaleFactor = baseScaleFactor * scale;
    
    // Draw orbital paths
    context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    context.lineWidth = 1;
    
    for (let i = 1; i < celestialBodies.length; i++) {
      const planet = celestialBodies[i];
      
      // Calculate semi-minor axis (b) using semi-major axis (a) and eccentricity (e)
      const semiMajor = planet.orbit.a * planet.AU * scaleFactor;
      const semiMinor = semiMajor * Math.sqrt(1 - Math.pow(planet.orbit.e, 2));
      
      // Draw elliptical orbit with proper inclination
      context.beginPath();
      context.ellipse(
        centerX, 
        centerY, 
        semiMajor, 
        semiMinor, 
        planet.orbit.lp * Math.PI / 180, // Use longitude of perihelion for rotation angle
        0, 
        2 * Math.PI
      );
      context.stroke();
    }
    
    // Draw planets
    for (let i = 0; i < celestialBodies.length; i++) {
      const body = celestialBodies[i];
      
      // Calculate position
      let x, y;
      if (body.name === 'Sun') {
        x = centerX;
        y = centerY;
      } else {
        const position = body.position;
        x = centerX + position.x * body.AU * scaleFactor;
        y = centerY + position.y * body.AU * scaleFactor;
      }
      
      // Calculate radius (either true scale or enhanced for visibility)
      let radius;
      if (isTrueScale) {
        radius = Math.max(body.radius * scaleFactor, 1); // Minimum 1px so very small planets are still visible
      } else {
        // Enhanced size for visibility - logarithmic scale
        radius = 5 + Math.log(body.radius / 2000) * 8;
        if (body.name === 'Sun') {
          radius = 25; // Make sun larger
        } else if (body.name === 'Jupiter' || body.name === 'Saturn') {
          radius = 15; // Slightly larger for gas giants
        } else if (body.name === 'Uranus' || body.name === 'Neptune') {
          radius = 12; // Medium size for ice giants
        } else if (body.name === 'Earth' || body.name === 'Venus') {
          radius = 10; // Slightly larger for Earth and Venus
        } else {
          radius = 8; // Smaller planets
        }
      }
      
      // Create glow effects for bodies
      if (body.name === 'Sun') {
        // Sun's glow effect
        const glowRadius = radius * 1.5;
        const glow = context.createRadialGradient(x, y, radius * 0.5, x, y, glowRadius);
        glow.addColorStop(0, 'rgba(253, 184, 19, 0.3)');
        glow.addColorStop(1, 'rgba(253, 184, 19, 0)');
        
        context.fillStyle = glow;
        context.beginPath();
        context.arc(x, y, glowRadius, 0, 2 * Math.PI);
        context.fill();
        
        // Sun itself with gradient
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, '#FFF5E0');
        gradient.addColorStop(0.4, '#FDB813');
        gradient.addColorStop(1, '#F87F0F');
        context.fillStyle = gradient;
      } else if (body.name === 'Earth') {
        // Earth with blue-green gradient
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, '#4F94CD');
        gradient.addColorStop(0.6, '#2E71B8');
        gradient.addColorStop(1, '#1A456B');
        context.fillStyle = gradient;
      } else if (body.name === 'Mars') {
        // Mars with reddish gradient
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, '#E27B58');
        gradient.addColorStop(0.7, '#D14C32');
        gradient.addColorStop(1, '#952D19');
        context.fillStyle = gradient;
      } else if (body.name === 'Jupiter') {
        // Jupiter with banded texture simulation
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, '#E8C098');
        gradient.addColorStop(0.6, '#E3A857');
        gradient.addColorStop(1, '#9A6228');
        context.fillStyle = gradient;
      } else {
        // Use solid color for other planets
        context.fillStyle = body.color;
      }
      
      // Draw the celestial body
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fill();
      
      // Add highlights to planets for 3D effect
      if (body.name !== 'Sun') {
        context.save();
        const highlight = context.createRadialGradient(
          x - radius * 0.3, 
          y - radius * 0.3, 
          0, 
          x, 
          y, 
          radius
        );
        highlight.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        highlight.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        
        context.fillStyle = highlight;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
      }
      
      // Draw Saturn's rings if applicable
      if (body.rings) {
        context.save();
        
        // Outer ring
        context.beginPath();
        context.ellipse(x, y, radius * 2.2, radius * 0.5, Math.PI / 8, 0, 2 * Math.PI);
        const ringGradient = context.createLinearGradient(
          x - radius * 2.2, 
          y, 
          x + radius * 2.2, 
          y
        );
        ringGradient.addColorStop(0, 'rgba(229, 218, 206, 0.6)');
        ringGradient.addColorStop(0.5, 'rgba(229, 218, 206, 0.9)');
        ringGradient.addColorStop(1, 'rgba(229, 218, 206, 0.6)');
        context.strokeStyle = ringGradient;
        context.lineWidth = radius * 0.4;
        context.stroke();
        
        // Inner ring
        context.beginPath();
        context.ellipse(x, y, radius * 1.5, radius * 0.4, Math.PI / 8, 0, 2 * Math.PI);
        context.strokeStyle = 'rgba(209, 198, 186, 0.7)';
        context.lineWidth = radius * 0.2;
        context.stroke();
        
        context.restore();
      }
      
      // Draw planet shadow on rings if applicable
      if (body.rings) {
        context.save();
        context.beginPath();
        context.ellipse(x, y, radius * 1.1, radius * 0.3, Math.PI / 8, 0, Math.PI);
        context.strokeStyle = 'rgba(30, 30, 30, 0.7)';
        context.lineWidth = radius * 0.1;
        context.stroke();
        context.restore();
      }
      
      // Draw label with enhanced styling
      const labelY = y + radius + 8;
      
      // Draw label background
      context.fillStyle = 'rgba(0, 0, 0, 0.5)';
      const labelWidth = context.measureText(body.name).width + 10;
      context.fillRect(x - labelWidth / 2, labelY, labelWidth, 18);
      
      // Draw label text
      context.fillStyle = '#FFFFFF';
      context.font = '12px "Helvetica", sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(body.name, x, labelY + 9);
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Set canvas dimensions to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(context, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [scale, panX, panY, isTrueScale, currentDate]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastX(e.clientX);
    setLastY(e.clientY);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;
    
    onPan(deltaX, deltaY);
    
    setLastX(e.clientX);
    setLastY(e.clientY);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Determine zoom direction and factor
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    
    // Apply zoom
    onZoom(zoomFactor);
  };
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    />
  );
};

export default SolarSystem;
