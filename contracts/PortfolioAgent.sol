// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;
import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract PortfolioAgent {
    // Price for five prompt submissions (0.0001 ETH)
    uint256 public constant PRICE = 0.0001 ether;
    // Maximum prompts per payment
    uint256 public constant MAX_PROMPTS = 5;

    // Encrypted mapping for user preferences (stored in TEE)
    mapping(bytes32 => bytes) private userPreferences;
    // Track remaining prompts per user
    mapping(bytes32 => uint256) private promptsRemaining;

    // Event for logging preference submissions
    event PreferencesStored(
        bytes32 indexed encryptedAddress,
        bytes encryptedPreferences
    );

    // Submit encrypted preferences
    function submitPreferences(
        bytes memory encryptedPreferences
    ) external payable {
        bytes32 encryptedAddress = keccak256(
            Sapphire.encrypt(
                bytes32(uint256(uint160(msg.sender))), // Key (bytes32)
                bytes32(0),                              // Nonce (bytes32)
                new bytes(0),                            // Plaintext (bytes)
                new bytes(0)                             // Additional data (bytes)
            )
        );

        // Check if user has remaining prompts or needs to pay
        if (promptsRemaining[encryptedAddress] == 0) {
            require(msg.value == PRICE, "Must pay 0.0001 ETH for 5 prompts");
            promptsRemaining[encryptedAddress] = MAX_PROMPTS;
        } else {
            require(msg.value == 0, "No payment needed; prompts remaining");
        }

        // Store preferences and decrement prompts
        userPreferences[encryptedAddress] = encryptedPreferences;
        promptsRemaining[encryptedAddress] -= 1;
        emit PreferencesStored(encryptedAddress, encryptedPreferences);
    }

    // Get encrypted preferences for the caller
    function getPreferences() external view returns (bytes memory) {
        bytes32 encryptedAddress = keccak256(
            Sapphire.encrypt(
                bytes32(uint256(uint160(msg.sender))),
                bytes32(0),
                new bytes(0),
                new bytes(0)
            )
        );
        return userPreferences[encryptedAddress];
    }

    // Get remaining prompts for the caller
    function getPromptsRemaining() external view returns (uint256) {
        bytes32 encryptedAddress = keccak256(
            Sapphire.encrypt(
                bytes32(uint256(uint160(msg.sender))),
                bytes32(0),
                new bytes(0),
                new bytes(0)
            )
        );
        return promptsRemaining[encryptedAddress];
    }
}