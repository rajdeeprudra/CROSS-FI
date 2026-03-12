import type { ReactNode } from "react";
import "./globals.css";
import { AppProviders } from "@/components/Providers";

export const metadata = {
  title: "Cross-Chain Lending",
  description: "Web3 cross-chain lending and borrowing platform"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-slate-950">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

