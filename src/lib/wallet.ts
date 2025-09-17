import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'viem';

// Create a minimal configuration to avoid toUpperCase errors
export const config = getDefaultConfig({
  appName: 'Secret Bid Gallery',
  projectId: '2ec9743d0d0cd7fb94dee1a7e6d33475',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: false,
});

export const chains = [sepolia];
