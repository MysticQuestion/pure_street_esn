export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24, maxWidth: 840, margin: '0 auto' }}>
      <h1>STREETS ESN Reporting</h1>
      <h2>Report by Text, Voice, or Web</h2>
      <p>
        STREETS is being built so residents can report public-space hazards by web form, SMS/MMS, WhatsApp,
        and voice. Reports are organized into a civic intelligence loop: report, verify, prioritize, route,
        measure, publish, and improve.
      </p>
      <p><strong>SMS intake foundation installed; public number pending configuration.</strong></p>
      <p>Use web reporting in this app now, or configure Twilio webhooks to activate SMS intake.</p>
    </main>
  );
}
