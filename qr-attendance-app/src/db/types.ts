export interface Subject {
    id: number;
    name: string;
    code: string | null;
}

export interface Section {
    id: number;
    name: string;
}

export interface ClassSession {
    id: number;
    subject_id: number;
    section_id: number;
    session_date: string;
    label: string | null;
}

export interface AttendanceRecord {
    id: number;
    session_id: number;
    id_number: string;
    name: string | null;
    timestamp: string;
}

export interface AttendanceListItem {
    id: number;
    id_number: string;
    name: string | null;
    timestamp: string;
    section_name: string;
    subject_name: string;
}