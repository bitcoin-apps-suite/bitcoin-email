/**
 * Google Apps Script for SPAM Campaign Automation
 * Copy this into Google Apps Script (script.google.com)
 * Set up triggers for automatic execution
 */

// Configuration
const CONFIG = {
  spreadsheetId: 'YOUR_SPREADSHEET_ID', // Replace with your Google Sheet ID
  emailFrom: 'Bitcoin Email SPAM Kitchen 🥫 <bitcoin.bmail@gmail.com>',
  githubToken: 'YOUR_GITHUB_TOKEN', // For fetching issues
  geminiApiKey: 'YOUR_GEMINI_API_KEY', // For AI content generation
  
  // Schedule (0 = Sunday, 1 = Monday, etc.)
  sendDays: [1, 3, 5], // Monday, Wednesday, Friday
  sendHour: 10, // 10 AM
  
  // APIs
  mempoolApi: 'https://mempool.space/api/v1/fees/recommended',
  btcPriceApi: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC'
};

// Main function - Schedule this to run daily
function dailySpamRoutine() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Check if today is a send day
  if (!CONFIG.sendDays.includes(dayOfWeek)) {
    console.log('Not a send day, skipping...');
    return;
  }
  
  // Generate content
  const content = generateTodaysContent(dayOfWeek);
  
  // Get subscribers
  const subscribers = getActiveSubscribers();
  
  // Send emails
  sendSpamCampaign(subscribers, content);
  
  // Log metrics
  logCampaignSent(content.subject, subscribers.length);
}

// Generate content based on day
function generateTodaysContent(dayOfWeek) {
  let template, subject, focus;
  
  switch(dayOfWeek) {
    case 1: // Monday
      template = 'mempool-monday';
      subject = generateMempoolMondaySubject();
      focus = 'weekend disasters';
      break;
    case 3: // Wednesday
      template = 'why-wednesday';
      subject = generateWhyWednesdaySubject();
      focus = 'technical failures';
      break;
    case 5: // Friday
      template = 'fee-friday';
      subject = generateFeeFridaySubject();
      focus = 'fee disasters';
      break;
  }
  
  // Fetch live data
  const btcMetrics = fetchBTCMetrics();
  const githubIssues = fetchGitHubIssues();
  const projectUpdates = fetchProjectUpdates();
  
  // Generate content sections
  const roast = generateRoast(focus, btcMetrics);
  const buildingSection = formatBuildingSection(githubIssues);
  const ecosystemUpdates = formatEcosystemUpdates(projectUpdates);
  
  // Compile email
  const html = compileEmailHtml(template, {
    subject,
    roast,
    btcMetrics,
    buildingSection,
    ecosystemUpdates,
    issueNumber: getNextIssueNumber()
  });
  
  return { subject, html, template };
}

// Fetch current BTC metrics
function fetchBTCMetrics() {
  try {
    // Fetch mempool fees
    const mempoolResponse = UrlFetchApp.fetch(CONFIG.mempoolApi);
    const fees = JSON.parse(mempoolResponse.getContentText());
    
    // Fetch BTC price
    const priceResponse = UrlFetchApp.fetch(CONFIG.btcPriceApi);
    const priceData = JSON.parse(priceResponse.getContentText());
    
    return {
      fastestFee: fees.fastestFee,
      avgFee: fees.halfHourFee,
      slowFee: fees.economyFee,
      btcPrice: priceData.data.rates.USD,
      costOfCoffee: (fees.fastestFee * 0.0002 * priceData.data.rates.USD).toFixed(2)
    };
  } catch(e) {
    console.error('Error fetching BTC metrics:', e);
    return {
      fastestFee: 'ASTRONOMICAL',
      avgFee: 'RIDICULOUS', 
      slowFee: 'STILL TOO HIGH',
      btcPrice: 'WHO CARES',
      costOfCoffee: '$500+'
    };
  }
}

// Fetch GitHub issues with bounties
function fetchGitHubIssues() {
  const url = 'https://api.github.com/repos/bitcoin-apps-suite/bitcoin-email/issues?labels=bounty';
  const options = {
    headers: {
      'Authorization': 'Bearer ' + CONFIG.githubToken,
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const issues = JSON.parse(response.getContentText());
    
    return issues.slice(0, 5).map(issue => ({
      title: issue.title,
      url: issue.html_url,
      bounty: extractBounty(issue.labels)
    }));
  } catch(e) {
    console.error('Error fetching GitHub issues:', e);
    return [];
  }
}

// Generate roast content
function generateRoast(focus, metrics) {
  const roasts = {
    'weekend disasters': [
      `This weekend's mempool reached ${metrics.fastestFee} sat/vB. That's $${metrics.costOfCoffee} to send $5. Mathematics has left the chat.`,
      `Lightning Network channels dropping like flies: 47 channels closed due to high on-chain fees. "Layer 2 scaling solution" can't afford Layer 1.`,
      `BTC Maxi spotted paying ${metrics.fastestFee} sats/vB for a transaction. When asked why, responded: "It's a store of value, not meant to be moved."`,
    ],
    'technical failures': [
      `BREAKING: BTC still processing 7 transactions per second. In related news, a 1990s dial-up modem was seen laughing.`,
      `Scientists confirm: Making blocks smaller doesn't make them faster. BTC Core developers "shocked and confused."`,
      `New Study: 99% of BTC holders have never made an on-chain transaction. The other 1% are broke from fees.`
    ],
    'fee disasters': [
      `TODAY'S FEE CHAMPION: Someone paid $${metrics.costOfCoffee} to move $20. Congratulations, you played yourself.`,
      `Fee Friday Special: Get your transaction confirmed in only 6 hours for the low price of ${metrics.slowFee} sat/vB!`,
      `This week's total fees collected: $47 million. Transactions processed: 2.1 million. Calculator says that's $22 per transaction. "Digital cash" indeed.`
    ]
  };
  
  const roastSet = roasts[focus] || roasts['weekend disasters'];
  return roastSet[Math.floor(Math.random() * roastSet.length)];
}

// Generate subject lines
function generateMempoolMondaySubject() {
  const subjects = [
    "🚨 Mempool Monday: ${fees} sat/vB and Rising",
    "📈 Weekend Warrior Pays $847 for Coffee Transaction",
    "⚰️ RIP: 47 Lightning Channels Died This Weekend",
    "🎪 Mempool Circus: Watch Fees Do Backflips"
  ];
  return subjects[Math.floor(Math.random() * subjects.length)];
}

function generateWhyWednesdaySubject() {
  const subjects = [
    "🤔 Why BTC Still Can't Scale (Hint: They Don't Want To)",
    "🔬 Scientists Baffled: How Is 7 TPS Still A Thing?",
    "💡 BTC Core Dev Discovers Fire, Still Afraid of Big Blocks",
    "🎭 The Comedy Continues: BTC Claims It's 'Working As Intended'"
  ];
  return subjects[Math.floor(Math.random() * subjects.length)];
}

function generateFeeFridaySubject() {
  const subjects = [
    "💸 Fee Friday: This Week's $500+ Transaction Hall of Fame",
    "🏆 Congratulations! Your Fee Was Higher Than Your Transaction",
    "📊 Chart Goes Vertical (The Bad Kind): Fees Hit New Records",
    "🎰 Fee Lottery: Guess Today's Confirmation Price!"
  ];
  return subjects[Math.floor(Math.random() * subjects.length)];
}

// Compile HTML email
function compileEmailHtml(template, data) {
  // This would normally load from a template file
  // For now, using inline template
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Georgia, serif; background: #FFF8DC; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #FF6B6B, #FF4444); color: white; padding: 30px; text-align: center; }
    .spam-title { font-size: 48px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
    .issue-number { font-size: 14px; opacity: 0.9; }
    .content { padding: 30px; }
    .roast-section { background: #FFF0F0; padding: 20px; border-left: 4px solid #FF4444; margin: 20px 0; }
    .metrics { display: flex; justify-content: space-around; margin: 20px 0; }
    .metric-box { text-align: center; padding: 15px; background: #F0F0F0; border-radius: 8px; }
    .btc-bad { color: #FF4444; font-weight: bold; }
    .bsv-good { color: #00AA00; font-weight: bold; }
    .building-section { background: #F0FFF0; padding: 20px; margin: 20px 0; }
    .issue-list { list-style: none; padding: 0; }
    .issue-item { padding: 10px; margin: 5px 0; background: white; border-left: 3px solid #00AA00; }
    .cta-button { display: inline-block; padding: 15px 30px; background: #FF4444; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px; }
    .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="spam-title">🥫 The Daily SPAM</h1>
      <div class="issue-number">Issue #${data.issueNumber} | ${new Date().toLocaleDateString()}</div>
    </div>
    
    <div class="content">
      <div class="roast-section">
        <h2>Today's BTC Disaster</h2>
        <p>${data.roast}</p>
        
        <div class="metrics">
          <div class="metric-box">
            <div class="btc-bad">BTC Fees</div>
            <div>${data.btcMetrics.fastestFee} sat/vB</div>
            <div>($${data.btcMetrics.costOfCoffee})</div>
          </div>
          <div class="metric-box">
            <div class="bsv-good">BSV Fees</div>
            <div>1 sat/vB</div>
            <div>($0.0001)</div>
          </div>
        </div>
      </div>
      
      <div class="building-section">
        <h2>🔨 Help Build The Future (And Get Paid)</h2>
        ${data.buildingSection}
        
        <center>
          <a href="https://bitcoin-email.vercel.app/contracts" class="cta-button">
            View All Contracts →
          </a>
          <a href="https://github.com/bitcoin-apps-suite" class="cta-button">
            Claim Bounties →
          </a>
        </center>
      </div>
      
      <div class="ecosystem-section">
        <h2>🌍 Ecosystem Updates</h2>
        ${data.ecosystemUpdates}
      </div>
      
      <div class="token-section">
        <h2>🪙 $BMAIL Token Update</h2>
        <p>40% still available for contributors!</p>
        <p>This week: 500 $BMAIL distributed to 12 contributors</p>
        <center>
          <a href="https://bitcoin-email.vercel.app/contributions" class="cta-button">
            Claim Your Tokens →
          </a>
        </center>
      </div>
    </div>
    
    <div class="footer">
      <p>You're receiving this because you signed up at bitcoin-email.vercel.app/spam</p>
      <p>Unlike BTC transactions, unsubscribing is instant and free.</p>
      <p>
        <a href="https://twitter.com/bitcoin_email" style="color: #FF4444;">Twitter</a> | 
        <a href="https://github.com/bitcoin-apps-suite" style="color: #FF4444;">GitHub</a> | 
        <a href="https://bitcoin-email.vercel.app" style="color: #FF4444;">Website</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// Send campaign to all subscribers
function sendSpamCampaign(subscribers, content) {
  const batchSize = 50; // Gmail quota management
  
  for (let i = 0; i < subscribers.length; i += batchSize) {
    const batch = subscribers.slice(i, i + batchSize);
    
    batch.forEach(subscriber => {
      try {
        GmailApp.sendEmail(
          subscriber.email,
          content.subject,
          'View this email in HTML', // Plain text fallback
          {
            htmlBody: personalizeEmail(content.html, subscriber),
            name: 'Bitcoin Email SPAM Kitchen 🥫'
          }
        );
        
        Utilities.sleep(100); // Rate limiting
      } catch(e) {
        console.error(`Failed to send to ${subscriber.email}:`, e);
      }
    });
    
    // Pause between batches
    if (i + batchSize < subscribers.length) {
      Utilities.sleep(5000);
    }
  }
}

// Get active subscribers from sheet
function getActiveSubscribers() {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName('Subscribers');
  const data = sheet.getDataRange().getValues();
  
  return data.slice(1) // Skip header
    .filter(row => row[4] === 'active') // Status column
    .map(row => ({
      email: row[0],
      subscribeDate: row[1],
      source: row[2],
      tags: row[3]
    }));
}

// Log campaign metrics
function logCampaignSent(subject, recipientCount) {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName('Metrics');
  sheet.appendRow([
    new Date(),
    subject,
    recipientCount,
    0, // Opens (to be updated)
    0, // Clicks (to be updated)
    0  // Unsubs (to be updated)
  ]);
}

// Format building section
function formatBuildingSection(issues) {
  if (!issues.length) {
    return '<p>Loading opportunities...</p>';
  }
  
  let html = '<ul class="issue-list">';
  issues.forEach(issue => {
    html += `
      <li class="issue-item">
        <strong>${issue.title}</strong><br>
        Bounty: ${issue.bounty}<br>
        <a href="${issue.url}">Claim This →</a>
      </li>
    `;
  });
  html += '</ul>';
  
  return html;
}

// Format ecosystem updates
function formatEcosystemUpdates() {
  // This would fetch from various repos
  return `
    <ul>
      <li><strong>Bitcoin-Spreadsheet</strong>: New formula engine live!</li>
      <li><strong>Bitcoin-Drive</strong>: 10GB storage now available</li>
      <li><strong>Bitcoin-Music</strong>: Streaming demo launched</li>
      <li><strong>Bitcoin-Email</strong>: SPAM campaign growing 200%/week</li>
    </ul>
  `;
}

// Personalize email for subscriber
function personalizeEmail(html, subscriber) {
  // Add personalization
  return html
    .replace('{{EMAIL}}', subscriber.email)
    .replace('{{SUBSCRIBE_DATE}}', subscriber.subscribeDate);
}

// Get next issue number
function getNextIssueNumber() {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName('Metrics');
  return sheet.getLastRow();
}

// Extract bounty from labels
function extractBounty(labels) {
  const bountyLabel = labels.find(l => l.name.includes('bounty'));
  if (bountyLabel) {
    const match = bountyLabel.name.match(/\$?(\d+)/);
    return match ? `$${match[1]} BMAIL` : 'Bounty Available';
  }
  return 'Contribution Rewards';
}

// Manual trigger for testing
function testSendToMe() {
  const content = generateTodaysContent(new Date().getDay() || 1);
  
  GmailApp.sendEmail(
    Session.getActiveUser().getEmail(),
    '[TEST] ' + content.subject,
    'Test email',
    {
      htmlBody: content.html,
      name: 'Bitcoin Email SPAM Kitchen 🥫'
    }
  );
  
  console.log('Test email sent!');
}

// Set up automation triggers
function setupTriggers() {
  // Clear existing triggers
  ScriptApp.getProjectTriggers().forEach(trigger => {
    ScriptApp.deleteTrigger(trigger);
  });
  
  // Create daily check trigger
  ScriptApp.newTrigger('dailySpamRoutine')
    .timeBased()
    .everyDays(1)
    .atHour(CONFIG.sendHour)
    .create();
    
  console.log('Triggers set up successfully!');
}