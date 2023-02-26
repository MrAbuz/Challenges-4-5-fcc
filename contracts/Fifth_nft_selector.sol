// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract selectorContract {
    function getSelectorOne() public pure returns (bytes4 selector) {
        selector = bytes4(keccak256(bytes("one()")));
    }

    function getSelectorTwo() public pure returns (bytes4 selector) {
        selector = bytes4(keccak256(bytes("two()")));
    }
}
