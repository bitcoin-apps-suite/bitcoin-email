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
      // Return mock data if no credentials are configured
      return NextResponse.json({
        emails: [
          {
            id: '1',
            from: 'alice.nakamoto@bitcoin.org',
            to: ['user@example.com'],
            subject: 'Bitcoin Core v25.0 Release Notes',
            text: 'The latest Bitcoin Core release includes significant performance improvements and enhanced privacy features. This update represents months of development and testing by the community.',
            html: '<p>The latest Bitcoin Core release includes significant performance improvements and enhanced privacy features. This update represents months of development and testing by the community.</p>',
            date: new Date(Date.now() - 3600000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.0005,
            isStarred: true,
          },
          {
            id: '2',
            from: 'newsletter@coindesk.com',
            to: ['user@example.com'],
            subject: 'Weekly Crypto Market Analysis',
            text: 'Bitcoin maintains steady momentum above $45,000 as institutional adoption continues to grow. ETF approvals signal mainstream acceptance of digital assets.',
            html: '<p>Bitcoin maintains steady momentum above $45,000 as institutional adoption continues to grow. ETF approvals signal mainstream acceptance of digital assets.</p>',
            date: new Date(Date.now() - 7200000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: false,
          },
          {
            id: '3',
            from: 'team@lightning.network',
            to: ['user@example.com'],
            subject: 'Lightning Network Payment Received',
            text: 'You have received 50,000 satoshis via Lightning Network. Transaction confirmed instantly with minimal fees. Check your wallet for details.',
            html: '<p>You have received 50,000 satoshis via Lightning Network. Transaction confirmed instantly with minimal fees. Check your wallet for details.</p>',
            date: new Date(Date.now() - 14400000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.0005,
            isStarred: false,
          },
          {
            id: '4',
            from: 'security@exchange.com',
            to: ['user@example.com'],
            subject: 'Security Alert: New Device Login',
            text: 'A new device has logged into your account from San Francisco, CA. If this was not you, please secure your account immediately.',
            html: '<p>A new device has logged into your account from San Francisco, CA. If this was not you, please secure your account immediately.</p>',
            date: new Date(Date.now() - 28800000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: true,
          },
          {
            id: '5',
            from: 'michael@saylor.com',
            to: ['user@example.com'],
            subject: 'Re: Bitcoin Strategy Discussion',
            text: 'Thanks for your insights on corporate Bitcoin adoption. MicroStrategy continues to believe Bitcoin is the best treasury asset. Let us schedule a follow-up call next week.',
            html: '<p>Thanks for your insights on corporate Bitcoin adoption. MicroStrategy continues to believe Bitcoin is the best treasury asset. Let us schedule a follow-up call next week.</p>',
            date: new Date(Date.now() - 86400000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: true,
          },
          {
            id: '6',
            from: 'noreply@github.com',
            to: ['user@example.com'],
            subject: 'PR #1247: Add support for Taproot addresses',
            text: 'Your pull request has been merged into the main branch. Thanks for contributing to the Bitcoin ecosystem!',
            html: '<p>Your pull request has been merged into the main branch. Thanks for contributing to the Bitcoin ecosystem!</p>',
            date: new Date(Date.now() - 172800000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: false,
          },
          {
            id: '7',
            from: 'dao@defi.protocol',
            to: ['user@example.com'],
            subject: 'Governance Proposal: Increase Staking Rewards',
            text: 'Vote on the latest proposal to increase staking rewards from 5% to 7% APY. Voting ends in 48 hours. Your voting power: 1,500 tokens.',
            html: '<p>Vote on the latest proposal to increase staking rewards from 5% to 7% APY. Voting ends in 48 hours. Your voting power: 1,500 tokens.</p>',
            date: new Date(Date.now() - 259200000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.001,
            isStarred: false,
          },
          {
            id: '8',
            from: 'notifications@opensea.io',
            to: ['user@example.com'],
            subject: 'Your NFT sold for 0.5 ETH',
            text: 'Congratulations! Your NFT "Bitcoin Pizza Day #42" has been sold for 0.5 ETH. Funds have been transferred to your wallet.',
            html: '<p>Congratulations! Your NFT "Bitcoin Pizza Day #42" has been sold for 0.5 ETH. Funds have been transferred to your wallet.</p>',
            date: new Date(Date.now() - 345600000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.01,
            isStarred: false,
          },
          {
            id: '9',
            from: 'support@wallet.com',
            to: ['user@example.com'],
            subject: 'Backup Reminder: Secure Your Seed Phrase',
            text: 'Monthly reminder to ensure your seed phrase is backed up securely. Never share it online or store it digitally.',
            html: '<p>Monthly reminder to ensure your seed phrase is backed up securely. Never share it online or store it digitally.</p>',
            date: new Date(Date.now() - 432000000).toISOString(),
            attachments: [],
            hasPayment: false,
            isStarred: false,
          },
          {
            id: '10',
            from: 'research@chain.analysis',
            to: ['user@example.com'],
            subject: 'Q4 2024 Crypto Market Report',
            text: 'Our latest report shows institutional investment in Bitcoin reached all-time highs in Q4. Download the full 50-page analysis with detailed charts and predictions.',
            html: '<p>Our latest report shows institutional investment in Bitcoin reached all-time highs in Q4. Download the full 50-page analysis with detailed charts and predictions.</p>',
            date: new Date(Date.now() - 518400000).toISOString(),
            attachments: ['Q4_Report.pdf'],
            hasPayment: false,
            isStarred: false,
          },
          {
            id: '11',
            from: 'events@bitcoin.conf',
            to: ['user@example.com'],
            subject: 'Bitcoin 2025 Miami - Early Bird Tickets',
            text: 'Join us for the largest Bitcoin conference in the world! Early bird tickets now available with 30% discount. Speakers include top industry leaders.',
            html: '<p>Join us for the largest Bitcoin conference in the world! Early bird tickets now available with 30% discount. Speakers include top industry leaders.</p>',
            date: new Date(Date.now() - 604800000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.002,
            isStarred: false,
          },
          {
            id: '12',
            from: 'mining@pool.btc',
            to: ['user@example.com'],
            subject: 'Mining Pool Payout - 0.0125 BTC',
            text: 'Your weekly mining pool payout of 0.0125 BTC has been processed. Current hashrate: 145 TH/s. Pool luck this week: 102%.',
            html: '<p>Your weekly mining pool payout of 0.0125 BTC has been processed. Current hashrate: 145 TH/s. Pool luck this week: 102%.</p>',
            date: new Date(Date.now() - 691200000).toISOString(),
            attachments: [],
            hasPayment: true,
            paymentAmount: 0.0125,
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