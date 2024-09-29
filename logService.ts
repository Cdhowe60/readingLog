import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Database } from 'sqlite';

// Open the SQLite database and ensure the 'logs' table exists
async function openDB(): Promise<Database> {
  const db = await open({
    filename: './mydb.sqlite', // Change this path to the correct location of your SQLite database
    driver: sqlite3.Database,
  });

  // Create the logs table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book TEXT NOT NULL,
      pages INTEGER NOT NULL,
      date TEXT NOT NULL
    )
  `);

  return db;
}

// Function to add a new log entry
export async function addLog(book: string, pages: number, date: string) {
  const db = await openDB();
  await db.run('INSERT INTO logs (book, pages, date) VALUES (?, ?, ?)', [book, pages, date]);
}

// Function to get the most recent logs
export async function getRecentLogs() {
  const db = await openDB();
  const logs = await db.all('SELECT * FROM logs ORDER BY date DESC LIMIT 5');
  return logs;
}
