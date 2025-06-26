"use client";

import { useConnect, useDisconnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";

export default function WalletConnect() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  if (isConnected) {
    return (
      <div className="page-container">
        ✅ Verbunden mit: {address.slice(0, 6)}...{address.slice(-4)}{" "}
        <button onClick={() => disconnect()}>Trennen</button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button onClick={() => connect({ connector: injected() })}>
        🔌 Mit MetaMask verbinden
      </button>
    </div>
  );
}