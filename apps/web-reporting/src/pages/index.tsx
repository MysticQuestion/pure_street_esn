import React from 'react';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ESN Web Reporting</h1>
      <p>
        Use this web interface to submit environmental hazard reports when you’re away from the
        mobile app.  This client is a proof of concept and shares the same API endpoints as the
        mobile application.
      </p>
      <p>
        For more information on data requirements, see the
        <a href="../../docs/03-data-and-models/hazard-taxonomy.md"> hazard taxonomy</a> and
        <a href="../../data/schemas/hazard-report.schema.json"> report schema</a>.
      </p>
    </main>
  );
}