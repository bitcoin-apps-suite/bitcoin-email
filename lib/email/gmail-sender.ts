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

// Welcome email template - CEO EDITION
export function getWelcomeEmailHtml(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Georgia, serif; background: #f0f0f0; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 3px solid #ef4444; }
    .header { background: linear-gradient(135deg, #1a1a1a, #ef4444); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
    .ceo-announcement { background: #fff9e6; border: 3px solid #d4af37; padding: 20px; margin: 20px 0; text-align: center; }
    .ceo-title { font-size: 24px; font-weight: bold; color: #1a1a1a; margin: 10px 0; }
    .company-reg { font-size: 14px; color: #666; font-style: italic; }
    .spam-can { font-size: 48px; }
    .comparison { display: flex; gap: 20px; margin: 20px 0; }
    .comparison-col { flex: 1; padding: 15px; border: 2px solid #ddd; }
    .btc { background: #ffeeee; }
    .bsv { background: #eeffee; }
    .footer { background: #333; color: white; padding: 20px; text-align: center; }
    .cta-button { background: #ef4444; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; margin: 20px 0; font-size: 18px; border-radius: 5px; }
    .breaking-news { background: #ffeeee; border-left: 5px solid #ff0000; padding: 15px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="spam-can">🥫</div>
      <h1>Welcome to the SPAM Kitchen!</h1>
      <p>The Official Newsletter of THE BITCOIN CORPORATION LTD (UK Company #16735102)</p>
    </div>
    
    <div class="content">
      
      <div class="ceo-announcement">
        <div style="font-size: 32px;">🎩</div>
        <div class="ceo-title">BREAKING: BITCOIN IS UNDER NEW MANAGEMENT</div>
        <p>THE BITCOIN CORPORATION LTD (16735102) has been officially registered in the UK.</p>
        <p class="company-reg">I am now legally the CEO of Bitcoin.</p>
        <p class="company-reg">(Yes, really. Check Companies House.)</p>
      </div>

      <div class="breaking-news">
        <strong>🚨 OFFICIAL STATEMENT FROM THE CEO:</strong><br><br>
        "After reviewing BTC's abysmal performance (7 TPS, $300 fees, Lightning Network failures), 
        The Bitcoin Corporation has decided to terminate BTC's employment. BSV is now the approved 
        implementation. This decision is final."<br><br>
        - Spamsom Mo, CEO of Bitcoin
      </div>
      
      <h2>Welcome ${email}!</h2>
      <p>You're now subscribed to receive official communications from THE BITCOIN CORPORATION LTD (16735102), including:</p>
      
      <ul>
        <li>🎩 <strong>Executive Orders from the CEO of Bitcoin</strong></li>
        <li>📋 <strong>BTC Performance Reviews</strong> (Spoiler: They're all F's)</li>
        <li>⚰️ <strong>Lightning Network Obituaries</strong></li>
        <li>💼 <strong>$BMAIL Token Allocations</strong> for builders</li>
        <li>🛠️ <strong>Contracts & Bounties</strong> to fix what BTC broke</li>
        <li>📊 <strong>Real scaling updates</strong> (50,000+ TPS on BSV)</li>
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

      <h3>This Week's Corporate Agenda:</h3>
      <blockquote style="background: #f9f9f9; padding: 20px; border-left: 4px solid #ef4444;">
        <p><strong>Monday:</strong> "Mempool Monday - Weekend Disaster Report"</p>
        <p><strong>Wednesday:</strong> "BTC Termination Hearings Continue"</p>
        <p><strong>Friday:</strong> "Lightning Network Final Obituary"</p>
        <p><em>Plus breaking news whenever BTC fails (so... constantly)</em></p>
      </blockquote>

      <h3>🔨 Help Build the Future (Get Paid in $BMAIL)</h3>
      <center>
        <a href="https://bitcoin-email.vercel.app/contracts" class="cta-button">
          View Open Contracts
        </a>
        <a href="https://github.com/bitcoin-apps-suite/bitcoin-email" class="cta-button">
          Claim GitHub Bounties
        </a>
      </center>

      <p><strong>Current Opportunities:</strong></p>
      <ul>
        <li>🛠️ <strong>Frontend Developers:</strong> Help build Bitcoin Email UI</li>
        <li>⚡ <strong>BSV Developers:</strong> Scale our infrastructure</li>
        <li>🎨 <strong>Meme Lords:</strong> Roast BTC with visual content</li>
        <li>📝 <strong>Writers:</strong> Contribute to The Daily SPAM</li>
      </ul>
      
      <p style="background: #e6ffe6; padding: 15px; border-radius: 5px;">
        <strong>💰 Token Allocation Update:</strong><br>
        40% of $BMAIL tokens reserved for contributors<br>
        Early contributors get 2x allocation<br>
        No VC funding - 100% community owned
      </p>
    </div>
    
    <div class="footer">
      <p style="font-size: 16px; font-weight: bold;">
        🎩 THE BITCOIN CORPORATION LTD (16735102) 🎩
      </p>
      <p style="font-size: 14px;">
        "Making Bitcoin Work Again"
      </p>
      <p style="margin: 20px 0;">
        <a href="https://twitter.com/bitcoin_email" style="color: #ef4444;">Twitter</a> | 
        <a href="https://github.com/bitcoin-apps-suite/bitcoin-email" style="color: #ef4444;">GitHub</a> | 
        <a href="https://bitcoin-email.vercel.app/contracts" style="color: #ef4444;">Contracts</a> |
        <a href="https://bitcoin-email.vercel.app/jobs" style="color: #ef4444;">Jobs</a>
      </p>
      <p style="font-size: 11px; color: #999; margin-top: 20px;">
        You're receiving this because you signed up at bitcoin-email.vercel.app/spam<br>
        Unlike BTC transactions, unsubscribing is instant and free.<br>
        THE BITCOIN CORPORATION LTD is a UK registered company (#16735102). BTC employment has been terminated.<br>
        This email may contain trace amounts of satire and uncomfortable truths.
      </p>
    </div>
  </div>
</body>
</html>
`;
}