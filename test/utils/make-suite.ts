// based on https://github.com/aave/aave-v3-deploy/blob/73d6c2c81ca680dd66d186e19e8e72b877a6af74/tests/utils/make-suite.ts
import { deployments, ethers, getNamedAccounts } from "hardhat";
import {
  AaveOracle,
  AaveProtocolDataProvider,
  ORACLE_ID,
  POOL_DATA_PROVIDER,
  WETH9,
  evmRevert,
  evmSnapshot,
  getWETH,
} from "@aave/deploy-v3";
import invariant from "tiny-invariant";

type TestEnv = {
  oracle: AaveOracle;
  helpersContract: AaveProtocolDataProvider;
  weth: WETH9;
};
const testEnv: TestEnv = {
  oracle: {} as AaveOracle,
  helpersContract: {} as AaveProtocolDataProvider,
  weth: {} as WETH9,
};

export async function initializeMakeSuite() {
  console.log(`Loading pool data provider from ${POOL_DATA_PROVIDER}`);
  const dataProviderArtifact = await deployments.get(POOL_DATA_PROVIDER);
  testEnv.helpersContract = (await ethers.getContractAt(
    dataProviderArtifact.abi,
    dataProviderArtifact.address
  )) as AaveProtocolDataProvider;

  console.log(`Loading oracle from ${ORACLE_ID}`);
  const priceOracleArtifact = await deployments.get(ORACLE_ID);
  testEnv.oracle = (await ethers.getContractAt(
    priceOracleArtifact.abi,
    priceOracleArtifact.address
  )) as AaveOracle;

  console.log(`Loading WETH`);
  const reservesTokens = await testEnv.helpersContract.getAllReservesTokens();
  const wethAddress = reservesTokens.find(({ symbol }) => symbol === "WETH");
  invariant(wethAddress, `WETH token not found in reservesTokens`)
  testEnv.weth = await getWETH(wethAddress.tokenAddress);
}

let HardhatSnapshotId: string = "0x1";
const setHardhatSnapshotId = (id: string) => {
  HardhatSnapshotId = id;
};

const setSnapshot = async () => {
  setHardhatSnapshotId(await evmSnapshot());
};

const revertHead = async () => {
  await evmRevert(HardhatSnapshotId);
};

export function makeSuite(name: string, tests: (testEnv: TestEnv) => void) {
  describe(name, () => {
    before(async () => {
      await setSnapshot();
    });
    tests(testEnv);
    after(async () => {
      await revertHead();
    });
  });
}
