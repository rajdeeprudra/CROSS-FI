import { AppShell } from "@/components/Shell";

export default function LendPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Lend</h1>
          <p className="mt-2 text-sm text-slate-300">
            Supply USDC on your preferred chain. In the next step we&apos;ll wire this to Solana
            and EVM smart contracts.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs mb-1 text-slate-400">Chain</label>
              <select className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100">
                <option>Solana</option>
                <option>Polygon</option>
                <option>Arbitrum</option>
                <option>Base</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1 text-slate-400">Asset</label>
              <select className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100">
                <option>USDC</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1 text-slate-400">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            />
            <div className="mt-1 text-xs text-slate-500">Balance: 0.00 USDC</div>
          </div>

          <button className="w-full rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400">
            Supply USDC
          </button>
        </div>
      </div>
    </AppShell>
  );
}

