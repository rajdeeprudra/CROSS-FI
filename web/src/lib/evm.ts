export type EvmChain = {
  id: number;
  name: string;
  rpcUrls: string[];
  nativeCurrency: { name: string; symbol: string; decimals: number };
  blockExplorerUrls: string[];
};

export const EVM_CHAINS: EvmChain[] = [
  {
    id: 137,
    name: "Polygon",
    rpcUrls: ["https://polygon-rpc.com"],
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    blockExplorerUrls: ["https://polygonscan.com"]
  },
  {
    id: 42161,
    name: "Arbitrum One",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: ["https://arbiscan.io"]
  },
  {
    id: 8453,
    name: "Base",
    rpcUrls: ["https://mainnet.base.org"],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: ["https://basescan.org"]
  }
];

export type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
  on?: (event: string, cb: (...args: any[]) => void) => void;
  removeListener?: (event: string, cb: (...args: any[]) => void) => void;
};

export function getEthereum(): EthereumProvider | null {
  const w = globalThis as any;
  return (w?.ethereum as EthereumProvider | undefined) ?? null;
}

export async function evmConnect(): Promise<{ address: string; chainId: number }> {
  const eth = getEthereum();
  if (!eth) throw new Error("No EVM wallet found (install MetaMask/Rabby).");

  const accounts = (await eth.request({
    method: "eth_requestAccounts"
  })) as string[];

  const chainIdHex = (await eth.request({ method: "eth_chainId" })) as string;
  return { address: accounts[0]!, chainId: Number.parseInt(chainIdHex, 16) };
}

export async function evmGetAccounts(): Promise<string[]> {
  const eth = getEthereum();
  if (!eth) return [];
  return (await eth.request({ method: "eth_accounts" })) as string[];
}

export async function evmGetChainId(): Promise<number | null> {
  const eth = getEthereum();
  if (!eth) return null;
  const chainIdHex = (await eth.request({ method: "eth_chainId" })) as string;
  return Number.parseInt(chainIdHex, 16);
}

export async function evmSwitchChain(targetChainId: number) {
  const eth = getEthereum();
  if (!eth) throw new Error("No EVM wallet found.");

  const chainIdHex = `0x${targetChainId.toString(16)}`;
  try {
    await eth.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }]
    });
  } catch (e: any) {
    // 4902 = chain not added
    if (e?.code === 4902) {
      const chain = EVM_CHAINS.find((c) => c.id === targetChainId);
      if (!chain) throw e;
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: chainIdHex,
            chainName: chain.name,
            rpcUrls: chain.rpcUrls,
            nativeCurrency: chain.nativeCurrency,
            blockExplorerUrls: chain.blockExplorerUrls
          }
        ]
      });
      return;
    }
    throw e;
  }
}

