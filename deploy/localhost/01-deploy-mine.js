module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const solution = await deploy("localhost", {
        from: deployer,
        args: [],
        log: true,
    })
    log("Solution Contract Deployed!")
}

module.exports.tags = ["alllocalhost", "solution"]
