import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    const subscribersPath = path.join(process.cwd(), 'data', 'spam-subscribers.json');
    
    // Load existing subscribers
    let subscribers = [];
    try {
      const data = await fs.readFile(subscribersPath, 'utf8');
      subscribers = JSON.parse(data);
    } catch (error) {
      return NextResponse.json({
        message: 'Not subscribed',
        success: false
      });
    }

    // Find and remove subscriber
    const initialLength = subscribers.length;
    subscribers = subscribers.filter((s: any) => s.email !== email);
    
    if (subscribers.length === initialLength) {
      return NextResponse.json({
        message: 'Email not found in subscription list',
        success: false
      });
    }

    // Save updated list
    await fs.writeFile(
      subscribersPath,
      JSON.stringify(subscribers, null, 2)
    );

    console.log(`👋 Unsubscribed: ${email}`);

    return NextResponse.json({
      message: 'Successfully unsubscribed',
      success: true
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}