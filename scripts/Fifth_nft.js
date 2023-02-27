const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()

    const deployedArbitrumContract = "0x75a77a0624Deb50601cB0e929BDA93f54FC6068e" // contract that I deployed with getOwner() one() and two()
    //const selectorOne = "0x901717d1"
    const selectorOne = "0x23dc111d"

    console.log("1")

    const courseCompletedNft = await ethers.getContractAt(
        "CourseCompletedNFT",
        "0x9E9a4e58dDc9483d241AfC9a028E89BD9b9fa683",
        deployer
    )

    console.log("2")

    const mint = await courseCompletedNft.mintNft(deployedArbitrumContract, selectorOne)

    console.log("3")

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
