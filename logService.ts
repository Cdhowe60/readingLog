import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Database } from 'sqlite';

// Open the SQLite database and ensure the necessary tables exist
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

  // Create the settings table if it doesn't exist (for monthly goal)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY,
      goal INTEGER NOT NULL
    )
  `);

  // Ensure there is a default monthly goal if the settings table is empty
  await db.run(`
    INSERT INTO settings (id, goal)
    SELECT 1, 500
    WHERE NOT EXISTS (SELECT 1 FROM settings WHERE id = 1)
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

// Function to get the current monthly goal
export async function getMonthlyGoal(): Promise<number> {
  const db = await openDB();
  const row = await db.get('SELECT goal FROM settings WHERE id = 1');
  return row ? row.goal : 500; // Default to 500 if no goal is found
}

// Function to update the monthly goal
export async function setMonthlyGoal(goal: number): Promise<void> {
  const db = await openDB();
  await db.run('UPDATE settings SET goal = ? WHERE id = 1', [goal]);
}

// Function to delete a log entry by ID
export async function deleteLog(id: number) {
  const db = await openDB();
  await db.run('DELETE FROM logs WHERE id = ?', id);
}