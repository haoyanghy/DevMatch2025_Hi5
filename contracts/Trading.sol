// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract Trading {
    // Roles
    enum Role { None, Noob, Pro }
    
    // User structure
    struct User {
        Role role;
        bytes32 encryptedAddress;
        bytes encryptedPortfolio; 
        bytes encryptedPreferences; 
        bool isActive;
    }
    
    // Match structure
    struct Match {
        address noob;
        address pro;
        uint256 amount;
        uint256 durationDays;
        uint256 startTime;
        bool active;
    }
    
    // Mappings
    mapping(address => User) public users;
    mapping(bytes32 => Match) public matches;
    mapping(address => bytes32[]) public userMatches;
    
    // Platform wallet (encrypted)
    bytes32 private platformEncryptedAddress;
    
    // Events
    event UserRegistered(address indexed user, Role role);
    event PreferencesSubmitted(address indexed noob, bytes encryptedPreferences);
    event Matched(address indexed noob, address indexed pro, bytes32 matchId);
    event PaymentProcessed(address indexed noob, address indexed pro, uint256 amount, uint256 durationDays);
    event ReturnsDistributed(address indexed noob, uint256 returnAmount);
    
    // Constants
    uint256 constant PLATFORM_FEE = 1; // 1%
    uint256 constant PRO_FEE = 1; // 1%
    uint256 constant BASE_AMOUNT = 0.001 ether;
    
    // Constructor
    constructor() {
        platformEncryptedAddress = keccak256(
            Sapphire.encrypt(
                bytes32(uint256(uint160(msg.sender))),
                bytes32(0),
                new bytes(0),
                new bytes(0)
            )
        );
    }
    
    // Register user with role and portfolio (for Pros)
    function register(Role role, bytes memory encryptedPortfolio) external {
        require(role == Role.Noob || role == Role.Pro, "Invalid role");
        require(!users[msg.sender].isActive, "User already registered");
        if (role == Role.Pro) {
            require(encryptedPortfolio.length > 0, "Pro must provide portfolio");
        } else {
            require(encryptedPortfolio.length == 0, "Noob cannot provide portfolio");
        }
        
        bytes32 encryptedAddress = keccak256(
            Sapphire.encrypt(
                bytes32(uint256(uint160(msg.sender))),
                bytes32(0),
                new bytes(0),
                new bytes(0)
            )
        );

        bytes memory encryptedPortfolio = Sapphire.encrypt(
            bytes32(uint256(uint160(msg.sender))), 
            bytes32(0),                            
            encryptedPortfolio,                           
            new bytes(0)                           
        );
        
        users[msg.sender] = User({
            role: role,
            encryptedAddress: encryptedAddress,
            encryptedPortfolio: encryptedPortfolio,
            encryptedPreferences: new bytes(0),
            isActive: true
        });
        
        emit UserRegistered(msg.sender, role);
    }
    
    // Submit encrypted preferences for Noobs
    function submitPreferences(bytes memory preferences) external {
        require(users[msg.sender].isActive && users[msg.sender].role == Role.Noob, "Not a registered noob");
        require(preferences.length > 0, "Preferences cannot be empty");
        
        // Encrypt preferences on-chain
        bytes memory encryptedPreferences = Sapphire.encrypt(
            bytes32(uint256(uint160(msg.sender))), 
            bytes32(0),                            
            preferences,                           
            new bytes(0)                           
        );
        
        users[msg.sender].encryptedPreferences = encryptedPreferences;
        
        emit PreferencesSubmitted(msg.sender, encryptedPreferences);
    }
    
    // Get encrypted preferences for a Noob
    function getPreferences(address noob) external view returns (bytes memory) {
        require(users[noob].isActive && users[noob].role == Role.Noob, "Not a registered noob");
        return users[noob].encryptedPreferences;
    }
    
    // Get encrypted portfolio for a Pro
    function getPortfolio(address pro) external view returns (bytes memory) {
        require(users[pro].isActive && users[pro].role == Role.Pro, "Not a registered pro");
        return users[pro].encryptedPortfolio;
    }
    
    // Match noob with pro
    function matchWithPro(address pro) external {
        require(users[msg.sender].isActive && users[msg.sender].role == Role.Noob, "Not a registered noob");
        require(users[pro].isActive && users[pro].role == Role.Pro, "Not a registered pro");
        
        bytes32 matchId = keccak256(abi.encodePacked(msg.sender, pro, block.timestamp));
        
        matches[matchId] = Match({
            noob: msg.sender,
            pro: pro,
            amount: 0,
            durationDays: 0,
            startTime: 0,
            active: false
        });
        
        userMatches[msg.sender].push(matchId);
        userMatches[pro].push(matchId);
        
        emit Matched(msg.sender, pro, matchId);
    }
    
    // Noob pays to follow pro's portfolio
    function followPro(bytes32 matchId, uint256 durationDays) external payable {
        Match storage tradeMatch = matches[matchId];
        require(tradeMatch.noob == msg.sender, "Not authorized");
        require(!tradeMatch.active, "Match already active");
        require(msg.value == BASE_AMOUNT, "Must send exactly 0.001 ETH");
        require(durationDays > 0, "Invalid duration");
        
        tradeMatch.amount = msg.value;
        tradeMatch.durationDays = durationDays;
        tradeMatch.startTime = block.timestamp;
        tradeMatch.active = true;
        
        // Distribute fees
        uint256 proFee = (msg.value * PRO_FEE) / 100;
        uint256 platformFee = (msg.value * PLATFORM_FEE) / 100;
        
        // Transfer fees (using encrypted addresses would require decryption off-chain)
        payable(tradeMatch.pro).transfer(proFee);
        // Platform fee remains in contract
        
        emit PaymentProcessed(msg.sender, tradeMatch.pro, msg.value, durationDays);
    }
    
    // Generate random number in range [0.8, 1.2] for returns
    function generateRandomReturn() private view returns (uint256) {
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao)));
        // Scale to range 0.8 to 1.2 (multiplied by 1e18 for precision)
        uint256 scaled = 8e17 + (random % 5e17); // 0.8 to 1.2
        return scaled;
    }
    
    // Distribute returns after duration (callable by anyone)
    function distributeReturns(bytes32 matchId) external {
        Match storage tradeMatch = matches[matchId];
        require(tradeMatch.active, "Match not active");
        require(block.timestamp >= tradeMatch.startTime + (tradeMatch.durationDays * 1 seconds), "Duration not completed");
        
        uint256 remainingAmount = tradeMatch.amount - ((tradeMatch.amount * (PRO_FEE + PLATFORM_FEE)) / 100);
        uint256 multiplier = generateRandomReturn();
        uint256 returnAmount = (remainingAmount * multiplier) / 1e18;
        
        tradeMatch.active = false;
        
        payable(tradeMatch.noob).transfer(returnAmount);
        
        emit ReturnsDistributed(tradeMatch.noob, returnAmount);
    }
    
    // Get user's matches
    function getUserMatches(address user) external view returns (bytes32[] memory) {
        return userMatches[user];
    }
}