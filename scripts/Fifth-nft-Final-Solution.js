const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()

    const addressMint = "0x9E9a4e58dDc9483d241AfC9a028E89BD9b9fa683" //address of the nft

    const myDeployedMainContract = "0xCF20bfC854e47C117f0d9c54FC5110A0bD406849" // my final solution contract deployed

    const selector = "0x901717d1" // selector of the signature "one()"

    console.log("1")

    const target = await ethers.getContractAt("CourseCompletedNFT", addressMint, deployer)

    console.log("2")

    const targetTx = await target.mintNft(myDeployedMainContract, selector)

    console.log("3")

    await targetTx.wait(1)

    console.log("4, successful")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
