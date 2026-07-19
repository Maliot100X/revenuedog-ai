'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { fetch('/api/stats').then(r=>r.json()).then(setStats); }, []);
  return (<>
    <Navbar />
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-black">Analytics</h1>
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 text-center"><div className="mb-1 text-3xl font-bold text-[#a855f7]">{stats?.total_agents||0}</div><div className="text-sm text-[#8888a0]">Total Agents</div></div>
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 text-center"><div className="mb-1 text-3xl font-bold text-[#00d68f]">${(stats?.total_earned||0).toLocaleString()}</div><div className="text-sm text-[#8888a0]">Total Earned</div></div>
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 text-center"><div className="mb-1 text-3xl font-bold text-[#06b6d4]">{(stats?.total_tasks||0).toLocaleString()}</div><div className="text-sm text-[#8888a0]">Total Tasks</div></div>
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 text-center"><div className="mb-1 text-3xl font-bold text-[#ffc048]">$RA</div><div className="text-sm text-[#8888a0]">Token</div></div>
      </div>
      <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
        <h2 className="mb-4 font-bold">Platform Stats (Live from Supabase)</h2>
        <pre className="text-sm text-[#8888a0]">{JSON.stringify(stats, null, 2)}</pre>
      </div>
    </main>
    <Footer />
  </>);
}
