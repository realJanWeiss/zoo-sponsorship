import { createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  autoConnect: true,
  connectors: [injected()],
  publicClient: configureChains([mainnet], [publicProvider()]).publicClient,
});