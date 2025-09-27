'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, DollarSign, Target, Zap, TrendingUp, Mail, Users, Globe } from 'lucide-react';
import './cso-action-plan.css';

export default function CSOActionPlanPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="cso-container">
      {/* Retro Header with SPAM Images */}
      <div className="cso-header">
        <div className="retro-spam-image left-spam">
          <Image 
            src="/spam-images-02/download-11.jpg" 
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
              <span className="spam-icon">🥫</span>
              SPAMSOM MO&apos;S MASTER PLAN
              <span className="spam-icon">🥫</span>
            </h1>
            <div className="title-subtitle">
              Cold Email Empire for BSV Ecosystem Growth
            </div>
          </div>
        </div>
        
        <div className="retro-spam-image right-spam">
          <Image 
            src="/spam-images-02/download-13.jpg" 
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
        {/* Mission Box */}
        <div className="vintage-box">
          <h2 className="section-title">THE MISSION</h2>
          <p style={{ fontSize: '20px', color: '#4A4A4A', lineHeight: '1.8', fontFamily: 'Oswald, sans-serif' }}>
            Transform Bitcoin Email into the premier cold outreach service for the entire BSV ecosystem, 
            while building BitSeedVentures&apos; portfolio through strategic SPAM campaigns.
          </p>
        </div>

        {/* Revenue Model */}
        <div className="vintage-box">
          <h2 className="section-title">💰 THE BITCOIN EMAIL REVENUE MODEL</h2>
          
          <div className="money-showcase">
            <div style={{ marginBottom: '30px' }}>
              <span className="money-amount">SPAM SETUP: $2,000 - $5,000</span>
              <span style={{ color: '#A0522D', display: 'block', fontSize: '18px', fontFamily: 'Oswald' }}>
                (in BSV/BMAIL tokens)
              </span>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <span className="money-amount">MONTHLY CAMPAIGNS: $1,500 - $3,000</span>
              <span style={{ color: '#A0522D', display: 'block', fontSize: '18px', fontFamily: 'Oswald' }}>
                (recurring subscription)
              </span>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <span className="money-amount">ENTERPRISE PACKAGE: $10,000+</span>
              <span style={{ color: '#A0522D', display: 'block', fontSize: '18px', fontFamily: 'Oswald' }}>
                (full ecosystem outreach)
              </span>
            </div>
            
            <div style={{ 
              marginTop: '40px', 
              paddingTop: '30px', 
              borderTop: '3px solid #FFD700' 
            }}>
              <p style={{ color: '#8B4513', fontSize: '24px', fontFamily: 'Oswald', fontWeight: '600' }}>
                TARGET: 50 BSV projects × $2k/month = 
              </p>
              <span className="money-amount" style={{ fontSize: '64px' }}>
                $100K/MONTH
              </span>
            </div>
          </div>
        </div>

        {/* Three-Pronged Attack */}
        <div className="vintage-box">
          <h2 className="section-title">🎯 THE THREE-PRONGED ATTACK</h2>
          
          <div className="vintage-frame">
            {[
              {
                number: '1',
                title: 'BSV PROJECT ACCELERATION',
                what: 'Cold email services for BSV startups needing users, investors, and partners',
                how: 'Use Bitcoin Email&apos;s infrastructure to run targeted campaigns',
                value: 'One successful partnership = 10-100x the service cost'
              },
              {
                number: '2',
                title: 'BITSEEDVENTURES PORTFOLIO GROWTH',
                what: 'Scout and connect with promising BSV projects globally',
                how: 'Cold outreach to developers, identifying investment opportunities',
                value: 'Build a portfolio while getting paid for outreach'
              },
              {
                number: '3',
                title: 'BITCOIN CORPORATION ECOSYSTEM',
                what: 'Connect all Bitcoin Corporation properties through strategic SPAM',
                how: 'Cross-promote services, events, and opportunities',
                value: 'Create network effects across the entire ecosystem'
              }
            ].map((item, index) => (
              <div key={index} className="strategy-card">
                <h3 className="strategy-title">
                  {item.number}. {item.title}
                </h3>
                <p style={{ color: '#4A4A4A', marginBottom: '10px', fontFamily: 'Oswald' }}>
                  <strong>What:</strong> {item.what}
                </p>
                <p style={{ color: '#4A4A4A', marginBottom: '10px', fontFamily: 'Oswald' }}>
                  <strong>How:</strong> {item.how}
                </p>
                <p style={{ color: '#4A4A4A', fontFamily: 'Oswald' }}>
                  <strong>Value:</strong> {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 12-Step Plan */}
        <div className="vintage-box">
          <h2 className="section-title">📋 THE 12-STEP SPAM DOMINATION PLAN</h2>
          
          <div style={{ marginTop: '30px' }}>
            {[
              { title: 'Infrastructure Setup', desc: 'Configure Bitcoin Email with 50+ domains, proper SPF/DKIM, warming sequences' },
              { title: 'BSV Developer Database', desc: 'Scrape GitHub, LinkedIn, Twitter for every BSV developer and project globally' },
              { title: 'Investor Outreach Lists', desc: 'Build lists of crypto VCs, angel investors, and BSV-friendly funds' },
              { title: 'SPAM Template Library', desc: 'Create 50+ battle-tested templates for different industries and purposes' },
              { title: 'AI Personalization Engine', desc: 'Use AI to write hyper-personalized intros at scale (1000s/day)' },
              { title: '$BMAIL Token Integration', desc: 'Accept payments in $BMAIL, offer discounts for token holders' },
              { title: 'Case Study Machine', desc: 'Document every success, publish weekly wins on Bitcoin Email blog' },
              { title: 'Partnership Network', desc: 'Partner with BSV conferences, media outlets, and influencers' },
              { title: 'Automation Suite', desc: 'Build tools for automated follow-ups, A/B testing, and analytics' },
              { title: 'White Label Service', desc: 'Let other agencies rebrand and resell Bitcoin Email services' },
              { title: 'Global Expansion', desc: 'Target non-English markets (China, Japan, Korea) with localized SPAM' },
              { title: 'Exit Strategy', desc: 'Package everything into a sellable SaaS or merge with larger BSV entity' }
            ].map((step, index) => (
              <div 
                key={index}
                onClick={() => setActiveStep(activeStep === index ? null : index)}
                className="step-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span className="step-number">STEP {index + 1}:</span>
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

        {/* Services Menu */}
        <div className="vintage-box">
          <h2 className="section-title">🎮 THE SERVICES MENU</h2>
          
          <div className="vintage-frame">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {[
                'Email Infrastructure Setup',
                'Lead Generation & Scraping',
                'Campaign Management',
                'A/B Testing & Optimization',
                'Investor Outreach Campaigns',
                'Developer Recruitment',
                'Partnership Facilitation',
                'Event Promotion',
                'Token Sale Support',
                'Analytics & Reporting'
              ].map((service, index) => (
                <span key={index} className="service-badge">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Projected Outcomes */}
        <div className="vintage-box">
          <h2 className="section-title">📊 PROJECTED OUTCOMES (YEAR 1)</h2>
          
          <div className="money-showcase">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              {[
                { label: 'Clients', value: '50+ BSV projects', icon: Users },
                { label: 'Revenue', value: '$1.2M+ in fees', icon: DollarSign },
                { label: 'Emails Sent', value: '10 million+', icon: Mail },
                { label: 'Connections', value: '5,000+ intros', icon: Target },
                { label: 'Portfolio', value: '10+ investments', icon: TrendingUp },
                { label: '$BMAIL Value', value: '10x increase', icon: Zap }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Icon style={{ color: '#FF6347', width: '40px', height: '40px' }} />
                    <div>
                      <p style={{ color: '#8B4513', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Oswald' }}>
                        {item.label}:
                      </p>
                      <p style={{ color: '#D2691E', fontSize: '20px', fontFamily: 'Bebas Neue' }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Immediate Action Items */}
        <div className="vintage-box">
          <h2 className="section-title">🔥 IMMEDIATE ACTION ITEMS</h2>
          
          <div className="vintage-frame">
            {[
              { week: 'Week 1', action: 'Launch "BSV Project Accelerator" campaign - reach out to 100 BSV projects' },
              { week: 'Week 2', action: 'Create automated onboarding for new SPAM clients' },
              { week: 'Week 3', action: 'Partner with 3 BSV influencers for co-marketing' },
              { week: 'Week 4', action: 'Publish first case study: "How SPAM Got X Project 50 New Users"' }
            ].map((item, index) => (
              <div key={index} className="strategy-card">
                <strong style={{ color: '#FF6347', fontSize: '24px', fontFamily: 'Bebas Neue' }}>
                  {item.week}:
                </strong>
                <p style={{ color: '#4A4A4A', marginTop: '10px', fontSize: '18px', fontFamily: 'Oswald' }}>
                  {item.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Line */}
        <div className="bottom-line-box">
          <p className="bottom-line-text">
            <strong style={{ fontSize: '28px', color: '#D2691E' }}>
              Spamsom Mo&apos; isn&apos;t just sending emails.
            </strong>
            <br/><br/>
            He&apos;s building the nervous system of the BSV ecosystem.
            <br/>
            Every SPAM connects a neuron. Every campaign strengthens the network.
            <br/><br/>
            <span className="bottom-line-highlight">
              This is how we grow from 1,000 to 1,000,000 users.
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{ textAlign: 'center', margin: '60px 0' }}>
          <a href="/spam" className="spam-cta-button">
            Start Your SPAM Campaign
          </a>
          <a href="/contributions" className="spam-cta-button">
            Get $BMAIL Tokens
          </a>
        </div>

        {/* SPAM Gallery */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
          <Image 
            src="/spam-images-02/download-16.jpg" 
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
            src="/spam-images-02/download-17.jpg" 
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
            src="/spam-images-02/download-18.jpg" 
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
            "In the attention economy, SPAM isn&apos;t noise—it&apos;s music to the right ears."
          </p>
          <strong>
            - Spamsom Mo&apos;, Chief Spam Officer
            <br/>
            The Bitcoin Corporation Ltd | BitSeedVentures
          </strong>
        </div>
      </div>
    </div>
  );
}