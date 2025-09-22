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
            src="/spam-images-01/download-41.jpg" 
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
            src="/spam-images-01/download-56.jpg" 
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
                  src="/spam-images-01/download-43.jpg" 
                  alt="SPAM Advertisement" 
                  width={150} 
                  height={120}
                  className="gallery-image"
                />
                <Image 
                  src="/spam-images-01/download-52.jpg" 
                  alt="Vintage SPAM" 
                  width={150} 
                  height={120}
                  className="gallery-image"
                />
                <Image 
                  src="/spam-images-01/download-47.jpg" 
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
                src="/spam-images-01/download-70.jpg" 
                alt="SPAM History" 
                width={250} 
                height={200}
                className="showcase-image"
              />
              <p className="showcase-caption">Serving Truth Since 2009</p>
            </div>
            <div className="showcase-item">
              <Image 
                src="/spam-images-01/download-58.jpg" 
                alt="SPAM Varieties" 
                width={250} 
                height={200}
                className="showcase-image"
              />
              <p className="showcase-caption">Multiple Flavors of Reality</p>
            </div>
            <div className="showcase-item">
              <Image 
                src="/spam-images-01/download-63.jpg" 
                alt="SPAM Classic" 
                width={250} 
                height={200}
                className="showcase-image"
              />
              <p className="showcase-caption">The Original & Best</p>
            </div>
            <div className="showcase-item">
              <Image 
                src="/spam-images-01/download-74.jpg" 
                alt="SPAM Collection" 
                width={250} 
                height={200}
                className="showcase-image"
              />
              <p className="showcase-caption">Collect Them All!</p>
            </div>
          </div>
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
              <p>"Finally, someone said what we're all thinking about BTC fees!"</p>
              <span>- Frustrated BTC User</span>
            </div>
            <div className="testimonial">
              <p>"I came for the memes, stayed for the actual scaling."</p>
              <span>- Former Lightning Network Developer</span>
            </div>
            <div className="testimonial">
              <p>"My transaction from 2021 finally confirmed. Thanks SPAM!"</p>
              <span>- Mempool Survivor</span>
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