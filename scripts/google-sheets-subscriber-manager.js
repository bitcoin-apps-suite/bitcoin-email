/**
 * Google Apps Script - Subscriber Management
 * Add this to your existing Google Apps Script project
 * 
 * Setup:
 * 1. Create a new Google Sheet called "SPAM Subscribers"
 * 2. Add headers: Email | Subscribed Date | Source | Status | Welcome Email Sent | Notes
 * 3. Deploy this as a Web App with permissions to edit sheets
 * 4. Use the Web App URL as your webhook endpoint
 */

// Configuration
const SUBSCRIBER_SHEET_ID = 'YOUR_SHEET_ID'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Subscribers';

/**
 * Handle POST requests from your website
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    
    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'No email provided'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add subscriber to sheet
    const result = addSubscriber(email, data.source || 'spam-page');
    
    // Send welcome email (optional - if not using Gmail integration)
    if (result.success && result.isNew) {
      sendWelcomeEmailFromScript(email);
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Add subscriber to Google Sheet
 */
function addSubscriber(email, source = 'direct') {
  const sheet = SpreadsheetApp.openById(SUBSCRIBER_SHEET_ID).getSheetByName(SHEET_NAME);
  
  // Check if already subscribed
  const data = sheet.getDataRange().getValues();
  const emailColumn = 0; // First column
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][emailColumn] === email) {
      return {
        success: true,
        isNew: false,
        message: 'Already subscribed',
        subscriberCount: data.length - 1
      };
    }
  }
  
  // Add new subscriber
  const now = new Date();
  sheet.appendRow([
    email,
    now.toISOString(),
    source,
    'active',
    'pending',
    `CEO approved on ${now.toLocaleDateString()}`
  ]);
  
  return {
    success: true,
    isNew: true,
    message: 'Successfully subscribed',
    subscriberCount: data.length // New count
  };
}

/**
 * Send welcome email from Apps Script
 */
function sendWelcomeEmailFromScript(email) {
  try {
    const subject = '🥫 Welcome to the SPAM Kitchen - Spamsom Mo, CEO of Bitcoin';
    const htmlBody = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ef4444;">🎩 Welcome to THE BITCOIN CORPORATION LTD (16735102)</h1>
        <p>Dear ${email},</p>
        <p>As the legally registered CEO of Bitcoin, I personally welcome you to our SPAM Kitchen.</p>
        <p>You'll receive our premium content 3x per week:</p>
        <ul>
          <li>Monday: "Mempool Monday" - Weekend disaster reports</li>
          <li>Wednesday: "BTC Performance Review" (Spoiler: It's F)</li>
          <li>Friday: "Lightning Network Obituary"</li>
        </ul>
        <p>Remember: BTC has been officially terminated. BSV is the approved implementation.</p>
        <p>Regards,<br>
        Spamsom Mo<br>
        CEO, THE BITCOIN CORPORATION LTD (16735102)<br>
        "The only legitimate Bitcoin CEO"</p>
      </div>
    `;
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody,
      name: 'Spamsom Mo, CEO of Bitcoin',
      replyTo: 'bitcoin.bmail@gmail.com'
    });
    
    // Update sheet to mark welcome email as sent
    const sheet = SpreadsheetApp.openById(SUBSCRIBER_SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === email) {
        sheet.getRange(i + 1, 5).setValue('sent'); // Update "Welcome Email Sent" column
        break;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
}

/**
 * Get subscriber stats
 */
function getSubscriberStats() {
  const sheet = SpreadsheetApp.openById(SUBSCRIBER_SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  const stats = {
    total: data.length - 1, // Minus header row
    active: 0,
    unsubscribed: 0,
    bounced: 0,
    today: 0,
    thisWeek: 0,
    sources: {}
  };
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  for (let i = 1; i < data.length; i++) {
    const status = data[i][3];
    const subscribedDate = new Date(data[i][1]);
    const source = data[i][2];
    
    // Count by status
    if (status === 'active') stats.active++;
    else if (status === 'unsubscribed') stats.unsubscribed++;
    else if (status === 'bounced') stats.bounced++;
    
    // Count by date
    if (subscribedDate >= today) stats.today++;
    if (subscribedDate >= weekAgo) stats.thisWeek++;
    
    // Count by source
    stats.sources[source] = (stats.sources[source] || 0) + 1;
  }
  
  return stats;
}

/**
 * Calendar Integration - Schedule SPAM emails
 */
function setupCalendarAutomation() {
  // Create calendar events for SPAM schedule
  const calendar = CalendarApp.getDefaultCalendar();
  const now = new Date();
  
  // Schedule for next 4 weeks
  for (let week = 0; week < 4; week++) {
    const weekStart = new Date(now.getTime() + week * 7 * 24 * 60 * 60 * 1000);
    
    // Monday - Mempool Monday
    const monday = getNextWeekday(weekStart, 1);
    calendar.createEvent(
      '🥫 SPAM Campaign: Mempool Monday',
      new Date(monday.setHours(9, 0, 0, 0)),
      new Date(monday.setHours(9, 30, 0, 0)),
      {
        description: 'Send weekend BTC disaster report to all subscribers',
        location: 'bitcoin.bmail@gmail.com'
      }
    );
    
    // Wednesday - Performance Review
    const wednesday = getNextWeekday(weekStart, 3);
    calendar.createEvent(
      '🥫 SPAM Campaign: BTC Performance Review',
      new Date(wednesday.setHours(9, 0, 0, 0)),
      new Date(wednesday.setHours(9, 30, 0, 0)),
      {
        description: 'Send BTC failure analysis (Grade: F)',
        location: 'bitcoin.bmail@gmail.com'
      }
    );
    
    // Friday - Lightning Obituary
    const friday = getNextWeekday(weekStart, 5);
    calendar.createEvent(
      '🥫 SPAM Campaign: Lightning Network Obituary',
      new Date(friday.setHours(9, 0, 0, 0)),
      new Date(friday.setHours(9, 30, 0, 0)),
      {
        description: 'Send Lightning Network death notice',
        location: 'bitcoin.bmail@gmail.com'
      }
    );
  }
  
  return 'Calendar events created for next 4 weeks';
}

/**
 * Helper function to get next weekday
 */
function getNextWeekday(startDate, dayOfWeek) {
  const date = new Date(startDate);
  const day = date.getDay();
  const diff = (dayOfWeek - day + 7) % 7 || 7;
  date.setDate(date.getDate() + diff);
  return date;
}

/**
 * Daily trigger - Send scheduled SPAM
 */
function sendScheduledSPAM() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  let campaign = null;
  
  switch(dayOfWeek) {
    case 1: // Monday
      campaign = createMempoolMondayEmail();
      break;
    case 3: // Wednesday
      campaign = createPerformanceReviewEmail();
      break;
    case 5: // Friday
      campaign = createLightningObituaryEmail();
      break;
    default:
      console.log('No campaign scheduled for today');
      return;
  }
  
  if (campaign) {
    sendCampaignToAllSubscribers(campaign);
  }
}

/**
 * Send campaign to all active subscribers
 */
function sendCampaignToAllSubscribers(campaign) {
  const sheet = SpreadsheetApp.openById(SUBSCRIBER_SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  let sentCount = 0;
  let errorCount = 0;
  
  for (let i = 1; i < data.length; i++) {
    const email = data[i][0];
    const status = data[i][3];
    
    if (status !== 'active') continue;
    
    try {
      MailApp.sendEmail({
        to: email,
        subject: campaign.subject,
        htmlBody: campaign.html,
        name: 'Spamsom Mo, CEO of Bitcoin',
        replyTo: 'bitcoin.bmail@gmail.com'
      });
      sentCount++;
      
      // Rate limiting
      if (sentCount % 50 === 0) {
        Utilities.sleep(1000); // Pause for 1 second every 50 emails
      }
    } catch (error) {
      console.error(`Failed to send to ${email}:`, error);
      errorCount++;
    }
  }
  
  // Log results
  console.log(`Campaign sent: ${sentCount} successful, ${errorCount} errors`);
  
  // Send summary to admin
  MailApp.sendEmail({
    to: 'bitcoin.bmail@gmail.com',
    subject: `📊 SPAM Campaign Report: ${campaign.subject}`,
    htmlBody: `
      <h2>Campaign Sent Successfully</h2>
      <p><strong>Subject:</strong> ${campaign.subject}</p>
      <p><strong>Sent to:</strong> ${sentCount} subscribers</p>
      <p><strong>Errors:</strong> ${errorCount}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `,
    name: 'SPAM Campaign System'
  });
}

/**
 * Manual test function
 */
function testSubscriberSystem() {
  // Test adding a subscriber
  const result = addSubscriber('test@example.com', 'manual-test');
  console.log('Add subscriber result:', result);
  
  // Get stats
  const stats = getSubscriberStats();
  console.log('Subscriber stats:', stats);
  
  // Setup calendar (run once)
  // const calendarResult = setupCalendarAutomation();
  // console.log('Calendar setup:', calendarResult);
}