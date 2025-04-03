// Simple Vite dev server starter
const { createServer } = require('vite');
const path = require('path');

async function startVite() {
  try {
    console.log('Starting Vite development server...');
    
    // Create Vite server
    const server = await createServer({
      // Configure Vite directly here instead of loading from vite.config.ts
      root: path.resolve(__dirname, 'client'),
      server: {
        port: 3000,
        host: true, // Listen on all addresses
        open: true, // Open browser automatically
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'wouter'],
      },
      publicDir: 'public',
    });
    
    // Start the server
    await server.listen();
    
    server.printUrls();
    console.log('Vite server is running...');
  } catch (error) {
    console.error('Error starting Vite server:', error);
    process.exit(1);
  }
}

startVite();