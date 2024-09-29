import React from 'react';

const ProgressBar = ({ currentPageCount, monthlyGoal }) => {
  const percentage = (currentPageCount / monthlyGoal) * 100;

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '4px', width: '100%', padding: '3px' }}>
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: '#4caf50',
          height: '20px',
          borderRadius: '4px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        {Math.min(percentage, 100).toFixed(1)}%
      </div>
    </div>
  );
};

export default ProgressBar;
