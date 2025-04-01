import React from 'react';

interface ScaleToggleProps {
  isTrueScale: boolean;
  onToggle: () => void;
}

const ScaleToggle: React.FC<ScaleToggleProps> = ({ isTrueScale, onToggle }) => {
  return (
    <div className="absolute top-4 left-4 bg-black bg-opacity-30 backdrop-blur-sm p-3 rounded-lg shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-xs">Size Scale</span>
        <div className="relative inline-block w-10 align-middle select-none">
          <input 
            type="checkbox" 
            id="scaleToggle" 
            className="sr-only" 
            checked={isTrueScale}
            onChange={onToggle}
          />
          <label 
            htmlFor="scaleToggle" 
            className="block overflow-hidden h-5 rounded-full bg-gray-700 cursor-pointer"
          >
            <span 
              className={`block h-5 w-5 rounded-full bg-white transform transition-transform duration-200 ${
                isTrueScale ? 'translate-x-5' : 'translate-x-0'
              }`}
            ></span>
          </label>
        </div>
        <span className="text-xs">True Scale</span>
      </div>
    </div>
  );
};

export default ScaleToggle;
