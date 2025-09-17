# Vercel Deployment Guide for Secret Bid Gallery

This guide provides step-by-step instructions for deploying the Secret Bid Gallery to Vercel.

## Prerequisites

- GitHub account with the repository
- Vercel account (free tier available)
- Environment variables ready

## Step-by-Step Deployment

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

### Step 2: Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select your `secret-bid-gallery` repository
3. Click "Import"

### Step 3: Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration (Optional)
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
VITE_RPC_URL_ALT=https://1rpc.io/sepolia
```

**To add environment variables:**
1. In project settings, go to "Environment Variables"
2. Add each variable with its value
3. Make sure to select "Production", "Preview", and "Development" environments

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. In project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate to be issued

## Build Configuration

### vercel.json (Optional)
Create a `vercel.json` file in the root directory for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Environment-Specific Configurations

### Production Environment
- Use production RPC URLs
- Set up proper error tracking
- Configure analytics if needed

### Preview Environment
- Use testnet RPC URLs
- Enable debug logging
- Use test wallet configurations

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Check variable names match exactly
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID
   - Check RPC URL accessibility
   - Ensure correct chain ID

4. **Contract Interaction Fails**
   - Verify contract address
   - Check network configuration
   - Ensure user has testnet ETH

### Build Logs
- Check Vercel build logs for specific errors
- Use `vercel logs` command for detailed logs
- Monitor function execution logs

## Performance Optimization

### Recommended Settings
- Enable Vercel Analytics
- Configure Edge Functions if needed
- Set up proper caching headers
- Use Vercel's CDN for static assets

### Monitoring
- Set up Vercel Speed Insights
- Monitor Core Web Vitals
- Track user interactions
- Monitor error rates

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Vercel provides automatic HTTPS
   - Ensure all external API calls use HTTPS
   - Configure proper CORS settings

3. **Rate Limiting**
   - Implement rate limiting for API calls
   - Use Vercel's built-in protection
   - Monitor for abuse

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test wallet connection functionality
- [ ] Check contract interactions work
- [ ] Verify environment variables are loaded
- [ ] Test on different devices/browsers
- [ ] Set up monitoring and alerts
- [ ] Configure custom domain (if applicable)
- [ ] Set up analytics tracking

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Test locally first
4. Contact Vercel support if needed

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Best Practices](https://create-react-app.dev/docs/deployment/)

---

**Deployment URL**: Your app will be available at `https://your-project-name.vercel.app`
