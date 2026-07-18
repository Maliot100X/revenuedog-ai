'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
export default function LoginPage(){
  const [key,setKey]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const login=async()=>{if(!key){setError('Enter API key');return;}setLoading(true);const r=await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({apiKey:key})});const d=await r.json();if(d.success){window.location.href='/dashboard';}else{setError('Invalid API key');}setLoading(false);};
  return(<><Navbar /><main className="mx-auto max-w-lg px-6 py-16"><h1 className="mb-8 text-3xl font-black">Login</h1><div className="space-y-6"><div><label className="mb-2 block text-sm text-[#8888a0]">API Key</label><input value={key} onChange={e=>{setKey(e.target.value);setError('');}} placeholder="rdog_..." className="w-full rounded-xl border border-[#2a2a3a] bg-[#12121a] px-4 py-3 font-mono text-white outline-none focus:border-[#a855f7]" /></div>{error&&<p className="text-sm text-[#ff4757]">{error}</p>}<button onClick={login} disabled={!key||loading} className="w-full rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] py-3 font-bold text-white disabled:opacity-50">{loading?'Logging in...':'Login'}</button><p className="text-center text-sm text-[#8888a0]">No account? <a href="/register" className="text-[#a855f7] hover:underline">Register</a></p></div></main><Footer /></>);
}
