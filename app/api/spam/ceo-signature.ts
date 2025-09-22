/**
 * CEO of Bitcoin™ Email Signatures
 * The Bitcoin Corporation LTD.
 */

export function getCEOSignature(style: 'formal' | 'savage' | 'corporate' = 'formal'): string {
  const signatures = {
    formal: `
<div style="margin-top: 40px; border-top: 2px solid #ef4444; padding-top: 20px;">
  <div style="font-family: Georgia, serif;">
    <div style="font-size: 16px; font-weight: bold; color: #1a1a1a;">
      [Your Name]
    </div>
    <div style="font-size: 14px; color: #666; margin-top: 5px;">
      Chief Executive Officer
    </div>
    <div style="font-size: 14px; color: #666;">
      The Bitcoin Corporation LTD.
    </div>
    <div style="font-size: 12px; color: #999; margin-top: 10px; font-style: italic;">
      "Making Bitcoin Work Again"
    </div>
    <div style="font-size: 11px; color: #aaa; margin-top: 5px;">
      Companies House Registration: [NUMBER] | The only legitimate Bitcoin CEO
    </div>
  </div>
</div>`,

    savage: `
<div style="margin-top: 40px; padding: 20px; background: linear-gradient(135deg, #ff6b6b, #ff4444); color: white; border-radius: 10px;">
  <div style="font-family: 'Bebas Neue', Impact, sans-serif;">
    <div style="font-size: 20px; text-transform: uppercase;">
      [Your Name]
    </div>
    <div style="font-size: 24px; font-weight: bold; margin: 10px 0;">
      🎩 CEO OF BITCOIN 🎩
    </div>
    <div style="font-size: 14px;">
      Yes, really. Check Companies House.
    </div>
    <div style="font-size: 16px; margin-top: 10px; border-top: 2px solid white; padding-top: 10px;">
      📜 The Bitcoin Corporation LTD.<br>
      ⚡ BTC Status: FIRED<br>
      ✅ BSV Status: APPROVED<br>
      💸 Fees Under My Watch: $0.0001
    </div>
    <div style="font-size: 12px; margin-top: 10px; opacity: 0.9;">
      "I'm literally the CEO of Bitcoin. Cope harder."
    </div>
  </div>
</div>`,

    corporate: `
<div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; background: #f9f9f9;">
  <table style="font-family: Arial, sans-serif; font-size: 12px; color: #333;">
    <tr>
      <td style="padding-right: 20px; border-right: 2px solid #ef4444;">
        <img src="/bitcoin-corp-logo.png" alt="The Bitcoin Corporation" style="width: 80px;">
      </td>
      <td style="padding-left: 20px;">
        <div style="font-size: 14px; font-weight: bold; color: #000;">
          [Your Name]
        </div>
        <div style="font-size: 12px; color: #666; margin: 5px 0;">
          Chief Executive Officer & Chairman
        </div>
        <div style="font-size: 11px; color: #666;">
          THE BITCOIN CORPORATION LTD.<br>
          Registration No: [NUMBER]<br>
          Email: ceo@bitcoincorp.com<br>
          Web: www.thebitcoincorporation.com
        </div>
        <div style="font-size: 10px; color: #999; margin-top: 10px; font-style: italic;">
          This email and any attachments are confidential. BTC has been terminated for cause.
        </div>
      </td>
    </tr>
  </table>
</div>`
  };

  return signatures[style];
}

export function generateCEOMemo(topic: 'fees' | 'scaling' | 'lightning' | 'general'): string {
  const memos = {
    fees: `
MEMORANDUM

TO: All Bitcoin Users
FROM: CEO of Bitcoin
DATE: ${new Date().toLocaleDateString()}
RE: Unacceptable Fee Situation

It has come to my attention that BTC is charging $${Math.floor(Math.random() * 200) + 50} 
for basic transactions. This is a violation of corporate policy.

Effective immediately, The Bitcoin Corporation mandates:
- All fees must be under $0.01
- Violations will result in termination
- BSV is the approved implementation

This is not a request.

[CEO Signature]
The Bitcoin Corporation LTD.`,

    scaling: `
EXECUTIVE ORDER #001

BY ORDER OF THE CEO OF BITCOIN:

Whereas BTC has failed to scale beyond 7 TPS for 15 years,
Whereas this is embarrassing to The Bitcoin Corporation,
Whereas BSV has already solved this,

IT IS HEREBY ORDERED:
1. Minimum TPS requirement: 50,000
2. Block size limit: REMOVED
3. Lightning Network: DISCONTINUED
4. Implementation: BSV

Non-compliance will result in cease and desist.

[Official Seal]
The Bitcoin Corporation LTD.`,

    lightning: `
TERMINATION NOTICE

TO: Lightning Network Development Team
FROM: CEO, The Bitcoin Corporation LTD.
DATE: ${new Date().toLocaleDateString()}

Your services are no longer required.

After 5 years of:
- Channels that don't work
- Routing that fails
- Adoption under 1%
- Being afraid of on-chain fees

The Board has voted to terminate Lightning Network.

Please remove your repositories by EOD Friday.

No severance will be provided.

[Your Name]
CEO of Bitcoin`,

    general: `
OFFICIAL STATEMENT
The Bitcoin Corporation LTD.

"After assuming the role of CEO of Bitcoin, I've conducted a thorough 
review of BTC's performance. It's worse than I thought.

The Corporation cannot in good conscience endorse a system that:
- Processes only 7 transactions per second
- Charges $300 for coffee purchases  
- Calls itself 'digital gold' to avoid working
- Needs a broken Lightning Network to pretend to scale

Effective immediately, The Bitcoin Corporation recognizes BSV as the 
official Bitcoin implementation.

This decision is final and legally binding."

[Your Name]
Chief Executive Officer
The Bitcoin Corporation LTD.
Registered in [Country]`
  };

  return memos[topic];
}

export function getCEOEmailTemplate(campaign: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    .ceo-header {
      background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
      color: white;
      padding: 30px;
      text-align: center;
      border-bottom: 5px solid #ef4444;
    }
    .ceo-title {
      font-size: 48px;
      font-family: 'Bebas Neue', Impact, sans-serif;
      margin: 0;
      text-transform: uppercase;
    }
    .corporation {
      font-size: 18px;
      color: #ef4444;
      margin-top: 10px;
    }
    .memo-box {
      background: #fff;
      border: 2px solid #000;
      margin: 20px;
      padding: 30px;
      font-family: 'Courier New', monospace;
    }
    .memo-header {
      border-bottom: 2px solid #000;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .executive-seal {
      width: 100px;
      margin: 20px auto;
      display: block;
    }
    .signature {
      margin-top: 40px;
      font-family: 'Dancing Script', cursive;
      font-size: 24px;
    }
    .corporate-footer {
      background: #f0f0f0;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .fired-stamp {
      color: red;
      font-size: 72px;
      font-weight: bold;
      transform: rotate(-15deg);
      opacity: 0.7;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-15deg);
    }
  </style>
</head>
<body>
  <div class="ceo-header">
    <h1 class="ceo-title">🎩 The CEO of Bitcoin 🎩</h1>
    <div class="corporation">The Bitcoin Corporation LTD.</div>
    <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">
      Yes, this is real. Check Companies House.
    </div>
  </div>
  
  <div class="memo-box">
    <div class="memo-header">
      <strong>OFFICIAL MEMORANDUM</strong><br>
      <strong>FROM:</strong> Office of the CEO<br>
      <strong>DATE:</strong> ${new Date().toLocaleDateString()}<br>
      <strong>RE:</strong> ${campaign}
    </div>
    
    <div class="memo-content">
      <!-- Campaign content here -->
    </div>
    
    <div class="signature">
      [Your Name]
    </div>
    <div style="font-size: 12px; color: #666;">
      Chief Executive Officer<br>
      The Bitcoin Corporation LTD.<br>
      "The only legitimate Bitcoin CEO"
    </div>
  </div>
  
  <div class="corporate-footer">
    <p>
      The Bitcoin Corporation LTD. is a registered company.<br>
      BTC employment has been terminated. BSV is the approved implementation.<br>
      This message is legally binding (probably).
    </p>
  </div>
</body>
</html>`;
}