import { InsertSettings, Settings } from '../shared/schema';

export interface IStorage {
  getSetting(name: string): Promise<Settings | undefined>;
  createOrUpdateSetting(setting: InsertSettings): Promise<Settings>;
  getAllSettings(): Promise<Settings[]>;
}

export class MemStorage implements IStorage {
  private settings: Map<number, Settings>;
  private settingsByName: Map<string, Settings>;
  currentId: number;

  constructor() {
    this.settings = new Map();
    this.settingsByName = new Map();
    this.currentId = 1;
    
    // Initialize with default settings
    this.createOrUpdateSetting({
      name: 'default_scale',
      value: { scale: 40, isTrueScale: false }
    });
    
    this.createOrUpdateSetting({
      name: 'default_animation_speed',
      value: { speed: 1 }
    });
  }

  async getSetting(name: string): Promise<Settings | undefined> {
    return this.settingsByName.get(name);
  }

  async getAllSettings(): Promise<Settings[]> {
    return Array.from(this.settings.values());
  }

  async createOrUpdateSetting(insertSetting: InsertSettings): Promise<Settings> {
    const existingSetting = await this.getSetting(insertSetting.name);
    
    if (existingSetting) {
      // Update existing setting
      const updatedSetting: Settings = { 
        ...existingSetting, 
        value: insertSetting.value 
      };
      
      this.settings.set(existingSetting.id, updatedSetting);
      this.settingsByName.set(insertSetting.name, updatedSetting);
      
      return updatedSetting;
    } else {
      // Create new setting
      const id = this.currentId++;
      const setting: Settings = { ...insertSetting, id };
      
      this.settings.set(id, setting);
      this.settingsByName.set(setting.name, setting);
      
      return setting;
    }
  }
}

export const storage = new MemStorage();