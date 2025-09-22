'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import './spam.css';

const SpamSignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [dailySpam, setDailySpam] = useState<any>(null);

  // Load today's SPAM
  React.useEffect(() => {
    fetch('/spam-campaigns/daily-spam-emails.json')
      .then(res => res.json())
      .then(data => {
        const randomSpam = data.campaigns[Math.floor(Math.random() * data.campaigns.length)];
        setDailySpam(randomSpam);
      });
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/spam/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSubscribed(true);
      } else {
        alert(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="spam-container">
      {/* Retro Header */}
      <div className="spam-header">
        <div className="retro-spam-image left-spam">
          <Image 
            src="/spam-images-02/download-10.jpg" 
            alt="Vintage SPAM" 
            width={200} 
            height={150}
            className="spam-decoration"
          />
        </div>
        <div className="enamel-sign">
          <div className="sign-border">
            <h1 className="sign-title">
              <span className="spam-can">🥫</span>
              SPAM KITCHEN
              <span className="spam-can">🥫</span>
            </h1>
            <div className="sign-subtitle">EST. 2009 · SERVING SCALING SINCE GENESIS</div>
          </div>
        </div>
        <div className="retro-spam-image right-spam">
          <Image 
            src="/spam-images-02/download-15.jpg" 
            alt="Classic SPAM Can" 
            width={200} 
            height={150}
            className="spam-decoration"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="spam-content">
        <div className="vintage-card">
          <h2 className="vintage-headline">Have You Had Your SPAM Today?</h2>
          
          {/* Today's SPAM Preview - MOVED UP */}
          {dailySpam && (
            <div className="daily-spam-preview" style={{ margin: '20px 0' }}>
              <h3 className="preview-title">Today's Special:</h3>
              <div className="spam-email-card">
                <div className="email-header">
                  <span className="from">From: {dailySpam.from}</span>
                  <span className="date">Fresh Today!</span>
                </div>
                <h4 className="email-subject">{dailySpam.subject}</h4>
                <div className="email-content">
                  <p className="headline">{dailySpam.content.headline}</p>
                  <p className="body">{dailySpam.content.body}</p>
                  <p className="punchline">⚠️ {dailySpam.content.punchline}</p>
                </div>
                <div className="email-cta">
                  {dailySpam.content.cta}
                </div>
              </div>
            </div>
          )}
          
          {!isSubscribed ? (
            <>
              <div className="spam-description">
                <p className="vintage-text">
                  Join our exclusive mailing list for daily servings of:
                </p>
                <ul className="spam-menu">
                  <li>🍖 Fresh BTC mockery, served hot</li>
                  <li>📊 Actual scaling updates (50,000+ TPS)</li>
                  <li>💼 Bitcoin Email job opportunities</li>
                  <li>🚀 Project updates & investor news</li>
                  <li>😄 Daily doses of blockchain reality</li>
                </ul>
              </div>

              <form onSubmit={handleSubscribe} className="spam-form">
                <div className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="vintage-input"
                  />
                  <button type="submit" className="spam-button">
                    Get Daily SPAM 🥫
                  </button>
                </div>
              </form>

              <div className="spam-promise">
                <p>✅ 100% Organic, Free-Range Satire</p>
                <p>✅ No BTC transaction fees required</p>
                <p>✅ Instant delivery (unlike BTC)</p>
              </div>
              
              {/* Retro SPAM Gallery */}
              <div className="spam-gallery">
                <Image 
                  src="/spam-images-02/download-20.jpg" 
                  alt="SPAM Advertisement" 
                  width={150} 
                  height={120}
                  className="gallery-image"
                />
                <Image 
                  src="/spam-images-02/download-25.jpg" 
                  alt="Vintage SPAM" 
                  width={150} 
                  height={120}
                  className="gallery-image"
                />
                <Image 
                  src="/spam-images-02/download-31.jpg" 
                  alt="Classic SPAM" 
                  width={150} 
                  height={120}
                  className="gallery-image"
                />
              </div>
            </>
          ) : (
            <div className="success-message">
              <div className="success-icon">✉️</div>
              <h3>Welcome to the SPAM Family!</h3>
              <p>Your first serving will arrive instantly.</p>
              <p className="small-text">(Because we use BSV, not BTC)</p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📧</div>
            <h4>Bitcoin Email Updates</h4>
            <p>Get exclusive updates about our blockchain email client that actually works</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h4>Job Opportunities</h4>
            <p>$BMAIL token rewards for developers who want to build the future</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎪</div>
            <h4>Daily BTC Roasts</h4>
            <p>Fresh memes about $300 fees, 7 TPS, and "digital gold" that can't move</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h4>Investor Updates</h4>
            <p>Be first to know about funding rounds and token distribution</p>
          </div>
        </div>

        {/* Retro SPAM Showcase */}
        <div className="spam-showcase">
          <h3 className="showcase-title">Gallery of SPAM Excellence</h3>
          <div className="showcase-grid">
            <div className="showcase-item">
              <Image 
                src="/spam-images-02/download-2.jpg" 
                alt="SPAM History" 
                width={250} 
                height={200}
                className="showcase-image"
              />
              <p className="showcase-caption">CEO Approved Since 2024</p>
            </div>
            <div className="showcase-item">
              <Image 
                src="/spam-images-02/download-11.jpg" 
                alt="SPAM Varieties" 
                width={250} 
                height={200}
                className="showcase-image"
              />
              <p className="showcase-caption">Better Than Lightning Network</p>
            </div>
            <div className="showcase-item">
              <Image 
                src="/spam-images-02/download-18.jpg" 
                alt="SPAM Classic" 
                width={250} 
                height={200}
                className="showcase-image"
              />
              <p className="showcase-caption">50,000 TPS of Truth</p>
            </div>
            <div className="showcase-item">
              <Image 
                src="/spam-images-02/download-27.jpg" 
                alt="SPAM Collection" 
                width={250} 
                height={200}
                className="showcase-image"
              />
              <p className="showcase-caption">Spamsom Mo's Choice!</p>
            </div>
          </div>
        </div>

        {/* SPAM Banner Gallery */}
        <div className="spam-banner" style={{ background: '#fff5e6', padding: '30px 0', margin: '40px 0', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>🥫 The Spamsom Mo Collection 🥫</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <Image src="/spam-images-02/download-13.jpg" alt="SPAM" width={120} height={100} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
            <Image src="/spam-images-02/download-14.jpg" alt="SPAM" width={120} height={100} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
            <Image src="/spam-images-02/download-16.jpg" alt="SPAM" width={120} height={100} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
            <Image src="/spam-images-02/download-17.jpg" alt="SPAM" width={120} height={100} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
            <Image src="/spam-images-02/download-19.jpg" alt="SPAM" width={120} height={100} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
            <Image src="/spam-images-02/download-21.jpg" alt="SPAM" width={120} height={100} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
          </div>
          <p style={{ marginTop: '20px', fontSize: '16px', color: '#666' }}>
            "As CEO of Bitcoin, I endorse this SPAM" - Spamsom Mo
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <div className="cta-box">
            <h3>Why SPAM?</h3>
            <p>
              Because BTC has become the real spam - clogging up the crypto space with 
              high fees, slow transactions, and endless excuses. We're here to serve up 
              the truth with a side of humor.
            </p>
            <div className="comparison">
              <div className="comparison-item btc">
                <h5>BTC "Bitcoin"</h5>
                <ul>
                  <li>❌ $50-300 fees</li>
                  <li>❌ 7 transactions/second</li>
                  <li>❌ 10+ minute confirmations</li>
                  <li>❌ Can't send emails on-chain</li>
                </ul>
              </div>
              <div className="comparison-item bsv">
                <h5>BSV Bitcoin Email</h5>
                <ul>
                  <li>✅ $0.0001 fees</li>
                  <li>✅ 50,000+ transactions/second</li>
                  <li>✅ Instant confirmations</li>
                  <li>✅ Emails stored on-chain</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="social-proof">
          <h3>What People Are Saying:</h3>
          <div className="testimonials">
            <div className="testimonial">
              <p>"I sold my cat to pay for a BTC transaction. Luke Dashjr offered to eat it. Now I read SPAM instead."</p>
              <span>- Reformed Maxi, Cat Owner</span>
            </div>
            <div className="testimonial">
              <p>"Spent 3 years arguing about OP_CAT activation. BSV just has it. My therapist subscribes to SPAM now."</p>
              <span>- Former Core Developer</span>
            </div>
            <div className="testimonial">
              <p>"My Lightning channel closed during my wedding. The on-chain fee was more than the honeymoon. SPAM saved my marriage."</p>
              <span>- Lightning Network Refugee</span>
            </div>
            <div className="testimonial">
              <p>"I run 47 Raspberry Pi nodes to 'verify don't trust.' They all crashed opening this email. 10/10 would crash again."</p>
              <span>- Node Runner #58,291</span>
            </div>
            <div className="testimonial">
              <p>"Waited 6 months for Taproot Wizards to do something. They made JPEGs. SPAM delivers actual content daily."</p>
              <span>- Ordinals Victim</span>
            </div>
            <div className="testimonial">
              <p>"I mortgaged my house to inscribe a monkey JPEG. The fee was $4,800. The monkey is racist. SPAM is free."</p>
              <span>- NFT 'Investor'</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="spam-footer">
        <p>🥫 Brought to you by Bitcoin Email - Where Satoshi's Vision Actually Works 🥫</p>
        <div className="footer-links">
          <a href="https://x.com/bitcoin_email">Twitter</a>
          <a href="https://github.com/bitcoin-apps-suite/bitcoin-email">GitHub</a>
          <a href="/jobs">Jobs</a>
          <a href="/contributions">Contribute</a>
        </div>
      </footer>
    </div>
  );
};

export default SpamSignupPage;