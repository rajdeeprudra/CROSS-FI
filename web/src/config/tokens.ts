/** Mainnet USDC (collateral + borrow reference). Addresses verified for production mainnets. */
export const USDC_DECIMALS = 6;

/** Solana mainnet USDC mint (Circle). */
export const USDC_SOLANA_MINT =
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" as const;

/** EVM USDC by chain id (native USDC where applicable). */
export const USDC_EVM: Record<number, `0x${string}`> = {
  /** Polygon PoS — native USDC (Circle). */
  137: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  /** Arbitrum One — native USDC. */
  42161: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  /** Base — native USDC. */
  8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
};
