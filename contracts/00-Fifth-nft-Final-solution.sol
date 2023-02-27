//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "hardhat/console.sol";

error VulnerableContract__NopeCall();

contract FinalSolution {
    uint256 public s_variable = 0;

    address constant owner = 0xde735EF9fE1DB366016e26DCa9D9edf915F17d78; //my metamask address

    VulnerableContract public vulnerableContract;

    function getOwner() public pure returns (address) {
        return owner;
    }

    function one() public {
        vulnerableContract = VulnerableContract(msg.sender);
        vulnerableContract.callContractAgain(address(this), getSelectorTwo());
    }

    function two() public pure returns (bool) {
        return true;
    }

    function doSomething() public {
        s_variable = 123;
    }

    function getSelectorOne() public pure returns (bytes4 selector) {
        // I obtained this selector by running the "scripts/Fifth-nft-Final-Solution-Selector" then hardcoded it in the "Fifth-nft-Final-Solution.js" script, not using this function
        selector = bytes4(keccak256(bytes("one()")));
    }

    function getSelectorTwo() public pure returns (bytes4 selector) {
        selector = bytes4(keccak256(bytes("two()")));
    }
}

contract VulnerableContract {
    uint256 public s_variable = 0;
    uint256 public s_otherVar = 0;

    function callContract(address yourAddress) public returns (bool) {
        (bool success, ) = yourAddress.delegatecall(abi.encodeWithSignature("doSomething()"));
        require(success);
        if (s_variable != 123) {
            revert VulnerableContract__NopeCall();
        }
        s_variable = 0;
        return true;
    }

    function callContractAgain(address yourAddress, bytes4 selector) public returns (bool) {
        s_otherVar = s_otherVar + 1;
        (bool success, bytes memory returnData) = yourAddress.call(
            abi.encodeWithSelector(selector)
        );
        require(success);
        console.log(s_otherVar);
        if (s_otherVar == 2) {
            return true;
        }
        s_otherVar = 0;
        return false;
    }
}
