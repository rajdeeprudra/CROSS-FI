import { AppShell } from "@/components/Shell";
import { DashboardBalances } from "@/components/DashboardBalances";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-300">
            Overview of your cross-chain positions across Solana, Polygon, Arbitrum, and Base.
          </p>
        </div>

        <DashboardBalances />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="text-xs text-slate-400">Total supplied</div>
            <div className="mt-2 text-2xl font-semibold">$0.00</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="text-xs text-slate-400">Total borrowed</div>
            <div className="mt-2 text-2xl font-semibold">$0.00</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="text-xs text-slate-400">Health factor</div>
            <div className="mt-2 text-2xl font-semibold text-emerald-400">∞</div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-200">Open positions</h2>
            <span className="text-xs text-slate-500">On-chain data wiring coming next</span>
          </div>
          <div className="text-sm text-slate-400">You don&apos;t have any positions yet.</div>
        </div>
      </div>
    </AppShell>
  );
}

