import React, { useState } from 'react';
import { calculatePlanetPositions, CelestialBody, Satellite } from '@/lib/planetCalculations';

interface InfoPanelProps {
  currentDate: Date;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ currentDate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'planets'>('overview');
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  
  // Format the date nicely
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get celestial body data for displaying information
  const celestialBodies = calculatePlanetPositions(currentDate);
  
  // Find the selected planet
  const selectedBody = selectedPlanet 
    ? celestialBodies.find(body => body.name === selectedPlanet) 
    : null;
  
  // Function to format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };
  
  // Function to format distance (AU to km)
  const formatDistance = (distance: number): string => {
    if (distance === 0) return "0";
    const km = Math.round(distance);
    return formatNumber(km) + " km";
  };
  
  return (
    <div className="absolute top-4 right-4 w-80 bg-black bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-xl max-h-[calc(100vh-2rem)] overflow-y-auto">
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
          Solar System
        </h2>
        <div className="text-sm text-gray-300">{formattedDate}</div>
      </div>
      
      {/* Tabs */}
      <div className="flex mb-4 border-b border-gray-800">
        <button 
          className={`px-3 py-2 text-sm font-medium ${activeTab === 'overview' 
            ? 'text-blue-400 border-b-2 border-blue-400' 
            : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-3 py-2 text-sm font-medium ${activeTab === 'planets' 
            ? 'text-blue-400 border-b-2 border-blue-400' 
            : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('planets')}
        >
          Planets
        </button>
      </div>
      
      <div className="space-y-4">
        {activeTab === 'overview' ? (
          <>
            <p className="text-sm">
              This interactive visualization shows our solar system with planets positioned according to their 
              actual orbits on <span className="font-semibold text-blue-300">{formattedDate}</span>.
            </p>
            
            <div className="bg-gray-900 bg-opacity-60 p-3 rounded-md">
              <h3 className="text-sm font-bold text-blue-300 mb-2">Features</h3>
              <ul className="text-xs space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Accurate Orbits:</strong> Planets follow elliptical paths with proper inclination</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Major Satellites:</strong> Includes the largest moons for each planet</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Real-time Animation:</strong> Watch the solar system evolve over time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Scale Toggle:</strong> Switch between accurate scale and enhanced visibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Interactive Navigation:</strong> Pan and zoom to explore</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold border-b border-gray-700 pb-1 mb-2">Legend</h3>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                {celestialBodies.map((body) => (
                  <div key={body.name} className="flex items-center group cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 p-1 rounded" onClick={() => {
                    setSelectedPlanet(body.name);
                    setActiveTab('planets');
                  }}>
                    <div 
                      className="w-4 h-4 rounded-full mr-2"
                      style={{
                        background: body.name === 'Sun' 
                          ? 'radial-gradient(circle, #FFF5E0, #FDB813, #F87F0F)' 
                          : body.color
                      }}
                    ></div>
                    <span className="group-hover:text-blue-300 transition-colors">{body.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                Drag to pan. Use mouse wheel or zoom controls to zoom in/out.
                Click on a planet in the legend to see detailed information.
              </p>
            </div>
          </>
        ) : (
          <>
            {selectedBody ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{selectedBody.name}</h3>
                  <button 
                    className="text-xs text-gray-400 hover:text-blue-400"
                    onClick={() => setSelectedPlanet(null)}
                  >
                    « Back to list
                  </button>
                </div>
                
                {/* Planet visualization */}
                <div className="flex justify-center py-3">
                  <div 
                    className="rounded-full w-20 h-20"
                    style={{
                      background: selectedBody.name === 'Sun' 
                        ? 'radial-gradient(circle, #FFF5E0, #FDB813, #F87F0F)' 
                        : selectedBody.name === 'Earth'
                        ? 'radial-gradient(circle, #4F94CD, #2E71B8, #1A456B)'
                        : selectedBody.name === 'Mars'
                        ? 'radial-gradient(circle, #E27B58, #D14C32, #952D19)'
                        : selectedBody.name === 'Jupiter'
                        ? 'radial-gradient(circle, #E8C098, #E3A857, #9A6228)'
                        : selectedBody.color,
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)'
                    }}
                  />
                </div>
                
                {/* Planet data */}
                <div className="bg-gray-900 bg-opacity-50 rounded-md p-3 text-sm space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-400 text-xs">Diameter</p>
                      <p className="font-medium">{formatNumber(selectedBody.radius * 2)} km</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Distance from Sun</p>
                      <p className="font-medium">{formatDistance(selectedBody.distance)}</p>
                    </div>
                  </div>
                  
                  {selectedBody.name !== 'Sun' && (
                    <>
                      <div className="pt-2">
                        <p className="text-gray-400 text-xs">Orbital Details</p>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div>
                            <p className="text-gray-400 text-xs">Semi-major axis</p>
                            <p className="font-medium">{selectedBody.orbit.a.toFixed(3)} AU</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Eccentricity</p>
                            <p className="font-medium">{selectedBody.orbit.e.toFixed(3)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Inclination</p>
                            <p className="font-medium">{selectedBody.orbit.i.toFixed(2)}°</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedBody.name === 'Sun' && (
                    <div className="pt-1">
                      <p className="text-xs text-amber-300 font-medium">The Sun contains 99.8% of the mass in our solar system</p>
                    </div>
                  )}
                  
                  {selectedBody.rings && (
                    <div className="pt-1">
                      <p className="text-xs text-amber-300 font-medium">Features distinctive ring system</p>
                    </div>
                  )}
                  
                  {/* Satellites section */}
                  {selectedBody.satellites && selectedBody.satellites.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-gray-300 text-sm font-medium mb-2">
                        {selectedBody.name} has {selectedBody.satellites.length} major {selectedBody.satellites.length === 1 ? 'satellite' : 'satellites'}
                      </p>
                      
                      <div className="space-y-2">
                        {selectedBody.satellites.map((satellite: Satellite) => (
                          <div key={satellite.name} className="bg-gray-800 bg-opacity-50 rounded-md p-2">
                            <div className="flex items-center mb-1">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: satellite.color }}
                              ></div>
                              <h4 className="font-medium text-sm">{satellite.name}</h4>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className="text-gray-400">Diameter</p>
                                <p>{formatNumber(satellite.radius * 2)} km</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Orbital Period</p>
                                <p>{satellite.period.toFixed(2)} days</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Semi-major axis</p>
                                <p>{formatNumber(satellite.semiMajorAxis)} km</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Inclination</p>
                                <p>{satellite.inclination.toFixed(2)}°</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm">Select a planet to view detailed information:</p>
                
                <div className="space-y-2">
                  {celestialBodies.map((body) => (
                    <div 
                      key={body.name}
                      className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
                      onClick={() => setSelectedPlanet(body.name)}
                    >
                      <div 
                        className="w-6 h-6 rounded-full mr-3"
                        style={{
                          background: body.name === 'Sun' 
                            ? 'radial-gradient(circle, #FFF5E0, #FDB813, #F87F0F)' 
                            : body.color
                        }}
                      ></div>
                      <div>
                        <p className="font-medium">{body.name}</p>
                        <p className="text-xs text-gray-400">
                          {body.name === 'Sun' 
                            ? 'Star at the center of our solar system' 
                            : `Planet - ${formatDistance(body.distance)} from Sun${body.satellites ? ` • ${body.satellites.length} ${body.satellites.length === 1 ? 'moon' : 'moons'}` : ''}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
