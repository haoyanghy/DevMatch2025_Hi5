const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaidAccess Contract", function () {
  let PaidAccess;
  let paidAccess;
  let owner;
  let addr1;

  beforeEach(async function () {
    PaidAccess = await ethers.getContractFactory("PaidAccess");
    [owner, addr1] = await ethers.getSigners();
    paidAccess = await PaidAccess.deploy();
    await paidAccess.deployed();
  });

  it("Should set the correct price", async function () {
    const price = await paidAccess.price();
    expect(price).to.equal(ethers.utils.parseEther("0.0001"));
  });

  it("Should accept payment and emit AccessAllowed event", async function () {
    await expect(
      paidAccess.connect(addr1).acceptPayment({ value: ethers.utils.parseEther("0.0001") })
    )
      .to.emit(paidAccess, "AccessAllowed")
      .withArgs(addr1.address);

    const hasPaid = await paidAccess.hasPaid(addr1.address);
    expect(hasPaid).to.be.true;
  });

  it("Should reject payment if amount is incorrect", async function () {
    await expect(
      paidAccess.connect(addr1).acceptPayment({ value: ethers.utils.parseEther("0.0002") })
    ).to.be.revertedWith("Please transfer the exact amount of ETH");
  });

  it("Should reject payment if user has already paid", async function () {
    await paidAccess.connect(addr1).acceptPayment({ value: ethers.utils.parseEther("0.0001") });

    await expect(
      paidAccess.connect(addr1).acceptPayment({ value: ethers.utils.parseEther("0.0001") })
    ).to.be.revertedWith("User has paid");
  });

  it("Should check if a user has paid", async function () {
    const hasPaidBefore = await paidAccess.checkPayment(addr1.address);
    expect(hasPaidBefore).to.be.false;

    await paidAccess.connect(addr1).acceptPayment({ value: ethers.utils.parseEther("0.0001") });

    const hasPaidAfter = await paidAccess.checkPayment(addr1.address);
    expect(hasPaidAfter).to.be.true;
  });
});
