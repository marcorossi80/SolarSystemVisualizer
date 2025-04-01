import React from 'react';

interface ControlPanelProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  scale,
  onZoomIn,
  onZoomOut,
  onResetView
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-black bg-opacity-30 backdrop-blur-sm p-2 rounded-full shadow-lg">
      <button 
        onClick={onZoomOut}
        className="control-btn text-white p-3 rounded-full"
        aria-label="Zoom out"
      >
        <i className="fas fa-minus"></i>
      </button>
      <div className="px-3">
        <span className="text-white text-sm font-mono">{scale.toFixed(2)}x</span>
      </div>
      <button 
        onClick={onZoomIn}
        className="control-btn text-white p-3 rounded-full"
        aria-label="Zoom in"
      >
        <i className="fas fa-plus"></i>
      </button>
      <div className="mx-3 h-8 border-r border-gray-600"></div>
      <button 
        onClick={onResetView}
        className="control-btn text-white p-3 rounded-full"
        aria-label="Reset view"
      >
        <i className="fas fa-home"></i>
      </button>
    </div>
  );
};

export default ControlPanel;
