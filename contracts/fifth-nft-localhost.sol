// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";
import "hardhat/console.sol";

error CourseCompletedNFT__Nope();
error VulnerableContract__Nope();
error VulnerableContract__NopeCall();
error CourseCompletedNFT__NotOwnerOfOtherContract();

interface OtherContract {
    function getOwner() external returns (address);
}

contract localhost {
    uint256 public s_variable = 0;

    address constant owner = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    PatrickOne public vulnerableContract;

    function getOwner() public pure returns (address) {
        return owner;
    }

    function one() public {
        vulnerableContract = PatrickOne(msg.sender);
        vulnerableContract.callContractAgain(address(this), getSelectorTwo());
    }

    function two() public pure returns (bool) {
        return true;
    }

    function doSomething() public {
        s_variable = 123;
    }

    function getSelectorOne() public pure returns (bytes4 selector) {
        selector = bytes4(keccak256(bytes("one()")));
    }

    function getSelectorTwo() public pure returns (bytes4 selector) {
        selector = bytes4(keccak256(bytes("two()")));
    }
}

contract PatrickOne {
    uint256 public s_variable = 0;
    uint256 public s_otherVar = 0;

    function callContract(address yourAddress) public returns (bool) {
        (bool success, ) = yourAddress.delegatecall(abi.encodeWithSignature("doSomething()"));
        require(success, "error one");
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
        require(success, "error two");
        console.log(s_otherVar);
        if (s_otherVar == 2) {
            return true;
        }
        s_otherVar = 0;
        return false;
    }

    function getOtherVar() public view returns (uint256) {
        return s_otherVar;
    }
}

contract PatrickTwo is ERC721 {
    string public constant TOKEN_IMAGE_URI =
        "ipfs://QmeHo8yoogtNC1aajU6Bn8HEWTGjfv8m7m8ZdDDUzNBXij";
    uint256 private s_tokenCounter;
    uint256 private s_otherVar;
    PatrickOne private s_vulnerableContract;

    constructor(
        address vulnerableContractAddress
    ) ERC721("Patrick's Hardhat FreeCodeCamp Javascript Tutorial | Course Completed", "PHFCC") {
        s_tokenCounter = 0;
        s_vulnerableContract = PatrickOne(vulnerableContractAddress);
    }

    function mintNft(address yourAddress, bytes4 selector) public returns (uint256) {
        console.log("mintNft: first part");

        if (OtherContract(yourAddress).getOwner() != msg.sender) {
            revert CourseCompletedNFT__NotOwnerOfOtherContract();
        }

        console.log("mintNft: second part");

        bool returnedOne = s_vulnerableContract.callContract(yourAddress);

        console.log("mintNft: third part");

        bool returnedTwo = s_vulnerableContract.callContractAgain(yourAddress, selector);

        console.log("mintNft: fourth part");

        if (!returnedOne && !returnedTwo) {
            revert CourseCompletedNFT__Nope();
        }

        console.log("mintNft: fifth part");

        _safeMint(msg.sender, s_tokenCounter);

        console.log("mintNft: sixth part");

        s_tokenCounter = s_tokenCounter + 1;

        console.log("mintNft: seventh part");

        return s_tokenCounter;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(uint256 /* tokenId */) public view override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name(),
                                '", "description":"This is for completing Patricks FreeCodeCamp Video all the way!!! Be sure to say to me on twitter @PatrickAlphaC with this NFT!", ',
                                '"attributes": [{"trait_type": "Ready to be a Smart Contract Engineer", "value": 100}], "image":"',
                                TOKEN_IMAGE_URI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
