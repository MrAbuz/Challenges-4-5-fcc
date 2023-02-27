// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

error VulnerableContract__NopeCall();

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
        if (s_otherVar == 2) {
            return true;
        }
        s_otherVar = 0;
        return false;
    }
}

contract solution {
    address constant owner = 0xde735EF9fE1DB366016e26DCa9D9edf915F17d78;
    address constant target = 0x241F77325C073a3815985691f76B58dff17F685B;
    VulnerableContract public s_vulnerableContract;
    //bytes4 constant selectorTwo = 0x5fdf05d7;
    bytes4 constant selectorTwo = 0x332c39dc;

    function getOwner() external pure returns (address) {
        return owner;
    }

    function one() public {
        s_vulnerableContract = VulnerableContract(0x241F77325C073a3815985691f76B58dff17F685B);
        s_vulnerableContract.callContractAgain(address(this), selectorTwo); //is it address(this) that is wrong?
    }

    function two() public pure returns (bool) {
        return true;
    }

    function doSomething() public pure returns (bool) {
        return true;
    }
}

// Solutions:
//
// Tentar tudo em localhost e tentar encontrar o bug
// Ver se posso chamar duas vezes seguidas em vez de reentrancy
// Fallback em vez de one() e two() e ter dois contratos
// maybe its the s_otherVar state variable that is not starting at 0
// is it the function selectors?
