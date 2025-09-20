import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // For now, store in a JSON file (later can use database)
    const fs = require('fs').promises;
    const path = require('path');
    const subscribersPath = path.join(process.cwd(), 'data', 'spam-subscribers.json');
    
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Load existing subscribers
    let subscribers = [];
    try {
      const data = await fs.readFile(subscribersPath, 'utf8');
      subscribers = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet
    }

    // Check if already subscribed
    if (subscribers.find((s: any) => s.email === email)) {
      return NextResponse.json({
        message: 'Already subscribed!',
        alreadySubscribed: true
      });
    }

    // Add new subscriber
    const newSubscriber = {
      email,
      subscribedAt: new Date().toISOString(),
      source: 'spam-signup',
      tags: ['spam-campaign', 'btc-trolling', 'bsv-advocate'],
      preferences: {
        dailySpam: true,
        projectUpdates: true,
        jobAlerts: true,
        investorNews: true
      }
    };

    subscribers.push(newSubscriber);

    // Save updated list
    await fs.writeFile(
      subscribersPath,
      JSON.stringify(subscribers, null, 2)
    );

    // Send welcome email (mock for now)
    console.log(`🥫 New SPAM subscriber: ${email}`);
    
    // TODO: Actually send welcome email with first SPAM
    // await sendWelcomeSpam(email);

    return NextResponse.json({
      message: 'Welcome to the SPAM family!',
      subscriber: {
        email,
        subscribedAt: newSubscriber.subscribedAt
      }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Admin endpoint to get subscriber count
    const fs = require('fs').promises;
    const path = require('path');
    const subscribersPath = path.join(process.cwd(), 'data', 'spam-subscribers.json');
    
    let subscribers = [];
    try {
      const data = await fs.readFile(subscribersPath, 'utf8');
      subscribers = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet
    }

    return NextResponse.json({
      count: subscribers.length,
      recentSubscribers: subscribers.slice(-5).reverse()
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get subscribers' },
      { status: 500 }
    );
  }
}