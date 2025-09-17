# HandCash Integration Setup Guide

## Getting Started with HandCash Connect

### 1. Create a HandCash Developer Account
1. Go to [HandCash Developer Portal](https://dashboard.handcash.io/)
2. Sign up or log in with your HandCash account
3. Create a new application

### 2. Configure Your App
- **App Name**: Bitcoin Email
- **App Description**: Blockchain-powered email with BSV payments
- **Redirect URL**: `http://localhost:3004/auth/callback` (for development)
- **Permissions**: 
  - User Profile (Read)
  - Payments (Write)
  - Data Encryption (Read/Write)

### 3. Get Your Credentials
After creating the app, you'll receive:
- **App ID**: Your application identifier
- **App Secret**: Your application secret (keep this secure!)

### 4. Update .env.local
```env
NEXT_PUBLIC_HANDCASH_APP_ID=your_actual_app_id_here
NEXT_PUBLIC_HANDCASH_APP_SECRET=your_actual_app_secret_here
NEXT_PUBLIC_HANDCASH_REDIRECT_URL=http://localhost:3004/auth/callback
```

### 5. Test the Integration
1. Start the dev server: `npm run dev`
2. Click "Connect HandCash" button
3. Authorize the app in HandCash
4. You should be redirected back and logged in

## Demo Mode (Without Real Credentials)

The app includes a demo mode that simulates HandCash functionality:
- Uses mock authentication
- Simulates BSV transactions
- Perfect for UI/UX testing

To enable demo mode, use the default .env.local values or set:
```env
NEXT_PUBLIC_HANDCASH_APP_ID=demo_mode
```

## Troubleshooting

### Common Issues:

1. **"HandCash App ID is not configured"**
   - Make sure your .env.local file has the correct App ID
   - Restart the dev server after changing .env.local

2. **"No authToken received from HandCash"**
   - Check that your redirect URL matches exactly in HandCash dashboard
   - Ensure you're using the correct callback URL format

3. **Payment failures**
   - Verify your app has payment permissions
   - Check that the recipient has a valid paymail address
   - Ensure you have sufficient balance

## Production Setup

For production deployment:
1. Update redirect URL to your production domain
2. Use environment variables in your hosting platform
3. Never commit real credentials to git
4. Consider implementing token refresh logic