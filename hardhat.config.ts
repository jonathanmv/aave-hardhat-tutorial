import dotenv from "dotenv";
dotenv.config();
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import invariant from "tiny-invariant";
import { HardhatUserConfig } from "hardhat/config";
import { DEFAULT_NAMED_ACCOUNTS, eEthereumNetwork, getCommonNetworkConfig, hardhatNetworkSettings } from "@aave/deploy-v3";

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
invariant(ALCHEMY_KEY, "ALCHEMY_KEY env variable not found. Add it to the .env file.");
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
invariant(GOERLI_PRIVATE_KEY, "GOERLI_PRIVATE_KEY env variable not found. Add it to the .env file.");
const MARKET_NAME = process.env.MARKET_NAME;
invariant(MARKET_NAME, "MARKET_NAME env variable not found. Add it to the .env file.");
const FORK = process.env.FORK;
invariant(FORK, "FORK env variable not found. Add it to the .env file.");

const autoOrNumberOrUndefined = (value?: "auto" | string | number) => {
  if (value === undefined) return value;
  if (value === "auto") return value;
  if (typeof value === "number") return value;

  return parseFloat(value);
}

const numberOrUndefined = (value?: string | number) => {
  if (value === undefined) return value;
  if (typeof value === "number") return value;

  return parseFloat(value);
}

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      ...hardhatNetworkSettings,
      gasPrice: autoOrNumberOrUndefined(hardhatNetworkSettings.gasPrice),
      initialBaseFeePerGas: numberOrUndefined(hardhatNetworkSettings.initialBaseFeePerGas),
    },
    local: {
      url: "http://127.0.0.1:8545",
      accounts: ["0x45c5860fb91347928110824c1107e1a7e7b83f9c4fb5835ba34abfa4abc1db3a"]
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    },
    main: {
      ...getCommonNetworkConfig(eEthereumNetwork.main),
      gasPrice: autoOrNumberOrUndefined(getCommonNetworkConfig(eEthereumNetwork.main).gasPrice)
    },
  },
  namedAccounts: {
    ...DEFAULT_NAMED_ACCOUNTS
  },
  external: {
    contracts: [
      {
        artifacts: "node_modules/@aave/deploy-v3/artifacts",
        deploy: "node_modules/@aave/deploy-v3/dist/deploy"
      }
    ]
  }
};

export default config;
