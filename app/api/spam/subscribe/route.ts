import { NextRequest, NextResponse } from 'next/server';
import { sendSpamEmail, getWelcomeEmailHtml } from '@/lib/email/gmail-sender';
import { SubscribersStore } from '@/lib/subscribers-store';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Log the subscription (this will appear in Vercel logs)
    console.log(`🥫 New SPAM subscriber: ${email}`);
    
    // Store subscriber in file system (works locally, limited in Vercel)
    const newSubscriber = {
      email,
      subscribedAt: new Date().toISOString(),
      source: 'spam-signup',
      welcomeEmailSent: false
    };

    try {
      await SubscribersStore.add(newSubscriber);
    } catch (error) {
      console.error('Failed to store subscriber:', error);
      // Continue even if storage fails
    }

    // Send welcome email if Gmail is configured
    if (process.env.GMAIL_APP_PASSWORD) {
      try {
        const emailResult = await sendSpamEmail({
          to: email,
          subject: '🥫 Welcome to the SPAM Kitchen! Your First Serving is Here',
          html: getWelcomeEmailHtml(email)
        });
        
        if (emailResult.success) {
          console.log(`✅ Welcome email sent to ${email}`);
          newSubscriber.welcomeEmailSent = true;
          await SubscribersStore.add(newSubscriber); // Update with email sent status
        } else {
          console.error(`❌ Failed to send welcome email to ${email}`);
        }
      } catch (emailError) {
        console.error('Email send error:', emailError);
        // Don't fail the subscription if email fails
      }
    } else {
      console.log(`⚠️ Gmail not configured. Would send welcome email to: ${email}`);
    }

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
    // Get subscriber stats from file storage
    const stats = await SubscribersStore.getStats();
    
    return NextResponse.json({
      count: stats.total,
      recentSubscribers: stats.recentSubscribers,
      stats: {
        today: stats.today,
        thisWeek: stats.thisWeek,
        thisMonth: stats.thisMonth
      }
    });

  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to get subscribers' },
      { status: 500 }
    );
  }
}