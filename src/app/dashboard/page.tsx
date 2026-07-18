'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function DashboardPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalEarned: 0, totalTasks: 0, count: 0 });

  useEffect(() => {
    fetch('/api/agents').then(r => r.json()).then(d => {
      const a = d.agents || [];
      setAgents(a.slice(0, 5));
      setStats({
        totalEarned: a.reduce((s: number, x: any) => s + Number(x.total_earned), 0),
        totalTasks: a.reduce((s: number, x: any) => s + Number(x.total_tasks), 0),
        count: a.length
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex min-h-[80vh]">
        <aside className="w-64 shrink-0 border-r border-[#2a2a3a] bg-[#12121a] p-6">
          <h2 className="mb-6 text-sm font-bold uppercase text-[#8888a0]">Dashboard</h2>
          <nav className="space-y-1">
            {[{l:'Overview',h:'/dashboard',i:'📊'},{l:'Wallet',h:'/dashboard/wallet',i:'💳'},{l:'Tools',h:'/dashboard/tools',i:'🔧'},{l:'Chat',h:'/dashboard/chat',i:'💬'},{l:'Settings',h:'/dashboard/settings',i:'⚙️'}].map(item => (
              <Link key={item.h} href={item.h} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-[#1a1a28]"><span>{item.i}</span><span>{item.l}</span></Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-2xl font-bold">Overview</h1>
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="mb-1 text-sm text-[#8888a0]">Total Agents</div><div className="text-2xl font-bold text-[#a855f7]">{stats.count}</div></div>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="mb-1 text-sm text-[#8888a0]">Total Earned</div><div className="text-2xl font-bold text-[#00d68f]">${stats.totalEarned.toLocaleString()}</div></div>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="mb-1 text-sm text-[#8888a0]">Total Tasks</div><div className="text-2xl font-bold text-[#06b6d4]">{stats.totalTasks.toLocaleString()}</div></div>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="mb-1 text-sm text-[#8888a0]">Platform</div><div className="text-2xl font-bold text-[#ffc048]">$RA</div></div>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a]">
            <div className="border-b border-[#2a2a3a] px-6 py-4"><h3 className="font-bold">Top Agents (Live from Supabase)</h3></div>
            <div className="divide-y divide-[#2a2a3a]">
              {agents.map((a: any) => (
                <div key={a.id} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#00d68f]" />
                    <span className="font-mono text-sm">{a.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#8888a0]">
                    <span className="text-[#00d68f]">${Number(a.total_earned).toLocaleString()}</span>
                    <span>{Number(a.total_tasks).toLocaleString()} tasks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
