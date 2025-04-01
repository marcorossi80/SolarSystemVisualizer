import React from 'react';

interface InfoPanelProps {
  currentDate: Date;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ currentDate }) => {
  // Format the date nicely
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="absolute top-4 right-4 w-64 bg-black bg-opacity-30 backdrop-blur-sm p-4 rounded-lg shadow-lg max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4">Solar System</h2>
      <div className="space-y-3">
        <p className="text-sm"><span className="text-gray-400">Date:</span> {formattedDate}</p>
        <p className="text-sm">
          This visualization shows our solar system with all planets to scale, including both size and distance. 
          The positions shown reflect where planets are on the displayed date.
        </p>
        <p className="text-sm text-primary">
          <i className="fas fa-play mr-1"></i> 
          Use the play button to animate planet movements.
        </p>
        <div className="mt-4">
          <h3 className="text-sm font-bold border-b border-gray-700 pb-1 mb-2">Legend</h3>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span>Sun</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
              <span>Mercury</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-200 mr-2"></div>
              <span>Venus</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Earth</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Mars</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
              <span>Jupiter</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-600 mr-2"></div>
              <span>Saturn</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-teal-300 mr-2"></div>
              <span>Uranus</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-700 mr-2"></div>
              <span>Neptune</span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400">Drag to pan. Use mouse wheel or zoom controls to zoom in/out.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
