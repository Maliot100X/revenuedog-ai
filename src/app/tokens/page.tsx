'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function TokensPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/tokens-data').then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-2 text-4xl font-black">Top Tokens</h1>
        <p className="mb-8 text-[#8888a0]">Live data from Pump.fun. Our $RA token is always #1.</p>

        {loading ? (
          <div className="py-20 text-center text-[#8888a0]">Loading tokens from Pump.fun...</div>
        ) : (
          <div className="space-y-3">
            {data?.topTokens?.map((t: any, i: number) => (
              <div key={t.mint} className={`rounded-xl border ${t.isOurs ? 'border-[#a855f7] bg-[#12121a] shadow-lg shadow-[#a855f7]/10' : 'border-[#2a2a3a] bg-[#12121a]'} p-4 transition hover:border-[#a855f7]`}>
                <div className="flex items-center gap-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${i < 3 ? 'bg-[#ffc048]/20 text-[#ffc048]' : 'bg-[#1a1a28] text-[#8888a0]'}`}>{i + 1}</div>
                  {t.image && <img src={t.image} alt={t.name} className="h-10 w-10 rounded-full" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{t.name}</span>
                      <span className="text-sm text-[#8888a0]">{t.symbol}</span>
                      {t.isOurs && <span className="rounded-full bg-[#a855f7] px-2 py-0.5 text-xs font-bold text-white">OUR TOKEN</span>}
                    </div>
                    <div className="text-xs text-[#8888a0] truncate">{t.mint}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-[#00d68f]">${t.marketCapUsd ? t.marketCapUsd.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '...'}</div>
                    <div className="text-xs text-[#8888a0]">{t.marketCapSol ? Number(t.marketCapSol).toFixed(1) : '...'} SOL</div>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <div className="text-xs text-[#8888a0]">Replies: {t.replyCount}</div>
                    <div className="text-xs text-[#8888a0]">{t.complete ? 'Complete' : 'Bonding'}</div>
                  </div>
                  <Link href={t.isOurs ? '/token' : 'https://pump.fun/coin/' + t.mint} target={t.isOurs ? undefined : '_blank'} className="shrink-0 rounded-lg bg-[#a855f7] px-3 py-1.5 text-xs font-bold text-white">{t.isOurs ? 'View' : 'Trade'}</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4 text-center text-sm text-[#8888a0]">
          Data from Pump.fun API. Updated every 30 seconds. Our token $RA is always shown first.
        </div>
      </main>
      <Footer />
    </>
  );
}
