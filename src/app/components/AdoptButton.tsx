"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../../lib/constants";
import { useState } from "react";
import { publicClient, wagmiConfig } from "../../../lib/wagmi";

export default function AdoptButton({ tokenId }: { tokenId: number }) {
  const { address: account, isConnected } = useAccount();
  const [txHash, setTxHash] = useState<string | null>(null);

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

//   const handleAdopt = async () => {
//     try {
//         const hash = await writeContract({
//             address: CONTRACT_ADDRESS,
//             abi: CONTRACT_ABI,
//             functionName: "adopt",
//             args: [tokenId],
//         });

//         console.log("Adoption Hash:", hash);

//         const receipt = await publicClient.waitForTransactionReceipt({ hash: hash });
//         console.log("Adoption Receipt:", receipt);
//     } catch (err) {
//         console.error("Fehler bei Adoption:", err);
//     }
//     };

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
          // warte auf Blockbestätigung (optional)
          const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
          console.log("Status:", receipt.status); // 1 = success, 0 = failure
          setTimeout(() => {
            refetchBalance(); // aktualisiert Besitz
          }, 3000);
        },
      }
    );
  };

  const alreadyAdopted = (userBalance as bigint ?? 0n) > 0n;

  if (!isConnected) return <p>⛔ Bitte verbinde deine Wallet.</p>;
  if (loadingBalance) return <p>⏳ Prüfe Besitz …</p>;
  if (alreadyAdopted) return <p>✅ Du hast dieses Tier bereits adoptiert.</p>;

  return (
    <div className="my-4">
      <button
        disabled={isPending}
        onClick={handleAdopt}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? "⏳ Adoption läuft …" : "🐾 Jetzt adoptieren"}
      </button>

      {txHash && (
        <p className="mt-2 text-sm">
          ✅ Adoption gesendet: <span className="font-mono">{txHash.slice(0, 10)}…</span>
        </p>
      )}

      {error && <p className="text-red-600 mt-2">❌ Fehler: {error.message}</p>}
    </div>
  );
}
