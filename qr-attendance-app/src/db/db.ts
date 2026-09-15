// db.ts
import * as SQLite from 'expo-sqlite';

export const dbPromise = SQLite.openDatabaseAsync('attendance.db');

export async function initDb(): Promise<void> {
  const db = await dbPromise;
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      code TEXT
    );

    CREATE TABLE IF NOT EXISTS sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS class_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id INTEGER NOT NULL,
      section_id INTEGER NOT NULL,
      session_date TEXT NOT NULL,
      label TEXT,
      FOREIGN KEY (subject_id) REFERENCES subjects(id),
      FOREIGN KEY (section_id) REFERENCES sections(id)
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      id_number TEXT NOT NULL,
      name TEXT,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (session_id) REFERENCES class_sessions(id)
    );
  `);
}