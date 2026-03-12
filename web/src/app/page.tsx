import Link from "next/link";
import { AppShell } from "@/components/Shell";

export default function HomePage() {
  return (
    <AppShell>
      <section className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Cross-chain lending &amp; borrowing
            <span className="block text-sky-400">Solana ↔ Polygon ↔ Arbitrum ↔ Base</span>
          </h1>
          <p className="text-slate-300 max-w-xl text-sm md:text-base">
            Supply USDC on one chain and borrow on another with low fees, unified risk
            management, and smart routing. Built for next-generation cross-chain DeFi.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
            >
              Launch dashboard
            </Link>
            <Link
              href="/markets"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-sky-500"
            >
              Explore markets
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-slate-400">Supported chains</div>
              <div className="mt-2 text-lg font-semibold">Solana + 3 EVM</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-slate-400">Collateral</div>
              <div className="mt-2 text-lg font-semibold">USDC</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-slate-400">Borrow assets</div>
              <div className="mt-2 text-lg font-semibold">Stablecoins &amp; majors</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-slate-400">Model</div>
              <div className="mt-2 text-lg font-semibold">Aave / Compound-style</div>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-80 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Cross-chain position (preview)</span>
              <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs text-sky-400">
                Coming soon
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Collateral chain</span>
                <span className="font-medium text-slate-100">Solana (USDC)</span>
              </div>
              <div className="flex justify-between">
                <span>Borrow chain</span>
                <span className="font-medium text-slate-100">Arbitrum (USDC)</span>
              </div>
              <div className="flex justify-between">
                <span>Target LTV</span>
                <span className="font-medium text-slate-100">70%</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated health factor</span>
                <span className="font-medium text-emerald-400">1.8</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 text-xs text-slate-400">
            <div className="font-medium text-slate-200">Next steps</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Integrate Solana &amp; EVM wallets</li>
              <li>Add Solana Rust and EVM Solidity contracts</li>
              <li>Wire up cross-chain messaging and health factor</li>
            </ul>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
