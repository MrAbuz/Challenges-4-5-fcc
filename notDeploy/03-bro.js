module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const bro = await deploy("bro", {
        from: deployer,
        args: [],
        log: true,
    })

    log("Main Contract Deployed!")
}

module.exports.tags = ["all", "bro"]
