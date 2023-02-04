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
} from "@aave/deploy-v3";

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
  const dataProviderArtifact = await deployments.get(POOL_DATA_PROVIDER);
  testEnv.helpersContract = (await ethers.getContractAt(
    dataProviderArtifact.abi,
    dataProviderArtifact.address
  )) as AaveProtocolDataProvider;

  const priceOracleArtifact = await deployments.get(ORACLE_ID);
  testEnv.oracle = (await ethers.getContractAt(
    priceOracleArtifact.abi,
    priceOracleArtifact.address
  )) as AaveOracle;
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
