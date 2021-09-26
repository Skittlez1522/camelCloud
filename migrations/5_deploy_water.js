const WaterIssues = artifacts.require("./WaterIssues.sol");

module.exports = function(deployer) {
    deployer.deploy(WaterIssues);
}