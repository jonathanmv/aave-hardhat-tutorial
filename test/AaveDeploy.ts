import { getPoolAddressesProvider } from "@aave/deploy-v3";
import { initializeMakeSuite, makeSuite } from "./utils/make-suite";

const { expect } = require("chai");

before(async() => {
   await initializeMakeSuite();
});

makeSuite("Tests", (testEnv) => {
  it("Check WETH price", async () => {
    const { weth, oracle } = testEnv;

    const price = await oracle.getAssetPrice(weth.address);

    expect(price).gt("0", "WETH PRICE CAN NOT BE ZERO");
  });

  it.skip("Get Pool address from AddressesProvider", async () => {
    const addressesProvider = await getPoolAddressesProvider();

    const poolAddress = await addressesProvider.getPool();

    console.log("Pool", poolAddress);
  });
});
