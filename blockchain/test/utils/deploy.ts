import { viem, artifacts } from "hardhat";

export async function deployContract(contractName: string, args: any[] = []) {
  const [walletClient] = await viem.getWalletClients();
  const artifact = await artifacts.readArtifact(contractName);

  const hash = await walletClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode as `0x${string}`,
    args,
  });

  const publicClient = await viem.getPublicClient();
  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  return {
    address: receipt.contractAddress as `0x${string}`,
    abi: artifact.abi,
  };
}
