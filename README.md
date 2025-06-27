![Logo](./public/logo.svg)

# Happy Paws Zoo

This project involved developing a web application through which users can symbolically adopt
various zoo animals. Each adoption is represented by an NFT (Non-Fungible Token) on the
Ethereum test blockchain. The smart contracts are based on the ERC1155 standard, allowing
for the efficient management of multiple token types within a single contract.

The NFTs carry not only symbolic value for the sponsors but also act as tamper-proof digital
certificates permanently stored on the blockchain. This allows proof of support for a specific
animal to remain transparent, verifiable, and publicly accessible—making the user’s
contribution particularly meaningful.

In addition to this emotional and symbolic value, the NFTs also have potential real-world
applications: for example, they could be used as digital entry tickets to the zoo in the future.

The solution is entirely based on decentralized infrastructure, which ensures security,
transparency, and longevity—without relying on centralized servers or databases.

## Technical background

- The tokens follow the ERC-1155 standard, allowing multiple unique token types to be
managed in one contract.
- Each animal has an individual metadata file (name, description, image, attributes)
stored on IPFS (InterPlanetary File System).
- When a user "adopts" an animal, the token is transferred from the zoo wallet to the
user's wallet. A return function is also available.
- The web application connects to the smart contract via a wallet (e.g., MetaMask) and
enables direct, user-friendly interaction.

## Project goal

The project demonstrates how blockchain technology and NFTs can be used for meaningful
and creative applications — such as digital animal sponsorships as a modern extension of
traditional donation models.

## Used tools

**OpenZeppelin ERC1155**\
Standardized and audited smart contract template for managing multiple NFTs in one contract

**Remix IDE**\
Web-based development environment for writing, compiling, and deploying smart contracts

**React.js**\
JavaScript framework used for building the frontend of the web application

**Wagmi**\
React Hooks library for connecting to Ethereum wallets (e.g., MetaMask), used for wallet integration and smart contract interaction

**Hardhat**\
Local development environment for simulating, testing, and deploying smart contracts

**Pinata**\
IPFS service used to store metadata and images for the animal NFTs

**MetaMask Wallet**\
Browser extension used to manage wallets and sign transactions

**GitHub**\
Repository for version control and collaboration
