import { Connection, PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { arbitrum, base, polygon } from "viem/chains";
import { createPublicClient, erc20Abi, formatUnits, http } from "viem";
import { USDC_DECIMALS, USDC_EVM, USDC_SOLANA_MINT } from "@/config/tokens";

const viemChainById: Record<number, typeof polygon | typeof arbitrum | typeof base> = {
  137: polygon,
  42161: arbitrum,
  8453: base
};

export async function fetchEvmUsdcBalance(
  chainId: number,
  walletAddress: `0x${string}`
): Promise<{ raw: bigint; formatted: string } | null> {
  const token = USDC_EVM[chainId];
  const chain = viemChainById[chainId];
  if (!token || !chain) return null;

  const client = createPublicClient({
    chain,
    transport: http()
  });

  const raw = await client.readContract({
    address: token,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [walletAddress]
  });

  return {
    raw,
    formatted: formatUnits(raw, USDC_DECIMALS)
  };
}

export async function fetchSolanaUsdcBalance(
  connection: Connection,
  owner: PublicKey
): Promise<{ raw: bigint; formatted: string }> {
  const mint = new PublicKey(USDC_SOLANA_MINT);
  const ata = await getAssociatedTokenAddress(mint, owner);
  try {
    const acc = await getAccount(connection, ata);
    const raw = acc.amount;
    return {
      raw,
      formatted: formatUnits(raw, USDC_DECIMALS)
    };
  } catch {
    return { raw: BigInt(0), formatted: "0" };
  }
}
