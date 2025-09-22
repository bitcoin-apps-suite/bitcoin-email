# 🚀 SPAM Campaign Setup Guide

## Quick Start (Get Running in 30 Minutes)

### Step 1: Create Google Sheet (5 min)

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create new spreadsheet: "SPAM Campaign Database"
3. Create these 4 sheets:

#### Sheet 1: "Subscribers"
```
| Email | Subscribe Date | Source | Tags | Status |
|-------|---------------|---------|------|---------|
```

#### Sheet 2: "Content Calendar"
```
| Date | Day | Subject | Template | Status | Sent |
|------|-----|---------|----------|--------|------|
```

#### Sheet 3: "Metrics"
```
| Date | Subject | Recipients | Opens | Clicks | Unsubs |
|------|---------|------------|-------|--------|--------|
```

#### Sheet 4: "Contributors"
```
| GitHub Handle | Email | Contributions | Tokens Allocated | Status |
|---------------|-------|---------------|------------------|--------|
```

4. Copy the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit`

### Step 2: Set Up Google Apps Script (10 min)

1. Go to [script.google.com](https://script.google.com)
2. Create new project: "SPAM Campaign Automation"
3. Copy entire contents of `scripts/google-apps-script.js`
4. Replace these values:
   - `YOUR_SPREADSHEET_ID`: Your sheet ID from Step 1
   - `YOUR_GITHUB_TOKEN`: Create at github.com/settings/tokens
   - `YOUR_GEMINI_API_KEY`: Get from makersuite.google.com/app/apikey

5. Save the project

### Step 3: Set Up Email Templates (5 min)

Create a Google Doc for each template:

#### "Mempool Monday Template"
```
Subject: 🚨 Mempool Monday: [DISASTER_METRIC]

This weekend's disaster: [ROAST_CONTENT]

BTC Fees: [FEE_AMOUNT]
BSV Fees: $0.0001

[CONTRACTS_SECTION]
[TOKEN_UPDATE]
[ECOSYSTEM_NEWS]
```

#### "Why Wednesday Template"
```
Subject: 🤔 Why [FAILURE_TOPIC]

Today's technical breakdown: [ROAST_CONTENT]

Meanwhile on BSV: [SUCCESS_METRIC]

[BUILDING_SECTION]
[CONTRIBUTOR_SPOTLIGHT]
```

#### "Fee Friday Template"
```
Subject: 💸 Fee Friday: [HORROR_STORY]

This week's fee champion: [VICTIM_STORY]

Total wasted on fees: [WEEKLY_TOTAL]

[OPPORTUNITIES]
[INVESTOR_UPDATE]
```

### Step 4: Configure Automation (5 min)

In Google Apps Script:

1. Run → `setupTriggers()`
2. Review permissions → Allow
3. Verify trigger created: Edit → Current project's triggers

The script will now run automatically at 10 AM daily and send on Mon/Wed/Fri.

### Step 5: Import Existing Subscribers (5 min)

1. Export subscribers from Vercel logs or current storage
2. Paste into "Subscribers" sheet
3. Set all Status to "active"

## 📊 Daily Operations Playbook

### Monday Morning Routine (15 min)
1. Check weekend BTC metrics
2. Find best disaster story
3. Review GitHub issues
4. Approve/edit generated content
5. Send

### Wednesday Tasks (20 min)
1. Write technical roast
2. Update contributor stats
3. Add project updates
4. Feature a developer
5. Send

### Friday Wrap-up (20 min)
1. Calculate week's fee totals
2. Find worst fee story
3. Update token allocation
4. Add investor update if needed
5. Send

## 🎯 Content Creation Tips

### Subject Line Formula
```
[Emoji] [Day Theme]: [Specific Disaster/Number]
```

Examples:
- ✅ "🚨 Mempool Monday: 890 sat/vB Breaks Records"
- ✅ "💸 Fee Friday: Someone Paid $2,400 for One Transaction"
- ❌ "Newsletter Update" (boring)
- ❌ "Hi There!" (spam filter bait)

### Roast Structure
1. **Hook**: Shocking stat or event
2. **Context**: Why it's ridiculous
3. **Comparison**: BSV doing it right
4. **Punchline**: Witty observation

Example:
```
"Lightning Network lost 73 channels this weekend due to high 
on-chain fees. The 'scaling solution' can't afford to scale. 
Meanwhile, BSV processed 50 million transactions for less 
than the cost of opening one Lightning channel. But sure, 
keep calling it 'spam'."
```

## 🔧 Advanced Features

### A. Add Gemini AI Content Generation

```javascript
// Add to Google Apps Script
function generateAIContent(topic) {
  const prompt = `
    Write a satirical paragraph about ${topic} in the style of The Onion.
    Focus on Bitcoin/BTC failures and BSV successes.
    Be funny but factual. Maximum 100 words.
  `;
  
  // Call Gemini API
  const response = callGeminiAPI(prompt);
  return response;
}
```

### B. Automated Metrics Dashboard

Create a Google Data Studio dashboard:
1. Connect to your Sheets
2. Track:
   - Subscriber growth
   - Open rates by day
   - Click rates by section
   - Unsubscribe patterns

### C. A/B Testing

Test different:
- Subject lines (record winner)
- Send times (10 AM vs 2 PM)
- Content length (short vs detailed)
- CTA buttons (color/text)

## 📈 Growth Hacking Tactics

### Week 1-2: Foundation
- Manual outreach to 100 BSV developers
- Post best roasts on Twitter
- Share in Bitcoin forums
- GitHub README badges

### Week 3-4: Acceleration
- Referral rewards (50 $BMAIL per referral)
- Twitter spaces about BTC fees
- Meme contests with prizes
- Developer bounties for sharing

### Month 2: Scale
- Partner with BSV projects
- Guest roasts from known figures
- Sponsored slots ($100/email)
- Premium tier ($5/month, no ads)

## 🚨 Common Issues & Fixes

### "Emails going to spam"
- Warm up sending (start with 50/day)
- SPF/DKIM records configured
- Avoid spam trigger words
- Maintain <2% complaint rate

### "Script timing out"
- Reduce batch size to 25
- Add more sleep() calls
- Use time-based triggers
- Split into multiple functions

### "Rate limit exceeded"
- Gmail: Max 500/day
- Use multiple accounts
- Implement queuing system
- Consider email service

## 💰 Monetization Timeline

### Month 1: Build audience (0 revenue)
- Focus on quality content
- Build to 1,000 subscribers
- Establish voice/brand

### Month 2: Test monetization ($500)
- First sponsored slot
- Job board listings
- Affiliate links

### Month 3: Scale revenue ($2,000)
- 3 sponsors/week @ $200
- Premium tier launch
- Token sale announcement

### Month 6: Sustainable ($10,000/month)
- 10,000 subscribers
- Multiple revenue streams
- Full automation
- Team of writers

## 📋 Weekly Checklist

### Monday
- [ ] Review weekend metrics
- [ ] Write Mempool Monday
- [ ] Update contributor stats
- [ ] Send by 10 AM

### Wednesday  
- [ ] Technical analysis topic
- [ ] Update project news
- [ ] Feature developer
- [ ] Send by 10 AM

### Friday
- [ ] Calculate weekly fees
- [ ] Find horror stories
- [ ] Investor update?
- [ ] Send by 10 AM
- [ ] Plan next week

### Sunday
- [ ] Review week's metrics
- [ ] Plan next week's content
- [ ] Update templates
- [ ] Engage with community

## 🎯 Success Metrics

### Must Hit:
- Week 1: 100 subscribers
- Week 2: 250 subscribers
- Week 4: 500 subscribers
- Month 2: 2,000 subscribers
- Month 3: 5,000 subscribers

### Quality Metrics:
- Open rate: >40%
- Click rate: >15%
- Unsubscribe: <2%
- Forward rate: >5%

Remember: **Every email should make someone laugh AND take action!**