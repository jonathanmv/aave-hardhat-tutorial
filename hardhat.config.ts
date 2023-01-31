import "@nomicfoundation/hardhat-toolbox";
import invariant from "tiny-invariant";
import { HardhatUserConfig } from "hardhat/config";

import dotenv from "dotenv";
dotenv.config();

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
invariant(ALCHEMY_KEY, "ALCHEMY_KEY env variable not found. Add it to the .env file.");
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
invariant(GOERLI_PRIVATE_KEY, "GOERLI_PRIVATE_KEY env variable not found. Add it to the .env file.");

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
      accounts: ["0x45c5860fb91347928110824c1107e1a7e7b83f9c4fb5835ba34abfa4abc1db3a"]
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};

export default config;
