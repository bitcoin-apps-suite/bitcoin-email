import nodemailer from 'nodemailer';

// Create reusable transporter using Gmail
const createGmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'bitcoin.bmail@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD // You'll need to set this up
    }
  });
};

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendSpamEmail(options: EmailOptions) {
  const transporter = createGmailTransporter();
  
  const mailOptions = {
    from: '"Bitcoin Email SPAM Kitchen 🥫" <bitcoin.bmail@gmail.com>',
    to: options.to,
    subject: options.subject,
    text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    html: options.html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

// Welcome email template
export function getWelcomeEmailHtml(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Comic Sans MS', cursive, sans-serif; background: #f0f0f0; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 3px solid #ef4444; }
    .header { background: #ef4444; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; }
    .spam-can { font-size: 48px; }
    .comparison { display: flex; gap: 20px; margin: 20px 0; }
    .comparison-col { flex: 1; padding: 15px; border: 2px solid #ddd; }
    .btc { background: #ffeeee; }
    .bsv { background: #eeffee; }
    .footer { background: #333; color: white; padding: 20px; text-align: center; }
    .cta-button { background: #ef4444; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; margin: 20px 0; font-size: 18px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="spam-can">🥫</div>
      <h1>Welcome to the SPAM Family!</h1>
      <p>Your Daily Dose of Blockchain Reality</p>
    </div>
    
    <div class="content">
      <h2>Congratulations ${email}!</h2>
      <p>You've just joined the most exclusive mailing list in crypto - where we serve up hot, fresh SPAM about:</p>
      
      <ul>
        <li>🎭 BTC's Comedy of Errors ($300 fees! 7 TPS! "Store of value!")</li>
        <li>📧 Bitcoin Email - The ONLY blockchain email client that actually works</li>
        <li>💼 $BMAIL token opportunities and job postings</li>
        <li>🚀 Real scaling updates (50,000+ TPS on BSV)</li>
      </ul>

      <div class="comparison">
        <div class="comparison-col btc">
          <h3>❌ BTC "Bitcoin"</h3>
          <ul>
            <li>$50-300 transaction fees</li>
            <li>7 transactions per second</li>
            <li>10+ minute confirmations</li>
            <li>Can't send emails</li>
            <li>"Digital gold" that costs $300 to move</li>
          </ul>
        </div>
        <div class="comparison-col bsv">
          <h3>✅ BSV Bitcoin Email</h3>
          <ul>
            <li>$0.0001 transaction fees</li>
            <li>50,000+ transactions per second</li>
            <li>Instant confirmations</li>
            <li>Send emails on-chain</li>
            <li>Actually works as intended</li>
          </ul>
        </div>
      </div>

      <h3>Today's SPAM Special:</h3>
      <blockquote style="background: #f9f9f9; padding: 20px; border-left: 4px solid #ef4444;">
        <p><strong>"BTC Maximalist Discovers Transaction Fees"</strong></p>
        <p>Local HODLer Jim spent more on fees than coffee this morning. "I tried to buy a $5 latte with Bitcoin," Jim explained, "but the $287 transaction fee really killed the vibe. The barista suggested I just use cash, but I told him that's not the future of money. Then he showed me Bitcoin Email working instantly for $0.0001 and I had to leave."</p>
        <p><em>- Another satisfied BTC user discovers reality</em></p>
      </blockquote>

      <center>
        <a href="https://bitcoin-email.vercel.app" class="cta-button">
          Try Bitcoin Email - It Actually Works! 
        </a>
      </center>

      <p><strong>What's Next?</strong></p>
      <ul>
        <li>📧 Daily SPAM emails with fresh BTC roasts</li>
        <li>🎁 Early access to $BMAIL token</li>
        <li>💼 Job opportunities in our growing team</li>
        <li>🚀 Be part of the email revolution</li>
      </ul>
    </div>
    
    <div class="footer">
      <p>🥫 Brought to you by Bitcoin Email - Where Satoshi's Vision Actually Works 🥫</p>
      <p>
        <a href="https://twitter.com/bitcoin_email" style="color: #ef4444;">Twitter</a> | 
        <a href="https://github.com/bitcoin-apps-suite/bitcoin-email" style="color: #ef4444;">GitHub</a> | 
        <a href="https://bitcoin-email.vercel.app/jobs" style="color: #ef4444;">Jobs</a>
      </p>
      <p style="font-size: 12px; margin-top: 20px;">
        You're receiving this because you signed up at bitcoin-email.vercel.app/spam<br>
        Unlike BTC transactions, unsubscribing is instant and free.
      </p>
    </div>
  </div>
</body>
</html>
`;
}