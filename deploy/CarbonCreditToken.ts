
module.exports = async function ({ deployments, getNamedAccounts }: any) {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  
  await deploy('CarbonCreditToken', {
    from: deployer,
    args: [
      '0xcc884FB08142FE52bA5CAfD9bdbA2fd167052bAf', // admin
      '0xcc884FB08142FE52bA5CAfD9bdbA2fd167052bAf', // pauser
      '0xcc884FB08142FE52bA5CAfD9bdbA2fd167052bAf', // minter
      '1000000000000000000000000', //fixed supply
      '1000' // inital supply
    ],
    log: true,
    waitConfirmations: 1
  })
}

module.exports.tags = ['CarbonCreditToken']
