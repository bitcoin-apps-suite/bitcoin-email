import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getTemplate } from '@/lib/newsletterTemplates';

export async function POST(request: NextRequest) {
  try {
    const { templateId, testEmail } = await request.json();
    
    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID required' },
        { status: 400 }
      );
    }

    const template = getTemplate(templateId);
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Load subscribers
    const subscribersPath = path.join(process.cwd(), 'data', 'spam-subscribers.json');
    let subscribers = [];
    try {
      const data = await fs.readFile(subscribersPath, 'utf8');
      subscribers = JSON.parse(data);
    } catch (error) {
      // No subscribers yet
      return NextResponse.json({
        message: 'No subscribers found',
        sent: 0
      });
    }

    // If test email provided, only send to that address
    if (testEmail) {
      console.log(`📧 Test email would be sent to: ${testEmail}`);
      console.log(`Subject: ${template.subject}`);
      
      // In production, you would send actual email here
      // await sendEmail({
      //   to: testEmail,
      //   subject: template.subject,
      //   html: template.generateHtml({ email: testEmail })
      // });

      return NextResponse.json({
        message: 'Test email sent',
        recipient: testEmail,
        template: templateId
      });
    }

    // Send to all subscribers
    let sentCount = 0;
    const failedEmails = [];

    for (const subscriber of subscribers) {
      try {
        // Check subscriber preferences
        if (!subscriber.preferences?.dailySpam) {
          continue;
        }

        console.log(`📧 Newsletter would be sent to: ${subscriber.email}`);
        
        // In production, you would send actual emails here
        // await sendEmail({
        //   to: subscriber.email,
        //   subject: template.subject,
        //   html: template.generateHtml({ 
        //     email: subscriber.email,
        //     subscribedAt: subscriber.subscribedAt
        //   })
        // });

        sentCount++;
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error);
        failedEmails.push(subscriber.email);
      }
    }

    // Log campaign
    const campaignLog = {
      templateId,
      sentAt: new Date().toISOString(),
      totalSubscribers: subscribers.length,
      sentCount,
      failedEmails,
      subject: template.subject
    };

    // Save campaign log
    const logsPath = path.join(process.cwd(), 'data', 'spam-campaigns.json');
    let campaigns = [];
    try {
      const data = await fs.readFile(logsPath, 'utf8');
      campaigns = JSON.parse(data);
    } catch (error) {
      // First campaign
    }
    campaigns.push(campaignLog);
    await fs.writeFile(logsPath, JSON.stringify(campaigns, null, 2));

    return NextResponse.json({
      message: 'Newsletter sent successfully',
      sent: sentCount,
      failed: failedEmails.length,
      template: templateId
    });

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get available templates
    const templates = ['welcome-spam', 'weekly-roast', 'btc-obituary', 'spam-special'];
    
    // Get campaign history
    const logsPath = path.join(process.cwd(), 'data', 'spam-campaigns.json');
    let campaigns = [];
    try {
      const data = await fs.readFile(logsPath, 'utf8');
      campaigns = JSON.parse(data);
    } catch (error) {
      // No campaigns yet
    }

    return NextResponse.json({
      availableTemplates: templates,
      recentCampaigns: campaigns.slice(-10).reverse()
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get newsletter info' },
      { status: 500 }
    );
  }
}