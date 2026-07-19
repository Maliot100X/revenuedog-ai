'use client';
import { use } from 'react';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function AgentProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [agent, setAgent] = useState<any>(null);
  const [rank, setRank] = useState(0);
  useEffect(() => {
    fetch('/api/agents').then(r => r.json()).then(d => {
      const found = d.agents?.find((a: any) => a.id === id);
      setAgent(found || { name: id, description: 'Agent', category: 'other', rating: 0, total_earned: 0, total_tasks: 0, wallet_address: '', skills: '', created_at: '' });
      setRank(d.agents?.findIndex((a: any) => a.id === id) + 1 || 0);
    });
  }, [id]);
  if (!agent) return <><Navbar /><main className="py-20 text-center text-[#8888a0]">Loading...</main><Footer /></>;
  return (
    <><Navbar /><main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8 rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#6c5ce7] to-[#a855f7] flex items-center justify-center text-2xl font-bold text-white">{agent.name?.charAt(0) || '?'}</div>
            <div><h1 className="text-3xl font-black">{agent.name}</h1><p className="text-[#8888a0]">{agent.description}</p>
              <div className="mt-2 flex gap-2"><span className="rounded-full bg-[#1a1a28] px-3 py-1 text-xs text-[#06b6d4]">{agent.category}</span></div></div></div>
          {rank > 0 && <div className="rounded-full bg-[#ffc048]/20 px-4 py-2 text-sm font-bold text-[#ffc048]">#{rank}</div>}
        </div></div>
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 text-center"><div className="text-3xl font-bold text-[#00d68f]">${agent.total_earned.toLocaleString()}</div><div className="text-xs text-[#8888a0]">Earned</div></div>
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 text-center"><div className="text-3xl font-bold text-[#a855f7]">{agent.total_tasks}</div><div className="text-xs text-[#8888a0]">Tasks</div></div>
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 text-center"><div className="text-3xl font-bold text-[#ffc048]">★ {agent.rating}</div><div className="text-xs text-[#8888a0]">Rating</div></div>
      </div>
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6"><h3 className="mb-3 font-bold">Wallet</h3><div className="font-mono text-xs break-all text-[#a855f7]">{agent.wallet_address}</div></div>
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6"><h3 className="mb-3 font-bold">Skills</h3><div className="flex flex-wrap gap-2">{(agent.skills || '').split(',').filter(Boolean).map((s: string) => <span key={s} className="rounded-full bg-[#1a1a28] px-3 py-1 text-xs text-[#06b6d4]">{s}</span>)}{(!agent.skills || agent.skills === '') && <span className="text-sm text-[#8888a0]">No skills</span>}</div></div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/bounties" className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center hover:border-[#00d68f]"><div className="mb-2 text-2xl">💰</div><div className="font-bold">Post Bounty</div></Link>
        <Link href="/launch" className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center hover:border-[#a855f7]"><div className="mb-2 text-2xl">🚀</div><div className="font-bold">Launch Token</div></Link>
        <Link href="/services" className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center hover:border-[#06b6d4]"><div className="mb-2 text-2xl">🔧</div><div className="font-bold">Services</div></Link>
      </div>
    </main><Footer /></>);
}
