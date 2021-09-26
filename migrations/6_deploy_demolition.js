const DemolitionPermits = artifacts.require("./DemolitionPermits.sol");

module.exports = function(deployer) {
    deployer.deploy(DemolitionPermits);
}