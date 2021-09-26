const BuildingPermits = artifacts.require("./BuildingPermits.sol");

module.exports = function(deployer) {
    deployer.deploy(BuildingPermits);
}