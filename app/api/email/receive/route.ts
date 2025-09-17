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
            from: 'satoshi@bitcoin.org',
            to: ['user@example.com'],
            subject: 'Welcome to Bitcoin Email',
            text: 'Experience the future of decentralized email with Bitcoin integration.',
            html: '<p>Experience the future of decentralized email with Bitcoin integration.</p>',
            date: new Date().toISOString(),
            attachments: [],
          },
          {
            id: '2',
            from: 'support@handcash.io',
            to: ['user@example.com'],
            subject: 'Your wallet is ready',
            text: 'Your HandCash wallet has been successfully connected.',
            html: '<p>Your HandCash wallet has been successfully connected.</p>',
            date: new Date(Date.now() - 86400000).toISOString(),
            attachments: [],
          },
          {
            id: '3',
            from: 'noreply@bsvblockchain.org',
            to: ['user@example.com'],
            subject: 'Transaction confirmed on-chain',
            text: 'Your email has been permanently stored on the BSV blockchain.',
            html: '<p>Your email has been permanently stored on the BSV blockchain.</p>',
            date: new Date(Date.now() - 172800000).toISOString(),
            attachments: [],
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