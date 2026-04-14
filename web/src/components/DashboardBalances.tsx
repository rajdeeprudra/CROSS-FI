"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { useEvmWallet } from "@/context/EvmWalletContext";
import { fetchEvmUsdcBalance, fetchSolanaUsdcBalance } from "@/lib/balances";
import { USDC_EVM } from "@/config/tokens";

function formatUsd(s: string) {
  const n = Number(s);
  if (Number.isNaN(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(n);
}

export function DashboardBalances() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { address: evmAddress, chainId } = useEvmWallet();

  const [solUsdc, setSolUsdc] = useState<string | null>(null);
  const [evmUsdc, setEvmUsdc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      if (publicKey) {
        const r = await fetchSolanaUsdcBalance(connection, publicKey);
        setSolUsdc(r.formatted);
      } else {
        setSolUsdc(null);
      }

      if (evmAddress && chainId != null && USDC_EVM[chainId]) {
        const r = await fetchEvmUsdcBalance(chainId, evmAddress as `0x${string}`);
        setEvmUsdc(r?.formatted ?? null);
      } else {
        setEvmUsdc(null);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load balances");
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey, evmAddress, chainId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-slate-200">Wallet balances (USDC)</h2>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-sky-500"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      {err ? <p className="text-xs text-rose-400">{err}</p> : null}
      <div className="grid gap-3 md:grid-cols-2 text-sm">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <div className="text-xs text-slate-500">Solana</div>
          <div className="mt-1 text-lg font-semibold text-slate-100">
            {publicKey ? formatUsd(solUsdc ?? "0") : "—"}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {publicKey ? "Mainnet USDC in your wallet" : "Connect Solana to see balance"}
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <div className="text-xs text-slate-500">EVM (current chain)</div>
          <div className="mt-1 text-lg font-semibold text-slate-100">
            {evmAddress && chainId != null && USDC_EVM[chainId]
              ? formatUsd(evmUsdc ?? "0")
              : "—"}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {!evmAddress
              ? "Connect EVM and switch to Polygon, Arbitrum, or Base"
              : chainId != null && !USDC_EVM[chainId]
                ? "Switch to Polygon, Arbitrum, or Base for USDC"
                : "Native USDC on this chain"}
          </div>
        </div>
      </div>
    </div>
  );
}
