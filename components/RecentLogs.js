import React from 'react';

const RecentLogs = ({ logs }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Book</th>
          <th>Pages</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {logs.slice(0, 5).map((log, index) => (
          <tr key={index}>
            <td>{log.book}</td>
            <td>{log.pages}</td>
            <td>{new Date(log.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentLogs;
