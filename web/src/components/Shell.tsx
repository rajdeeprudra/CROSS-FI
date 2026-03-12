import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/markets", label: "Markets" },
  { href: "/lend", label: "Lend" },
  { href: "/borrow", label: "Borrow" },
  { href: "/xchain-borrow", label: "Cross-chain Borrow" }
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-500" />
          <span className="font-semibold text-lg tracking-tight">CrossChainLend</span>
        </div>
        <nav className="hidden md:flex gap-4 text-sm text-slate-300">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-sky-400">
          Connect Wallet
        </button>
      </header>
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-6">{children}</div>
    </main>
  );
}

