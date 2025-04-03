import { useState, useEffect, useRef, useCallback } from 'react';
import { calculatePlanetPositions, CelestialBody, Satellite } from '../lib/planetCalculations';
import { 
  ZoomIn, 
  ZoomOut, 
  Move, 
  RefreshCw, 
  Play, 
  Pause, 
  Info, 
  X,
  Moon
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  // State for date and animation
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2025-04-01T12:00:00Z'));
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  
  // State for zoom and pan
  const [scale, setScale] = useState<number>(40); // Starting scale factor
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  
  // State for UI elements
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [isTrueScale, setIsTrueScale] = useState<boolean>(false);
  const [showSatellites, setShowSatellites] = useState<boolean>(true);
  const [selectedPlanet, setSelectedPlanet] = useState<CelestialBody | null>(null);
  
  // Refs for animation and interaction
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  
  // Calculate planet positions
  const [planets, setPlanets] = useState<CelestialBody[]>([]);
  
  useEffect(() => {
    // Initialize planets on mount
    const initialPlanets = calculatePlanetPositions(currentDate);
    setPlanets(initialPlanets);
    
    // Center view on sun
    if (canvasRef.current) {
      setPanX(window.innerWidth / 2);
      setPanY(window.innerHeight / 2);
    }
    
    // Cleanup animation on unmount
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Handle animation loop
  useEffect(() => {
    if (!isAnimating) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }
    
    let lastTime = 0;
    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      
      // Update date based on animation speed
      // Each second represents one day at 1x speed
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + (deltaTime / 1000) * animationSpeed);
      setCurrentDate(newDate);
      
      // Recalculate planet positions
      const updatedPlanets = calculatePlanetPositions(newDate);
      setPlanets(updatedPlanets);
      
      lastTime = time;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, currentDate, animationSpeed]);
  
  // Handlers for zoom controls
  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev * 1.2, 1000));
  }, []);
  
  const handleZoomOut = useCallback(() => {
    setScale(prev => Math.max(prev / 1.2, 5));
  }, []);
  
  const handleResetView = useCallback(() => {
    setScale(40);
    setPanX(window.innerWidth / 2);
    setPanY(window.innerHeight / 2);
  }, []);
  
  // Handlers for mouse interactions
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    setPanX(prev => prev + deltaX);
    setPanY(prev => prev + deltaY);
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);
  
  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);
  
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      // Zoom in
      setScale(prev => Math.min(prev * 1.1, 1000));
    } else {
      // Zoom out
      setScale(prev => Math.max(prev / 1.1, 5));
    }
  }, []);
  
  // Handle animation toggle
  const handleToggleAnimation = useCallback(() => {
    setIsAnimating(prev => !prev);
  }, []);
  
  // Handle planet selection for detailed view
  const handlePlanetClick = useCallback((planet: CelestialBody) => {
    setSelectedPlanet(planet);
  }, []);
  
  // Handle satellite toggle
  const handleToggleSatellites = useCallback(() => {
    setShowSatellites(prev => !prev);
  }, []);
  
  // Render the planets
  const renderPlanets = () => {
    return planets.map((planet, index) => {
      // Skip if planet has no position data
      if (!planet.position && planet.name !== 'Sun') return null;
      
      // Calculate size - use true or enhanced scale based on setting
      let size = isTrueScale 
        ? (planet.radius * 2) / planet.AU * scale 
        : Math.max(5, Math.log(planet.radius) * 2 * scale / 20);
      
      // Special case for Sun - make it bigger in enhanced scale mode
      if (planet.name === 'Sun' && !isTrueScale) {
        size = 25;
      }
      
      // Calculate position
      const x = panX + planet.position.x * scale;
      const y = panY + planet.position.y * scale;
      
      // Calculate orbit path
      const orbitRadius = planet.distance * scale;
      
      // Special styling for rings (Saturn)
      const renderRings = () => {
        if (planet.rings) {
          const ringSize = size * 2;
          return (
            <div
              className="saturn-rings"
              style={{
                left: x,
                top: y,
                width: ringSize * 2,
                height: ringSize * 0.5
              }}
            />
          );
        }
        return null;
      };
      
      // Render satellites if planet has them and they should be shown
      const renderSatellites = () => {
        if (planet.satellites && planet.satellites.length > 0 && showSatellites && planet.name !== 'Sun') {
          return planet.satellites.map(satellite => {
            // Calculate satellite size - use enhanced scale to make them visible
            let satSize = isTrueScale 
              ? (satellite.radius * 2) / planet.AU * scale 
              : Math.max(3, Math.log(satellite.radius) * scale / 40);
            
            // Calculate satellite position relative to planet
            const satX = x + satellite.position.x * scale / 10; // Scale satellite orbit for visibility
            const satY = y + satellite.position.y * scale / 10;
            
            // Determine orbit line for satellite
            const satOrbitRadius = Math.sqrt(
              Math.pow(satellite.position.x, 2) + Math.pow(satellite.position.y, 2)
            ) * scale / 10;
            
            return (
              <div key={`${planet.name}-${satellite.name}`}>
                {/* Satellite orbit */}
                <div
                  className="orbit satellite-orbit"
                  style={{
                    left: x,
                    top: y,
                    width: satOrbitRadius * 2,
                    height: satOrbitRadius * 2,
                    opacity: 0.15
                  }}
                />
                
                {/* Satellite body */}
                <div
                  className="planet satellite"
                  style={{
                    left: satX,
                    top: satY,
                    width: `${satSize}px`,
                    height: `${satSize}px`,
                    backgroundColor: satellite.color,
                    boxShadow: `0 0 ${satSize / 3}px rgba(255, 255, 255, 0.7)`
                  }}
                  title={satellite.name}
                />
                
                {/* Satellite label - only show on high zoom */}
                {scale > 100 && (
                  <div
                    className="planet-label satellite-label"
                    style={{
                      left: satX,
                      top: satY + satSize / 2 + 2,
                      fontSize: '0.6rem',
                      opacity: 0.8
                    }}
                  >
                    {satellite.name}
                  </div>
                )}
              </div>
            );
          });
        }
        return null;
      };
      
      // Render planet with gradient if specified
      const planetStyle: React.CSSProperties = {
        left: x,
        top: y,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: planet.color,
        boxShadow: `0 0 ${size / 3}px rgba(${
          planet.color === '#3498db' ? '52, 152, 219' : 
          planet.color === 'yellow' ? '255, 255, 0' : 
          planet.color === '#e74c3c' ? '231, 76, 60' : 
          planet.color === '#f39c12' ? '243, 156, 18' : 
          planet.color === '#f1c40f' ? '241, 196, 15' : 
          planet.color === '#1abc9c' ? '26, 188, 156' : 
          planet.color === '#e67e22' ? '230, 126, 34' : 
          '255, 255, 255'
        }, 0.8)`,
        cursor: planet.satellites && planet.satellites.length > 0 ? 'pointer' : 'default'
      };
      
      if (planet.gradient) {
        planetStyle.background = planet.name === 'Sun' 
          ? 'radial-gradient(circle at center, #ffef00 10%, #ffd000 50%, #ffaa00 100%)'
          : planet.name === 'Earth'
          ? 'radial-gradient(circle at center, #1abc9c 10%, #3498db 70%, #2980b9 100%)'
          : planet.name === 'Jupiter'
          ? 'linear-gradient(to right, #f39c12, #e67e22, #d35400, #e67e22, #f39c12)'
          : planet.name === 'Uranus'
          ? 'radial-gradient(circle at center, #48dbfb 20%, #1abc9c 80%)'
          : planet.name === 'Neptune'
          ? 'radial-gradient(circle at center, #0abde3 20%, #3498db 80%)'
          : planet.color;
      }
      
      return (
        <div key={planet.name}>
          {/* Render orbit if not the Sun */}
          {planet.name !== 'Sun' && (
            <div
              className="orbit"
              style={{
                left: panX,
                top: panY,
                width: orbitRadius * 2,
                height: orbitRadius * 2
              }}
            />
          )}
          
          {/* Render the planet */}
          <div
            className="planet"
            style={planetStyle}
            title={planet.name}
            onClick={() => handlePlanetClick(planet)}
          />
          
          {/* Render rings for Saturn */}
          {renderRings()}
          
          {/* Render satellites */}
          {renderSatellites()}
          
          {/* Planet label */}
          <div
            className="planet-label"
            style={{
              left: x,
              top: y + size / 2
            }}
          >
            {planet.name}
          </div>
        </div>
      );
    });
  };
  
  // Render date in a readable format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Solar System Canvas */}
      <div
        ref={canvasRef}
        className="canvas-container w-full h-screen"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {renderPlanets()}
      </div>
      
      {/* Control Panel */}
      <div className="control-panel">
        {/* Zoom Controls */}
        <button onClick={handleZoomIn} className="control-button" title="Zoom In">
          <ZoomIn size={20} />
        </button>
        <button onClick={handleZoomOut} className="control-button" title="Zoom Out">
          <ZoomOut size={20} />
        </button>
        <button onClick={handleResetView} className="control-button" title="Reset View">
          <Move size={20} />
        </button>
        
        {/* Separator */}
        <div className="h-6 border-l border-gray-700 mx-2"></div>
        
        {/* Animation Controls */}
        <button onClick={handleToggleAnimation} className="control-button" title={isAnimating ? "Pause" : "Play"}>
          {isAnimating ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        {/* Animation Speed Control */}
        <div className="flex items-center space-x-1 ml-2">
          <select
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="bg-transparent text-gray-300 border border-gray-700 rounded px-2 py-1 text-sm"
            title="Animation Speed"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="2">2x</option>
            <option value="5">5x</option>
            <option value="10">10x</option>
          </select>
        </div>
        
        {/* Separator */}
        <div className="h-6 border-l border-gray-700 mx-2"></div>
        
        {/* Scale Toggle */}
        <div className="flex items-center">
          <label className="inline-flex items-center cursor-pointer">
            <span className="text-xs text-gray-400 mr-2">True Scale</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={isTrueScale}
                onChange={() => setIsTrueScale(prev => !prev)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:bg-primary"></div>
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></div>
            </div>
          </label>
        </div>
        
        {/* Satellite Toggle */}
        <button 
          onClick={handleToggleSatellites} 
          className={`control-button ml-2 ${showSatellites ? 'text-blue-400' : ''}`}
          title={showSatellites ? "Hide Satellites" : "Show Satellites"}
        >
          <Moon size={18} />
        </button>
        
        {/* Info Toggle */}
        <button 
          onClick={() => setShowInfo(prev => !prev)} 
          className="control-button ml-2" 
          title={showInfo ? "Hide Info" : "Show Info"}
        >
          <Info size={20} />
        </button>
      </div>
      
      {/* Info Panel */}
      {showInfo && (
        <div className="info-panel">
          <div className="flex justify-between items-center mb-2">
            <h3 className="info-panel-title">
              {selectedPlanet ? selectedPlanet.name : "Solar System"}
            </h3>
            <button 
              onClick={() => {
                setShowInfo(false);
                setSelectedPlanet(null);
              }} 
              className="text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          
          {selectedPlanet ? (
            <div className="space-y-2 text-sm">
              {/* Planet details */}
              <div>
                <p><span className="font-medium">Diameter:</span> {(selectedPlanet.radius * 2).toLocaleString()} km</p>
                <p><span className="font-medium">Distance from Sun:</span> {selectedPlanet.name !== 'Sun' ? 
                  `${selectedPlanet.distance.toFixed(3)} AU (${(selectedPlanet.distance * 149.6).toLocaleString()} million km)` : 
                  'N/A'}
                </p>
                {selectedPlanet.name !== 'Sun' && (
                  <p><span className="font-medium">Orbit Eccentricity:</span> {selectedPlanet.orbit.e.toFixed(5)}</p>
                )}
              </div>
              
              {/* Satellite information */}
              {selectedPlanet.satellites && selectedPlanet.satellites.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium border-b border-gray-700 pb-1 mb-1">Satellites</h4>
                  <div className="max-h-32 overflow-y-auto pr-1">
                    {selectedPlanet.satellites.map((moon, idx) => (
                      <div key={moon.name} className="mb-1 pb-1 border-b border-gray-800 last:border-0 last:mb-0 last:pb-0">
                        <p className="font-medium text-xs">{moon.name}</p>
                        <div className="grid grid-cols-2 gap-x-2 text-xs text-gray-400">
                          <span>Diameter: {(moon.radius * 2).toLocaleString()} km</span>
                          <span>Orbit: {moon.period.toFixed(2)} days</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => setSelectedPlanet(null)} 
                className="mt-2 w-full text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-1 px-2 rounded"
              >
                Back to Overview
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Current Date:</span> {formatDate(currentDate)}</p>
              <p><span className="font-medium">View Scale:</span> {isTrueScale ? "True Astronomical" : "Enhanced Visibility"}</p>
              <p><span className="font-medium">Scale Factor:</span> 1:{Math.round(149.6e6 / scale).toLocaleString()}</p>
              
              <div className="border-t border-gray-700 my-2 pt-2">
                <p className="text-xs text-gray-400 mb-1">Controls:</p>
                <ul className="text-xs space-y-1">
                  <li>• Mouse drag to pan view</li>
                  <li>• Mouse wheel to zoom in/out</li>
                  <li>• Toggle true scale to see actual sizes</li>
                  <li>• Click on planets for detailed info</li>
                </ul>
              </div>
              
              <div className="border-t border-gray-700 my-2 pt-2">
                <p className="text-xs text-gray-400 mb-1">Satellite Information:</p>
                <p className="text-xs">This visualization includes the three largest satellites for each planet with accurate orbital calculations.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;