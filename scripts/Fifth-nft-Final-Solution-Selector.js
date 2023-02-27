const { ethers } = require("hardhat")

async function main() {
    const selector = await ethers.getContract("selectorContract")
    const answerOne = await selector.getSelectorOne()
    const answerTwo = await selector.getSelectorTwo()

    console.log(`Answer for selector one is: ${answerOne}`)
    console.log(`Answer for selector two is: ${answerTwo}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
