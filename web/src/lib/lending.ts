export type Chain = "Solana" | "Polygon" | "Arbitrum" | "Base";
export type Asset = "USDC" | "USDT" | "WETH";

export const COLLATERAL_FACTOR = 0.75;

export function calculateLTV(collateral: number, borrow: number) {
  if (collateral === 0) return 0;
  return (borrow / collateral) * 100;
}

export function calculateHealthFactor(collateral: number, borrow: number) {
  if (borrow === 0) return Infinity;
  return (collateral * COLLATERAL_FACTOR) / borrow;
}

export function estimateAPR(utilization: number) {
  return 3 + 0.15 * utilization; // simple model
}