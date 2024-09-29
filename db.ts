// db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open a database connection
export const openDatabase = async () => {
  const db = await open({
    filename: './readingLog.db', // Path to your database file
    driver: sqlite3.Database,
  });
  return db;
};
