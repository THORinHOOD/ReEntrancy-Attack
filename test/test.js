var Investitions = artifacts.require("Investitions");
var Scammer = artifacts.require("Scammer");

chai = require("chai");
chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

expect = chai.expect;
assert = chai.assert;

contract("Test Investitions contract", function() {
    describe("Investitions", function() {
        it("Инстанцировать Investitions", function() {
            return Investitions.new().then(function(inst) {
                investitions = inst;
            });
        });

        it ("Послать 10 эфиров", function() {
            return investitions.sendMoney(
                                                {from : web3.eth.accounts[1],
                                                value: web3.toWei(10, "ether"),
                                                gas: "220000"})
                    .then(function(res){
                        expect(res).to.not.be.an("error");
                    });
        });

        it ("Проверка, что в Investions лежит 10 эфиров", function() {
            web3.eth.getBalance(investitions.address, function(err, res) {
                assert.equal(res, web3.toWei(10, "ether"));
            });
        });
    });

    describe("Scammer", function() {
        it("Инстанцировать Scammer", function() {
            return Scammer.new().then(function(inst) {
                scammer = inst;
            });
        });

        it("Атаковать 1 эфиром", function() {
            return scammer.Attack(investitions.address, {
                                           from : web3.eth.accounts[0], 
                                           value : web3.toWei(1, "ether"),
                                           gas: 4500000})
                    .then(function(res) {
                        expect(res).to.not.be.an("error");
                    });
        });

        it ("Проверка, что в Investions лежит 0 эфиров",  function() {
            let expectedBalance = web3.toBigNumber(web3.toWei(0, 'ether'));
            let actualBalance = web3.eth.getBalance(investitions.address);
            assert.equal(actualBalance, expectedBalance, "На смарт-контракте что-то осталось!");
        });
    });

});