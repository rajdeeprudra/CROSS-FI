/* Solana + EVM wallet providers */
"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { WagmiProvider, http, createConfig } from "wagmi";
import { arbitrum, base, polygon } from "wagmi/chains";

require("@solana/wallet-adapter-react-ui/styles.css");

const wagmiConfig = createConfig({
  chains: [arbitrum, base, polygon],
  transports: {
    [arbitrum.id]: http(),
    [base.id]: http(),
    [polygon.id]: http()
  }
});

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  const endpoint = "https://api.mainnet-beta.solana.com";
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

