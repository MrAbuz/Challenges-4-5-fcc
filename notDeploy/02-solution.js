module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const solution = await deploy("solution", {
        from: deployer,
        args: [],
        log: true,
    })

    log("Main Contract Deployed!")
}

module.exports.tags = ["all", "solution"]
