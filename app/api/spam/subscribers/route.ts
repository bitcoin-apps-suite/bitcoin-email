import { NextRequest, NextResponse } from 'next/server';
import { SubscribersStore } from '@/lib/subscribers-store';

export async function GET(request: NextRequest) {
  try {
    const subscribers = await SubscribersStore.getAll();
    const stats = await SubscribersStore.getStats();
    
    return NextResponse.json({
      subscribers,
      count: subscribers.length,
      stats: {
        total: stats.total,
        today: stats.today,
        thisWeek: stats.thisWeek,
        thisMonth: stats.thisMonth
      },
      recentSubscribers: stats.recentSubscribers
    });

  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}