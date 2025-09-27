'use client';

import { ExternalLink, Sparkles, ImageIcon } from 'lucide-react';

export default function PerchanceGeneratorPage() {
  const promptText = "Have you had your SPAM today? - vintage 1950s enamel sign with red Bitcoin B logo, retro typography, weathered metal texture, classic diner signage style, bold lettering, nostalgic americana, advertising poster";

  const handleOpenPerchance = () => {
    window.open('https://perchance.org/spam', '_blank');
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900/20 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-black" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            SPAM Sign Generator
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-300">
            Create Vintage '50s Enamel Signs with AI
          </h2>
          
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-lg text-orange-300 leading-relaxed">
              Generate beautiful vintage enamel signs in classic 1950s style featuring our iconic SPAM message
              and the red Bitcoin B logo. Perfect for marketing, memes, and nostalgia.
            </p>
          </div>
        </div>

        {/* Main Generator Section */}
        <div className="max-w-4xl mx-auto">
          {/* Preview Section */}
          <div className="bg-gray-900/50 rounded-xl border border-orange-500/20 p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <Sparkles className="inline w-6 h-6 mr-2 text-orange-500" />
              Image Prompt Preview
            </h3>
            
            <div className="bg-black/50 border border-gray-700 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold mb-3 text-orange-400">Generated Text:</h4>
              <p className="text-2xl font-bold text-center text-orange-300 mb-4">
                "Have you had your SPAM today?"
              </p>
              
              <h4 className="text-lg font-semibold mb-3 text-orange-400">Style Description:</h4>
              <p className="text-gray-300 leading-relaxed">
                {promptText}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={copyPrompt}
                className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Copy Prompt
              </button>
              
              <button
                onClick={handleOpenPerchance}
                className="px-8 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 transition-colors flex items-center justify-center gap-2"
              >
                Open SPAM Generator <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900/30 border border-orange-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-400">How to Use</h3>
              <ol className="space-y-2 text-gray-300">
                <li>1. Click "Open SPAM Generator" button above</li>
                <li>2. The generator is pre-configured for '50s Enamel Sign' style</li>
                <li>3. Adjust settings as needed (portrait/landscape)</li>
                <li>4. Click "Generate" to create your images</li>
                <li>5. Download your favorite variations</li>
              </ol>
            </div>
            
            <div className="bg-gray-900/30 border border-orange-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Pro Tips</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Generate multiple versions for variety</li>
                <li>• Try different aspect ratios for different uses</li>
                <li>• The red Bitcoin B logo will be automatically included</li>
                <li>• Perfect for social media, presentations, and SPAM campaigns</li>
                <li>• Free and unlimited - no signup required</li>
              </ul>
            </div>
          </div>

          {/* Style Examples */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">What to Expect</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">B</span>
                </div>
                <h4 className="font-semibold mb-2">Bitcoin Branding</h4>
                <p className="text-sm text-gray-400">Prominent red Bitcoin B logo integrated naturally</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl">🥫</span>
                </div>
                <h4 className="font-semibold mb-2">SPAM Theme</h4>
                <p className="text-sm text-gray-400">Classic "Have you had your SPAM today?" message</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl">✨</span>
                </div>
                <h4 className="font-semibold mb-2">Vintage Style</h4>
                <p className="text-sm text-gray-400">Authentic 1950s enamel sign aesthetic</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-black/50 border border-orange-500/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Create Your SPAM Sign?</h3>
              <p className="text-lg text-gray-300 mb-6">
                Join the retro revolution and create stunning vintage signs that perfectly capture 
                the spirit of Bitcoin SPAM culture.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleOpenPerchance}
                  className="px-8 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 transition-colors flex items-center justify-center gap-2"
                >
                  Open SPAM Generator <ExternalLink className="w-4 h-4" />
                </button>
                
                <a 
                  href="/spam" 
                  className="px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500/10 transition-colors"
                >
                  Subscribe to SPAM
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Powered by Perchance AI • Bitcoin SPAM Generator<br/>
            Creating tomorrow's memes with yesterday's style
          </p>
        </div>
      </div>
    </div>
  );
}