import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { registerRoutes } from './routes';
import { log, setupVite, serveStatic } from './vite';

async function main() {
  // Create express app
  const app = express();
  const server = http.createServer(app);
  
  // Middleware
  app.use(express.json());
  
  // For development, setup vite middleware
  if (process.env.NODE_ENV !== 'production') {
    await setupVite(app, server);
  }
  
  // Register API routes
  await registerRoutes(app);
  
  // Serve static files for production
  if (process.env.NODE_ENV === 'production') {
    serveStatic(app);
  }
  
  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    log(`Error: ${err.message}`, 'error');
    res.status(err.status || 500).json({
      message: err.message,
      error: process.env.NODE_ENV === 'production' ? {} : err.stack,
    });
  });
  
  // Start server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    log(`Server listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});