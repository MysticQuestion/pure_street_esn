import React from 'react';

export default function DashboardHome() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ESN Dashboard</h1>
      <p>
        This is a placeholder for the operations dashboard.  It will display maps,
        corridors, hazard queues, and analytics as described in the dashboard specification.
      </p>
      <p>
        For now, use the API endpoints to submit and verify reports.  The full dashboard
        will be implemented in a future milestone.
      </p>
    </main>
  );
}