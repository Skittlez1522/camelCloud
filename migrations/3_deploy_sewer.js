const SewerIssues = artifacts.require("./SewerIssues.sol");

module.exports = function(deployer) {
    deployer.deploy(SewerIssues);
}