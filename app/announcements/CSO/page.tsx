'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Megaphone, TrendingUp, Mail, Users, Calendar, ArrowRight } from 'lucide-react';
import './cso-announcement.css';

export default function CSOAnnouncementPage() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <div className="cso-container">
      {/* Retro Header with SPAM Images */}
      <div className="cso-header">
        <div className="retro-spam-image left-spam">
          <Image 
            src="/spam-images-02/download-25.jpg" 
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
              <span className="spam-icon">📢</span>
              MAJOR ANNOUNCEMENT
              <span className="spam-icon">📢</span>
            </h1>
            <div className="title-subtitle">
              Coming Soon from Our Chief Spam Officer
            </div>
          </div>
        </div>
        
        <div className="retro-spam-image right-spam">
          <Image 
            src="/spam-images-02/download-27.jpg" 
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
        {/* Main Announcement Box */}
        <div className="vintage-box">
          <h2 className="section-title">🥫 THE BIG NEWS IS COMING 🥫</h2>
          <p style={{ fontSize: '24px', color: '#4A4A4A', lineHeight: '1.8', fontFamily: 'Oswald, sans-serif', fontWeight: '600', textAlign: 'center' }}>
            <strong>Spamsom Mo&apos;</strong> - Chief Spam Officer - 
            is preparing a groundbreaking announcement that will revolutionize how we think about 
            Bitcoin email marketing and ecosystem development. Stay tuned for historic news.
          </p>
        </div>

        {/* SPAM Images Gallery */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '40px 0', flexWrap: 'wrap' }}>
          <Image 
            src="/spam-images-02/download-26.jpg" 
            alt="Vintage SPAM" 
            width={180} 
            height={180}
            className="gallery-image"
            style={{ 
              borderRadius: '10px',
              border: '4px solid #FFD700',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              filter: 'sepia(30%) saturate(1.2)'
            }}
          />
          <Image 
            src="/spam-images-02/download-2.jpg" 
            alt="Vintage SPAM" 
            width={180} 
            height={180}
            className="gallery-image"
            style={{ 
              borderRadius: '10px',
              border: '4px solid #FFD700',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              filter: 'sepia(30%) saturate(1.2)'
            }}
          />
          <Image 
            src="/spam-images-02/download-10.jpg" 
            alt="Vintage SPAM" 
            width={180} 
            height={180}
            className="gallery-image"
            style={{ 
              borderRadius: '10px',
              border: '4px solid #FFD700',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              filter: 'sepia(30%) saturate(1.2)'
            }}
          />
        </div>

        {/* Executive Profile */}
        <div className="vintage-box executive-card">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
            <div style={{ 
              width: '150px', 
              height: '150px', 
              background: 'linear-gradient(135deg, #FF6347, #FF8C00)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '6px solid #FFD700',
              boxShadow: '0 10px 30px rgba(255, 99, 71, 0.4)'
            }}>
              <span style={{ fontSize: '60px', fontWeight: 'bold', color: '#FFF', fontFamily: 'Bebas Neue' }}>SM</span>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '48px', color: '#FF4444', textShadow: '2px 2px 0 #8B0000', marginBottom: '10px' }}>
                Spamsom Mo&apos;
              </h3>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '24px', fontWeight: '600', color: '#D2691E', fontFamily: 'Oswald' }}>
                  Chief Spam Officer
                </p>
                <p style={{ fontSize: '20px', color: '#A0522D', fontFamily: 'Oswald' }}>
                  The Bitcoin Corporation Ltd
                </p>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                <span className="service-badge">
                  Email Marketing Expert
                </span>
                <span className="service-badge">
                  BSV Ecosystem Builder
                </span>
                <span className="service-badge">
                  Venture Specialist
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="vintage-box">
          <h2 className="section-title">💫 WHAT TO EXPECT</h2>
          
          <div className="vintage-frame">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <TrendingUp style={{ width: '60px', height: '60px', color: '#FF6347', margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '32px', color: '#D2691E', marginBottom: '15px' }}>
                  Strategic Vision
                </h3>
                <p style={{ color: '#4A4A4A', fontSize: '16px', fontFamily: 'Oswald' }}>
                  Revolutionary approach to Bitcoin ecosystem growth through targeted community engagement
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Mail style={{ width: '60px', height: '60px', color: '#FF6347', margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '32px', color: '#D2691E', marginBottom: '15px' }}>
                  SPAM Evolution
                </h3>
                <p style={{ color: '#4A4A4A', fontSize: '16px', fontFamily: 'Oswald' }}>
                  Next-generation email marketing strategy that builds while it educates and entertains
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Users style={{ width: '60px', height: '60px', color: '#FF6347', margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '32px', color: '#D2691E', marginBottom: '15px' }}>
                  Community Impact
                </h3>
                <p style={{ color: '#4A4A4A', fontSize: '16px', fontFamily: 'Oswald' }}>
                  Major initiatives to expand the BSV developer and user ecosystem
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Teaser Timeline */}
        <div className="vintage-box">
          <h2 className="section-title">📅 ANNOUNCEMENT TIMELINE</h2>
          
          <div className="money-showcase">
            <Calendar style={{ width: '80px', height: '80px', color: '#FF6347', margin: '0 auto 30px' }} />
            
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
              {[
                { 
                  phase: 'Phase 1: Strategic Review Complete', 
                  desc: 'Portfolio analysis finalized',
                  status: 'complete'
                },
                { 
                  phase: 'Phase 2: Announcement Preparation', 
                  desc: 'Final details being crafted by Spamsom Mo&apos;',
                  status: 'active'
                },
                { 
                  phase: 'Phase 3: Public Announcement', 
                  desc: 'Coming very soon - stay tuned to your email!',
                  status: 'pending'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  onClick={() => setActivePhase(activePhase === index ? null : index)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px', 
                    padding: '20px',
                    marginBottom: '20px',
                    background: item.status === 'active' ? 'rgba(255,140,0,0.1)' : 'rgba(255,255,255,0.5)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: `3px solid ${item.status === 'complete' ? '#4CAF50' : item.status === 'active' ? '#FF6347' : '#D2691E'}`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '50%',
                    background: item.status === 'complete' ? '#4CAF50' : item.status === 'active' ? '#FF6347' : 'transparent',
                    border: item.status === 'pending' ? '3px solid #D2691E' : 'none',
                    animation: item.status === 'active' ? 'pulse 2s ease infinite' : 'none'
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', color: '#2C3E50', fontSize: '20px', fontFamily: 'Oswald', marginBottom: '5px' }}>
                      {item.phase}
                    </p>
                    <p style={{ color: '#6B7280', fontSize: '16px', fontFamily: 'Oswald' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bottom-line-box">
          <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '42px', color: '#FF4444', textShadow: '2px 2px 0 #8B0000', marginBottom: '20px' }}>
            Don&apos;t Miss This Historic Moment
          </h3>
          <p className="bottom-line-text">
            Make sure you&apos;re subscribed to receive Spamsom Mo&apos;s announcement directly in your inbox.
            <br/>
            This will be bigger than the Lightning Network&apos;s latest failure.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              <a href="/spam" className="spam-cta-button">
                Subscribe to SPAM <ArrowRight style={{ display: 'inline', marginLeft: '10px' }} />
              </a>
              <a href="https://spamkitchen.substack.com" className="spam-cta-button" target="_blank" rel="noopener noreferrer">
                Sign up to Spam Kitchen Newsletter
              </a>
              <a href="/contributions" className="spam-cta-button">
                Claim $BMAIL Tokens
              </a>
            </div>
            
            <div style={{ marginTop: '20px', fontSize: '18px', color: '#A0522D', fontFamily: 'Oswald' }}>
              <p>💡 Pro tip: Early subscribers get priority access to exclusive opportunities</p>
            </div>
          </div>
        </div>

        {/* More SPAM Images */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '60px', flexWrap: 'wrap' }}>
          <Image 
            src="/spam-images-02/download-29.jpg" 
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
            src="/spam-images-02/download-30.jpg" 
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
            src="/spam-images-02/download-31.jpg" 
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

        {/* Footer Note */}
        <div className="footer-quote">
          <p>
            "The future of Bitcoin marketing is SPAM - Strategic Personalized Authentic Marketing"
          </p>
          <strong>
            This announcement page is brought to you by The Bitcoin Corporation Ltd
            <br/>
            Building the future where every contributor is an owner
          </strong>
        </div>
      </div>
    </div>
  );
}