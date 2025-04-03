import { useState, useEffect } from 'react';

const Home = () => {
  const [date, setDate] = useState(new Date('2025-04-01T12:00:00Z'));
  
  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Solar System Visualization
      </h1>
      
      <div className="max-w-md w-full p-6 rounded-lg bg-card shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Planet Positions</h2>
        <p className="mb-4 text-muted-foreground">
          Interactive model of our solar system showing celestial bodies positioned as they would be on {formatDate(date)}.
        </p>
        
        <div className="border border-border p-4 rounded-md mb-4 bg-background/50">
          <h3 className="font-medium mb-2">Current Features</h3>
          <ul className="space-y-1 text-sm">
            <li>• True astronomical scale toggle</li>
            <li>• Elliptical orbits with accurate eccentricity</li>
            <li>• Includes major satellites (moons)</li>
            <li>• Interactive zoom and pan</li>
            <li>• Date-based positioning</li>
          </ul>
        </div>
        
        <button 
          className="w-full py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          onClick={() => alert('Full interactive model coming soon!')}
        >
          Explore Solar System
        </button>
      </div>
    </div>
  );
};

export default Home;