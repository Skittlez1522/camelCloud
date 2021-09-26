const RoadIssues = artifacts.require("./RoadIssues.sol");

module.exports = function(deployer) {
    deployer.deploy(RoadIssues);
}