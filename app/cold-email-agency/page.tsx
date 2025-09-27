import { Target, DollarSign, TrendingUp, Zap, CheckCircle, ArrowRight, Briefcase } from 'lucide-react';

export default function ColdEmailAgencyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900/20 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <Target className="w-12 h-12 text-black" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            🎯 The Cold Email Agency Play
          </h1>
        </div>

        {/* TLDR Box */}
        <div className="bg-green-500/10 border-l-4 border-green-500 p-6 rounded-lg mb-12 max-w-4xl mx-auto">
          <p className="text-lg font-semibold">
            <strong>TL;DR:</strong> Sell cold email services to agencies who need more clients. They already charge high prices, so they can afford to pay you well.
          </p>
        </div>

        {/* Core Idea Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-3">
            <span className="text-2xl">💡</span> The Core Idea
          </h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold text-green-400 mb-2">What You're Selling:</p>
                <p className="text-gray-300">A done-for-you cold email system that helps marketing/digital agencies get new clients.</p>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">Who You're Selling To:</p>
                <p className="text-gray-300">Agency owners who already charge $5k-$50k+ for their services.</p>
              </div>
              <div>
                <p className="font-semibold text-green-400 mb-2">Why It Works:</p>
                <p className="text-gray-300">Agencies desperately need consistent lead flow, and cold email is cheap + scalable.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Money Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-3">
            <span className="text-2xl">💰</span> The Money Part
          </h2>
          <div className="bg-gray-900/50 border-l-4 border-green-500 p-8 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-green-500">Setup Fee: $1,000 - $2,000</p>
                  <p className="text-gray-400">(one-time)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-green-500">Monthly Management: $800 - $1,000</p>
                  <p className="text-gray-400">(recurring)</p>
                </div>
              </div>
              <p className="text-gray-300 pt-4">Or mix both: smaller setup + ongoing management</p>
            </div>
          </div>
        </div>

        {/* Why This is Smart */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-3">
            <span className="text-2xl">🧠</span> Why This is Smart
          </h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">You use cold email to get clients for your cold email service (meta as fuck)</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">When they get on a sales call, they've already experienced your system working</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Less "selling" needed - they already know it works because it got them on the call</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Builds skills for your future Web3 plans</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 10 Steps */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-3">
            <span className="text-2xl">📋</span> What You Actually Do (The 10 Steps)
          </h2>
          <div className="space-y-3">
            {[
              { num: 1, title: "Pick Your Tools", desc: "Email sending platform, scraping tools, CRM, etc." },
              { num: 2, title: "Create Your Brand", desc: "Logo, website, positioning as \"the cold email guy\"" },
              { num: 3, title: "Scrape Leads", desc: "Find agency owners' emails (LinkedIn, websites, databases)" },
              { num: 4, title: "Write Personalized Intros", desc: "\"Hey, saw you helped X client achieve Y...\"" },
              { num: 5, title: "Create Email Template", desc: "Same body for everyone after the personalized intro" },
              { num: 6, title: "Write Follow-ups", desc: "2-3 automated follow-up emails" },
              { num: 7, title: "Setup Infrastructure", desc: "Domains, email accounts, warmup, tracking" },
              { num: 8, title: "Launch Campaigns", desc: "Start sending 50-100 emails/day" },
              { num: 9, title: "Optimize", desc: "Test subject lines, copy, timing" },
              { num: 10, title: "Share Results", desc: "Post case studies on social media" }
            ].map((step) => (
              <div key={step.num} className="bg-gray-900/30 border border-gray-800 p-4 rounded-lg flex items-start gap-4 hover:border-green-500/50 transition-colors">
                <span className="text-green-500 font-bold text-lg">{step.num}.</span>
                <div>
                  <span className="font-semibold text-white">{step.title}:</span>
                  <span className="text-gray-300 ml-2">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What You're Delivering */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-3">
            <span className="text-2xl">🎮</span> What You're Actually Delivering
          </h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Email infrastructure setup (domains, mailboxes, warming)",
                "Lead scraping and list building",
                "Email copywriting templates",
                "Campaign automation setup",
                "Tracking and analytics",
                "Monthly optimization and management (if they pay monthly)"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Agencies Will Pay */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-500" />
            Why Agencies Will Pay
          </h2>
          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Briefcase className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <p className="font-semibold text-green-400">Their Reality:</p>
                  <p className="text-xl text-gray-300">One new client = $10k-$50k+ in revenue</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <p className="font-semibold text-green-400">Your Cost:</p>
                  <p className="text-xl text-gray-300">$1-2k setup + $1k/month</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <p className="font-semibold text-green-400">The Math:</p>
                  <p className="text-xl text-gray-300">If you get them even ONE client, they've made their money back 5-10x</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-3">
            <span className="text-2xl">🚀</span> The Bottom Line
          </h2>
          <div className="bg-black/50 border border-green-500/50 rounded-xl p-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              You're basically becoming a client acquisition machine for agencies. They make big money from clients, so they can afford to pay you well. Plus, you prove it works just by getting them on a call with you.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-900/10 to-emerald-900/10 border border-green-500/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Your Cold Email Agency?</h3>
          <p className="text-lg text-gray-300 mb-6">
            Start with Bitcoin Email - the future of decentralized email marketing on the blockchain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/spam" 
              className="px-8 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
            >
              Explore SPAM Features <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="/contributions" 
              className="px-8 py-3 border-2 border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-500/10 transition-colors"
            >
              Join $BMAIL Revolution
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Cold email meets blockchain innovation<br/>
            Powered by Bitcoin Email & The Bitcoin Corporation Ltd
          </p>
        </div>
      </div>
    </div>
  );
}