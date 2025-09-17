import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
  subject: string;
  content: string;
  recipientName?: string;
  senderName?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  subject,
  content,
  recipientName = 'there',
  senderName = 'Bitcoin Email',
  buttonText,
  buttonUrl,
}) => {
  return (
    <Html>
      <Head>
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
        <style>{`
          :root {
            color-scheme: light dark;
          }
          
          @media (prefers-color-scheme: dark) {
            .bg-white { background-color: #1a1a1a !important; }
            .bg-gray-50 { background-color: #2d2d2d !important; }
            .text-black { color: #ffffff !important; }
            .text-gray-600 { color: #a0a0a0 !important; }
            .text-gray-800 { color: #e0e0e0 !important; }
            .border-gray-200 { border-color: #404040 !important; }
          }
        `}</style>
      </Head>
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>
              Hello {recipientName}! 👋
            </Text>
            <Text style={paragraph}>
              {content}
            </Text>
            {buttonText && buttonUrl && (
              <>
                <Section style={buttonContainer}>
                  <Button style={button} href={buttonUrl}>
                    {buttonText}
                  </Button>
                </Section>
                <Hr style={hr} />
              </>
            )}
            <Text style={footer}>
              Best regards,<br />
              {senderName}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  marginBottom: '24px',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
  marginBottom: '24px',
};

const buttonContainer = {
  padding: '27px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#f97316',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '11px 23px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

export default EmailTemplate;