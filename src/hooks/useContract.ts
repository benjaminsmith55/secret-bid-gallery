import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string", "name": "_imageUri", "type": "string"},
      {"internalType": "uint256", "name": "_reservePrice", "type": "uint256"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"}
    ],
    "name": "createNFT",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"internalType": "bytes", "name": "bidAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "placeBid",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
    ],
    "name": "getNFTInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "imageUri", "type": "string"},
      {"internalType": "uint8", "name": "reservePrice", "type": "uint8"},
      {"internalType": "uint8", "name": "currentBid", "type": "uint8"},
      {"internalType": "uint8", "name": "bidCount", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isSold", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "currentBidder", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address - This would be the deployed contract address
// Use a demo contract address for development
const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890' as `0x${string}`;

export const useSecretBidGallery = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const createNFT = async (
    name: string,
    description: string,
    imageUri: string,
    reservePrice: number,
    duration: number
  ) => {
    try {
      if (!address) {
        toast.error('Please connect your wallet first');
        throw new Error('Wallet not connected');
      }

      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createNFT',
        args: [name, description, imageUri, BigInt(reservePrice), BigInt(duration)]
      });
      
      toast.success('NFT created successfully!');
      return hash;
    } catch (error: any) {
      console.error('Error creating NFT:', error);
      toast.error(error.message || 'Failed to create NFT');
      throw error;
    }
  };

  const placeBid = async (
    tokenId: number,
    bidAmount: string,
    inputProof: string
  ) => {
    try {
      if (!address) {
        toast.error('Please connect your wallet first');
        throw new Error('Wallet not connected');
      }

      if (!bidAmount || parseFloat(bidAmount) <= 0) {
        toast.error('Please enter a valid bid amount');
        throw new Error('Invalid bid amount');
      }

      // Simulate FHE encryption for demo purposes
      // In production, this would use actual FHE encryption
      const encryptedBid = `0x${Buffer.from(bidAmount).toString('hex')}`;
      const proof = `0x${Buffer.from(inputProof).toString('hex')}`;
      
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'placeBid',
        args: [BigInt(tokenId), encryptedBid, proof]
      });
      
      toast.success('Encrypted bid placed successfully!');
      return hash;
    } catch (error: any) {
      console.error('Error placing bid:', error);
      toast.error(error.message || 'Failed to place bid');
      throw error;
    }
  };

  return {
    createNFT,
    placeBid,
    address
  };
};

export const useNFTInfo = (tokenId: number) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getNFTInfo',
    args: [BigInt(tokenId)]
  });
};

export const useActiveNFTs = () => {
  return useQuery({
    queryKey: ['activeNFTs'],
    queryFn: async () => {
      // This would fetch all active NFTs from the contract
      // For now, return mock data
      return [
        {
          tokenId: 1,
          name: "Crypto Art #1",
          description: "A beautiful piece of digital art",
          imageUri: "/src/assets/nft-1.jpg",
          reservePrice: 1,
          currentBid: 0,
          bidCount: 0,
          isActive: true,
          isSold: false,
          owner: "0x0000000000000000000000000000000000000000",
          currentBidder: "0x0000000000000000000000000000000000000000",
          startTime: Date.now() - 86400000, // 1 day ago
          endTime: Date.now() + 86400000 // 1 day from now
        },
        {
          tokenId: 2,
          name: "Digital Collectible #2",
          description: "Rare digital collectible",
          imageUri: "/src/assets/nft-2.jpg",
          reservePrice: 2,
          currentBid: 0,
          bidCount: 0,
          isActive: true,
          isSold: false,
          owner: "0x0000000000000000000000000000000000000000",
          currentBidder: "0x0000000000000000000000000000000000000000",
          startTime: Date.now() - 172800000, // 2 days ago
          endTime: Date.now() + 172800000 // 2 days from now
        },
        {
          tokenId: 3,
          name: "Blockchain Art #3",
          description: "Unique blockchain artwork",
          imageUri: "/src/assets/nft-3.jpg",
          reservePrice: 3,
          currentBid: 0,
          bidCount: 0,
          isActive: true,
          isSold: false,
          owner: "0x0000000000000000000000000000000000000000",
          currentBidder: "0x0000000000000000000000000000000000000000",
          startTime: Date.now() - 259200000, // 3 days ago
          endTime: Date.now() + 259200000 // 3 days from now
        }
      ];
    }
  });
};
