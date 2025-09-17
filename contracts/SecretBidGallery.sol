// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretBidGallery is SepoliaConfig {
    using FHE for *;
    
    struct NFT {
        euint32 tokenId;
        euint32 reservePrice;
        euint32 currentBid;
        euint32 bidCount;
        bool isActive;
        bool isSold;
        string name;
        string description;
        string imageUri;
        address owner;
        address currentBidder;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Bid {
        euint32 bidId;
        euint32 amount;
        address bidder;
        uint256 timestamp;
        bool isRevealed;
    }
    
    struct AuctionResult {
        euint32 winningBid;
        address winner;
        bool isRevealed;
        uint256 revealTime;
    }
    
    mapping(uint256 => NFT) public nfts;
    mapping(uint256 => Bid) public bids;
    mapping(uint256 => AuctionResult) public auctionResults;
    mapping(address => euint32) public bidderReputation;
    mapping(address => euint32) public sellerReputation;
    
    uint256 public nftCounter;
    uint256 public bidCounter;
    uint256 public auctionCounter;
    
    address public owner;
    address public verifier;
    
    event NFTCreated(uint256 indexed tokenId, address indexed owner, string name);
    event BidPlaced(uint256 indexed bidId, uint256 indexed tokenId, address indexed bidder, uint32 amount);
    event AuctionEnded(uint256 indexed tokenId, address indexed winner, uint32 winningBid);
    event BidRevealed(uint256 indexed bidId, uint32 amount);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createNFT(
        string memory _name,
        string memory _description,
        string memory _imageUri,
        uint256 _reservePrice,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "NFT name cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 tokenId = nftCounter++;
        
        nfts[tokenId] = NFT({
            tokenId: FHE.asEuint32(0), // Will be set properly later
            reservePrice: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            currentBid: FHE.asEuint32(0),
            bidCount: FHE.asEuint32(0),
            isActive: true,
            isSold: false,
            name: _name,
            description: _description,
            imageUri: _imageUri,
            owner: msg.sender,
            currentBidder: address(0),
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit NFTCreated(tokenId, msg.sender, _name);
        return tokenId;
    }
    
    function placeBid(
        uint256 tokenId,
        externalEuint32 bidAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(nfts[tokenId].owner != address(0), "NFT does not exist");
        require(nfts[tokenId].isActive, "Auction is not active");
        require(block.timestamp <= nfts[tokenId].endTime, "Auction has ended");
        require(msg.sender != nfts[tokenId].owner, "Owner cannot bid on own NFT");
        
        uint256 bidId = bidCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalBidAmount = FHE.fromExternal(bidAmount, inputProof);
        
        bids[bidId] = Bid({
            bidId: FHE.asEuint32(0), // Will be set properly later
            amount: internalBidAmount,
            bidder: msg.sender,
            timestamp: block.timestamp,
            isRevealed: false
        });
        
        // Update NFT bid count
        nfts[tokenId].bidCount = FHE.add(nfts[tokenId].bidCount, FHE.asEuint32(1));
        
        emit BidPlaced(bidId, tokenId, msg.sender, 0); // Amount will be decrypted off-chain
        return bidId;
    }
    
    function revealBid(
        uint256 bidId,
        uint32 revealedAmount
    ) public {
        require(bids[bidId].bidder == msg.sender, "Only bidder can reveal");
        require(!bids[bidId].isRevealed, "Bid already revealed");
        
        bids[bidId].isRevealed = true;
        emit BidRevealed(bidId, revealedAmount);
    }
    
    function endAuction(uint256 tokenId) public {
        require(nfts[tokenId].owner == msg.sender || msg.sender == owner, "Unauthorized");
        require(nfts[tokenId].isActive, "Auction not active");
        require(block.timestamp > nfts[tokenId].endTime, "Auction not ended");
        
        nfts[tokenId].isActive = false;
        
        // In a real implementation, the winning bid would be determined
        // by comparing all revealed bids and selecting the highest
        // For now, we'll create a placeholder result
        auctionResults[auctionCounter] = AuctionResult({
            winningBid: FHE.asEuint32(0), // Will be set based on revealed bids
            winner: address(0), // Will be set based on winning bid
            isRevealed: false,
            revealTime: block.timestamp
        });
        
        emit AuctionEnded(tokenId, address(0), 0); // Values will be set based on actual results
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is bidder or seller based on context
        if (bids[bidCounter - 1].bidder == user) {
            bidderReputation[user] = reputation;
        } else {
            sellerReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getNFTInfo(uint256 tokenId) public view returns (
        string memory name,
        string memory description,
        string memory imageUri,
        uint8 reservePrice,
        uint8 currentBid,
        uint8 bidCount,
        bool isActive,
        bool isSold,
        address owner,
        address currentBidder,
        uint256 startTime,
        uint256 endTime
    ) {
        NFT storage nft = nfts[tokenId];
        return (
            nft.name,
            nft.description,
            nft.imageUri,
            0, // FHE.decrypt(nft.reservePrice) - will be decrypted off-chain
            0, // FHE.decrypt(nft.currentBid) - will be decrypted off-chain
            0, // FHE.decrypt(nft.bidCount) - will be decrypted off-chain
            nft.isActive,
            nft.isSold,
            nft.owner,
            nft.currentBidder,
            nft.startTime,
            nft.endTime
        );
    }
    
    function getBidInfo(uint256 bidId) public view returns (
        uint8 amount,
        address bidder,
        uint256 timestamp,
        bool isRevealed
    ) {
        Bid storage bid = bids[bidId];
        return (
            0, // FHE.decrypt(bid.amount) - will be decrypted off-chain
            bid.bidder,
            bid.timestamp,
            bid.isRevealed
        );
    }
    
    function getAuctionResult(uint256 auctionId) public view returns (
        uint8 winningBid,
        address winner,
        bool isRevealed,
        uint256 revealTime
    ) {
        AuctionResult storage result = auctionResults[auctionId];
        return (
            0, // FHE.decrypt(result.winningBid) - will be decrypted off-chain
            result.winner,
            result.isRevealed,
            result.revealTime
        );
    }
    
    function getBidderReputation(address bidder) public view returns (uint8) {
        return 0; // FHE.decrypt(bidderReputation[bidder]) - will be decrypted off-chain
    }
    
    function getSellerReputation(address seller) public view returns (uint8) {
        return 0; // FHE.decrypt(sellerReputation[seller]) - will be decrypted off-chain
    }
    
    function transferNFT(uint256 tokenId, address to) public {
        require(nfts[tokenId].owner == msg.sender, "Only owner can transfer");
        require(!nfts[tokenId].isActive, "Cannot transfer during active auction");
        
        nfts[tokenId].owner = to;
        nfts[tokenId].isSold = true;
    }
}
