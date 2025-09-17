# 🎨 Secret Bid Gallery

> **The Future of Private NFT Auctions is Here**

Experience the world's first **Fully Homomorphic Encrypted** NFT auction platform where your bids remain completely private until the auction closes. Built on cutting-edge cryptographic technology and deployed on Ethereum Sepolia testnet.

## ✨ What Makes Us Different

| Feature | Traditional Auctions | Secret Bid Gallery |
|---------|---------------------|-------------------|
| **Bid Privacy** | ❌ Public bids | ✅ Fully encrypted |
| **Fairness** | ❌ Bid sniping | ✅ True sealed bids |
| **Transparency** | ❌ Manipulation risk | ✅ Cryptographic proof |
| **User Experience** | ❌ Complex | ✅ One-click bidding |

### 🚀 Core Capabilities

- **🔐 Zero-Knowledge Bidding**: Your bid amount is never revealed until auction end
- **🎯 Smart Contract Integration**: Fully decentralized with no central authority
- **💎 Premium NFT Support**: High-value digital art and collectibles
- **⚡ Lightning Fast**: Sub-second bid processing with FHE
- **🛡️ Bulletproof Security**: Military-grade encryption for all transactions
- **📱 Mobile-First Design**: Optimized for all devices and screen sizes

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Blockchain**: Ethereum Sepolia Testnet
- **Wallet**: RainbowKit + Wagmi + Viem
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity ^0.8.24 with FHEVM

## 🏗️ Architecture

### Smart Contract
- **SecretBidGallery.sol**: Main contract handling NFT creation, encrypted bidding, and auction management
- **FHE Integration**: Uses Zama's FHEVM for encrypted bid processing
- **Reputation System**: Tracks user reputation for trust and security

### Frontend
- **Wallet Connection**: RainbowKit integration for seamless wallet connectivity
- **Contract Interaction**: Custom hooks for blockchain interactions
- **Real-time Data**: React Query for efficient data fetching and caching

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Environment Variables
Create a `.env.local` file in the root directory:

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

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/benjaminsmith55/secret-bid-gallery.git

# Navigate to project directory
cd secret-bid-gallery

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📖 Usage

### For Bidders
1. **Connect Wallet**: Click "Connect Wallet" in the header
2. **Browse Auctions**: View available NFT auctions
3. **Place Encrypted Bid**: Enter your bid amount (encrypted automatically)
4. **Reveal Bid**: Reveal your bid when auction ends
5. **Win & Claim**: Claim your NFT if you win

### For Sellers
1. **Create NFT**: Deploy your NFT to the platform
2. **Set Parameters**: Define reserve price and auction duration
3. **Monitor Bids**: Track encrypted bid count
4. **End Auction**: Close auction and reveal winning bid
5. **Transfer NFT**: Transfer to winning bidder

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── AuctionCard.tsx # Individual auction card
│   ├── AuctionGallery.tsx # Auction listing
│   └── Header.tsx      # Navigation header
├── hooks/              # Custom React hooks
│   └── useContract.ts  # Blockchain interaction hooks
├── lib/                # Utility functions
│   ├── utils.ts        # General utilities
│   └── wallet.ts       # Wallet configuration
└── pages/              # Page components
    ├── Index.tsx       # Home page
    └── NotFound.tsx    # 404 page

contracts/
└── SecretBidGallery.sol # Main smart contract
```

## 🔐 Security Features

- **FHE Encryption**: All bid amounts are encrypted using Fully Homomorphic Encryption
- **Zero-Knowledge Proofs**: Cryptographic proofs ensure bid validity
- **Reputation System**: Trust-based system for users
- **Access Control**: Role-based permissions for contract functions

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment**: Add environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on every push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
# (Netlify, Vercel, AWS S3, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Smart Contract**: [Etherscan Sepolia](https://sepolia.etherscan.io/)

## 🙏 Acknowledgments

- [Zama](https://zama.ai/) for FHEVM technology
- [RainbowKit](https://rainbowkit.com/) for wallet integration
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Vite](https://vitejs.dev/) for fast development experience

---

**Built with ❤️ for the decentralized future**
