"use client"; // Add this line at the very top

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const [monthlyGoal, setMonthlyGoal] = useState<number>(500); // Default goal value
  const router = useRouter();

  useEffect(() => {
    // Fetch current monthly goal from the settings API
    const fetchMonthlyGoal = async () => {
      try {
        const response = await fetch('/api/settings'); // Updated endpoint
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        setMonthlyGoal(data.goal);
      } catch (error) {
        console.error('Failed to fetch monthly goal:', error);
      }
    };

    fetchMonthlyGoal();
  }, []);

  const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyGoal(Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal: monthlyGoal }),
      });

      if (response.ok) {
        alert('Monthly goal updated successfully!');
        router.push('/'); // Redirect to the main page
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to update goal: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update monthly goal.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Settings</h1>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="monthlyGoal">Monthly Goal:</label>
          <input
            type="number"
            id="monthlyGoal"
            value={monthlyGoal}
            onChange={handleGoalChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Update Goal</button>
      </form>
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
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    color: '#BB86FC',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #BB86FC',
    backgroundColor: '#121212',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#BB86FC',
    color: '#FFFFFF',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
