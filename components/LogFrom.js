// LogForm.js
import { useState } from 'react';

export default function LogForm({ onLogSubmit }) {
  const [book, setBook] = useState('');
  const [pages, setPages] = useState(0);
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book || !pages || !date) return;

    onLogSubmit({ book, pages: Number(pages), date });
    setBook('');
    setPages(0);
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Book</label>
        <input
          type="text"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Pages</label>
        <input
          type="number"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
      </div>

      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
}

// Styling for dark mode
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: '#BB86FC', // Accent color for label text
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    color: '#E0E0E0', // Light text color
    backgroundColor: '#1E1E1E', // Dark background for input fields
    border: '1px solid #BB86FC', // Accent color for the border
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#BB86FC', // Purple button color for dark mode
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};
