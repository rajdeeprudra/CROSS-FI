 "use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { EVM_CHAINS } from "@/lib/evm";
import { useEvmWallet } from "@/context/EvmWalletContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/markets", label: "Markets" },
  { href: "/lend", label: "Lend" },
  { href: "/borrow", label: "Borrow" },
  { href: "/xchain-borrow", label: "Cross-chain Borrow" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { address: evmAddress, chainId: evmChainId, chainName: evmChainName, connect, forget, switchToChain } =
    useEvmWallet();

  const shortAddress =
    publicKey != null
      ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
      : null;

  const shortEvm = useMemo(() => {
    if (!evmAddress) return null;
    return `${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}`;
  }, [evmAddress]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-500" />
          <span className="font-semibold text-lg tracking-tight">CrossChainLend</span>
        </div>
        <nav className="hidden md:flex gap-4 text-sm text-slate-300">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVisible(true)}
            className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-sky-400"
          >
            {shortAddress ?? "Connect Solana"}
          </button>
          <button
            onClick={async () => {
              if (evmAddress) {
                forget();
                return;
              }
              await connect();
            }}
            className="rounded-full border border-slate-700 bg-slate-950 px-4 py-1.5 text-sm font-medium text-slate-100 hover:border-sky-500"
          >
            {shortEvm ?? "Connect EVM"}
          </button>
          {evmAddress ? (
            <select
              value={evmChainId ?? ""}
              onChange={async (e) => {
                const id = Number(e.target.value);
                await switchToChain(id);
              }}
              className="hidden lg:block rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 text-sm text-slate-200"
            >
              <option value="" disabled>
                {evmChainName ?? "Select chain"}
              </option>
              {EVM_CHAINS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      </header>
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-6">{children}</div>
    </main>
  );
}

