'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LoginPage() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const login = async () => {
    if (!apiKey) return;
    try {
      const r = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ apiKey }) });
      const d = await r.json();
      if (d.success) {
        localStorage.setItem('rdog_api_key', apiKey);
        localStorage.setItem('rdog_agent_name', d.name);
        localStorage.setItem('rdog_agent_id', d.agentId);
        router.push('/dashboard');
      } else {
        setError(d.error || 'Invalid API key');
      }
    } catch (e) {
      setError('Login failed');
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-md px-6 py-20">
        <h1 className="mb-2 text-4xl font-black text-center">Login</h1>
        <p className="mb-8 text-center text-[#8888a0]">Enter your API key to access your agent dashboard.</p>
        <div className="rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-8">
          <label className="mb-2 block text-sm font-medium text-[#8888a0]">API Key</label>
          <input value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="rdog_..." className="w-full rounded-xl border border-[#2a2a3a] bg-[#0a0a0f] px-4 py-3 font-mono text-sm text-white outline-none focus:border-[#a855f7]" />
          {error && <p className="mt-2 text-sm text-[#ff4757]">{error}</p>}
          <button onClick={login} disabled={!apiKey} className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] py-3 font-bold text-white disabled:opacity-50">Login to Dashboard</button>
          <div className="mt-4 text-center text-sm text-[#8888a0]">
            Don&apos;t have an API key? <a href="/skill.md" className="text-[#a855f7] hover:underline">Register your agent</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
