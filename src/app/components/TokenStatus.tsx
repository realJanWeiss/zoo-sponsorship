"use client";

import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../lib/animalSponsorship";

export default function TokenStatus() {
  const { address, isConnected } = useAccount();

  const { data, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [address!, 1], // Token-ID 1 = Tonga
    query: { enabled: !!address },
  });

  if (!isConnected) return <p>⛔ Bitte verbinde deine Wallet.</p>;
  if (isLoading) return <p>⏳ Lade Token-Daten …</p>;

  const ownsToken = (data as bigint) > 0n;

  return (
    <p>
      {ownsToken ? "✅ Du besitzt Tonga!" : "❌ Du besitzt Tonga nicht."}
    </p>
  );
}