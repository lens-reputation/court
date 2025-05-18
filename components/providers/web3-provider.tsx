"use client";

import { lensMainnet } from "@/lib/chains/lens-mainnet";
import { client } from "@/lib/lens/client";
import { LensProvider } from "@lens-protocol/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiProvider, createConfig, http } from "wagmi";

// Create a new query client for TanStack Query
const queryClient = new QueryClient();

// Create Wagmi config using ConnectKit's default configuration
const config = createConfig(
  getDefaultConfig({
    // Chains supported by your application
    chains: [lensMainnet],
    transports: {
      // RPC URLs for each chain
      [lensMainnet.id]: http("https://rpc.lens.xyz"),
    },

    // WalletConnect project ID (required)
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

    // Required app information
    appName: "Verdant - Personal Token Platform",

    // Optional app information
    appDescription: "Create and grow your personal token in the Lens ecosystem",
    appUrl: "https://verdant.app", // Your app's URL
    appIcon: "/placeholder-logo.png", // Your app's icon
  }),
);

// Provider component that wraps the application
export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <LensProvider client={client}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </LensProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
