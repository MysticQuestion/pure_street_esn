const { parseInbound, classifyIssueType, classifySeverity, extractLocation, buildResponse, hashPhone, safeNoopTwilio } = require('../src/lib/twilio');

test('parse inbound payload', () => {
  const parsed = parseInbound({ From: '+1555', Body: 'Illegal dump at 123 Main St', NumMedia: '1', MediaUrl0: 'https://x', MediaContentType0: 'image/jpeg' });
  expect(parsed.from).toBe('+1555');
  expect(parsed.media).toHaveLength(1);
});

test('classifies issue + severity + location', () => {
  expect(classifyIssueType('Graffiti at wall')).toBe('graffiti');
  expect(classifySeverity('Needles on sidewalk')).toBe('urgent');
  expect(extractLocation('trash near 123 Main St')).toContain('123 Main St');
});

test('response message variants', () => {
  expect(buildResponse({ issueType: 'dumping', severity: 'emergency_referral', locationText: 'x' })).toMatch(/call 911/i);
  expect(buildResponse({ issueType: 'dumping', severity: 'moderate', locationText: null })).toMatch(/nearest address/i);
});

test('phone hash stable + non-raw', () => {
  const h1 = hashPhone('+14155551234', 'salt');
  const h2 = hashPhone('+14155551234', 'salt');
  expect(h1).toBe(h2);
  expect(h1).not.toContain('14155551234');
});

test('no-op with missing credentials', () => {
  delete process.env.TWILIO_ACCOUNT_SID;
  expect(safeNoopTwilio()).toBe(true);
});
