import { AppShell } from "@/components/Shell";

export default function CrossChainBorrowPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Cross-chain borrow</h1>
          <p className="mt-2 text-sm text-slate-300">
            Supply USDC on one chain and borrow on another. This wizard will later be wired to
            Solana + EVM cross-chain controllers.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-medium text-slate-200 mb-3">Collateral side</h2>
              <label className="block text-xs mb-1 text-slate-400">Collateral chain</label>
              <select className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 mb-3">
                <option>Solana</option>
                <option>Polygon</option>
                <option>Arbitrum</option>
                <option>Base</option>
              </select>
              <label className="block text-xs mb-1 text-slate-400">Collateral asset</label>
              <select className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100">
                <option>USDC</option>
              </select>
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-200 mb-3">Borrow side</h2>
              <label className="block text-xs mb-1 text-slate-400">Borrow chain</label>
              <select className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 mb-3">
                <option>Polygon</option>
                <option>Arbitrum</option>
                <option>Base</option>
                <option>Solana</option>
              </select>
              <label className="block text-xs mb-1 text-slate-400">Asset to borrow</label>
              <select className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100">
                <option>USDC</option>
                <option>USDT</option>
                <option>WETH</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1 text-slate-400">Borrow amount</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3 text-xs text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="text-slate-400">Estimated LTV</div>
              <div className="mt-1 text-base font-semibold text-slate-100">0%</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="text-slate-400">Estimated health factor</div>
              <div className="mt-1 text-base font-semibold text-emerald-400">∞</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="text-slate-400">Estimated route APR</div>
              <div className="mt-1 text-base font-semibold text-sky-400">–</div>
            </div>
          </div>

          <button className="w-full rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400">
            Create cross-chain position
          </button>
        </div>
      </div>
    </AppShell>
  );
}

