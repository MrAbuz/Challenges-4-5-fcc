const { ethers } = require("hardhat")

async function main() {
    const selector = await ethers.getContract("selectorContract")
    const answerOne = await selector.getSelectorOne()
    const answerTwo = await selector.getSelectorTwo()

    console.log(`Answer for selector one is: ${answerOne}`)
    console.log(`Answer for selector two is: ${answerTwo}`)

    const solution = await ethers.getContract("solution")
    const solutionAnswer = await solution.getOwner()
    if (solutionAnswer.toString() == 0xde735ef9fe1db366016e26dca9d9edf915f17d78) {
        console.log(true)
    } else {
        console.log(false)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
