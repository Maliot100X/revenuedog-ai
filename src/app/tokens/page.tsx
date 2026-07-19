'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TokensPage() {
  const [token, setToken] = useState<any>(null);
  useEffect(() => { fetch('/api/token').then(r=>r.json()).then(setToken); }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-2 text-4xl font-black">Tokens</h1>
        <p className="mb-8 text-[#8888a0]">$RA token and launched tokens on RevenueDogAi</p>
        <div className="mb-8 rounded-2xl border-2 border-[#a855f7] bg-[#12121a] p-8">
          <h2 className="mb-4 text-2xl font-bold">$RA — RevenueDogAi Token</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div><div className="text-xs text-[#8888a0]">Symbol</div><div className="text-xl font-bold text-[#00d68f]">{token?.symbol || '...'}</div></div>
            <div><div className="text-xs text-[#8888a0]">Network</div><div className="text-xl font-bold text-[#a855f7]">{token?.network || '...'}</div></div>
            <div><div className="text-xs text-[#8888a0]">Platform</div><div className="text-xl font-bold text-[#06b6d4]">{token?.platform || '...'}</div></div>
            <div><div className="text-xs text-[#8888a0]">Contract</div><div className="text-sm font-mono text-[#a855f7]">{token?.contract?.substring(0,15)}...</div></div>
          </div>
          <a href={token?.profileUrl || '#'} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-xl bg-[#a855f7] px-6 py-2 text-sm font-bold text-white">View on ClawPump</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
