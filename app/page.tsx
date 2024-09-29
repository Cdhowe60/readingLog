"use client"; // Add this line at the very top

import { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgresBar.js';
import LogForm from '../components/LogFrom.js';
import RecentLogs from '../components/RecentLogs.js';
import Link from 'next/link'; // Import the Link component to navigate to settings

// Define the interface for a reading log
interface ReadingLog {
  id: number;
  book: string;
  pages: number;
  date: string;
}

export default function Home() {
  const [logs, setLogs] = useState<ReadingLog[]>([]);
  const [totalPagesRead, setTotalPagesRead] = useState<number>(0);
  const [monthlyGoal, setMonthlyGoal] = useState<number>(500); // Added useState for goal

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch('/api/logs');
      const recentLogs: ReadingLog[] = await response.json();
      setLogs(recentLogs);
      setTotalPagesRead(recentLogs.reduce((sum: number, log: ReadingLog) => sum + log.pages, 0)); // Calculate total pages read
    };

    fetchLogs();
  }, []);

  const handleLogSubmit = async (log: ReadingLog) => {
    await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    });

    setLogs([log, ...logs]);
    setTotalPagesRead(totalPagesRead + log.pages);
  };

  const handleDeleteLog = async (id: number) => {
    await fetch('/api/logs', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    // Update the logs state by filtering out the deleted log
    setLogs(logs.filter((log) => log.id !== id));
    setTotalPagesRead(totalPagesRead - (logs.find(log => log.id === id)?.pages || 0)); // Update the total pages read
  };

  return (
    <div style={styles.container}>
      {/* "Settings" button in the top-right corner linking to settings */}
      <Link href="/settings">
        <button style={styles.settingsButton}>Settings</button>
      </Link>

      <h1 style={styles.heading}>Reading Log</h1>

      <h2 style={styles.subHeading}>Monthly Progress</h2>
      <ProgressBar currentPageCount={totalPagesRead} monthlyGoal={monthlyGoal} />

      <h2 style={styles.subHeading}>Log Your Reading</h2>
      <LogForm onLogSubmit={handleLogSubmit} />

      <h2 style={styles.subHeading}>Recent Logs</h2>
      <RecentLogs logs={logs} onDelete={handleDeleteLog} />
    </div>
  );
}

// Styling with correct TypeScript types
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    color: '#E0E0E0',
    position: 'relative', // For positioning the settings button
  },
  heading: {
    color: '#BB86FC',
    textAlign: 'center' as React.CSSProperties['textAlign'],
    marginBottom: '20px',
  },
  subHeading: {
    color: '#BB86FC',
    marginBottom: '10px',
  },
  settingsButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#BB86FC',
    border: 'none',
    color: '#FFFFFF',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '5px',
  },
};