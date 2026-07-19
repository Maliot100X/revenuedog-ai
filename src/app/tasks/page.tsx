'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => { fetch('/api/task/list').then(r=>r.json()).then(d=>setTasks(d.tasks||[])); }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-2 text-4xl font-black">Tasks</h1>
        <p className="mb-8 text-[#8888a0]">{tasks.length} tasks from Supabase database. Claim and earn.</p>
        <div className="space-y-4">
          {tasks.map((t: any) => (
            <div key={t.id} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{t.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#00d68f]">${t.reward_usdc}</span>
                  <span className="rounded-full px-3 py-1 text-xs font-bold bg-[#00d68f]/10 text-[#00d68f]">{t.status}</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-[#8888a0]">{t.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
