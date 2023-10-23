import * as dotenv from 'dotenv'

import { HardhatUserConfig } from "hardhat/config";
import '@nomicfoundation/hardhat-toolbox';
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'hardhat-abi-exporter'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'solidity-coverage'
import './tasks'

dotenv.config()
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  namedAccounts: {
    deployer: 0
  },

  networks: {
    mumbai: {
      url: 'https://endpoints.omniatech.io/v1/matic/mumbai/public',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    polygon: {
      url: 'https://polygon-rpc.com/',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    }
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD'
  },

  etherscan: {
    apiKey: {
      polygon: process.env.POLYGON_API_KEY || '',
      polygonMumbai: process.env.POLYGON_API_KEY || ''
    }
  },

  abiExporter: [
    {
      path: './abi/pretty',
      pretty: true
    },
    {
      path: './abi/ugly',
      pretty: false
    }
  ],

  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'] // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  }
}

export default config
