"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../../lib/constants";
import { useState } from "react";
import { publicClient } from "../../../lib/wagmi";
import { Button } from "@/components/ui/button";
import { CheckCircle, Hourglass, PawPrint } from "lucide-react";

export default function AdoptButton({ tokenId, onAdopted }: { tokenId: number, onAdopted: () => void }) {
  const { address: account, isConnected } = useAccount();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  // Besitzabfrage + refetch
  const {
    data: userBalance,
    isLoading: loadingBalance,
    refetch: refetchBalance,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [account!, tokenId],
    query: { enabled: !!account },
  });

  const { writeContract, isPending, error } = useWriteContract();

  const handleAdopt = () => {
    writeContract(
      {
        account,
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "adopt",
        args: [tokenId],
      },
      {
        onSuccess: async (txHash) => {
          setTxHash(txHash);
          setIsWaiting(true);

          const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
          console.log("Status:", receipt.status); // 1 = success, 0 = failure

          setTimeout(() => {
            refetchBalance(); // aktualisiert Besitz
            setIsWaiting(false);
            onAdopted();
          }, 3000);
        },
      }
    );
  };

  const alreadyAdopted = (userBalance as bigint ?? 0n) > 0n;

  if (!isConnected) return <p>⛔ Bitte verbinde deine Wallet.</p>;
  if (loadingBalance) return <p>⏳ Prüfe Besitz …</p>;
  if (alreadyAdopted) {
    return (
      <div className="flex items-center gap-2 text-green-700 text-sm bg-green-100 rounded-md px-3 py-2">
        <CheckCircle className="w-4 h-4" />
        <span>Du hast dieses Tier bereits adoptiert.</span>
      </div>
    );
  }

  return (
    <div className="my-4">

      <Button
        onClick={handleAdopt}
        disabled={isPending || isWaiting}
      >
        {isPending || isWaiting ? <Hourglass /> : <PawPrint />}
        {isPending || isWaiting ? "Adoption läuft …" : "Jetzt adoptieren"}
      </Button>

      {txHash && (
        <p className="mt-2 text-sm">
          Adoption gesendet: <span className="font-mono">{txHash.slice(0, 10)}…</span>
        </p>
      )}

      {/* {error && <p className="text-red-600 mt-2">❌ Fehler: {error.message}</p>} */}
    </div>
  );
}
