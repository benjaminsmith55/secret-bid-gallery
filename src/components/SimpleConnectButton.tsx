import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

interface SimpleConnectButtonProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const SimpleConnectButton = ({ onConnect, onDisconnect }: SimpleConnectButtonProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
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
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask or another Web3 wallet');
        setIsConnecting(false);
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      if (accounts && accounts.length > 0) {
        const userAddress = accounts[0];
        setAddress(userAddress);
        localStorage.setItem('walletAddress', userAddress);
        onConnect?.(userAddress);
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      if (error.code === 4001) {
        alert('Connection rejected by user');
      } else {
        alert('Failed to connect wallet');
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

export default SimpleConnectButton;
