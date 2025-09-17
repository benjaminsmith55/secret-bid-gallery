import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';
import { http } from 'viem';

// Ensure we have valid environment variables
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const rpcUrl = import.meta.env.VITE_RPC_URL;

if (!projectId || projectId === 'YOUR_WALLET_CONNECT_PROJECT_ID') {
  console.warn('WalletConnect Project ID not configured. Please set VITE_WALLET_CONNECT_PROJECT_ID');
}

export const config = getDefaultConfig({
  appName: 'Secret Bid Gallery',
  projectId: projectId || 'demo-project-id',
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(rpcUrl || 'https://sepolia.infura.io/v3/demo'),
    [mainnet.id]: http('https://eth.llamarpc.com'),
  },
  ssr: false,
});

export const chainId = parseInt(import.meta.env.VITE_CHAIN_ID || '11155111');
export const rpcUrlConfig = rpcUrl || 'https://sepolia.infura.io/v3/demo';
