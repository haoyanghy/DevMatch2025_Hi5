require("dotenv").config();

module.exports = {
  sapphireRpcUrl: process.env.SAPPHIRE_RPC_URL || "https://testnet.sapphire.oasis.dev",
  contractAddress: process.env.CONTRACT_ADDRESS || "0xYourContractAddress",
  privateKey: process.env.PRIVATE_KEY || "0xYourPrivateKey",
  mockApiPort: process.env.MOCK_API_PORT || 4000,
};
