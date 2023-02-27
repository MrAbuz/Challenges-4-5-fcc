module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const finalSolution = await deploy("FinalSolution", {
        from: deployer,
        args: [],
        log: true,
    })

    log("Final Solution Contract Deployed!")
}

module.exports.tags = ["all", "finalSolution"]
