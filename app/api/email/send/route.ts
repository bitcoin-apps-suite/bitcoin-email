import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/services/email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, text, config } = body;

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, and either html or text' },
        { status: 400 }
      );
    }

    // For demo purposes, we'll use environment variables or passed config
    const emailConfig = config || {
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

    if (!emailConfig.smtp.auth.user || !emailConfig.smtp.auth.pass) {
      return NextResponse.json(
        { error: 'Email credentials not configured. Please set up SMTP credentials.' },
        { status: 500 }
      );
    }

    const emailService = new EmailService(emailConfig);
    const result = await emailService.sendEmail(to, subject, html, text);

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      accepted: result.accepted,
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}