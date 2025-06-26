import { viem, artifacts } from "hardhat";

async function main() {
  const [walletClient] = await viem.getWalletClients();
  const publicClient = await viem.getPublicClient();

  const deployer = walletClient.account.address;
  const balance = await publicClient.getBalance({ address: deployer });

  console.log("Deploying contract with account:", deployer);
  console.log("Account balance:", balance / 10n ** 18n, "ETH");

  const artifact = await artifacts.readArtifact("AnimalSponsorship");

  const hash = await walletClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode as `0x${string}`,
    args: [],
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log("✅ Contract deployed to:", receipt.contractAddress);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});