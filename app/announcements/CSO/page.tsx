import { Megaphone, TrendingUp, Mail, Users, Calendar, ArrowRight } from 'lucide-react';

export default function CSOAnnouncementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900/20 text-white">
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
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            MAJOR ANNOUNCEMENT
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Coming Soon from Our Chief Spam Officer
          </h2>
          
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-orange-300 leading-relaxed">
              🥫 <strong>Spamsom Mo'</strong> - Chief Spam Officer & Head of BitSeedVentures - 
              is preparing a groundbreaking announcement that will revolutionize how we think about 
              Bitcoin email marketing and ecosystem development.
            </p>
          </div>
        </div>

        {/* Executive Profile */}
        <div className="bg-gray-900/50 rounded-xl border border-orange-500/20 p-8 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-black">SM</span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2 text-orange-500">Spamsom Mo'</h3>
              <div className="space-y-2 text-gray-300">
                <p className="text-xl font-semibold">Chief Spam Officer</p>
                <p className="text-lg">Head of BitSeedVentures</p>
                <p className="text-lg">The Bitcoin Corporation Ltd</p>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                  Email Marketing Expert
                </span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                  BSV Ecosystem Builder
                </span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                  Venture Specialist
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/30 border border-orange-500/20 rounded-lg p-6">
            <TrendingUp className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Strategic Vision</h3>
            <p className="text-gray-300">
              Revolutionary approach to Bitcoin ecosystem growth through targeted community engagement
            </p>
          </div>
          
          <div className="bg-gray-900/30 border border-orange-500/20 rounded-lg p-6">
            <Mail className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">SPAM Evolution</h3>
            <p className="text-gray-300">
              Next-generation email marketing strategy that builds while it educates and entertains
            </p>
          </div>
          
          <div className="bg-gray-900/30 border border-orange-500/20 rounded-lg p-6">
            <Users className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
            <p className="text-gray-300">
              Major initiatives to expand the BSV developer and user ecosystem through BitSeedVentures
            </p>
          </div>
        </div>

        {/* Teaser Timeline */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <Calendar className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Announcement Timeline</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <div>
                <p className="font-semibold">Phase 1: Strategic Review Complete</p>
                <p className="text-gray-400 text-sm">BitSeedVentures portfolio analysis finalized</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-orange-300">Phase 2: Announcement Preparation</p>
                <p className="text-gray-400 text-sm">Final details being crafted by Spamsom Mo'</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 border-2 border-orange-500 rounded-full"></div>
              <div>
                <p className="font-semibold text-gray-400">Phase 3: Public Announcement</p>
                <p className="text-gray-500 text-sm">Coming very soon - stay tuned to your email!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-black/50 border border-orange-500/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Don't Miss This Historic Moment</h3>
          <p className="text-lg text-gray-300 mb-6">
            Make sure you're subscribed to receive Spamsom Mo's announcement directly in your inbox.
            This will be bigger than the Lightning Network's latest failure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/spam" 
              className="px-8 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 transition-colors flex items-center justify-center gap-2"
            >
              Subscribe to SPAM <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="/contributions" 
              className="px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500/10 transition-colors"
            >
              Claim $BMAIL Tokens
            </a>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>💡 Pro tip: Early subscribers get priority access to BitSeedVentures opportunities</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            This announcement page is brought to you by The Bitcoin Corporation Ltd<br/>
            Building the future where every contributor is an owner
          </p>
        </div>
      </div>
    </div>
  );
}