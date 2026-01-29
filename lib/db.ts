
import fs from 'fs';
import path from 'path';

// Define the data directory and file paths
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

// Ensure data directory and files exist
const ensureDataFiles = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(EVENTS_FILE)) {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify([]));
  }
};

ensureDataFiles();

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Event {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  date?: string;
  startTime: string;
  endTime: string;
  locationType: 'Physical' | 'Virtual';
  location: string;
  tickets: any[];
  imageSrc?: string;
  attendees: number;
  status: 'Live' | 'Upcoming' | 'Past';
  createdAt: string;
}

class JSONFileStore {
  private readJSON<T>(filePath: string): T {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [] as unknown as T;
    }
  }

  private writeJSON<T>(filePath: string, data: T): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  // User Methods
  getUsers(): User[] {
    return this.readJSON<User[]>(USERS_FILE);
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.writeJSON(USERS_FILE, users);
  }

  findUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find((u) => u.email === email);
  }

  findUserById(id: string): User | undefined {
    const users = this.getUsers();
    return users.find((u) => u.id === id);
  }

  // Event Methods
  getEvents(userId: string): Event[] {
    const events = this.readJSON<Event[]>(EVENTS_FILE);
    return events.filter((e) => e.userId === userId);
  }

  saveEvent(event: Event): void {
    const events = this.readJSON<Event[]>(EVENTS_FILE);
    events.push(event);
    this.writeJSON(EVENTS_FILE, events);
  }
}

export const db = new JSONFileStore();
