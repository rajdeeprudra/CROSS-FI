"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  EVM_CHAINS,
  evmConnect,
  evmGetAccounts,
  evmGetChainId,
  evmSwitchChain
} from "@/lib/evm";

type EvmWalletContextValue = {
  address: string | null;
  chainId: number | null;
  chainName: string | null;
  connect: () => Promise<void>;
  forget: () => void;
  switchToChain: (chainId: number) => Promise<void>;
  refresh: () => Promise<void>;
};

const EvmWalletContext = createContext<EvmWalletContextValue | null>(null);

export function EvmWalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    const [accounts, id] = await Promise.all([evmGetAccounts(), evmGetChainId()]);
    setAddress(accounts[0] ?? null);
    setChainId(id);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const chainName = useMemo(() => {
    if (chainId == null) return null;
    return EVM_CHAINS.find((c) => c.id === chainId)?.name ?? `Chain ${chainId}`;
  }, [chainId]);

  const connect = useCallback(async () => {
    const { address: addr, chainId: id } = await evmConnect();
    setAddress(addr);
    setChainId(id);
  }, []);

  const forget = useCallback(() => {
    setAddress(null);
  }, []);

  const switchToChain = useCallback(async (targetChainId: number) => {
    await evmSwitchChain(targetChainId);
    setChainId(targetChainId);
  }, []);

  const value: EvmWalletContextValue = {
    address,
    chainId,
    chainName,
    connect,
    forget,
    switchToChain,
    refresh
  };

  return <EvmWalletContext.Provider value={value}>{children}</EvmWalletContext.Provider>;
}

export function useEvmWallet() {
  const ctx = useContext(EvmWalletContext);
  if (!ctx) throw new Error("useEvmWallet must be used within EvmWalletProvider");
  return ctx;
}
