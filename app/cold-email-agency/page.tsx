'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Target, DollarSign, TrendingUp, Zap, CheckCircle, ArrowRight, Briefcase, ChevronRight } from 'lucide-react';
import './cold-email-agency.css';

export default function ColdEmailAgencyPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="cso-container">
      {/* Retro Header with SPAM Images */}
      <div className="cso-header">
        <div className="retro-spam-image left-spam">
          <Image 
            src="/spam-images-02/download-19.jpg" 
            alt="Vintage SPAM" 
            width={200} 
            height={150}
            className="spam-decoration"
            style={{ 
              borderRadius: '10px',
              border: '4px solid #8B4513',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              filter: 'sepia(20%) saturate(1.2)'
            }}
          />
        </div>
        
        <div className="enamel-title-sign">
          <div className="title-sign-border">
            <h1 className="cso-main-title">
              <span className="spam-icon">🎯</span>
              THE COLD EMAIL AGENCY PLAY
              <span className="spam-icon">🎯</span>
            </h1>
            <div className="title-subtitle">
              Turn SPAM into Gold - The BSV Way
            </div>
          </div>
        </div>
        
        <div className="retro-spam-image right-spam">
          <Image 
            src="/spam-images-02/download-20.jpg" 
            alt="Classic SPAM" 
            width={200} 
            height={150}
            className="spam-decoration"
            style={{ 
              borderRadius: '10px',
              border: '4px solid #8B4513',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              filter: 'sepia(20%) saturate(1.2)'
            }}
          />
        </div>
      </div>

      <div className="spam-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px' }}>
        {/* TLDR Box */}
        <div className="vintage-box">
          <h2 className="section-title">TL;DR - THE BIG PICTURE</h2>
          <p style={{ fontSize: '24px', color: '#4A4A4A', lineHeight: '1.8', fontFamily: 'Oswald, sans-serif', fontWeight: '600' }}>
            Sell cold email services to agencies who need more clients. 
            They already charge high prices, so they can afford to pay you well.
          </p>
        </div>

        {/* Core Idea */}
        <div className="vintage-box">
          <h2 className="section-title">💡 THE CORE IDEA</h2>
          
          <div className="vintage-frame">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              <div>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: '#D2691E', marginBottom: '10px' }}>
                  What You&apos;re Selling:
                </h3>
                <p style={{ fontSize: '18px', color: '#4A4A4A', fontFamily: 'Oswald' }}>
                  A done-for-you cold email system that helps marketing/digital agencies get new clients.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: '#D2691E', marginBottom: '10px' }}>
                  Who You&apos;re Selling To:
                </h3>
                <p style={{ fontSize: '18px', color: '#4A4A4A', fontFamily: 'Oswald' }}>
                  Agency owners who already charge $5k-$50k+ for their services.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: '#D2691E', marginBottom: '10px' }}>
                  Why It Works:
                </h3>
                <p style={{ fontSize: '18px', color: '#4A4A4A', fontFamily: 'Oswald' }}>
                  Agencies desperately need consistent lead flow, and cold email is cheap + scalable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Money Part */}
        <div className="vintage-box">
          <h2 className="section-title">💰 THE MONEY PART</h2>
          
          <div className="money-showcase">
            <div style={{ marginBottom: '30px' }}>
              <span className="money-amount">SETUP FEE: $1,000 - $2,000</span>
              <span style={{ color: '#A0522D', display: 'block', fontSize: '18px', fontFamily: 'Oswald' }}>
                (one-time investment)
              </span>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <span className="money-amount">MONTHLY MANAGEMENT: $800 - $1,000</span>
              <span style={{ color: '#A0522D', display: 'block', fontSize: '18px', fontFamily: 'Oswald' }}>
                (recurring revenue)
              </span>
            </div>
            
            <div style={{ 
              marginTop: '40px', 
              paddingTop: '30px', 
              borderTop: '3px solid #FFD700' 
            }}>
              <p style={{ color: '#8B4513', fontSize: '20px', fontFamily: 'Oswald' }}>
                Or mix both: smaller setup + ongoing management
              </p>
            </div>
          </div>
        </div>

        {/* Why This is Smart */}
        <div className="vintage-box">
          <h2 className="section-title">🧠 WHY THIS IS SMART</h2>
          
          <div className="vintage-frame">
            {[
              'You use cold email to get clients for your cold email service (meta as fuck)',
              'When they get on a sales call, they\'ve already experienced your system working',
              'Less "selling" needed - they already know it works because it got them on the call',
              'Builds skills for your future Web3 plans'
            ].map((item, index) => (
              <div key={index} className="strategy-card">
                <ArrowRight style={{ color: '#FF6347', width: '30px', height: '30px', float: 'left', marginRight: '15px' }} />
                <p style={{ color: '#4A4A4A', fontSize: '18px', fontFamily: 'Oswald', lineHeight: '1.8' }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The 10 Steps */}
        <div className="vintage-box">
          <h2 className="section-title">📋 WHAT YOU ACTUALLY DO (THE 10 STEPS)</h2>
          
          <div style={{ marginTop: '30px' }}>
            {[
              { title: 'Pick Your Tools', desc: 'Email sending platform, scraping tools, CRM, etc.' },
              { title: 'Create Your Brand', desc: 'Logo, website, positioning as "the cold email guy"' },
              { title: 'Scrape Leads', desc: 'Find agency owners\' emails (LinkedIn, websites, databases)' },
              { title: 'Write Personalized Intros', desc: '"Hey, saw you helped X client achieve Y..."' },
              { title: 'Create Email Template', desc: 'Same body for everyone after the personalized intro' },
              { title: 'Write Follow-ups', desc: '2-3 automated follow-up emails' },
              { title: 'Setup Infrastructure', desc: 'Domains, email accounts, warmup, tracking' },
              { title: 'Launch Campaigns', desc: 'Start sending 50-100 emails/day' },
              { title: 'Optimize', desc: 'Test subject lines, copy, timing' },
              { title: 'Share Results', desc: 'Post case studies on social media' }
            ].map((step, index) => (
              <div 
                key={index}
                onClick={() => setActiveStep(activeStep === index ? null : index)}
                className="step-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span className="step-number">{index + 1}.</span>
                    <strong style={{ color: '#2C3E50', fontSize: '20px', fontFamily: 'Oswald' }}>
                      {step.title}
                    </strong>
                  </div>
                  <ChevronRight 
                    style={{ 
                      color: '#FF6347',
                      transform: activeStep === index ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      width: '30px',
                      height: '30px'
                    }} 
                  />
                </div>
                {activeStep === index && (
                  <p style={{ 
                    color: '#6B7280', 
                    marginTop: '20px', 
                    paddingLeft: '20px',
                    fontSize: '16px',
                    fontFamily: 'Oswald',
                    lineHeight: '1.6'
                  }}>
                    {step.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What You&apos;re Delivering */}
        <div className="vintage-box">
          <h2 className="section-title">🎮 WHAT YOU&apos;RE ACTUALLY DELIVERING</h2>
          
          <div className="vintage-frame">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {[
                'Email infrastructure setup (domains, mailboxes, warming)',
                'Lead scraping and list building',
                'Email copywriting templates',
                'Campaign automation setup',
                'Tracking and analytics',
                'Monthly optimization and management (if they pay monthly)'
              ].map((service, index) => (
                <span key={index} className="service-badge">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Why Agencies Will Pay */}
        <div className="vintage-box">
          <h2 className="section-title">⚡ WHY AGENCIES WILL PAY</h2>
          
          <div className="money-showcase">
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '36px', color: '#D2691E' }}>Their Reality:</h3>
              <span className="money-amount" style={{ fontSize: '42px' }}>One new client = $10k-$50k+ in revenue</span>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '36px', color: '#D2691E' }}>Your Cost:</h3>
              <span className="money-amount" style={{ fontSize: '42px' }}>$1-2k setup + $1k/month</span>
            </div>
            
            <div style={{ 
              marginTop: '40px', 
              paddingTop: '30px', 
              borderTop: '3px solid #FFD700',
              background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,99,71,0.2))',
              padding: '30px',
              borderRadius: '15px'
            }}>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '36px', color: '#FF6347' }}>The Math:</h3>
              <p style={{ fontSize: '28px', color: '#2C3E50', fontFamily: 'Oswald', fontWeight: '600' }}>
                If you get them even ONE client, they&apos;ve made their money back 5-10x
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="bottom-line-box">
          <p className="bottom-line-text">
            <strong style={{ fontSize: '28px', color: '#D2691E' }}>
              THE BOTTOM LINE:
            </strong>
            <br/><br/>
            You&apos;re basically becoming a client acquisition machine for agencies.
            <br/>
            They make big money from clients, so they can afford to pay you well.
            <br/>
            Plus, you prove it works just by getting them on a call with you.
            <br/><br/>
            <span className="bottom-line-highlight">
              This is how you build a $100K/month cold email empire.
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{ textAlign: 'center', margin: '60px 0' }}>
          <a href="/spam" className="spam-cta-button">
            Start Your SPAM Empire
          </a>
          <a href="/contributions" className="spam-cta-button">
            Join $BMAIL Revolution
          </a>
        </div>

        {/* SPAM Gallery */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
          <Image 
            src="/spam-images-02/download-21.jpg" 
            alt="Vintage SPAM" 
            width={150} 
            height={150}
            className="gallery-image"
            style={{ 
              borderRadius: '8px',
              border: '3px solid #8B4513',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              filter: 'sepia(15%) contrast(1.1)'
            }}
          />
          <Image 
            src="/spam-images-02/download-23.jpg" 
            alt="Classic SPAM" 
            width={150} 
            height={150}
            className="gallery-image"
            style={{ 
              borderRadius: '8px',
              border: '3px solid #8B4513',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              filter: 'sepia(15%) contrast(1.1)'
            }}
          />
          <Image 
            src="/spam-images-02/download-24.jpg" 
            alt="SPAM Heritage" 
            width={150} 
            height={150}
            className="gallery-image"
            style={{ 
              borderRadius: '8px',
              border: '3px solid #8B4513',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              filter: 'sepia(15%) contrast(1.1)'
            }}
          />
        </div>

        {/* Footer Quote */}
        <div className="footer-quote">
          <p>
            "Cold email meets blockchain innovation - where every SPAM is a step towards decentralization."
          </p>
          <strong>
            - The Bitcoin Corporation Ltd
            <br/>
            Powered by Bitcoin Email
          </strong>
        </div>
      </div>
    </div>
  );
}