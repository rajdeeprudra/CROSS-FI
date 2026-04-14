# Cross-Chain Lending Frontend (web)

This is a Next.js (React + TypeScript) frontend for a cross-chain lending and borrowing protocol (Solana + Polygon + Arbitrum + Base).

## Tech stack

- Next.js 14 (App Router, `src/app`)
- React 18
- TypeScript

## Getting started

1. Install dependencies:

```bash
cd web
npm install
```

2. Run the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser (if the port is busy, Next will pick another, e.g. `3001`).

## What works today

- Solana wallet (Phantom / Solflare) and EVM wallet (MetaMask-style `window.ethereum`).
- Chain switch for Polygon / Arbitrum / Base.
- **Dashboard: live USDC wallet balances** on Solana mainnet and on the selected EVM chain (reads on-chain; no lending pool yet).

## Roadmap (step by step)

1. **Liquidity protocol (on-chain)** — Solana program (Rust/Anchor) + EVM lending pool (Solidity): deposits, borrows, interest, liquidations.
2. **Deploy + wire addresses** — env-based program/pool IDs; replace mock markets with live APYs/utilization.
3. **Cross-chain credit** — message layer (e.g. Wormhole) + controllers on each chain; UI for cross-chain borrow wizard.
4. **Hardening** — oracles (Pyth / Chainlink), indexing, gas/relayer UX, optional KYC-gated pools.

