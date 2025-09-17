import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'viem';

// Use a stable demo project ID to avoid undefined errors
const DEMO_PROJECT_ID = '2ec9743d0d0cd7fb94dee1a7e6d33475';

// Create a minimal configuration to avoid toUpperCase errors
export const config = getDefaultConfig({
  appName: 'Secret Bid Gallery',
  projectId: DEMO_PROJECT_ID,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: false,
});

export const chainId = 11155111; // Sepolia chain ID
export const rpcUrlConfig = 'https://sepolia.infura.io/v3/demo';

// Export a simple config for debugging
console.log('Wallet config initialized:', {
  appName: 'Secret Bid Gallery',
  projectId: DEMO_PROJECT_ID,
  chainId: sepolia.id,
  chainName: sepolia.name
});
