//this is the script to get the 4th nft from the Patrick's Course Challenges

const { getNamedAccounts, ethers } = require("hardhat")
require("dotenv").config()

async function main() {
    const { deployer } = await getNamedAccounts()

    const tokenAddress = "0x5ECEdc30224D9B3b5EE4C2D7ed17C197cb1d263b"
    const NftAddress = "0xda4a7Da4397414C089062cf6256989d2C29E31c9"
    const amount = ethers.utils.parseEther("1")

    const patrickToken = await ethers.getContractAt(
        "PatrickHardhatFreeCodeCampToken",
        tokenAddress,
        deployer
    )

    const tx = await patrickToken.mintMeAToken()
    await tx.wait(1)

    console.log("First batch of Patrick tokens minted")

    const txTwo = await patrickToken.mintMeAToken()
    await txTwo.wait(1)

    console.log("Second batch of Patrick tokens minted")

    const toApprove = await ethers.getContractAt("IERC20", tokenAddress, deployer)

    const txThree = await toApprove.approve(NftAddress, amount)
    await txThree.wait(1)

    console.log("Tokens approved to be spent to acquire the NFT")

    const patrickNft = await ethers.getContractAt("FullStackBasicsNFT", NftAddress, deployer)

    const { s_tokenCounter } = await patrickNft.mintNft()

    console.log(
        `We sucessfully minted the 4th NFT of Patrick's Course with the token id: ${s_tokenCounter}. Congratulations! `
    )
    // This resulted and I managed to mint the NFT!!
    // Only thing was that I couldnt manage to get was the tokenCounter printed on the console.log, it said undefined.
    // Maybe I needed to do to.string()? Costs money so I didnt try again ahah.
    // Anyway, well done! :D
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
