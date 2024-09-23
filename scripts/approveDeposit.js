// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const tokenAddress = "0x6B02471F741C72d0F80A7A5731E9bcb72929d797"; 
const tokenABI = tokenContractJSON.abi;
const fxERC20RootAddress = "0x3658ccFDE5e9629b0805EB06AaCFc42416850961";
const walletAddress = "0x7FfB72844364570db0893DB51798B53ff17D8fB7"; // place your public address for your wallet here

async function main() {

    const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC20RootAddress);

    const approveTx = await tokenContract.approve(fxERC20RootAddress, 1);
    await approveTx.wait();

    console.log('Approval confirmed');


    const depositTx = await fxContract.deposit(tokenAddress, walletAddress, 1, "0x6556");
    await depositTx.wait();

    console.log("Tokens deposited");
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
