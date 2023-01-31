import hre from "hardhat";
import { getPoolAddressesProvider } from "@aave/deploy-v3";

describe('Tests', () => {
   before(async () => {
      // Set the MARKET_NAME env var
      process.env.MARKET_NAME = "Aave"

      // Deploy Aave V3 contracts before running tests
      await hre.deployments.fixture(['market', 'periphery-post']);
   });

   it('Get Pool address from AddressesProvider', async () => {
      const addressesProvider = await getPoolAddressesProvider();

      const poolAddress = await addressesProvider.getPool();

      console.log('Pool', poolAddress);
   })
});
