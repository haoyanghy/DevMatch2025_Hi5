/*
This is the development environment for compiling and deploying the smart contract to Sapphire Tesnet in TEE using hardhat.

*/

import '@oasisprotocol/sapphire-hardhat';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from "dotenv";
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY

//deploying -> sends a transaction to blockchain
const config: HardhatUserConfig = {
    networks: {
        hardhat:{
            chainId: 1337,
        },

        'sapphire-testnet': {
            url: 'https://testnet.sapphire.oasis.io',
            chainId: 0x5aff,
            accounts: [PRIVATE_KEY!],
        },
    },

    solidity: {
        version: "0.8.20",
        settings: {
            optimiser: {
                enabled: true,
                runs: 200,
            }
        }
    }

};

export default config;