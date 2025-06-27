"use client";

import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../lib/constants";

export default function TokenAvailability({ tokenId}: {tokenId: number}) {

  const { data: zooOwner, isLoading: loadingOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "zooOwner",
  });

  // 2. Lese Balance des zooOwner für diesen Token
  const { data: tokenCount, isLoading: loadingCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [zooOwner!, tokenId],
    query: { enabled: !!zooOwner }, // warte, bis zooOwner geladen ist
  });

  if (loadingOwner || loadingCount) return <p>⏳ Lade ...</p>;

  return (
    <p>
      🐘 Noch verfügbar: {tokenCount?.toString() ?? "0"} Patenschaften für Tier {tokenId}
    </p>
  );
}