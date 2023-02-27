const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()

    console.log("1")

    const localhost = await ethers.getContract("localhost", deployer)
    const patrickOne = await ethers.getContract("PatrickOne", deployer)
    const patrickTwo = await ethers.getContract("PatrickTwo", deployer)

    const selector = "0x901717d1" //selector for one()

    console.log("2")

    const patrickTwoTx = await patrickTwo.mintNft(localhost.address, selector)

    console.log("3")

    await patrickTwoTx.wait(1)

    console.log("4")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
