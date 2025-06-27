"use client";

import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../lib/constants";
import { useEffect } from "react";

export default function TokenAvailability({ tokenId, refreshKey }: { tokenId: number; refreshKey: number }) {

  const { data: zooOwner, isLoading: loadingOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "zooOwner",
  });

  const { data: tokenCount, isLoading: loadingCount, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [zooOwner!, tokenId],
    query: { 
      enabled: !!zooOwner,
    }, // warte, bis zooOwner geladen ist
  });

  useEffect(() => {
    refetch();
  }, [refreshKey]);

  if (loadingOwner || loadingCount) return <p>⏳ Lade ...</p>;

  return (
    <span className="text-sm text-gray-600">
      Noch <strong className="text-black">{tokenCount?.toString() ?? "0"}</strong> Patenschaften verfügbar
    </span>
  );
}