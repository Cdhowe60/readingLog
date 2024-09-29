// setupDatabase.ts
import { openDatabase } from './db';

const setupDatabase = async () => {
  const db = await openDatabase();

  // Create a table for reading logs
  await db.exec(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book TEXT NOT NULL,
      pages INTEGER NOT NULL,
      date TEXT NOT NULL
    )
  `);

  console.log('Database setup complete');
  await db.close();
};

// Run the setup function
setupDatabase().catch((err) => console.error(err));
