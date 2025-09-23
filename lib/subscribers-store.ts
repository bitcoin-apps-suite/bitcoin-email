import fs from 'fs/promises';
import path from 'path';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'subscribers.json');

export interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
  welcomeEmailSent?: boolean;
}

export class SubscribersStore {
  private static async ensureFile(): Promise<void> {
    try {
      await fs.access(SUBSCRIBERS_FILE);
    } catch {
      await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify({ subscribers: [] }, null, 2));
    }
  }

  static async getAll(): Promise<Subscriber[]> {
    try {
      await this.ensureFile();
      const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.subscribers || [];
    } catch (error) {
      console.error('Error reading subscribers:', error);
      return [];
    }
  }

  static async add(subscriber: Subscriber): Promise<void> {
    try {
      const subscribers = await this.getAll();
      
      // Check if already exists
      const exists = subscribers.some(s => s.email.toLowerCase() === subscriber.email.toLowerCase());
      if (!exists) {
        subscribers.push(subscriber);
        await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify({ subscribers }, null, 2));
        console.log(`✅ Subscriber saved: ${subscriber.email}`);
      } else {
        console.log(`ℹ️ Subscriber already exists: ${subscriber.email}`);
      }
    } catch (error) {
      console.error('Error adding subscriber:', error);
      throw error;
    }
  }

  static async getStats() {
    const subscribers = await this.getAll();
    const now = new Date();
    const today = now.toDateString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return {
      total: subscribers.length,
      today: subscribers.filter(s => new Date(s.subscribedAt).toDateString() === today).length,
      thisWeek: subscribers.filter(s => new Date(s.subscribedAt) > weekAgo).length,
      thisMonth: subscribers.filter(s => new Date(s.subscribedAt) > monthAgo).length,
      recentSubscribers: subscribers.slice(-10).reverse()
    };
  }
}