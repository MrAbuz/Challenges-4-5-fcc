const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()

    const patrickOne = await ethers.getContract("PatrickOne", deployer)

    const tx = await patrickOne.getOtherVar()

    console.log(`OtherVar value is: ${tx}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
