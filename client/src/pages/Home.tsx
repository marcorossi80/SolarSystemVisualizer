import React, { useState, useEffect, useRef } from 'react';
import SolarSystem from '@/components/SolarSystem';
import ControlPanel from '@/components/ControlPanel';
import InfoPanel from '@/components/InfoPanel';
import ScaleToggle from '@/components/ScaleToggle';
import SpeedControl from '@/components/SpeedControl';

const Home: React.FC = () => {
  const [scale, setScale] = useState<number>(1.0);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isTrueScale, setIsTrueScale] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date('April 1, 2025'));
  const [animationSpeed, setAnimationSpeed] = useState<number>(1); // Days per frame at default speed
  
  // useRef to store animation frame ID for cleanup
  const animationFrameRef = useRef<number | null>(null);
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 100));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev * 0.8, 0.0005));
  };
  
  const handleResetView = () => {
    setScale(1.0);
    setPanX(0);
    setPanY(0);
  };

  const handlePan = (deltaX: number, deltaY: number) => {
    setPanX(prev => prev + deltaX);
    setPanY(prev => prev + deltaY);
  };
  
  const toggleAnimation = () => {
    setIsAnimating(prev => !prev);
  };
  
  // Handle animation
  useEffect(() => {
    if (isAnimating) {
      let lastTimestamp = 0;
      
      const animate = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        
        // Advance time based on elapsed milliseconds and animation speed
        const elapsed = timestamp - lastTimestamp;
        const daysToAdvance = (elapsed / 50) * animationSpeed; // Apply animation speed multiplier
        
        setCurrentDate(prevDate => {
          const newDate = new Date(prevDate);
          newDate.setDate(newDate.getDate() + daysToAdvance);
          return newDate;
        });
        
        lastTimestamp = timestamp;
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Clean up on component unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, animationSpeed]);

  return (
    <div className="relative w-full h-screen overflow-hidden text-labelText">
      <SolarSystem 
        scale={scale} 
        panX={panX} 
        panY={panY} 
        isTrueScale={isTrueScale}
        currentDate={currentDate}
        onPan={handlePan} 
        onZoom={(factor) => setScale(prev => {
          const newScale = prev * factor;
          return Math.min(Math.max(newScale, 0.0005), 100);
        })}
      />
      
      <ControlPanel 
        scale={scale} 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onResetView={handleResetView}
        isAnimating={isAnimating}
        onToggleAnimation={toggleAnimation}
      />
      
      <InfoPanel currentDate={currentDate} />
      
      <ScaleToggle 
        isTrueScale={isTrueScale} 
        onToggle={() => setIsTrueScale(prev => !prev)} 
      />
      
      <SpeedControl
        animationSpeed={animationSpeed}
        onSpeedChange={setAnimationSpeed}
        isAnimating={isAnimating}
      />
    </div>
  );
};

export default Home;
