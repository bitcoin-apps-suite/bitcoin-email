export interface NewsletterTemplate {
  id: string;
  subject: string;
  previewText: string;
  generateHtml: (data?: any) => string;
}

export const newsletterTemplates: NewsletterTemplate[] = [
  {
    id: 'welcome-spam',
    subject: '🥫 Welcome to the SPAM Kitchen - Your First Serving of Truth!',
    previewText: 'BTC fees got you down? We have the cure...',
    generateHtml: (data = {}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Courier New', monospace; background: #fef5e7; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 3px solid #d32f2f; border-radius: 10px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #d32f2f 0%, #f57c00 100%); color: white; padding: 30px; text-align: center; }
    .spam-can { font-size: 48px; margin: 0 10px; }
    .content { padding: 30px; }
    .feature-box { background: #fff3e0; border: 2px dashed #ff9800; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .cta-button { display: inline-block; background: #d32f2f; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
    .footer { background: #333; color: #ccc; padding: 20px; text-align: center; font-size: 12px; }
    .meme-img { max-width: 100%; height: auto; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div><span class="spam-can">🥫</span> WELCOME TO THE KITCHEN <span class="spam-can">🥫</span></div>
      <h1 style="margin: 10px 0; font-size: 36px;">Where We Serve HOT TRUTH!</h1>
    </div>
    
    <div class="content">
      <img src="https://bitcoin-email.vercel.app/$SPAM/download-64.jpg" class="meme-img" alt="Have You Eaten Your SPAM Today?" />
      
      <h2>Dear ${data.email || 'Fellow SPAM Enthusiast'},</h2>
      
      <p>Welcome to the SPAM Kitchen, where we serve up the TRUTH about Bitcoin Core's failed promises!</p>
      
      <div class="feature-box">
        <h3>🎭 Today's Special: BTC Reality Check</h3>
        <ul>
          <li>$50 fees for a simple transaction? That's SPAM-tastic!</li>
          <li>10 minute blocks? We could deliver actual SPAM faster!</li>
          <li>Store of value? More like store of PROBLEMS!</li>
          <li>Lightning Network? Still waiting for that thunderstorm...</li>
        </ul>
      </div>
      
      <img src="https://bitcoin-email.vercel.app/$SPAM/download-66.jpg" class="meme-img" alt="Have You Gated Your SPAM?" />
      
      <h3>What You'll Get:</h3>
      <ul>
        <li>📧 Weekly doses of BTC reality checks</li>
        <li>🥫 Fresh memes served hot from the SPAM factory</li>
        <li>💡 BSV insights that actually make sense</li>
        <li>🚀 Updates on REAL Bitcoin scaling</li>
      </ul>
      
      <div class="feature-box" style="background: #ffebee;">
        <h3>🔥 This Week's Roast:</h3>
        <p>"BTC maximalists say 'not your keys, not your coins' but with $50 fees, it's more like 'not your money, period!'"</p>
      </div>
      
      <img src="https://bitcoin-email.vercel.app/$SPAM/download-69.jpg" class="meme-img" alt="Eaten Your SPAM Today?" />
      
      <center style="margin: 30px 0;">
        <a href="https://bitcoin-email.vercel.app" class="cta-button">Visit the SPAM Kitchen</a>
      </center>
      
      <p style="font-style: italic;">Remember: While BTC hodlers wait for their transactions to confirm, we're already building the future with BSV!</p>
    </div>
    
    <div class="footer">
      <p>You're receiving this because you signed up for SPAM (and we deliver!)</p>
      <p>Unlike BTC transactions, unsubscribing is instant and free</p>
      <p><a href="https://bitcoin-email.vercel.app/spam/unsubscribe?email=${data.email}" style="color: #ff9800;">Unsubscribe</a> | <a href="https://x.com/bitcoin_email" style="color: #ff9800;">Follow us on X</a></p>
    </div>
  </div>
</body>
</html>
    `
  },
  {
    id: 'weekly-roast',
    subject: '🔥 This Week in BTC Failures - Your Weekly SPAM Digest',
    previewText: 'Lightning Network still broken, fees still high, cope still strong...',
    generateHtml: (data = {}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Georgia', serif; background: #f5f5dc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 4px solid #8b4513; }
    .header { background: #8b4513; color: #f5f5dc; padding: 20px; text-align: center; position: relative; }
    .vintage-badge { position: absolute; top: -20px; right: 20px; background: #d32f2f; color: white; padding: 10px; transform: rotate(15deg); font-weight: bold; }
    .content { padding: 30px; }
    .news-item { border-left: 4px solid #ff9800; padding-left: 15px; margin: 20px 0; }
    .meme-break { text-align: center; margin: 30px 0; padding: 20px; background: #fff3e0; }
    .price-box { background: #ffebee; border: 2px solid #d32f2f; padding: 15px; margin: 20px 0; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="vintage-badge">HOT & FRESH!</div>
    <div class="header">
      <h1>📰 THE SPAM GAZETTE 📰</h1>
      <p style="margin: 0;">Your Weekly Dose of BTC Reality</p>
    </div>
    
    <div class="content">
      <img src="https://bitcoin-email.vercel.app/$SPAM/download-65.jpg" style="width: 100%; height: auto;" alt="SPAM News" />
      
      <h2>This Week's Failures:</h2>
      
      <div class="news-item">
        <h3>⚡ Lightning Network Capacity Drops AGAIN</h3>
        <p>Another 100 BTC left the Lightning Network this week. Turns out "banking the unbanked" is hard when a channel opening costs more than a month's wages!</p>
      </div>
      
      <div class="price-box">
        <h3>Current BTC Stats of Shame:</h3>
        <p>Average Fee: $${data.avgFee || '47.50'}</p>
        <p>Mempool Size: ${data.mempoolSize || '158'}MB</p>
        <p>Confirmation Time: ${data.confirmTime || '2.5'} hours</p>
        <p>Copium Level: MAXIMUM</p>
      </div>
      
      <div class="news-item">
        <h3>🏪 Another Merchant Stops Accepting BTC</h3>
        <p>"We tried accepting Bitcoin," says local coffee shop owner, "but the fees were more than the coffee!"</p>
      </div>
      
      <div class="meme-break">
        <img src="https://bitcoin-email.vercel.app/$SPAM/download-41.jpg" style="max-width: 300px; height: auto;" alt="SPAM Wisdom" />
        <p><em>"At least SPAM has utility!"</em></p>
      </div>
      
      <div class="news-item">
        <h3>📊 BSV Processes 50x More Transactions</h3>
        <p>While BTC struggles with 7 TPS, BSV casually handled 50,000 TPS in testing. But sure, keep believing in that "digital gold" narrative!</p>
      </div>
      
      <h3>Quote of the Week:</h3>
      <blockquote style="border-left: 4px solid #4caf50; padding-left: 15px; font-style: italic;">
        "I paid $80 to move $20 worth of BTC. This is the future of money!" - Confused BTC Maxi
      </blockquote>
      
      <div class="meme-break">
        <h3>🥫 SPAM Fact of the Day:</h3>
        <p>SPAM has been feeding families since 1937. BTC has been failing to scale since 2017!</p>
      </div>
      
      <center style="margin: 30px 0;">
        <a href="https://bitcoin-email.vercel.app/spam" style="background: #d32f2f; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Get More SPAM</a>
      </center>
    </div>
    
    <div style="background: #333; color: #ccc; padding: 20px; text-align: center; font-size: 12px;">
      <p>Brought to you by the SPAM Kitchen - Serving truth since forever</p>
      <p><a href="https://x.com/bitcoin_email" style="color: #ff9800;">Follow @bitcoin_email</a></p>
    </div>
  </div>
</body>
</html>
    `
  },
  {
    id: 'btc-obituary',
    subject: '⚰️ BTC Obituary #${data.weekNumber || "42"} - Another Dream Dies',
    previewText: 'This week we mourn the loss of yet another BTC use case...',
    generateHtml: (data = {}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Times New Roman', serif; background: #000; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 10px solid #000; }
    .header { background: #000; color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
    .obituary-box { border: 3px solid #000; padding: 20px; margin: 20px 0; background: #f9f9f9; }
    .rip { font-size: 72px; text-align: center; margin: 20px 0; }
    .memorial { background: #000; color: white; padding: 15px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="font-size: 48px; margin: 0;">OBITUARY</h1>
      <p style="margin: 10px 0;">In Loving Memory of BTC's Promises</p>
    </div>
    
    <div class="content">
      <div class="rip">⚰️ R.I.P ⚰️</div>
      
      <div class="obituary-box">
        <h2>This Week We Mourn:</h2>
        <h3>"${data.deceased || 'Peer-to-Peer Electronic Cash'}"</h3>
        <p><strong>Born:</strong> 2009, in Satoshi's Whitepaper</p>
        <p><strong>Died:</strong> ${data.deathDate || '2017, when fees exceeded coffee prices'}</p>
        <p><strong>Cause of Death:</strong> ${data.causeOfDeath || 'Blockstream Core Disease'}</p>
      </div>
      
      <img src="https://bitcoin-email.vercel.app/$SPAM/download-69.jpg" style="width: 100%; height: auto;" alt="Memorial SPAM" />
      
      <div class="memorial">
        <h3>Remembering the Good Times:</h3>
        <ul style="margin-left: 20px;">
          <li>When fees were measured in cents, not dollars</li>
          <li>When "banking the unbanked" wasn't a joke</li>
          <li>When merchants actually accepted it</li>
          <li>When it was supposed to replace VISA, not become slower than it</li>
        </ul>
      </div>
      
      <h3>Survived By:</h3>
      <ul>
        <li>BSV - The legitimate heir that actually scales</li>
        <li>Thousands of bag holders waiting for "mass adoption"</li>
        <li>Michael Saylor's tweets</li>
        <li>The eternal cope of "store of value"</li>
      </ul>
      
      <div class="obituary-box" style="background: #fff3e0;">
        <h3>In Lieu of Flowers:</h3>
        <p>Please send your condolences via BSV (instant and virtually free) since BTC transactions would cost more than the flowers themselves.</p>
      </div>
      
      <img src="https://bitcoin-email.vercel.app/$SPAM/download-65.jpg" style="width: 100%; height: auto;" alt="SPAM Memorial" />
      
      <div class="memorial">
        <p style="text-align: center; font-style: italic;">
          "Here lies BTC's promise of electronic cash.<br>
          It couldn't scale, it couldn't last.<br>
          Now merchants flee, the fees too high,<br>
          While maxis cope and wonder why."
        </p>
      </div>
      
      <center style="margin: 30px 0;">
        <p>Join us next week for another obituary!</p>
        <a href="https://bitcoin-email.vercel.app" style="background: #000; color: white; padding: 15px 30px; text-decoration: none; display: inline-block;">Visit the Memorial</a>
      </center>
    </div>
    
    <div style="background: #000; color: white; padding: 20px; text-align: center;">
      <p>The SPAM Kitchen - Documenting BTC's demise, one obituary at a time</p>
      <p><a href="https://x.com/bitcoin_email" style="color: #ccc;">@bitcoin_email</a></p>
    </div>
  </div>
</body>
</html>
    `
  },
  {
    id: 'spam-special',
    subject: '🥫 SPECIAL OFFER: Get Your SPAM Before BTC Confirms!',
    previewText: 'Limited time: Transaction confirms before your grandchildren are born!',
    generateHtml: (data = {}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Arial Black', sans-serif; background: linear-gradient(45deg, #ff9800, #d32f2f); margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .header { background: repeating-linear-gradient(45deg, #d32f2f, #d32f2f 10px, #ff9800 10px, #ff9800 20px); padding: 40px; text-align: center; color: white; }
    .flash { animation: flash 1s infinite; }
    @keyframes flash { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    .content { padding: 30px; }
    .offer-box { background: linear-gradient(135deg, #fff3e0, #ffebee); border: 3px dashed #d32f2f; padding: 20px; margin: 20px 0; border-radius: 10px; }
    .big-text { font-size: 48px; color: #d32f2f; text-align: center; margin: 20px 0; }
    .countdown { background: #000; color: #0f0; padding: 15px; font-family: 'Courier New', monospace; text-align: center; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="flash" style="font-size: 36px; margin: 0;">🚨 LIMITED TIME OFFER 🚨</h1>
    </div>
    
    <div class="content">
      <div class="big-text">ACT NOW!</div>
      
      <img src="https://bitcoin-email.vercel.app/$SPAM/download-66.jpg" style="width: 100%; height: auto;" alt="SPAM Special" />
      
      <div class="offer-box">
        <h2>🎯 Today's EXCLUSIVE Deal:</h2>
        <p style="font-size: 20px;">Sign up for our newsletter and receive:</p>
        <ul style="font-size: 18px;">
          <li>✅ Instant confirmation (unlike BTC!)</li>
          <li>✅ Zero fees (unlike BTC!)</li>
          <li>✅ Actually works (unlike BTC!)</li>
          <li>✅ Scales to billions (unlike BTC!)</li>
        </ul>
      </div>
      
      <div class="countdown">
        <p>BTC TRANSACTION STATUS:</p>
        <p>Waiting for confirmation... (${data.hours || '847'} hours and counting)</p>
        <p>Fee paid: $${data.feePaid || '73.42'}</p>
        <p>Value transferred: $${data.value || '5.00'}</p>
        <p class="flash">STATUS: STILL WAITING...</p>
      </div>
      
      <div class="offer-box" style="background: #ffcdd2;">
        <h3>⏰ While You Wait for BTC...</h3>
        <p>You could:</p>
        <ul>
          <li>Send 1,000 BSV transactions</li>
          <li>Eat 50 cans of SPAM</li>
          <li>Learn a new language</li>
          <li>Watch paint dry (more exciting than waiting for confirmations)</li>
        </ul>
      </div>
      
      <img src="https://bitcoin-email.vercel.app/$SPAM/download-64.jpg" style="width: 100%; height: auto;" alt="More SPAM" />
      
      <div class="big-text" style="font-size: 32px;">Don't Be Like BTC!</div>
      <p style="text-align: center; font-size: 18px;">Be fast, be scalable, be SPAM!</p>
      
      <center style="margin: 30px 0;">
        <a href="https://bitcoin-email.vercel.app/spam" style="background: #d32f2f; color: white; padding: 20px 40px; text-decoration: none; border-radius: 50px; font-size: 20px; font-weight: bold; display: inline-block; box-shadow: 0 5px 15px rgba(211,47,47,0.3);" class="flash">
          GET YOUR SPAM NOW!
        </a>
      </center>
      
      <p style="text-align: center; font-style: italic; color: #666;">
        * Offer expires when BTC scales (so basically never)
      </p>
    </div>
    
    <div style="background: repeating-linear-gradient(45deg, #333, #333 10px, #444 10px, #444 20px); color: white; padding: 20px; text-align: center;">
      <p>SPAM Kitchen - Feeding you truth faster than BTC processes transactions!</p>
      <p><a href="https://x.com/bitcoin_email" style="color: #ff9800;">Follow us for more hot deals!</a></p>
    </div>
  </div>
</body>
</html>
    `
  }
];

export function getTemplate(id: string): NewsletterTemplate | undefined {
  return newsletterTemplates.find(t => t.id === id);
}

export function getAllTemplates(): NewsletterTemplate[] {
  return newsletterTemplates;
}