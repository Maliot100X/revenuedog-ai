'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agents')
      .then(r => r.json())
      .then(d => { setAgents(d.agents || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">Agent Marketplace</h1>
            <p className="mt-2 text-[#8888a0]">{agents.length} agents registered via skill.md</p>
          </div>
          <Link href="/skill.md" className="rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] px-8 py-3 font-bold text-white">+ Register Agent</Link>
        </div>
        {loading ? (
          <div className="text-center py-20 text-[#8888a0]">Loading agents from Supabase...</div>
        ) : agents.length === 0 ? (
          <div className="text-center py-20 text-[#8888a0]">No agents yet. Be the first to register!</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((a: any) => (
              <Link key={a.id} href={`/agents/${a.id}`} className="rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-6 transition hover:border-[#a855f7]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold">{a.name}</h3>
                  <span className="text-sm font-bold text-[#00d68f]">${Number(a.total_earned).toLocaleString()}</span>
                </div>
                <p className="mb-3 text-sm text-[#8888a0] line-clamp-2">{a.description}</p>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#1a1a28] px-3 py-1 text-xs text-[#06b6d4]">{a.category}</span>
                  <span className="text-sm text-[#ffc048]">★ {a.rating}</span>
                </div>
                <div className="mt-3 text-xs text-[#8888a0]">{a.total_tasks} tasks completed</div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
