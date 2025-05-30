// src/database/schema.ts
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'superadmin';
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sermon {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  audioUrl?: string;
  date: string;
  speaker?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export class AppDatabase {
  private db: Database.Database;

  constructor(dbPath: string = './database/church.db') {

    const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log(`Created database directory: ${dbDir}`);
  }

    this.db = new Database(dbPath);
    // Enable foreign key constraints
    this.db.pragma('foreign_keys = ON');
  
  }

  initialize() {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        password TEXT NOT NULL,
        phone TEXT,
        avatar TEXT,
        role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin', 'superadmin')),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createEventsTable = `
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        date DATETIME NOT NULL,
        location TEXT,
        createdBy TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE
      )
    `;

    const createSermonsTable = `
      CREATE TABLE IF NOT EXISTS sermons (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        videoUrl TEXT,
        audioUrl TEXT,
        date DATETIME NOT NULL,
        speaker TEXT,
        createdBy TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE
      )
    `;

    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
      CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(createdBy);
      CREATE INDEX IF NOT EXISTS idx_sermons_date ON sermons(date);
      CREATE INDEX IF NOT EXISTS idx_sermons_created_by ON sermons(createdBy);
    `;

    try {
      this.db.exec(createUsersTable);
      this.db.exec(createEventsTable);
      this.db.exec(createSermonsTable);
      this.db.exec(createIndexes);
      console.log('Database tables and indexes created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
      throw error;
    }
  }

  // User methods
  createUser(user: Omit<User, 'createdAt' | 'updatedAt'>): void {
    const stmt = this.db.prepare(`
      INSERT INTO users (id, email, firstName, lastName, password, phone, avatar, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.password,
      user.phone || null,
      user.avatar || null,
      user.role
    );
  }

  getUserByEmail(email: string): User | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email) as User | undefined;
    return user || null;
  }

  getUserById(id: string): User | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(id) as User | undefined;
    return user || null;
  }

  getAllUsers(): User[] {
    const stmt = this.db.prepare('SELECT * FROM users ORDER BY createdAt DESC');
    return stmt.all() as User[];
  }

  getUsersByRole(role: 'user' | 'admin' | 'superadmin'): User[] {
    const stmt = this.db.prepare('SELECT * FROM users WHERE role = ? ORDER BY createdAt DESC');
    return stmt.all(role) as User[];
  }

  updateUser(userId: string, updates: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): void {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    const stmt = this.db.prepare(`
      UPDATE users 
      SET ${fields}, updatedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    stmt.run(...values, userId);
  }

  updateUserRole(userId: string, role: 'user' | 'admin' | 'superadmin'): void {
    const stmt = this.db.prepare('UPDATE users SET role = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(role, userId);
  }

  deleteUser(userId: string): void {
    const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(userId);
  }

  // Event methods
  createEvent(event: Omit<Event, 'createdAt' | 'updatedAt'>): void {
    const stmt = this.db.prepare(`
      INSERT INTO events (id, title, description, date, location, createdBy)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      event.id,
      event.title,
      event.description || null,
      event.date,
      event.location || null,
      event.createdBy
    );
  }

  getEventById(id: string): Event | null {
    const stmt = this.db.prepare('SELECT * FROM events WHERE id = ?');
    const event = stmt.get(id) as Event | undefined;
    return event || null;
  }

  getAllEvents(): Event[] {
    const stmt = this.db.prepare('SELECT * FROM events ORDER BY date DESC');
    return stmt.all() as Event[];
  }

  getUpcomingEvents(): Event[] {
    const stmt = this.db.prepare('SELECT * FROM events WHERE date >= datetime("now") ORDER BY date ASC');
    return stmt.all() as Event[];
  }

  updateEvent(eventId: string, updates: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>): void {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    const stmt = this.db.prepare(`
      UPDATE events 
      SET ${fields}, updatedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    stmt.run(...values, eventId);
  }

  deleteEvent(eventId: string): void {
    const stmt = this.db.prepare('DELETE FROM events WHERE id = ?');
    stmt.run(eventId);
  }

  // Sermon methods
  createSermon(sermon: Omit<Sermon, 'createdAt' | 'updatedAt'>): void {
    const stmt = this.db.prepare(`
      INSERT INTO sermons (id, title, description, videoUrl, audioUrl, date, speaker, createdBy)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      sermon.id,
      sermon.title,
      sermon.description || null,
      sermon.videoUrl || null,
      sermon.audioUrl || null,
      sermon.date,
      sermon.speaker || null,
      sermon.createdBy
    );
  }

  getSermonById(id: string): Sermon | null {
    const stmt = this.db.prepare('SELECT * FROM sermons WHERE id = ?');
    const sermon = stmt.get(id) as Sermon | undefined;
    return sermon || null;
  }

  getAllSermons(): Sermon[] {
    const stmt = this.db.prepare('SELECT * FROM sermons ORDER BY date DESC');
    return stmt.all() as Sermon[];
  }

  getRecentSermons(limit: number = 10): Sermon[] {
    const stmt = this.db.prepare('SELECT * FROM sermons ORDER BY date DESC LIMIT ?');
    return stmt.all(limit) as Sermon[];
  }

  updateSermon(sermonId: string, updates: Partial<Omit<Sermon, 'id' | 'createdAt' | 'updatedAt'>>): void {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    const stmt = this.db.prepare(`
      UPDATE sermons 
      SET ${fields}, updatedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    stmt.run(...values, sermonId);
  }

  deleteSermon(sermonId: string): void {
    const stmt = this.db.prepare('DELETE FROM sermons WHERE id = ?');
    stmt.run(sermonId);
  }

  // Utility methods
  getUserStats(): { totalUsers: number; admins: number; superadmins: number } {
    const totalStmt = this.db.prepare('SELECT COUNT(*) as count FROM users');
    const adminStmt = this.db.prepare('SELECT COUNT(*) as count FROM users WHERE role = "admin"');
    const superadminStmt = this.db.prepare('SELECT COUNT(*) as count FROM users WHERE role = "superadmin"');
    
    return {
      totalUsers: (totalStmt.get() as any).count,
      admins: (adminStmt.get() as any).count,
      superadmins: (superadminStmt.get() as any).count
    };
  }

  getContentStats(): { totalEvents: number; totalSermons: number; upcomingEvents: number } {
    const eventsStmt = this.db.prepare('SELECT COUNT(*) as count FROM events');
    const sermonsStmt = this.db.prepare('SELECT COUNT(*) as count FROM sermons');
    const upcomingStmt = this.db.prepare('SELECT COUNT(*) as count FROM events WHERE date >= datetime("now")');
    
    return {
      totalEvents: (eventsStmt.get() as any).count,
      totalSermons: (sermonsStmt.get() as any).count,
      upcomingEvents: (upcomingStmt.get() as any).count
    };
  }

  // Backup and cleanup
  backup(backupPath: string): void {
    this.db.backup(backupPath);
  }

  vacuum(): void {
    this.db.exec('VACUUM');
  }

  // Transaction support
  transaction<T>(fn: () => T): T {
    return this.db.transaction(fn)();
  }

  close(): void {
    this.db.close();
  }
}

// Create and export database instance
export const db = new AppDatabase();