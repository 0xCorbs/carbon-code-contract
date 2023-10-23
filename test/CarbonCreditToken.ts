import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Carbon Credit Token', function () {
  let owner: any;
  let user1: any;
  let user2: any;
  let cct: any;
  before('deploying', async () => {
    const signers = await ethers.getSigners();
    [owner, user1, user2] = signers;
  })
  it('Mint Carbon Credit Token', async function () {
    const CarbonCredit = await ethers.getContractFactory('CarbonCreditToken');
    cct = await CarbonCredit.deploy(
      owner.address,
      owner.address,
      owner.address,
      ethers.parseEther('1000'),
      ethers.parseEther('100')
    );
    // check if it can mint the correct amount
    expect(await cct.balanceOf(owner.address)).to.equal(
      ethers.parseEther('100')
    );
  })

  it('transfers the correct amount', async function () {
    // transfer 2 CCT from owner to user1
    await cct.connect(owner).transfer(user1.address, ethers.parseEther('2'))

    // get owner balance 
    const ownerBalance = await cct.balanceOf(owner.address);
    // get user1 balance
    let user1Balance = await cct.balanceOf(user1.address);

    // check user1 and owner balance
    expect(ownerBalance).equals(ethers.parseEther('98'));
    expect(user1Balance).equals(ethers.parseEther('2'));
  })

  it('cannot mint more than the fixed supply', async function () {
    // mint more than total supply
    await expect(cct.connect(owner).mint(owner.address, ethers.parseEther('901'))).to.be.revertedWith(
      'the mint amount exceeds the fixed supply'
    );
  })

  it('only the address with minter role (owner) can mint', async function () {
    // mint 1 CCT to user2 using user1 (without minter role)
    await expect(cct.connect(user1).mint(user2.address, ethers.parseEther('5'))).to.be.reverted;
    // mint 1 CCT to user2 using owner (with minter role)
    await cct.connect(owner).mint(user2.address, ethers.parseEther('1'));
    // get user2 balance 
    const user2Balance = await cct.balanceOf(user2.address);
    expect(user2Balance).equals(ethers.parseEther('1'));
  })

  it('cannot mint or transfer when paused', async function () {
    // only owner can pause
    await expect(cct.connect(user1).pause()).to.be.reverted;
    // pause with owner
    await cct.connect(owner).pause();
    // check paused
    expect(await cct.paused()).to.equal(true);
    // mint 1 CCT from owner to user2
    await expect(cct.connect(owner).mint(user2.address, ethers.parseEther('1'))).to.be.reverted;
    await expect(cct.connect(owner).transfer(user2.address, ethers.parseEther('1'))).to.be.reverted;
    // unpause with owner
    await cct.connect(owner).unpause();
    // check paused
    expect(await cct.paused()).to.equal(false);

    // mint and transfer again
    await cct.connect(owner).mint(user2.address, ethers.parseEther('1'));
    await cct.connect(owner).transfer(user2.address, ethers.parseEther('1'));

    // get user2 balance 
    const user2Balance = await cct.balanceOf(user2.address);
    expect(user2Balance).equals(ethers.parseEther('3'));
  })
})
