"use client";

import dynamic from "next/dynamic";

const WalletConnect = dynamic(() => import("./WalletConnect"), { ssr: false });

export default function HeaderActions() {
  return <WalletConnect />;
}
