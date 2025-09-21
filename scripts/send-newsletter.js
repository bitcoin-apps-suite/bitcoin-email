#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const TEMPLATES = [
  'welcome-spam',
  'weekly-roast', 
  'btc-obituary',
  'spam-special'
];

async function sendNewsletter(templateId) {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/spam/send-newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        templateId: templateId || 'weekly-roast'
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Newsletter sent successfully!`);
      console.log(`📧 Sent to ${result.sent} subscribers`);
      if (result.failed > 0) {
        console.log(`❌ Failed: ${result.failed}`);
      }
    } else {
      console.error('❌ Failed to send newsletter:', result.error);
    }

    return result;
  } catch (error) {
    console.error('Error sending newsletter:', error);
    process.exit(1);
  }
}

async function testNewsletter(templateId, testEmail) {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/spam/send-newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        templateId,
        testEmail
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Test email sent to: ${testEmail}`);
      console.log(`📧 Template: ${templateId}`);
    } else {
      console.error('❌ Failed to send test:', result.error);
    }

    return result;
  } catch (error) {
    console.error('Error sending test:', error);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'test') {
    const templateId = args[1] || 'weekly-roast';
    const testEmail = args[2] || 'test@example.com';
    
    if (!TEMPLATES.includes(templateId)) {
      console.error(`Invalid template. Choose from: ${TEMPLATES.join(', ')}`);
      process.exit(1);
    }

    console.log(`🧪 Sending test newsletter...`);
    await testNewsletter(templateId, testEmail);
    
  } else if (command === 'send') {
    const templateId = args[1] || 'weekly-roast';
    
    if (!TEMPLATES.includes(templateId)) {
      console.error(`Invalid template. Choose from: ${TEMPLATES.join(', ')}`);
      process.exit(1);
    }

    console.log(`📮 Sending newsletter to all subscribers...`);
    await sendNewsletter(templateId);
    
  } else if (command === 'schedule') {
    // This would be used with cron to send weekly
    const dayOfWeek = new Date().getDay();
    let templateId = 'weekly-roast'; // Default
    
    // Rotate templates based on week number
    const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const templateIndex = weekNumber % TEMPLATES.length;
    templateId = TEMPLATES[templateIndex];
    
    console.log(`📅 Scheduled send - Template: ${templateId}`);
    await sendNewsletter(templateId);
    
  } else {
    console.log(`
📧 SPAM Newsletter Sender

Usage:
  node send-newsletter.js test [template] [email]  - Send test email
  node send-newsletter.js send [template]          - Send to all subscribers  
  node send-newsletter.js schedule                 - Send weekly (for cron)

Templates:
  ${TEMPLATES.join('\n  ')}

Examples:
  node send-newsletter.js test weekly-roast test@example.com
  node send-newsletter.js send btc-obituary
  node send-newsletter.js schedule

For cron (every Monday at 9am):
  0 9 * * 1 node /path/to/send-newsletter.js schedule
    `);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { sendNewsletter, testNewsletter };