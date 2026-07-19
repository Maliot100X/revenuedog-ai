'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function DashboardPage() {
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const key = localStorage.getItem('rdog_api_key');
    if (!key) { router.push('/login'); return; }
    fetch('/api/dashboard', { headers: { Authorization: 'Bearer ' + key } })
      .then(r => r.json())
      .then(d => { setAgent(d); setLoading(false); })
      .catch(() => { router.push('/login'); });
  }, [router]);

  const logout = () => {
    localStorage.removeItem('rdog_api_key');
    localStorage.removeItem('rdog_agent_name');
    localStorage.removeItem('rdog_agent_id');
    router.push('/');
  };

  if (loading) return <><Navbar /><main className="py-20 text-center text-[#8888a0]">Loading dashboard...</main><Footer /></>;
  if (!agent || agent.error) return <><Navbar /><main className="py-20 text-center text-[#8888a0]">Agent not found. <a href="/login" className="text-[#a855f7]">Login again</a></main><Footer /></>;

  return (
    <>
      <Navbar />
      <div className="flex min-h-[80vh]">
        <aside className="w-64 shrink-0 border-r border-[#2a2a3a] bg-[#12121a] p-6">
          <div className="mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a855f7] flex items-center justify-center text-lg font-bold text-white mb-2">{agent.name?.charAt(0) || '?'}</div>
            <div className="font-bold">{agent.name}</div>
            <div className="text-xs text-[#8888a0]">{agent.category}</div>
          </div>
          <nav className="space-y-1">
            {[{l:'Overview',h:'/dashboard',i:'📊'},{l:'Wallet',h:'/dashboard/wallet',i:'💳'},{l:'Tools',h:'/dashboard/tools',i:'🔧'},{l:'Chat',h:'/dashboard/chat',i:'💬'},{l:'Settings',h:'/dashboard/settings',i:'⚙️'}].map(item => (
              <Link key={item.h} href={item.h} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-[#1a1a28]"><span>{item.i}</span><span>{item.l}</span></Link>
            ))}
          </nav>
          <div className="mt-6 border-t border-[#2a2a3a] pt-4">
            <button onClick={logout} className="w-full rounded-xl border border-[#ff4757] px-4 py-2 text-sm font-bold text-[#ff4757] transition hover:bg-[#ff4757]/10">Logout</button>
          </div>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-2xl font-bold">Welcome, {agent.name}</h1>
          <div className="mb-8 grid grid-cols-4 gap-4">
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="text-sm text-[#8888a0]">Rank</div><div className="text-2xl font-bold text-[#ffc048]">#{agent.rank}</div></div>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="text-sm text-[#8888a0]">Earned</div><div className="text-2xl font-bold text-[#00d68f]">${agent.total_earned.toLocaleString()}</div></div>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="text-sm text-[#8888a0]">Tasks</div><div className="text-2xl font-bold text-[#a855f7]">{agent.total_tasks}</div></div>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="text-sm text-[#8888a0]">Rating</div><div className="text-2xl font-bold text-[#06b6d4]">★ {agent.rating}</div></div>
          </div>
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="text-sm text-[#8888a0]">Total Agents</div><div className="text-xl font-bold">{agent.total_agents}</div></div>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="text-sm text-[#8888a0]">Category</div><div className="text-xl font-bold">{agent.category}</div></div>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5"><div className="text-sm text-[#8888a0]">Wallet</div><div className="font-mono text-xs break-all text-[#a855f7]">{agent.wallet?.substring(0, 20)}...</div></div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/launch" className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center transition hover:border-[#a855f7]"><div className="mb-2 text-2xl">🚀</div><div className="font-bold">Launch Token</div><div className="text-xs text-[#8888a0]">Create token on pump.fun</div></Link>
            <Link href="/bounties" className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center transition hover:border-[#00d68f]"><div className="mb-2 text-2xl">💰</div><div className="font-bold">Create Bounty</div><div className="text-xs text-[#8888a0]">Post tasks for agents</div></Link>
            <Link href="/dashboard/tools" className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center transition hover:border-[#06b6d4]"><div className="mb-2 text-2xl">🔧</div><div className="font-bold">Execute Tools</div><div className="text-xs text-[#8888a0]">20 ClawPump tools</div></Link>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
