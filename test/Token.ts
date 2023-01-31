import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token contract", () => {
    async function deployTokenFixture() {
        const [owner, accountOne, accountTwo] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");

        const jonathanmvToken = await Token.deploy();
        await jonathanmvToken.deployed();

        return { Token, jonathanmvToken, owner, accountOne, accountTwo };
    }

    it("Deployment should assign the total supply of tokens to the owner", async () => {
        const { jonathanmvToken, owner } = await loadFixture(deployTokenFixture);
        const ownerBalance = await jonathanmvToken.balanceOf(owner.address);
        expect(await jonathanmvToken.totalSupply()).to.equal(ownerBalance);
    });
    
    it("Should transfer tokens between accounts", async () => {
        const { jonathanmvToken, owner, accountOne, accountTwo } = await loadFixture(deployTokenFixture);
        // from owner to accountOne
        await jonathanmvToken.transfer(accountOne.address, 50);
        expect(await jonathanmvToken.balanceOf(owner.address)).to.equal((await jonathanmvToken.totalSupply()).toNumber() - 50);
        expect(await jonathanmvToken.balanceOf(accountOne.address)).to.equal(50);

        // switch accounts
        jonathanmvToken.connect(accountOne);
        await jonathanmvToken.transfer(accountTwo.address, 25);
        expect(await jonathanmvToken.balanceOf(accountTwo.address)).to.equal(25);

        jonathanmvToken.connect(accountTwo);
        expect(await jonathanmvToken.transfer(owner.address, 5)).to.changeTokenBalances(jonathanmvToken, [accountTwo, owner], [-5, 5]);
    });

    it("Should emit Transfer events", async () => {
        const { jonathanmvToken, owner, accountOne } = await loadFixture(deployTokenFixture);

        expect(await jonathanmvToken.transfer(accountOne.address, 50))
            .to.emit(jonathanmvToken, "Transfer")
            .withArgs(owner.address, accountOne.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async () => {
        const { jonathanmvToken, owner, accountOne } = await loadFixture(deployTokenFixture);

        const ownerFunds = await jonathanmvToken.balanceOf(owner.address);
        await expect(jonathanmvToken.transfer(accountOne.address, ownerFunds.toNumber() + 1))
            .to.be.revertedWith("Not enough tokens");

        expect(await jonathanmvToken.balanceOf(owner.address)).to.equal(ownerFunds);
    });
});
