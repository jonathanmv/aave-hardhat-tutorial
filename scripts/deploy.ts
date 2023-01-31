import { ethers } from "hardhat";

async function deployLock() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
}

async function deployToken() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying jonathanmv Token with owner: %s", deployer.address);

  const Token = await ethers.getContractFactory("Token");
  const jonathanmvToken = await Token.deploy();

  console.log("Deployed jonathanmv Token to address: %s", jonathanmvToken.address);
  console.log("jonathanmv Token total supply: %s%s", await jonathanmvToken.symbol(), await jonathanmvToken.totalSupply());
}

async function main() {
  await deployLock();
  await deployToken();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
