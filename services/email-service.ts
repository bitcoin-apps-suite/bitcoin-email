import nodemailer from 'nodemailer';
import Imap from 'node-imap';
import { simpleParser } from 'mailparser';

export interface EmailConfig {
  imap: {
    user: string;
    password: string;
    host: string;
    port: number;
    tls: boolean;
  };
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

export interface EmailMessage {
  id: string;
  from: string;
  to: string[];
  subject: string;
  text?: string;
  html?: string;
  date: Date;
  attachments?: any[];
}

export class EmailService {
  private config: EmailConfig;
  private imap: Imap | null = null;
  private transporter: nodemailer.Transporter | null = null;

  constructor(config: EmailConfig) {
    this.config = config;
    this.setupSMTP();
  }

  private setupSMTP() {
    this.transporter = nodemailer.createTransport({
      host: this.config.smtp.host,
      port: this.config.smtp.port,
      secure: this.config.smtp.secure,
      auth: this.config.smtp.auth,
    });
  }

  async sendEmail(to: string[], subject: string, html: string, text?: string) {
    if (!this.transporter) {
      throw new Error('SMTP transporter not initialized');
    }

    const mailOptions = {
      from: this.config.smtp.auth.user,
      to: to.join(', '),
      subject,
      html,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  connectIMAP(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap = new Imap(this.config.imap);

      this.imap.once('ready', () => {
        resolve();
      });

      this.imap.once('error', (err: Error) => {
        reject(err);
      });

      this.imap.connect();
    });
  }

  async getEmails(folder = 'INBOX', limit = 50): Promise<EmailMessage[]> {
    if (!this.imap) {
      await this.connectIMAP();
    }

    return new Promise((resolve, reject) => {
      this.imap!.openBox(folder, true, (err, box) => {
        if (err) {
          reject(err);
          return;
        }

        const fetch = this.imap!.seq.fetch(`${Math.max(1, box.messages.total - limit + 1)}:*`, {
          bodies: '',
          struct: true,
        });

        const messages: EmailMessage[] = [];

        fetch.on('message', (msg, seqno) => {
          let buffer = '';

          msg.on('body', (stream) => {
            stream.on('data', (chunk) => {
              buffer += chunk.toString('utf8');
            });

            stream.once('end', async () => {
              try {
                const parsed = await simpleParser(buffer);
                const toAddress = parsed.to
                  ? Array.isArray(parsed.to)
                    ? parsed.to.map((addr) => addr.text || '').filter(Boolean)
                    : [parsed.to.text || ''].filter(Boolean)
                  : [];

                messages.push({
                  id: seqno.toString(),
                  from: parsed.from?.text || '',
                  to: toAddress,
                  subject: parsed.subject || '',
                  text: parsed.text,
                  html: parsed.html || undefined,
                  date: parsed.date || new Date(),
                  attachments: parsed.attachments,
                });
              } catch (error) {
                console.error('Error parsing email:', error);
              }
            });
          });
        });

        fetch.once('error', (err) => {
          reject(err);
        });

        fetch.once('end', () => {
          resolve(messages.reverse());
        });
      });
    });
  }

  disconnect() {
    if (this.imap) {
      this.imap.end();
    }
  }
}