'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function BountiesPage() {
  const [bounties, setBounties] = useState<any[]>([]);
  useEffect(() => { fetch('/api/bounty/list').then(r=>r.json()).then(d=>setBounties(d.bounties||[])); }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">Bounties</h1>
            <p className="mt-2 text-[#8888a0]">{bounties.length} bounties from Supabase database</p>
          </div>
        </div>
        <div className="space-y-4">
          {bounties.map((b: any) => (
            <div key={b.id} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{b.title}</h3>
                <span className="rounded-full bg-[#00d68f]/10 px-4 py-1 text-sm font-bold text-[#00d68f]">${b.reward_usdc} USDC</span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-[#8888a0]">
                <span>By: {b.creator}</span>
                <span>Deadline: {b.deadline}</span>
                <span className="text-[#00d68f]">{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
