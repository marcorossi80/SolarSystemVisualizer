import React from 'react';
import { cn } from '@/lib/utils';
import { Timer, Gauge, Flame } from 'lucide-react';

interface SpeedControlProps {
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;
  isAnimating: boolean;
}

const SpeedControl: React.FC<SpeedControlProps> = ({
  animationSpeed,
  onSpeedChange,
  isAnimating
}) => {
  // Predefined speed options
  const speedOptions = [
    { value: 0.5, label: '0.5x', icon: <Timer size={12} className="mr-1" /> },
    { value: 1, label: '1x', icon: null },
    { value: 2, label: '2x', icon: null },
    { value: 5, label: '5x', icon: <Gauge size={12} className="mr-1" /> },
    { value: 10, label: '10x', icon: <Flame size={12} className="mr-1" /> }
  ];

  if (!isAnimating) return null;

  return (
    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center bg-black bg-opacity-50 backdrop-blur-md p-2 rounded-full shadow-xl border border-gray-800 transition-all duration-300">
      <div className="text-white text-xs mr-3 font-medium">Speed:</div>
      <div className="flex space-x-1">
        {speedOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSpeedChange(option.value)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200",
              animationSpeed === option.value 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" 
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            )}
          >
            <div className="flex items-center justify-center">
              {option.icon}
              {option.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedControl;