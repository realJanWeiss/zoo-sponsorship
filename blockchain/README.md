# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npm i
npx hardhat compile # Kompiliert den COntarct in Bytecode und ABI

npx hardhat node # Startet einen lokale Etherum chain, muss gemacht werden, bevor man deployen kann
npx hardhat run scripts/deploy.ts --network localhost # Deployed den Contract auf der lokalen Chain

npx hardhat test # Führt die Test Dateien im Testordner aus
```


```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
