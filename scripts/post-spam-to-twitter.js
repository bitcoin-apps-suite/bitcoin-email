#!/usr/bin/env node

/**
 * Twitter SPAM Campaign Poster
 * Posts daily SPAM-themed emails mocking BTC to Twitter
 * 
 * Run: node scripts/post-spam-to-twitter.js
 * Cron: 0 12 * * * cd /path/to/project && node scripts/post-spam-to-twitter.js
 */

const fs = require('fs');
const path = require('path');

// Load campaign data
const campaignsPath = path.join(__dirname, '../public/spam-campaigns/daily-spam-emails.json');
const campaigns = JSON.parse(fs.readFileSync(campaignsPath, 'utf8'));

// Twitter API Configuration (will be set via environment variables)
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;

// Track posted campaigns
const postedPath = path.join(__dirname, '../.spam-posted.json');
let postedCampaigns = [];
if (fs.existsSync(postedPath)) {
  postedCampaigns = JSON.parse(fs.readFileSync(postedPath, 'utf8'));
}

/**
 * Generate a tweet from a campaign
 */
function generateTweet(campaign) {
  const templates = [
    `🥫 Have you had your SPAM today?\n\n${campaign.content.headline}\n\n${campaign.content.punchline}\n\n#BitcoinEmail #BSV #ScalingMatters`,
    
    `📧 Fresh from the can!\n\n${campaign.content.headline}\n\n💸 BTC: Expensive & Slow\n⚡ BSV: Instant & Free\n\n${campaign.content.punchline}\n\n#BitcoinEmail`,
    
    `🎪 Today's BTC Reality Check:\n\n${campaign.content.headline}\n\n${campaign.content.body.substring(0, 150)}...\n\n#HaveYouHadYourSPAMToday #BitcoinEmail`,
    
    `⚠️ WARNING: ${campaign.content.headline}\n\nSide effects of BTC:\n• High fees ($50-300)\n• Slow confirmations\n• Mempool anxiety\n• Scaling denial\n\nTry #BitcoinEmail instead!`,
    
    `🍖 Mempool Special:\n\n${campaign.content.headline}\n\n"${campaign.content.punchline}"\n\nJoin the scaling revolution: bitcoin-email.vercel.app\n\n#BitcoinEmail #BSV`
  ];
  
  // Pick a random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Ensure tweet is under 280 characters
  if (template.length > 280) {
    return template.substring(0, 277) + '...';
  }
  
  return template;
}

/**
 * Generate image for tweet (placeholder for actual implementation)
 */
async function generateImage(campaign) {
  // This would generate a 1950s style enamel sign image
  // Using canvas or a service like Puppeteer
  // For now, return a placeholder path
  
  const imagePath = path.join(__dirname, `../public/spam-campaigns/images/${campaign.id}.png`);
  
  // TODO: Implement actual image generation
  // Ideas:
  // - Use node-canvas to create retro styled images
  // - Use Puppeteer to screenshot HTML templates
  // - Use an AI image generation API
  
  console.log(`📸 Would generate image for: ${campaign.subject}`);
  return imagePath;
}

/**
 * Post to Twitter using API v2
 */
async function postToTwitter(text, imagePath) {
  if (!TWITTER_API_KEY) {
    console.log('⚠️  Twitter credentials not configured');
    console.log('📝 Would tweet:', text);
    return { simulated: true, text };
  }
  
  try {
    // Using Twitter API v2 client
    // npm install twitter-api-v2
    const { TwitterApi } = require('twitter-api-v2');
    
    const client = new TwitterApi({
      appKey: TWITTER_API_KEY,
      appSecret: TWITTER_API_SECRET,
      accessToken: TWITTER_ACCESS_TOKEN,
      accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
    });
    
    let tweet;
    if (fs.existsSync(imagePath)) {
      // Upload media first
      const mediaId = await client.v1.uploadMedia(imagePath);
      // Tweet with media
      tweet = await client.v2.tweet({
        text,
        media: { media_ids: [mediaId] }
      });
    } else {
      // Text-only tweet
      tweet = await client.v2.tweet(text);
    }
    
    console.log('✅ Posted to Twitter:', tweet.data.id);
    return tweet.data;
  } catch (error) {
    console.error('❌ Twitter posting failed:', error);
    throw error;
  }
}

/**
 * Post to other platforms (extensible)
 */
async function postToOtherPlatforms(campaign, text) {
  // LinkedIn
  if (process.env.LINKEDIN_ACCESS_TOKEN) {
    console.log('📱 Would post to LinkedIn...');
  }
  
  // Nostr
  if (process.env.NOSTR_PRIVATE_KEY) {
    console.log('⚡ Would post to Nostr...');
  }
  
  // Telegram Channel
  if (process.env.TELEGRAM_BOT_TOKEN) {
    console.log('💬 Would post to Telegram...');
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🥫 SPAM Campaign Poster Starting...');
  console.log('📅 Date:', new Date().toISOString());
  
  // Find unposted campaign
  const unpostedCampaigns = campaigns.campaigns.filter(
    c => !postedCampaigns.includes(c.id)
  );
  
  if (unpostedCampaigns.length === 0) {
    console.log('🔄 All campaigns posted, starting over...');
    postedCampaigns = [];
    unpostedCampaigns.push(...campaigns.campaigns);
  }
  
  // Select today's campaign
  const campaign = unpostedCampaigns[0];
  console.log(`📧 Selected campaign: ${campaign.subject}`);
  
  // Generate content
  const tweetText = generateTweet(campaign);
  const imagePath = await generateImage(campaign);
  
  // Post to Twitter
  try {
    await postToTwitter(tweetText, imagePath);
    
    // Mark as posted
    postedCampaigns.push(campaign.id);
    fs.writeFileSync(postedPath, JSON.stringify(postedCampaigns, null, 2));
    
    // Post to other platforms
    await postToOtherPlatforms(campaign, tweetText);
    
    console.log('✅ Campaign posted successfully!');
  } catch (error) {
    console.error('❌ Failed to post campaign:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateTweet, postToTwitter };