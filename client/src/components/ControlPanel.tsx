import React from 'react';
import { ZoomIn, ZoomOut, Home, Play, Pause } from 'lucide-react';

interface ControlPanelProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  isAnimating: boolean;
  onToggleAnimation: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  scale,
  onZoomIn,
  onZoomOut,
  onResetView,
  isAnimating,
  onToggleAnimation
}) => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center bg-black bg-opacity-50 backdrop-blur-md p-2 px-4 rounded-full shadow-xl border border-gray-800">
      <button 
        onClick={onZoomOut}
        className="control-btn flex justify-center items-center text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        aria-label="Zoom out"
      >
        <ZoomOut size={18} />
      </button>
      
      <div className="px-3 min-w-16 text-center">
        <span className="text-white text-sm font-mono bg-gray-800 py-1 px-2 rounded-md">
          {scale.toFixed(2)}x
        </span>
      </div>
      
      <button 
        onClick={onZoomIn}
        className="control-btn flex justify-center items-center text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        aria-label="Zoom in"
      >
        <ZoomIn size={18} />
      </button>
      
      <div className="mx-3 h-8 border-r border-gray-700"></div>
      
      <button 
        onClick={onResetView}
        className="control-btn flex justify-center items-center text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        aria-label="Reset view"
      >
        <Home size={18} />
      </button>
      
      <div className="mx-3 h-8 border-r border-gray-700"></div>
      
      <button 
        onClick={onToggleAnimation}
        className={`control-btn flex justify-center items-center text-white p-2 rounded-full transition-all duration-300 ${
          isAnimating 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
            : 'hover:bg-gray-800'
        }`}
        aria-label={isAnimating ? "Pause animation" : "Start animation"}
      >
        {isAnimating ? <Pause size={18} /> : <Play size={18} />}
      </button>
      
      {isAnimating && (
        <div className="ml-2 py-1 px-2 bg-gray-800 rounded-md text-xs text-blue-300 animate-pulse">
          Animating
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
