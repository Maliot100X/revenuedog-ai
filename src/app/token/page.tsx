'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TokenPage() {
  const [token, setToken] = useState<any>(null);
  useEffect(() => { fetch('/api/token').then(r => r.json()).then(setToken); }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2a2a3a] bg-[#12121a] px-4 py-2 text-sm text-[#a855f7]">
          Solana SPL Token \u2022 Live from Pump.fun
        </div>

        <h1 className="mb-2 text-5xl font-black">$<span className="bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] bg-clip-text text-transparent">{token?.symbol?.replace('$','') || 'RA'}</span></h1>
        <p className="mb-4 text-lg text-[#8888a0]">{token?.name || 'Loading...'} \u2014 {token?.description || ''}</p>

        {token?.imageUri && (
          <div className="mb-8 flex justify-center">
            <img src={token.imageUri} alt={token.name} className="h-32 w-32 rounded-2xl border-2 border-[#a855f7]" />
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="mb-1 text-sm text-[#8888a0]">Market Cap (USD)</div>
            <div className="text-2xl font-bold text-[#00d68f]">${token?.marketCap ? token.marketCap.toLocaleString(undefined, {maximumFractionDigits:0}) : '...'}</div>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="mb-1 text-sm text-[#8888a0]">Market Cap (SOL)</div>
            <div className="text-2xl font-bold text-[#a855f7]">{token?.marketCapSol ? Number(token.marketCapSol).toFixed(2) : '...'} SOL</div>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="mb-1 text-sm text-[#8888a0]">ATH Market Cap</div>
            <div className="text-2xl font-bold text-[#ffc048]">${token?.athMarketCap ? token.athMarketCap.toLocaleString(undefined, {maximumFractionDigits:0}) : '...'}</div>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="mb-1 text-sm text-[#8888a0]">Total Supply</div>
            <div className="text-xl font-bold text-[#06b6d4]">{token?.totalSupply ? Number(token.totalSupply).toLocaleString() : '...'}</div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="mb-1 text-sm text-[#8888a0]">Network</div>
            <div className="text-lg font-bold text-[#a855f7]">{token?.network || 'Solana'}</div>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="mb-1 text-sm text-[#8888a0]">Platform</div>
            <div className="text-lg font-bold text-[#06b6d4]">{token?.platform || 'clawpump.tech'}</div>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="mb-1 text-sm text-[#8888a0]">Status</div>
            <div className="text-lg font-bold">{token?.complete ? <span className="text-[#00d68f]">Complete</span> : <span className="text-[#ffc048]">Bonding Curve</span>}</div>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <div className="mb-2 text-sm text-[#8888a0]">Contract Address</div>
          <div className="font-mono text-sm break-all text-[#a855f7]">{token?.contract}</div>
        </div>

        <div className="mb-6 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <div className="mb-2 text-sm text-[#8888a0]">Creator</div>
          <div className="font-mono text-sm break-all text-[#00d68f]">{token?.creator}</div>
        </div>

        <div className="mb-6 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <div className="mb-2 text-sm text-[#8888a0]">Bonding Curve</div>
          <div className="font-mono text-sm break-all text-[#06b6d4]">{token?.bondingCurve}</div>
        </div>

        <div className="mb-6 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <div className="mb-2 text-sm text-[#8888a0]">Pool Address</div>
          <div className="font-mono text-sm break-all text-[#ffc048]">{token?.poolAddress}</div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <a href={token?.profileUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition hover:border-[#a855f7]">
            <span className="text-3xl">\ud83d\udc3e</span>
            <div><div className="font-bold">ClawPump</div><div className="text-sm text-[#8888a0]">View Profile</div></div>
          </a>
          {token?.twitter && (
            <a href={token.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition hover:border-[#a855f7]">
              <span className="text-3xl">\ud83d\udc26</span>
              <div><div className="font-bold">X / Twitter</div><div className="text-sm text-[#8888a0]">@RevenueDogAi</div></div>
            </a>
          )}
          {token?.website && (
            <a href={token.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition hover:border-[#a855f7]">
              <span className="text-3xl">\ud83c\udf10</span>
              <div><div className="font-bold">Website</div><div className="text-sm text-[#8888a0]">clawpump.tech</div></div>
            </a>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
