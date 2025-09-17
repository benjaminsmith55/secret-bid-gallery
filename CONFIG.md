# Configuration Guide

## Environment Variables Setup

To run this application, you need to create a `.env.local` file in the root directory with the following variables:

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

## How to Get These Values

### 1. Infura API Key
1. Go to [infura.io](https://infura.io)
2. Create an account or sign in
3. Create a new project
4. Copy the project ID (this is your API key)

### 2. WalletConnect Project ID
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create an account or sign in
3. Create a new project
4. Copy the project ID

### 3. Alternative RPC URLs
If you don't want to use Infura, you can use these free alternatives:
- `https://1rpc.io/sepolia`
- `https://sepolia.gateway.tenderly.co`
- `https://rpc.sepolia.org`

## Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined (reading 'toUpperCase')"**
   - Make sure all environment variables are set correctly
   - Check that your WalletConnect Project ID is valid
   - Ensure your RPC URL is accessible

2. **Wallet Connection Issues**
   - Verify your WalletConnect Project ID
   - Check that you're on the correct network (Sepolia)
   - Make sure your wallet has some testnet ETH

3. **Contract Interaction Failures**
   - Ensure you have testnet ETH for gas fees
   - Check that the contract address is correct
   - Verify you're connected to the right network

### Development Mode

For development, you can use these demo values (not for production):

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/demo
VITE_WALLET_CONNECT_PROJECT_ID=demo-project-id
```

## Security Notes

- Never commit your `.env.local` file to version control
- Use different API keys for development and production
- Rotate your API keys regularly
- Keep your private keys secure
