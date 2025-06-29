# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

For this project these commands should be enough

```shell
npm i # Install the required packages
npx hardhat compile # Compiles den Contract in Bytecode und ABI

npx hardhat node # Starts a local Ethereum chain, must be done, before you can deploy
npx hardhat run scripts/deploy.ts --network localhost # Deploys the Contract on the local chain and compiles it, if there are changes

npx hardhat test # Runs the tests in the test folder
```
If you want to try out the project in your own Wallet, for exmaple MetaMask:

- Create a new Network with these attributes:
    - Network Name: Hardhat Test Node (Can be Freely chosen)
    - Default RPC URL: 127.0.0.1:8545
    - Chain ID: 31337
    - Currency Symbol: ETH
- Save the network
- Add a new Account via Private Key
- Copy one of the private Keys of the accounts that were generated by `npx hardhat node` and paste it in
- After a short wait your test account should be generated


Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
