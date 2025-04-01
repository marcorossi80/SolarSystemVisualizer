import React from 'react';
import { Eye, Microscope } from 'lucide-react';

interface ScaleToggleProps {
  isTrueScale: boolean;
  onToggle: () => void;
}

const ScaleToggle: React.FC<ScaleToggleProps> = ({ isTrueScale, onToggle }) => {
  return (
    <div className="absolute top-4 left-4 bg-black bg-opacity-50 backdrop-blur-md p-3 rounded-lg shadow-xl border border-gray-800">
      <div className="flex flex-col gap-2">
        <div className="text-center text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
          Scale Mode
        </div>
        
        <div className="flex items-center justify-between gap-3">
          <div className={`flex flex-col items-center ${!isTrueScale ? 'text-blue-400' : 'text-gray-500'}`}>
            <Eye size={16} />
            <span className="text-xs mt-1">Enhanced</span>
          </div>
          
          <div className="relative inline-block w-12 align-middle select-none">
            <input 
              type="checkbox" 
              id="scaleToggle" 
              className="sr-only" 
              checked={isTrueScale}
              onChange={onToggle}
            />
            <label 
              htmlFor="scaleToggle" 
              className="block overflow-hidden h-6 rounded-full bg-gray-800 cursor-pointer border border-gray-700"
            >
              <span 
                className={`block h-6 w-6 rounded-full transform transition-transform duration-300 ${
                  isTrueScale ? 'translate-x-6 bg-blue-500' : 'translate-x-0 bg-gray-600'
                }`}
              ></span>
            </label>
          </div>
          
          <div className={`flex flex-col items-center ${isTrueScale ? 'text-blue-400' : 'text-gray-500'}`}>
            <Microscope size={16} />
            <span className="text-xs mt-1">Realistic</span>
          </div>
        </div>
        
        <div className="text-center text-[10px] text-gray-400 mt-1">
          {isTrueScale 
            ? "Showing actual relative sizes and distances (very small!)" 
            : "Planets enlarged for better visibility"}
        </div>
      </div>
    </div>
  );
};

export default ScaleToggle;
