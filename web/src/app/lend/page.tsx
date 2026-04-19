"use client";

import { useState } from "react";
import { AppShell } from "@/components/Shell";

export default function LendPage() {
  const [amount, setAmount] = useState(0);

  return (
    <AppShell>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Lend</h1>
          <p className="mt-2 text-sm text-slate-300">
            Supply USDC on your preferred chain and simulate yield generation.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 p-4 space-y-4">
          <select className="w-full bg-slate-950 p-2 rounded">
            <option>Solana</option>
            <option>Polygon</option>
            <option>Arbitrum</option>
            <option>Base</option>
          </select>

          <input
            type="number"
            placeholder="0.00"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-slate-950 p-2 rounded"
          />

          <div className="text-xs text-slate-400">
            Estimated APY: {(3 + amount * 0.002).toFixed(2)}%
          </div>

          <button className="w-full bg-sky-500 p-2 rounded">
            Supply USDC
          </button>
        </div>
      </div>
    </AppShell>
  );
}