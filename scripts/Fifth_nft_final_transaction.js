const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()

    const deployedArbitrumContract = "0xd3a0A52872DFfc8482Ed8a56382e8114Dd08FF1e" // contract that I deployed with getOwner() one() and two()

    const courseCompletedNft = await ethers.getContractAt(
        "CourseCompletedNFT",
        "0x9E9a4e58dDc9483d241AfC9a028E89BD9b9fa683",
        deployer
    )

    const mint = await courseCompletedNft.mintNft(deployedArbitrumContract, "0x901717d1")
    await mint.wait(1)

    console.log(`Token Minted with the token Id: ${mint.toString()}`)
    console.log("LETS GOOOOOOOOO")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
