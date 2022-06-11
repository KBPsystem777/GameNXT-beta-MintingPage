require("@nomiclabs/hardhat-waffle")

const hre = require("hardhat")

async function main() {
  const GnxNft = await hre.ethers.getContractFactory("GameNyxNFT")
  const gameNxyNFT = await GnxNft.deploy()

  await gameNxyNFT.deployed()

  console.log("GNX NFT has been deployed to:", gameNxyNFT.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
