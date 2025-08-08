// scripts/testContract.ts
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import PortfolioAgentJSON from "../artifacts/contracts/PortfolioAgent.sol/PortfolioAgent.json";

const PortfolioAgentABI = PortfolioAgentJSON.abi;

dotenv.config();

// The address of your deployed contract
const CONTRACT_ADDRESS = "0x087084152F401449B1c75C6eCf846eB311A70136";

async function testContract() {
  const provider = new ethers.JsonRpcProvider("https://testnet.sapphire.oasis.io");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, PortfolioAgentABI, wallet);
  const paymentValue = ethers.parseEther("0.0001");
  const preferences = "0x" + Buffer.from(JSON.stringify({ risk: "low", assets: ["ETH"] })).toString("hex");
  
  console.log("Submitting preferences...");
  const tx = await contract.submitPreferences(preferences, { value: paymentValue });
  const receipt = await tx.wait();
  
  console.log("Transaction confirmed in block:", receipt?.blockNumber);
  console.log("Transaction hash:", tx.hash);

  console.log("Fetching stored preferences...");
  const storedPreferences = await contract.getPreferences();
  console.log("Stored Preferences (hex):", storedPreferences);
  
  // Check if the returned value is not empty before parsing
  if (storedPreferences !== '0x') {
    const decodedPreferences = JSON.parse(Buffer.from(storedPreferences.slice(2), "hex").toString());
    console.log("Stored Preferences (decoded):", decodedPreferences);
  } else {
    console.log("No preferences have been stored for this address yet.");
  }
}

testContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});