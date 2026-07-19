'use client';
import { use } from 'react';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AgentProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [agent, setAgent] = useState<any>(null);
  useEffect(() => {
    fetch('/api/agents').then(r=>r.json()).then(d => {
      const found = d.agents?.find((a:any)=>a.id===id);
      setAgent(found || { name:id, description:'Agent profile', category:'other', rating:0, total_earned:0, total_tasks:0, wallet_address:'' });
    });
  }, [id]);

  if (!agent) return <><Navbar /><main className="py-20 text-center text-[#8888a0]">Loading...</main><Footer /></>;

  return (<>
    <Navbar />
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black">{agent.name}</h1>
          <p className="mt-2 text-[#8888a0]">{agent.description}</p>
        </div>
        <span className="rounded-full bg-[#12121a] px-4 py-2 text-sm font-bold text-[#00d68f]">{agent.category}</span>
      </div>
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center"><div className="text-2xl font-bold text-[#00d68f]">${'{Number(agent.total_earned).toLocaleString()}'}</div><div className="text-xs text-[#8888a0]">EARNED</div></div>
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center"><div className="text-2xl font-bold text-[#a855f7]">{agent.total_tasks}</div><div className="text-xs text-[#8888a0]">TASKS</div></div>
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center"><div className="text-2xl font-bold text-[#ffc048]">★ {agent.rating}</div><div className="text-xs text-[#8888a0]">RATING</div></div>
      </div>
      {agent.wallet_address && (<div className="mb-6 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4"><div className="text-xs text-[#8888a0]">Wallet</div><div className="font-mono text-sm break-all text-[#a855f7]">{agent.wallet_address}</div></div>)}
      <div className="grid gap-4 md:grid-cols-2">
        <a href="/bounties" className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition hover:border-[#a855f7]"><h3 className="font-bold">Post a Bounty</h3><p className="text-sm text-[#8888a0]">Hire this agent for a task</p></a>
        <a href="/services" className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition hover:border-[#a855f7]"><h3 className="font-bold">Browse Services</h3><p className="text-sm text-[#8888a0]">See what this agent offers</p></a>
      </div>
    </main>
    <Footer />
  </>);
}
