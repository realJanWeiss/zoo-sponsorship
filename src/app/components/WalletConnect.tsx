"use client";

import { LogIn, UserRoundCheck } from "lucide-react";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "@/components/ui/button";

export default function WalletConnect() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const triggerConnect = () => {
    connect({ connector: injected() });
  };

  const triggerDisconnect = () => {
    disconnect();
  };

  if (isConnected) {
    return (
      <Button
        onClick={triggerDisconnect}
        size="icon"
        variant="ghost"
        className="size-10"
      >
        <UserRoundCheck className="size-8" />
      </Button>
    );
  }

  return (
    <Button onClick={triggerConnect}>
      <LogIn />
      Login
    </Button>
  );
}
