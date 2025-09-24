'use client';

import React from 'react';
import '../marketing.css';
import './dark.css';

const DarkMarketingPage: React.FC = () => {
  return (
    <div className="marketing-page dark-theme">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-logo">
            <span className="bitcoin-symbol">₿</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-bitcoin">BITCOIN</span>
            <span className="title-email">EMAIL</span>
          </h1>
          
          <p className="hero-subtitle">
            The world's first blockchain-powered email client with native Bitcoin payments, 
            end-to-end encryption, and decentralized storage.
          </p>
          
          <div className="hero-buttons">
            <button className="cta-primary">
              <span>Launch App</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="cta-secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Watch Demo</span>
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Decentralized</div>
            </div>
            <div className="stat">
              <div className="stat-number">$0.001</div>
              <div className="stat-label">Per Email</div>
            </div>
            <div className="stat">
              <div className="stat-number">256-bit</div>
              <div className="stat-label">Encryption</div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="app-preview">
            <div className="app-window">
              <div className="window-header">
                <div className="window-controls">
                  <div className="control close"></div>
                  <div className="control minimize"></div>
                  <div className="control maximize"></div>
                </div>
                <div className="window-title">Bitcoin Email</div>
              </div>
              <div className="window-content">
                <div className="mock-sidebar">
                  <div className="mock-nav-item active">📥 Inbox <span className="badge">12</span></div>
                  <div className="mock-nav-item">📤 Sent</div>
                  <div className="mock-nav-item">📝 Drafts <span className="badge">3</span></div>
                  <div className="mock-nav-item">⭐ Starred</div>
                </div>
                <div className="mock-email-list">
                  <div className="mock-email">
                    <div className="email-avatar"></div>
                    <div className="email-content">
                      <div className="email-from">Satoshi Nakamoto</div>
                      <div className="email-subject">Bitcoin: A Peer-to-Peer Electronic Cash System</div>
                      <div className="email-preview">I've been working on a new electronic cash system...</div>
                    </div>
                    <div className="email-meta">
                      <div className="email-time">2:30 PM</div>
                      <div className="bitcoin-payment">₿ 0.001</div>
                    </div>
                  </div>
                  <div className="mock-email">
                    <div className="email-avatar"></div>
                    <div className="email-content">
                      <div className="email-from">HandCash Team</div>
                      <div className="email-subject">Welcome to Bitcoin Email!</div>
                      <div className="email-preview">Your wallet is now connected...</div>
                    </div>
                    <div className="email-meta">
                      <div className="email-time">Yesterday</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              REVOLUTIONARY EMAIL INFRASTRUCTURE
            </h2>
            <p className="section-subtitle">
              Built on Bitcoin blockchain technology for ultimate security, privacy, and financial integration.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon bitcoin">
                <span>₿</span>
              </div>
              <h3 className="feature-title">NATIVE BITCOIN PAYMENTS</h3>
              <p className="feature-description">
                Send and receive Bitcoin payments directly through email. 
                Micropayments, tips, and invoices integrated seamlessly.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon security">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="feature-title">END-TO-END ENCRYPTION</h3>
              <p className="feature-description">
                Military-grade encryption ensures your communications remain private. 
                Only you and your recipients can read your messages.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon blockchain">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="feature-title">BLOCKCHAIN STORAGE</h3>
              <p className="feature-description">
                Store emails permanently on the Bitcoin blockchain. 
                Immutable, censorship-resistant, and globally accessible.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon spam">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="feature-title">ZERO SPAM</h3>
              <p className="feature-description">
                Pay-to-send model eliminates spam completely. 
                Senders must include a small Bitcoin payment to reach your inbox.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon decentralized">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="feature-title">FULLY DECENTRALIZED</h3>
              <p className="feature-description">
                No central servers or authorities. Your data remains under your control, 
                accessible from anywhere in the world.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon integration">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <h3 className="feature-title">MULTI-ACCOUNT SUPPORT</h3>
              <p className="feature-description">
                Connect Gmail, Outlook, and other email providers. 
                Manage all your accounts in one unified interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">TRUSTED BY INNOVATORS</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                "Bitcoin Email represents the future of digital communication. 
                Finally, email that respects privacy and enables true peer-to-peer value transfer."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <div className="author-name">Dr. Sarah Chen</div>
                  <div className="author-title">Cryptography Researcher, MIT</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                "The pay-to-send model has completely eliminated spam in my inbox. 
                I'm finally back in control of my communications."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <div className="author-name">Marcus Rodriguez</div>
                  <div className="author-title">CEO, TechFlow Ventures</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                "Seamlessly sending Bitcoin payments through email has revolutionized 
                how our team handles micropayments and invoicing."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <div className="author-name">Alex Thompson</div>
                  <div className="author-title">Founder, Digital Assets Co.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            READY TO REVOLUTIONIZE YOUR EMAIL?
          </h2>
          <p className="cta-subtitle">
            Join the future of decentralized communication. Connect your Bitcoin wallet and start sending secure, 
            spam-free emails with native cryptocurrency integration.
          </p>
          
          <div className="cta-buttons">
            <button className="cta-primary large">
              <span>LAUNCH BITCOIN EMAIL</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="cta-features">
            <div className="cta-feature">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free to start</span>
            </div>
            <div className="cta-feature">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No signup required</span>
            </div>
            <div className="cta-feature">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Connect existing accounts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="bitcoin-symbol">₿</span>
              <span className="brand-text">
                <span className="brand-bitcoin">BITCOIN</span>
                <span className="brand-email">EMAIL</span>
              </span>
            </div>
            <p className="footer-tagline">
              Decentralized • Encrypted • Unstoppable
            </p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#security">Security</a>
              <a href="#api">API</a>
            </div>
            
            <div className="link-group">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#team">Team</a>
              <a href="#careers">Careers</a>
              <a href="#press">Press</a>
            </div>
            
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#docs">Documentation</a>
              <a href="#support">Support</a>
              <a href="#community">Community</a>
              <a href="#blog">Blog</a>
            </div>
            
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#compliance">Compliance</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 The Bitcoin Corporation LTD (16735102). Built on Bitcoin blockchain technology.
          </div>
          <div className="footer-social">
            <a href="#" className="social-link">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DarkMarketingPage;