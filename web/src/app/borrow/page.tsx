"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/Shell";
import { getContract, getPosition } from "@/lib/contract";
import { ethers } from "ethers";

export default function BorrowPage() {
  const [amount, setAmount] = useState(0);
  const [collateral, setCollateral] = useState("0");
  const [debt, setDebt] = useState("0");

  const maxBorrow = 750; // UI placeholder

  // 🔥 Load real on-chain data
  const loadPosition = async () => {
    try {
      const data = await getPosition();
      setCollateral(data.collateral);
      setDebt(data.debt);
    } catch (err) {
      console.error("Error loading position:", err);
    }
  };

  useEffect(() => {
    loadPosition();
  }, []);

  // 🔥 Borrow function
  const handleBorrow = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.borrow(
        ethers.parseUnits(amount.toString(), 18)
      );
      await tx.wait();

      alert("Borrow successful!");

      // 🔥 Refresh data after transaction
      loadPosition();
    } catch (err) {
      console.error(err);
      alert("Borrow failed");
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Borrow</h1>
          <p className="mt-2 text-sm text-slate-300">
            Borrow assets against your collateral with dynamic limits.
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

          {/* 🔥 REAL DATA DISPLAY */}
          <div className="text-xs text-slate-400">
            Collateral: {collateral} USDC
          </div>

          <div className="text-xs text-slate-400">
            Debt: {debt} USDC
          </div>

          <div className="text-xs text-slate-400">
            Max borrow: {maxBorrow} USDC
          </div>

          <button
            onClick={handleBorrow}
            className="w-full bg-sky-500 p-2 rounded"
          >
            Borrow
          </button>
        </div>
      </div>
    </AppShell>
  );
}