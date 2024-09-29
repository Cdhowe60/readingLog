import React from 'react';

// Define the RecentLogs component
const RecentLogs = ({ logs, onDelete }) => {
  // Function to format date to MM/dd/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div>
      {logs.length > 0 ? (
        logs.map((log) => (
          <div key={log.id} style={styles.logItem}>
            <p>
              {formatDate(log.date)}: {log.book} ({log.pages} page{log.pages > 1 ? 's' : ''})
            </p>
            <button onClick={() => onDelete(log.id)} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No recent logs available.</p>
      )}
    </div>
  );
};

// Styles for RecentLogs
const styles = {
  logItem: {
    padding: '10px',
    border: '1px solid #BB86FC',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#1e1e1e',
  },
  deleteButton: {
    marginLeft: '10px',
    backgroundColor: '#FF3B30',
    color: '#FFFFFF',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default RecentLogs;
