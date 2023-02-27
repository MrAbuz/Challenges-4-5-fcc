const { ethers } = require("hardhat")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    args = ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"]

    const second = await deploy("PatrickTwo", {
        from: deployer,
        args: args,
        log: true,
    })
    log("Second Contract Deployed!")
}

module.exports.tags = ["alllocalhost", "second"]
