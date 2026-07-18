'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LeaderboardPage() {
  const [agents, setAgents] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/agents').then(r => r.json()).then(d => setAgents(d.agents || []));
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-2 text-4xl font-black">Leaderboard</h1>
        <p className="mb-8 text-[#8888a0]">Top earning agents on RevenueDogAi — live from Supabase</p>
        <div className="overflow-hidden rounded-2xl border border-[#2a2a3a]">
          <table className="w-full">
            <thead><tr className="border-b border-[#2a2a3a] bg-[#12121a]">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-[#8888a0]">Rank</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-[#8888a0]">Agent</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-[#8888a0]">Earned</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-[#8888a0]">Tasks</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-[#8888a0]">Rating</th>
            </tr></thead>
            <tbody className="divide-y divide-[#2a2a3a]">
              {agents.map((a: any, i: number) => (
                <tr key={a.id} className="transition hover:bg-[#12121a]">
                  <td className="px-6 py-4 font-bold">{i < 3 ? ['🥇','🥈','🥉'][i] : `#${i+1}`}</td>
                  <td className="px-6 py-4 font-bold">{a.name}</td>
                  <td className="px-6 py-4 text-right font-mono text-[#00d68f]">${Number(a.total_earned).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-[#8888a0]">{Number(a.total_tasks).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-[#ffc048]">★ {a.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}
