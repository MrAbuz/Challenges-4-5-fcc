module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const first = await deploy("PatrickOne", {
        from: deployer,
        args: [],
        log: true,
    })
    log("First Contract Deployed!")
}

module.exports.tags = ["alllocalhost", "first"]
