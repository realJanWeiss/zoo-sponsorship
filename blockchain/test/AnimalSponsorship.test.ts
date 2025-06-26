import { expect } from "chai";
import { viem } from "hardhat";
import { parseAbiItem } from "viem";
import { getAddress, parseEther } from "viem/utils";
import { deployContract } from "./utils/deploy";

describe("AnimalSponsorship", () => {
  let zooOwner: `0x${string}`;
  let user1: `0x${string}`;
  let user2: `0x${string}`;
  let animalSponsorship: Awaited<ReturnType<typeof deployContract>>;

  beforeEach(async () => {
    const [ownerClient, u1, u2] = await viem.getWalletClients();
    zooOwner = ownerClient.account.address;
    user1 = u1.account.address;
    user2 = u2.account.address;

    animalSponsorship = await deployContract("AnimalSponsorship", []);
  });

  it("should mint 100 tokens for each animal to the zoo", async () => {
    const publicClient = await viem.getPublicClient();

    for (let tokenId = 1; tokenId <= 5; tokenId++) {
      const balance = await publicClient.readContract({
        address: animalSponsorship.address,
        abi: animalSponsorship.abi,
        functionName: "balanceOf",
        args: [zooOwner, tokenId],
      });

      expect(balance).to.equal(100n);
    }
  });

  it("should transfer a token from zoo to user", async () => {
    const client = await viem.getWalletClient(zooOwner);
    await client.writeContract({
      address: animalSponsorship.address,
      abi: animalSponsorship.abi,
      functionName: "safeTransferFrom",
      args: [zooOwner, user1, 1, 1, "0x"],
    });

    const publicClient = await viem.getPublicClient();
    const userBalance = await publicClient.readContract({
      address: animalSponsorship.address,
      abi: animalSponsorship.abi,
      functionName: "balanceOf",
      args: [user1, 1],
    });

    expect(userBalance).to.equal(1n);
  });

  it("should allow user to return token to the zoo", async () => {
    const zooClient = await viem.getWalletClient(zooOwner);
    const userClient = await viem.getWalletClient(user1);

    // Transfer to user
    await zooClient.writeContract({
      address: animalSponsorship.address,
      abi: animalSponsorship.abi,
      functionName: "safeTransferFrom",
      args: [zooOwner, user1, 2, 1, "0x"],
    });

    // User returns token
    await userClient.writeContract({
      address: animalSponsorship.address,
      abi: animalSponsorship.abi,
      functionName: "returnToken",
      args: [2],
    });

    const publicClient = await viem.getPublicClient();
    const balanceBack = await publicClient.readContract({
      address: animalSponsorship.address,
      abi: animalSponsorship.abi,
      functionName: "balanceOf",
      args: [zooOwner, 2],
    });

    expect(balanceBack).to.equal(100n);
  });

  it("should return correct URI", async () => {
    const publicClient = await viem.getPublicClient();

    const uri = await publicClient.readContract({
      address: animalSponsorship.address,
      abi: animalSponsorship.abi,
      functionName: "uri",
      args: [1],
    });

    expect(uri).to.contain("ipfs.io");
  });
});
