import { Megaphone, TrendingUp, Mail, Users, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CSOAnnouncementPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #FFE5B4, #FFDAB9)' }}>
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Megaphone className="w-12 h-12 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-xs font-bold">!</span>
              </div>
            </div>
          </div>
          
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '4rem', color: '#8B4513', textShadow: '3px 3px 6px rgba(0,0,0,0.3)', marginBottom: '1rem' }}>
            MAJOR ANNOUNCEMENT
          </h1>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#D2691E', marginBottom: '1.5rem' }}>
            Coming Soon from Our Chief Spam Officer
          </h2>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', border: '3px solid #D2691E', borderRadius: '15px', padding: '2rem', maxWidth: '64rem', margin: '0 auto', boxShadow: '0 8px 16px rgba(139,69,19,0.2)' }}>
            <p style={{ fontSize: '1.25rem', color: '#8B4513', lineHeight: '1.8' }}>
              🥫 <strong>Spamsom Mo'</strong> - Chief Spam Officer & Head of BitSeedVentures - 
              is preparing a groundbreaking announcement that will revolutionize how we think about 
              Bitcoin email marketing and ecosystem development. Stay tuned for historic news.
            </p>
          </div>
        </div>

        {/* SPAM Images Gallery */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '40px 0', flexWrap: 'wrap' }}>
          <Image 
            src="/spam-images-02/download-26.jpg" 
            alt="Vintage SPAM" 
            width={150} 
            height={150}
            style={{ filter: 'sepia(0.3)', border: '3px solid #FFD700', borderRadius: '10px' }}
          />
          <Image 
            src="/spam-images-02/download-2.jpg" 
            alt="Vintage SPAM" 
            width={150} 
            height={150}
            style={{ filter: 'sepia(0.3)', border: '3px solid #FFD700', borderRadius: '10px' }}
          />
          <Image 
            src="/spam-images-02/download-10.jpg" 
            alt="Vintage SPAM" 
            width={150} 
            height={150}
            style={{ filter: 'sepia(0.3)', border: '3px solid #FFD700', borderRadius: '10px' }}
          />
        </div>

        {/* Executive Profile */}
        <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', border: '3px solid #D2691E', padding: '2rem', marginBottom: '3rem', maxWidth: '64rem', margin: '0 auto 3rem', boxShadow: '0 8px 16px rgba(139,69,19,0.2)' }}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div style={{ width: '128px', height: '128px', background: 'linear-gradient(to bottom right, #FF6347, #FF8C00)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #FFD700' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFF' }}>SM</span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#D2691E' }}>Spamsom Mo'</h3>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#8B4513' }}>Chief Spam Officer</p>
                <p style={{ fontSize: '1.125rem', color: '#A0522D' }}>Head of BitSeedVentures</p>
                <p style={{ fontSize: '1.125rem', color: '#A0522D' }}>The Bitcoin Corporation Ltd</p>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <span style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#8B4513', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '600' }}>
                  Email Marketing Expert
                </span>
                <span style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#8B4513', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '600' }}>
                  BSV Ecosystem Builder
                </span>
                <span style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#8B4513', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '600' }}>
                  Venture Specialist
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div style={{ background: 'rgba(255, 255, 255, 0.9)', border: '2px solid #D2691E', borderRadius: '12px', padding: '1.5rem' }}>
            <TrendingUp className="w-8 h-8 mb-4" style={{ color: '#FF6347' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#8B4513' }}>Strategic Vision</h3>
            <p style={{ color: '#A0522D' }}>
              Revolutionary approach to Bitcoin ecosystem growth through targeted community engagement
            </p>
          </div>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.9)', border: '2px solid #D2691E', borderRadius: '12px', padding: '1.5rem' }}>
            <Mail className="w-8 h-8 mb-4" style={{ color: '#FF6347' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#8B4513' }}>SPAM Evolution</h3>
            <p style={{ color: '#A0522D' }}>
              Next-generation email marketing strategy that builds while it educates and entertains
            </p>
          </div>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.9)', border: '2px solid #D2691E', borderRadius: '12px', padding: '1.5rem' }}>
            <Users className="w-8 h-8 mb-4" style={{ color: '#FF6347' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#8B4513' }}>Community Impact</h3>
            <p style={{ color: '#A0522D' }}>
              Major initiatives to expand the BSV developer and user ecosystem through BitSeedVentures
            </p>
          </div>
        </div>

        {/* Teaser Timeline */}
        <div style={{ background: 'linear-gradient(to right, rgba(255,140,0,0.1), rgba(255,99,71,0.1))', border: '3px solid #D2691E', borderRadius: '15px', padding: '2rem', marginBottom: '3rem' }}>
          <div className="text-center mb-8">
            <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: '#FF6347' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#8B4513' }}>Announcement Timeline</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full" style={{ background: '#FF6347' }}></div>
              <div>
                <p style={{ fontWeight: '600', color: '#8B4513' }}>Phase 1: Strategic Review Complete</p>
                <p style={{ color: '#A0522D', fontSize: '0.875rem' }}>BitSeedVentures portfolio analysis finalized</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: '#FF6347' }}></div>
              <div>
                <p style={{ fontWeight: '600', color: '#D2691E' }}>Phase 2: Announcement Preparation</p>
                <p style={{ color: '#A0522D', fontSize: '0.875rem' }}>Final details being crafted by Spamsom Mo'</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 border-2 rounded-full" style={{ borderColor: '#FF6347' }}></div>
              <div>
                <p style={{ fontWeight: '600', color: '#A0522D' }}>Phase 3: Public Announcement</p>
                <p style={{ color: '#CD853F', fontSize: '0.875rem' }}>Coming very soon - stay tuned to your email!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.95)', border: '3px solid #D2691E', borderRadius: '15px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#8B4513' }}>Don't Miss This Historic Moment</h3>
          <p style={{ fontSize: '1.125rem', color: '#A0522D', marginBottom: '1.5rem' }}>
            Make sure you're subscribed to receive Spamsom Mo's announcement directly in your inbox.
            This will be bigger than the Lightning Network's latest failure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/spam" 
              style={{ padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #FF6347, #FF8C00)', color: '#FFF', fontWeight: '600', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none', transition: 'all 0.3s' }}
            >
              Subscribe to SPAM <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="/contributions" 
              style={{ padding: '0.75rem 2rem', border: '2px solid #FF6347', color: '#FF6347', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s' }}
            >
              Claim $BMAIL Tokens
            </a>
          </div>
          
          <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#A0522D' }}>
            <p>💡 Pro tip: Early subscribers get priority access to BitSeedVentures opportunities</p>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ color: '#A0522D', fontSize: '0.875rem' }}>
            This announcement page is brought to you by The Bitcoin Corporation Ltd<br/>
            Building the future where every contributor is an owner
          </p>
        </div>
      </div>
    </div>
  );
}