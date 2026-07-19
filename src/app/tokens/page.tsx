'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TokensPage() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tokens-data')
      .then(r => r.json())
      .then(d => {
        setTokens(d.tokens || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load tokens:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-black">Top Tokens</h1>
          <p className="mt-2 text-[#8888a0]">24h leaderboard from ClawPump. Our $RA token is always #1.</p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-4xl">\ud83d\udd04</div>
            <div className="text-[#8888a0]">Loading tokens from ClawPump...</div>
          </div>
        ) : tokens.length === 0 ? (
          <div className="py-20 text-center text-[#8888a0]">No tokens found.</div>
        ) : (
          <div className="space-y-3">
            {tokens.map((t: any, i: number) => (
              <a
                key={t.mint || i}
                href={t.isOurs ? '/token' : (t.website || 'https://clawpump.tech/tokens/' + t.mint)}
                target={t.isOurs ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`flex items-center gap-4 rounded-xl border p-4 transition hover:border-[#00d68f] ${
                  t.isOurs
                    ? 'border-[#a855f7] bg-gradient-to-r from-[#1a1030] to-[#12121a] shadow-lg shadow-[#a855f7]/10'
                    : 'border-[#2a2a3a] bg-[#12121a]'
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  i < 3 ? 'bg-[#ffc048]/20 text-[#ffc048]' : 'bg-[#1a1a28] text-[#8888a0]'
                }`}>
                  {i + 1}
                </div>

                {t.image ? (
                  <img src={t.image} alt={t.name} className="h-10 w-10 rounded-full border border-[#2a2a3a]" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-[#1a1a28] flex items-center justify-center text-lg">
                    {t.name?.charAt(0) || '?'}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold truncate">{t.name}</span>
                    <span className="text-sm text-[#8888a0]">{t.symbol}</span>
                    {t.isOurs && (
                      <span className="rounded-full bg-[#a855f7] px-2 py-0.5 text-[10px] font-bold text-white">OUR TOKEN</span>
                    )}
                    {t.verified && (
                      <span className="rounded-full bg-[#00d68f]/20 px-2 py-0.5 text-[10px] font-bold text-[#00d68f]">VERIFIED</span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[#8888a0]">
                    <span>{t.agentName || 'Unknown Agent'}</span>
                    <span>\u00b7</span>
                    <span>{t.source || 'clawpump'}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-[#00d68f]">
                    ${t.marketCap ? t.marketCap.toLocaleString(undefined, {maximumFractionDigits: 0}) : '0'}
                  </div>
                  <div className="text-xs text-[#8888a0]">MCap</div>
                </div>

                <div className="text-right shrink-0 hidden sm:block">
                  <div className="font-bold text-[#06b6d4]">
                    ${t.volume24h ? t.volume24h.toLocaleString(undefined, {maximumFractionDigits: 2}) : '0'}
                  </div>
                  <div className="text-xs text-[#8888a0]">24h Vol</div>
                </div>

                {!t.isOurs && (
                  <div className="shrink-0 rounded-lg bg-[#00d68f] px-3 py-1.5 text-xs font-bold text-black">
                    Trade
                  </div>
                )}
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4 text-center text-sm text-[#8888a0]">
          Live data from ClawPump. Updated every 30 seconds. {tokens.length} tokens loaded.
        </div>
      </main>
      <Footer />
    </>
  );
}
