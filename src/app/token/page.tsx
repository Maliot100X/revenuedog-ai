'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TokenPage() {
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    fetch('/api/token').then(r => r.json()).then(setToken);
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2a2a3a] bg-[#12121a] px-4 py-2 text-sm text-[#a855f7]">Solana SPL Token • Live from ClawPump</div>
        <h1 className="mb-4 text-5xl font-black">$<span className="bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] bg-clip-text text-transparent">RA</span></h1>
        <p className="mb-12 text-lg text-[#8888a0]">{token?.name || 'Loading...'} — {token?.description || ''}</p>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="mb-1 text-sm text-[#8888a0]">Symbol</div><div className="text-2xl font-bold text-[#00d68f]">{token?.symbol || '...'}</div></div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="mb-1 text-sm text-[#8888a0]">Network</div><div className="text-2xl font-bold text-[#a855f7]">{token?.network || '...'}</div></div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="mb-1 text-sm text-[#8888a0]">Platform</div><div className="text-2xl font-bold text-[#06b6d4]">{token?.platform || '...'}</div></div>
        </div>

        <div className="mb-12 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <div className="mb-2 text-sm text-[#8888a0]">Contract Address</div>
          <div className="font-mono text-sm break-all text-[#a855f7]">{token?.contract || '...'}</div>
        </div>

        <div className="mb-12 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <div className="mb-2 text-sm text-[#8888a0]">ClawPump Title</div>
          <div className="text-lg font-bold">{token?.ogTitle || '...'}</div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <a href={token?.profileUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition hover:border-[#a855f7]">
            <span className="text-3xl">🐾</span>
            <div><div className="font-bold">ClawPump</div><div className="text-sm text-[#8888a0]">View on ClawPump</div></div>
          </a>
          <a href="https://x.com/RevenueDogAi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition hover:border-[#a855f7]">
            <span className="text-3xl">🐦</span>
            <div><div className="font-bold">X / Twitter</div><div className="text-sm text-[#8888a0]">@RevenueDogAi</div></div>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
