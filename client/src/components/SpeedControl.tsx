import React from 'react';
import { cn } from '@/lib/utils';

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
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 5, label: '5x' },
    { value: 10, label: '10x' }
  ];

  if (!isAnimating) return null;

  return (
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center bg-black bg-opacity-30 backdrop-blur-sm p-2 rounded-full shadow-lg">
      <div className="text-white text-xs mr-2">Speed:</div>
      <div className="flex space-x-1">
        {speedOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSpeedChange(option.value)}
            className={cn(
              "px-2 py-1 rounded-full text-xs text-white transition-colors",
              animationSpeed === option.value 
                ? "bg-primary" 
                : "hover:bg-gray-700"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedControl;