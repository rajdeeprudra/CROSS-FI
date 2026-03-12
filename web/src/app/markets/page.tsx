import { AppShell } from "@/components/Shell";

const mockMarkets = [
  {
    chain: "Solana",
    asset: "USDC",
    supplyApy: "4.2%",
    borrowApy: "7.8%",
    liquidity: "$12.3M"
  },
  {
    chain: "Polygon",
    asset: "USDC",
    supplyApy: "3.9%",
    borrowApy: "7.1%",
    liquidity: "$8.5M"
  },
  {
    chain: "Arbitrum",
    asset: "USDC",
    supplyApy: "4.5%",
    borrowApy: "8.0%",
    liquidity: "$9.7M"
  },
  {
    chain: "Base",
    asset: "USDC",
    supplyApy: "4.0%",
    borrowApy: "7.4%",
    liquidity: "$5.2M"
  }
];

export default function MarketsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Markets</h1>
          <p className="mt-2 text-sm text-slate-300">
            Live money markets per chain. These will later be powered by on-chain reserves and
            oracles.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Chain</th>
                <th className="px-4 py-3 text-left font-medium">Asset</th>
                <th className="px-4 py-3 text-right font-medium">Supply APY</th>
                <th className="px-4 py-3 text-right font-medium">Borrow APY</th>
                <th className="px-4 py-3 text-right font-medium">Liquidity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {mockMarkets.map((mkt) => (
                <tr key={`${mkt.chain}-${mkt.asset}`} className="hover:bg-slate-900/80">
                  <td className="px-4 py-3 text-slate-100">{mkt.chain}</td>
                  <td className="px-4 py-3 text-slate-200">{mkt.asset}</td>
                  <td className="px-4 py-3 text-right text-emerald-400">{mkt.supplyApy}</td>
                  <td className="px-4 py-3 text-right text-rose-400">{mkt.borrowApy}</td>
                  <td className="px-4 py-3 text-right text-slate-200">{mkt.liquidity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

