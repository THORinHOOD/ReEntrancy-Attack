var Scammer = artifacts.require("./Scammer.sol");
var Investitions = artifacts.require("./Investitions.sol");

module.exports = function(deployer) {
 deployer.deploy(Investitions);
 deployer.deploy(Scammer);
};
