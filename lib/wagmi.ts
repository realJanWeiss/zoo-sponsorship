import { createConfig, http } from "wagmi";
import { sepolia, localhost } from "wagmi/chains";
import { createPublicClient, createWalletClient } from "viem";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  connectors: [
    injected(), // z. B. MetaMask
  ],
  chains: [localhost], // oder sepolia, polygon, etc.
  transports: {
    [localhost.id]: http("http://127.0.0.1:8545"), // z. B. http("http://127.0.0.1:8545")
  },
});

export const publicClient = createPublicClient({
  chain: localhost,
  transport: http("http://127.0.0.1:8545"), // oder z. B. http("https://sepolia.infura.io/v3/...")
});

