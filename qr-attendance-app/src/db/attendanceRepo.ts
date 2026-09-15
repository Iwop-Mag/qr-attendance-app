import { dbPromise } from './db';
import type { AttendanceListItem, AttendanceRecord, Subject, Section } from './types';

export async function startSession(
    subjectId: number,
    sectionId: number,
    label = ''
): Promise<number> {
    const db = await dbPromise;
    const result = await db.runAsync(
        'INSERT INTO class_sessions (subject_id, section_id, session_date, label) VALUES (?, ?, ?, ?)',
        [subjectId, sectionId, new Date().toISOString(), label]
    );
    return result.lastInsertRowId;
}

export async function recordScan(
    sessionId: number,
    idNumber: string,
    name = ''
): Promise<void> {
    const db = await dbPromise;
    await db.runAsync(
        'INSERT INTO attendance_records (session_id, id_number, name, timestamp) VALUES (?, ?, ?, ?)',
        [sessionId, idNumber, name, new Date().toISOString()]
    );
}

export async function getAttendanceBySubject(
    subjectId: number
): Promise<AttendanceListItem[]> {
    const db = await dbPromise;
    return db.getAllAsync<AttendanceListItem>(
        `SELECT a.id, a.id_number, a.name, a.timestamp, s.name AS section_name, sub.name AS subject_name
        FROM attendance a
        JOIN class_sessions cs ON a.session_id = cs.id
        JOIN sections s ON cs.section_id = s.id
        JOIN subjects sub ON cs.subject_id = sub.id
        WHERE cs.subject_id = ?
        ORDER BY a.timestamp DESC`,
        [subjectId]
    );
}

export async function getAttendanceBySession(
    sessionId: number
): Promise<AttendanceRecord[]> {
    const db = await dbPromise;
    return db.getAllAsync<AttendanceRecord>(
        'SELECT * FROM attendance WHERE session_id = ? ORDER BY timestamp ASC',
        [sessionId]
    );
}

export async function addSubject(name: string, code: ''): Promise<number> {
    const db = await dbPromise;
    const result = await db.runAsync(
        `INSERT INTO subjects (name, code) VALUES (?, ?)`,
        [name, code]
    );
    return result.lastInsertRowId;
}

export async function addSection(name: string): Promise<number> {
  const db = await dbPromise;
  const result = await db.runAsync(
    `INSERT INTO sections (name) VALUES (?)`,
    [name]
  );
  return result.lastInsertRowId;
}

export async function getSubjects(): Promise<Subject[]> {
  const db = await dbPromise;
  return db.getAllAsync<Subject>(`SELECT * FROM subjects ORDER BY name`);
}

export async function getSections(): Promise<Section[]> {
  const db = await dbPromise;
  return db.getAllAsync<Section>(`SELECT * FROM sections ORDER BY name`);
}