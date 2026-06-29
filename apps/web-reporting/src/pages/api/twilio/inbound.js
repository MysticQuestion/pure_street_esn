const { parseInbound, classifyIssueType, classifySeverity, extractLocation, buildResponse, hashPhone } = require('../../../lib/twilio');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const data = parseInbound(req.body || {});
  const issueType = classifyIssueType(data.body);
  const severity = classifySeverity(data.body);
  const locationText = extractLocation(data.body);
  const response = buildResponse({ issueType, severity, locationText });

  const report = {
    source: data.media.length ? 'mms' : 'sms', issueType, severity, locationText,
    status: locationText ? 'needs_review' : 'needs_location', rawMessage: data.body,
    twilioMessageSid: data.messageSid, reporterPhoneHash: hashPhone(data.from), media: data.media,
    createdAt: new Date().toISOString(),
  };
  console.log('Twilio inbound report (foundation mode):', JSON.stringify(report));

  res.setHeader('Content-Type', 'text/xml');
  return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${response}</Message></Response>`);
}
