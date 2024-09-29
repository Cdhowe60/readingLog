"use client"; // Add this line at the very top

import { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgresBar.js';
import LogForm from '../components/LogFrom.js';
import RecentLogs from '../components/RecentLogs.js';
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
  const monthlyGoal = 500; // You can adjust this goal

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

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Reading Log</h1>

      <h2 style={styles.subHeading}>Monthly Progress</h2>
      <ProgressBar currentPageCount={totalPagesRead} monthlyGoal={monthlyGoal} />

      <h2 style={styles.subHeading}>Log Your Reading</h2>
      <LogForm onLogSubmit={handleLogSubmit} />

      <h2 style={styles.subHeading}>Recent Logs</h2>
      <RecentLogs logs={logs} />
    </div>
  );
}

// Styling with correct TypeScript types
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
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
};