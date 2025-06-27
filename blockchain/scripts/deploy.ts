import { viem, artifacts } from "hardhat";
import * as fs from "fs";
import * as path from "path";

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
    args: [], // ggf. Argumente ergänzen
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  const contractAddress = receipt.contractAddress as `0x${string}`;
  console.log("Contract deployed to:", contractAddress);

  // Speicherort für das Frontend
  const outputDir = path.join(__dirname, "..", "..", "lib");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Daten speichern
  const outputPath = path.join(outputDir, "AnimalSponsorship.json");
  const output = {
    address: contractAddress,
    abi: artifact.abi,
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Contract data saved to: ${outputPath}`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});