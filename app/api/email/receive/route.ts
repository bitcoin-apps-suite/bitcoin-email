import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/services/email-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const folder = searchParams.get('folder') || 'INBOX';
    const limit = parseInt(searchParams.get('limit') || '50');

    // For demo purposes, we'll use environment variables
    const emailConfig = {
      smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      },
      imap: {
        user: process.env.IMAP_USER || '',
        password: process.env.IMAP_PASS || '',
        host: process.env.IMAP_HOST || 'imap.gmail.com',
        port: parseInt(process.env.IMAP_PORT || '993'),
        tls: true,
      },
    };

    if (!emailConfig.imap.user || !emailConfig.imap.password) {
      // Return mock data if no credentials are configured - Fun spam emails poking fun at BTC
      return NextResponse.json({
        emails: [
          {
            id: '1',
            from: 'prince.nigeria@scammail.org',
            to: ['user@example.com'],
            subject: 'URGENT: Inherit 10,000 BTC (Core Version) - Act Now!!!',
            text: 'Dear beloved, I am prince of Nigeria with 10,000 BTC stuck in SegWit wallet. Unfortunately it is BTC Core so transaction fees would be $3000 just to move it. Please send 1 BSV to help pay fees and I share fortune with you!',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-41.jpg" style="max-width: 300px; height: auto; margin: 10px 0;" alt="Have You Had Your SPAM Today?"><p>Dear beloved, I am prince of Nigeria with 10,000 BTC stuck in SegWit wallet. Unfortunately it is BTC Core so transaction fees would be $3000 just to move it. Please send 1 BSV to help pay fees and I share fortune with you!</p><img src="/$SPAM/download-62.jpg" style="max-width: 200px; height: auto; margin: 10px 0;" alt="BTC Fee Warning"></div>',
            date: new Date(Date.now() - 3600000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.0005,
            isStarred: true,
          },
          {
            id: '2',
            from: 'btc-maxi@hodlforever.com',
            to: ['user@example.com'],
            subject: 'Still waiting for Lightning to actually work...',
            text: 'Day 2,847: Lightning Network still requires $50 to open a channel. My coffee shop stopped accepting BTC because the fees cost more than the coffee. But hey, at least we have digital gold that nobody can actually use!',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-43.jpg" style="max-width: 250px; height: auto; margin: 10px 0;" alt="Lightning Network Loading"><p>Day 2,847: Lightning Network still requires $50 to open a channel. My coffee shop stopped accepting BTC because the fees cost more than the coffee. But hey, at least we have digital gold that nobody can actually use!</p><img src="/$SPAM/download-70.jpg" style="max-width: 200px; height: auto; margin: 10px 0;" alt="Still Waiting"></div>',
            date: new Date(Date.now() - 7200000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: false,
          },
          {
            id: '3',
            from: 'mempool@congestion.btc',
            to: ['user@example.com'],
            subject: 'Your BTC transaction update - Still pending after 3 days',
            text: 'Good news! Your transaction moved from position 287,543 to 287,542 in the mempool! At this rate, confirmation expected by 2027. Consider increasing fee to only $89 for faster processing.',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-45.jpg" style="max-width: 280px; height: auto; margin: 10px 0;" alt="Mempool Congestion"><p>Good news! Your transaction moved from position 287,543 to 287,542 in the mempool! At this rate, confirmation expected by 2027. Consider increasing fee to only $89 for faster processing.</p><img src="/$SPAM/download-73.jpg" style="max-width: 220px; height: auto; margin: 10px 0;" alt="Fee Warning"></div>',
            date: new Date(Date.now() - 14400000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.0005,
            isStarred: false,
          },
          {
            id: '4',
            from: 'definitely-not-spam@trustme.xyz',
            to: ['user@example.com'],
            subject: 'Congratulations! You won 1MB block space!',
            text: 'You are our lucky winner! You have won 1 whole MB of block space on BTC! That is enough for almost 7 transactions! Click here to claim (Warning: claiming fee is $200)',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-47.jpg" style="max-width: 300px; height: auto; margin: 10px 0;" alt="Block Space Winner"><p>You are our lucky winner! You have won 1 whole MB of block space on BTC! That is enough for almost 7 transactions! Click here to claim (Warning: claiming fee is $200)</p><img src="/$SPAM/download-66.jpg" style="max-width: 180px; height: auto; margin: 10px 0;" alt="Congratulations"></div>',
            date: new Date(Date.now() - 28800000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: true,
          },
          {
            id: '5',
            from: 'ordinals@jpegsonchain.lol',
            to: ['user@example.com'],
            subject: 'Hot Singles JPEGs in Your Blockchain!',
            text: 'Lonely JPEGs looking for blocks to fill! Our exclusive monkey pictures are clogging BTC blocks near you. Each image only costs $500 in fees to inscribe! True utility at last!',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-49.jpg" style="max-width: 260px; height: auto; margin: 10px 0;" alt="Hot Singles JPEGs"><p>Lonely JPEGs looking for blocks to fill! Our exclusive monkey pictures are clogging BTC blocks near you. Each image only costs $500 in fees to inscribe! True utility at last!</p><img src="/$SPAM/download-74.jpg" style="max-width: 200px; height: auto; margin: 10px 0;" alt="Ordinals Spam"></div>',
            date: new Date(Date.now() - 86400000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: true,
          },
          {
            id: '6',
            from: 'rbf@doublespend.io',
            to: ['user@example.com'],
            subject: 'Oops! Someone outbid your transaction... again',
            text: 'Your payment got RBF replaced for the 5th time today! The fee war continues. Current winning bid: $127. Your grandmother is still waiting for her birthday money. Maybe try Western Union?',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-51.jpg" style="max-width: 240px; height: auto; margin: 10px 0;" alt="RBF Fee War"><p>Your payment got RBF replaced for the 5th time today! The fee war continues. Current winning bid: $127. Your grandmother is still waiting for her birthday money. Maybe try Western Union?</p><img src="/$SPAM/download-63.jpg" style="max-width: 190px; height: auto; margin: 10px 0;" alt="Outbid Again"></div>',
            date: new Date(Date.now() - 172800000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: false,
          },
          {
            id: '7',
            from: 'pills@btc-enhancement.biz',
            to: ['user@example.com'],
            subject: 'Enlarge your block size with this one weird trick!',
            text: 'Doctors HATE him! Local man discovers how to fit more than 7 transactions per second. Warning: May cause fork anxiety and maximalist rage. BSV users report 50,000x improvement!',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-53.jpg" style="max-width: 280px; height: auto; margin: 10px 0;" alt="Enlarge Your Block Size"><p>Doctors HATE him! Local man discovers how to fit more than 7 transactions per second. Warning: May cause fork anxiety and maximalist rage. BSV users report 50,000x improvement!</p><img src="/$SPAM/download-71.jpg" style="max-width: 210px; height: auto; margin: 10px 0;" alt="Block Size Pills"></div>',
            date: new Date(Date.now() - 259200000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.001,
            isStarred: false,
          },
          {
            id: '8',
            from: 'taproot@complexity.wtf',
            to: ['user@example.com'],
            subject: 'Congrats on soft fork #47! Features coming Soon™',
            text: 'After 5 years of development, Taproot is here! New features include: more complex addresses nobody understands, and... that is it. Next soft fork planning begins tomorrow for 2030 release!',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-55.jpg" style="max-width: 270px; height: auto; margin: 10px 0;" alt="Taproot Complexity"><p>After 5 years of development, Taproot is here! New features include: more complex addresses nobody understands, and... that is it. Next soft fork planning begins tomorrow for 2030 release!</p><img src="/$SPAM/download-64.jpg" style="max-width: 180px; height: auto; margin: 10px 0;" alt="Soft Fork Soon"></div>',
            date: new Date(Date.now() - 345600000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.01,
            isStarred: false,
          },
          {
            id: '9',
            from: 'custodian@not-your-keys.com',
            to: ['user@example.com'],
            subject: 'Your BTC is safe with us! (Trust us bro)',
            text: 'Since on-chain BTC costs $75 to move, why not leave it with us? We promise we are not like FTX, Mt. Gox, QuadrigaCX, or the other 47 exchanges that exit scammed. Pinky promise!',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-57.jpg" style="max-width: 250px; height: auto; margin: 10px 0;" alt="Trust Us Bro"><p>Since on-chain BTC costs $75 to move, why not leave it with us? We promise we are not like FTX, Mt. Gox, QuadrigaCX, or the other 47 exchanges that exit scammed. Pinky promise!</p><img src="/$SPAM/download-65.jpg" style="max-width: 200px; height: auto; margin: 10px 0;" alt="Custodial Services"></div>',
            date: new Date(Date.now() - 432000000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: false,
          },
          {
            id: '10',
            from: 'report@blockchain-facts.lol',
            to: ['user@example.com'],
            subject: 'Study: 99% of BTC is just sitting there doing nothing',
            text: 'New research confirms what we already knew: BTC has become digital furniture. Average time between moves: 4.7 years. Most cited reason: "Transaction fees cost more than my holdings." Revolutionary!',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-59.jpg" style="max-width: 290px; height: auto; margin: 10px 0;" alt="Digital Furniture Study"><p>New research confirms what we already knew: BTC has become digital furniture. Average time between moves: 4.7 years. Most cited reason: "Transaction fees cost more than my holdings." Revolutionary!</p><img src="/$SPAM/download-69.jpg" style="max-width: 190px; height: auto; margin: 10px 0;" alt="99% Sitting There"></div>',
            date: new Date(Date.now() - 518400000).toISOString(),
            attachments: ['Useless_Report.pdf'],
            hasPayment: false,
            isStarred: false,
          },
          {
            id: '11',
            from: 'conference@btc-echo-chamber.com',
            to: ['user@example.com'],
            subject: 'BTC Conference 2025: Same speakers, same topics, higher fees!',
            text: 'Join us to hear why 1MB blocks are actually good! Listen to the same 5 guys explain why high fees mean security! Ticket price: 0.001 BTC (plus $300 network fee). Sponsored by BlockStream.',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-61.jpg" style="max-width: 300px; height: auto; margin: 10px 0;" alt="BTC Conference Echo Chamber"><p>Join us to hear why 1MB blocks are actually good! Listen to the same 5 guys explain why high fees mean security! Ticket price: 0.001 BTC (plus $300 network fee). Sponsored by BlockStream.</p><img src="/$SPAM/download-75.jpg" style="max-width: 220px; height: auto; margin: 10px 0;" alt="Same Speakers Same Topics"></div>',
            date: new Date(Date.now() - 604800000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.002,
            isStarred: false,
          },
          {
            id: '12',
            from: 'mining@asic-heater.cn',
            to: ['user@example.com'],
            subject: 'Your mining reward: 0.00001 BTC (Fee to claim: 0.001 BTC)',
            text: 'Congratulations! After mining for 6 months with your gaming PC, you earned 0.00001 BTC! Unfortunately, moving it costs 100x more than it is worth. Maybe use it as a conversation starter?',
            html: '<div style="font-family: Arial, sans-serif;"><img src="/$SPAM/download-42.jpg" style="max-width: 260px; height: auto; margin: 10px 0;" alt="Mining Reward Dust"><p>Congratulations! After mining for 6 months with your gaming PC, you earned 0.00001 BTC! Unfortunately, moving it costs 100x more than it is worth. Maybe use it as a conversation starter?</p><img src="/$SPAM/download-72.jpg" style="max-width: 200px; height: auto; margin: 10px 0;" alt="Fee More Than Reward"></div>',
            date: new Date(Date.now() - 691200000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.00001,
            isStarred: true,
          },
        ],
        mock: true,
      });
    }

    const emailService = new EmailService(emailConfig);
    await emailService.connectIMAP();
    const emails = await emailService.getEmails(folder, limit);
    emailService.disconnect();

    return NextResponse.json({
      emails,
      mock: false,
    });
  } catch (error) {
    console.error('Email fetch error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}