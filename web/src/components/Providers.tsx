/* Solana wallet providers (EVM handled via window.ethereum for now) */
"use client";

import type { ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { EvmWalletProvider } from "@/context/EvmWalletContext";

require("@solana/wallet-adapter-react-ui/styles.css");

export function AppProviders({ children }: { children: ReactNode }) {
  // ✅ Changed to Devnet
  const endpoint = "https://api.devnet.solana.com";

  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <EvmWalletProvider>{children}</EvmWalletProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
