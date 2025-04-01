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
          radius = 20;
        }
      }
      
      // Draw the celestial body
      if (body.gradient && body.name === 'Sun') {
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, '#FDB813');
        gradient.addColorStop(1, '#F89E0F');
        context.fillStyle = gradient;
      } else {
        context.fillStyle = body.color;
      }
      
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fill();
      
      // Draw Saturn's rings if applicable
      if (body.rings) {
        context.save();
        context.beginPath();
        context.ellipse(x, y, radius * 2, radius * 0.5, Math.PI / 6, 0, 2 * Math.PI);
        context.strokeStyle = 'rgba(229, 218, 206, 0.8)';
        context.lineWidth = radius * 0.3;
        context.stroke();
        context.restore();
      }
      
      // Draw label
      context.fillStyle = '#EEEEEE';
      context.font = '12px "Space Mono", monospace';
      context.textAlign = 'center';
      context.textBaseline = 'top';
      context.fillText(body.name, x, y + radius + 8);
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
