"use client";

import { useState } from "react";
import { AppShell } from "@/components/Shell";
import { getCrossChainContract } from "@/lib/contract";
import { ethers } from "ethers";

export default function CrossChainBorrowPage() {
  const [amount, setAmount] = useState("");

  const handleCrossChain = async () => {
    try {
      if (!amount || Number(amount) <= 0) {
        alert("Enter valid amount");
        return;
      }

      const contract = await getCrossChainContract();

      const tx = await contract.createPosition(
        "Solana",
        "Polygon",
        ethers.parseUnits(amount, 18)
      );

      await tx.wait();

      alert("✅ Cross-chain position created!");
    } catch (err) {
      console.error(err);
      alert("❌ Transaction failed");
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Cross-chain borrow
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Supply USDC on one chain and borrow on another.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 p-4 space-y-6">
          {/* INPUT */}
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-950 p-2 rounded"
          />

          {/* BUTTON */}
          <button
            onClick={handleCrossChain}
            className="w-full bg-sky-500 px-4 py-2 text-white rounded"
          >
            Create cross-chain position
          </button>
        </div>
      </div>
    </AppShell>
  );
}