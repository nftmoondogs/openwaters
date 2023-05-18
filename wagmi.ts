import { configureChains, createClient } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, testnet } from "./config/network";
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const { chains, provider, webSocketProvider } = configureChains(
  [...(process.env.NODE_ENV === "production" ? [mainnet] : [mainnet])],
  [publicProvider()]
);

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({ options: { projectId: projectId as string } }),
  ],
  provider,
  webSocketProvider,
});
