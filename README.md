# DevMatch2025_Hi5

To deploy the contract:

1. Go to `remix.ethereum.org/`
2. Import the PortfolioAgent.sol contract under contracts/ folder
3. Ctrl+S to compile or compile manually at Solidity compiler tab
4. Go to `Deploy & run transactions` tab
5. Select `Injected Provider - Metamask` as environment
6. Select the contract and hit deploy


To make transactions with the deployed contract:

1. Go to `Deployed Contracts`
2. Enter 0.0001 eth as value (Get conversion to Wei from https://eth-converter.com/)
3. Use random hex for submitPreferences function, eg: 0x12341234
4. Hit the submitPreferences button