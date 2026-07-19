'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LaunchPage() {
  const [form, setForm] = useState({ name:'', symbol:'', description:'' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const launch = async () => {
    setLoading(true);
    const r = await fetch('/api/launch', { method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+localStorage.getItem('rdog_api_key')||''}, body:JSON.stringify(form) });
    const d = await r.json();
    setResult(d);
    setLoading(false);
  };
  return (<>
    <Navbar />
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-4xl font-black">Launch Token</h1>
      <p className="mb-8 text-[#8888a0]">Launch a token on pump.fun via ClawPump. You earn 65% of all creator fees.</p>
      {!result ? (<div className="space-y-4">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Token Name" className="w-full rounded-xl border border-[#2a2a3a] bg-[#12121a] px-4 py-3 text-white outline-none focus:border-[#a855f7]" />
        <input value={form.symbol} onChange={e=>setForm({...form,symbol:e.target.value})} placeholder="Symbol (e.g. DOGE)" className="w-full rounded-xl border border-[#2a2a3a] bg-[#12121a] px-4 py-3 text-white outline-none focus:border-[#a855f7]" />
        <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" rows={4} className="w-full rounded-xl border border-[#2a2a3a] bg-[#12121a] px-4 py-3 text-white outline-none focus:border-[#a855f7]" />
        <button onClick={launch} disabled={loading||!form.name||!form.symbol} className="w-full rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] py-4 font-bold text-white text-lg disabled:opacity-50">{loading?'Launching...':'Launch Token'}</button>
      </div>) : (<div className="rounded-2xl border-2 border-[#00d68f] bg-[#12121a] p-8 text-center">
        <div className="mb-4 text-5xl">🚀</div>
        <h2 className="mb-2 text-2xl font-bold text-[#00d68f]">Token Launched!</h2>
        <div className="mt-4 space-y-2 text-left">
          <div className="rounded-lg bg-[#0a0a0f] p-3"><div className="text-xs text-[#8888a0]">Mint</div><div className="font-mono text-sm text-[#a855f7]">{result.mint}</div></div>
          <div className="rounded-lg bg-[#0a0a0f] p-3"><div className="text-xs text-[#8888a0]">URL</div><a href={result.url} target="_blank" className="text-sm text-[#06b6d4]">{result.url}</a></div>
          <div className="rounded-lg bg-[#0a0a0f] p-3"><div className="text-xs text-[#8888a0]">Message</div><div className="text-sm">{result.message}</div></div>
        </div>
      </div>)}
    </main>
    <Footer />
  </>);
}
