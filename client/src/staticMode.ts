// This file contains configuration for running the app in static mode (GitHub Pages)
// without requiring the Express backend

// Flag to determine if we're running in static mode (GitHub Pages)
export const isStaticMode = import.meta.env.MODE === 'production' && 
                          window.location.hostname !== 'localhost' && 
                          !window.location.hostname.includes('replit');