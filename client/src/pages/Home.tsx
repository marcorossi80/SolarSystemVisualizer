import React from 'react';
import SolarSystem from '@/components/SolarSystem';
import ControlPanel from '@/components/ControlPanel';
import InfoPanel from '@/components/InfoPanel';
import ScaleToggle from '@/components/ScaleToggle';

const Home: React.FC = () => {
  const [scale, setScale] = React.useState<number>(1.0);
  const [panX, setPanX] = React.useState<number>(0);
  const [panY, setPanY] = React.useState<number>(0);
  const [isTrueScale, setIsTrueScale] = React.useState<boolean>(true);
  
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

  return (
    <div className="relative w-full h-screen overflow-hidden text-labelText">
      <SolarSystem 
        scale={scale} 
        panX={panX} 
        panY={panY} 
        isTrueScale={isTrueScale} 
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
      />
      
      <InfoPanel />
      
      <ScaleToggle 
        isTrueScale={isTrueScale} 
        onToggle={() => setIsTrueScale(prev => !prev)} 
      />
    </div>
  );
};

export default Home;
