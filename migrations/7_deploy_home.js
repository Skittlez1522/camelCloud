const MobileHomePermits = artifacts.require("./MobileHomePermits.sol");

module.exports = function(deployer) {
    deployer.deploy(MobileHomePermits);
}