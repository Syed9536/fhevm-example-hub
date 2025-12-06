// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

/// @title Blind Auction
/// @notice A privacy-preserving auction where bids remain hidden.
/// @dev Uses Homomorphic Encryption to determine the highest bidder without revealing amounts.
contract BlindAuction {
    euint32 private highestBid;
    eaddress private highestBidder;
    
    /// @notice Initializes the auction with 0 bid
    constructor() {
        highestBid = TFHE.asEuint32(0);
        TFHE.allow(highestBid, address(this));
    }

    /// @notice Places a bid. The state only updates if the new bid is higher than the current highest.
    /// @dev Uses TFHE.select (multiplexer) to conditionally update state without leaking info.
    /// @param _encryptedBid The encrypted bid amount
    /// @param _inputProof The ZK proof for the input
    function bid(einput _encryptedBid, bytes calldata _inputProof) public {
        euint32 userBid = TFHE.asEuint32(_encryptedBid, _inputProof);
        
        // Check if new bid > current highest bid
        ebool isNewHighest = TFHE.gt(userBid, highestBid);
        
        // Update highest bid securely (If isNewHighest ? userBid : highestBid)
        highestBid = TFHE.select(isNewHighest, userBid, highestBid);
        
        // Note: Tracking the 'address' of the winner blindly is complex (requires cmux on addresses or mapping).
        // For this example hub, we focus on the Amount Logic to keep it understandable.
        
        TFHE.allow(highestBid, address(this));
        TFHE.allow(highestBid, msg.sender);
    }

    /// @notice Returns the current highest bid (Encrypted)
    /// @return The highest bid amount
    function getHighestBid() public view returns (euint32) {
        return highestBid;
    }
}