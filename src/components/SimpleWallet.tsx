import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

interface SimpleWalletProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const SimpleWallet = ({ onConnect, onDisconnect }: SimpleWalletProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    // Check if wallet is available
    setHasWallet(typeof window.ethereum !== 'undefined');
    
    // Check if wallet is already connected
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setAddress(savedAddress);
      onConnect?.(savedAddress);
    }
  }, [onConnect]);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Check if ethereum is available
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask or another Web3 wallet to continue');
        setIsConnecting(false);
        return;
      }

      console.log('Attempting to connect wallet...');
      
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      console.log('Accounts received:', accounts);
      
      if (accounts && accounts.length > 0) {
        const userAddress = accounts[0];
        console.log('Connected to address:', userAddress);
        setAddress(userAddress);
        localStorage.setItem('walletAddress', userAddress);
        onConnect?.(userAddress);
      } else {
        console.log('No accounts returned');
        alert('No accounts found. Please make sure your wallet is unlocked.');
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      
      // Handle specific error cases
      if (error.code === 4001) {
        alert('Connection rejected by user');
      } else if (error.code === -32002) {
        alert('Connection request already pending. Please check your wallet.');
      } else {
        alert(`Failed to connect wallet: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    localStorage.removeItem('walletAddress');
    onDisconnect?.();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (address) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 px-3 py-2 rounded-lg">
          <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            {formatAddress(address)}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnectWallet}
          className="flex items-center space-x-1"
        >
          <LogOut className="w-4 h-4" />
          <span>Disconnect</span>
        </Button>
      </div>
    );
  }

  if (!hasWallet) {
    return (
      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
          No Web3 wallet detected
        </p>
        <p className="text-xs text-yellow-600 dark:text-yellow-400">
          Please install MetaMask or another Web3 wallet to continue
        </p>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="flex items-center space-x-2"
    >
      <Wallet className="w-4 h-4" />
      <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
    </Button>
  );
};

export default SimpleWallet;
