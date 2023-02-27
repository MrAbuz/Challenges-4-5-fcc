//script to transfer the nft to the account where I have all the patrick nfts

const { getNamedAccounts, ethers } = require("hardhat")
require("dotenv").config()

async function main() {
    const NftAddress = "0x9E9a4e58dDc9483d241AfC9a028E89BD9b9fa683"
    const receiptAddress = process.env.RECEIPT_ADDRESS
    const myAddress = process.env.MY_ADDRESS
    const tokenId = 73

    const { deployer } = await getNamedAccounts()

    const nft = await ethers.getContractAt("ERC721", NftAddress, deployer)

    console.log("Got the contract pointer successfully")

    const nftApprove = await nft.approve(receiptAddress, tokenId)
    await nftApprove.wait(1)

    console.log("Nft was approved!")

    const nftTransfer = await nft.transferFrom(myAddress, receiptAddress, tokenId)
    await nftTransfer.wait(1)

    console.log("Transfer of the NFT was sucessfull. Congratulations!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
