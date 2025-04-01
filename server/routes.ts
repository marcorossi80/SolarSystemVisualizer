import { Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import { storage } from './storage';
import { insertSettingsSchema } from '../shared/schema';
import { log } from './vite';

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get all settings
  app.get('/api/settings', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const settings = await storage.getAllSettings();
      res.json(settings);
    } catch (error) {
      next(error);
    }
  });

  // Get a specific setting by name
  app.get('/api/settings/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const setting = await storage.getSetting(req.params.name);
      if (!setting) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      res.json(setting);
    } catch (error) {
      next(error);
    }
  });

  // Create or update a setting
  app.post('/api/settings', async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = insertSettingsSchema.safeParse(req.body);
    
    if (!parsedBody.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsedBody.error });
    }
    
    try {
      const setting = await storage.createOrUpdateSetting(parsedBody.data);
      res.status(201).json(setting);
    } catch (error) {
      next(error);
    }
  });
  
  log('Routes registered');
  return Promise.resolve(app.listen());
}