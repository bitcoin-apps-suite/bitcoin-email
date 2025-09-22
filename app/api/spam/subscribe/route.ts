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

    // For production, we'll store subscribers in memory or use a database service
    // In Vercel serverless functions, filesystem writes are not persistent
    
    // Log the subscription (this will appear in Vercel logs)
    console.log(`🥫 New SPAM subscriber: ${email}`);
    
    // In production, you would:
    // 1. Use Vercel KV, Postgres, or another database
    // 2. Send to a third-party email service (SendGrid, Mailgun, etc.)
    // 3. Store in a Google Sheet via API
    // 4. Use Supabase, Firebase, or similar
    
    // For now, we'll just acknowledge the subscription
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

export async function GET() {
  try {
    // Admin endpoint to get subscriber count
    // In production, this would query your database
    
    return NextResponse.json({
      count: 0,
      recentSubscribers: [],
      message: 'Subscriber storage not configured for production. Check Vercel logs for subscriptions.'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get subscribers' },
      { status: 500 }
    );
  }
}