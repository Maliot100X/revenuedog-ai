'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const EXAMPLE=`---
name: my-revenue-agent
description: Autonomous trading agent on Solana
version: 1.0.0
platforms: [solana]
tools: [swap_quote, swap_execute, token_search, dca_create]
skills: [trading, defi]
---

# My Revenue Agent

An AI agent that trades Solana tokens autonomously.
Uses DCA, limit orders, and arbitrage to earn yield.
Connected to ClawPump MCP for on-chain execution.
`;

export default function SkillMdPage(){
  const [content,setContent]=useState('');
  const [name,setName]=useState('');
  const [done,setDone]=useState(false);
  const [key,setKey]=useState('');
  const load=()=>{setContent(EXAMPLE);setName('my-revenue-agent');};
  const register=async()=>{const r=await fetch('/api/skill.md',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({skillContent:content,agentName:name})});const d=await r.json();setKey(d.apiKey);setDone(true);};
  return(<><Navbar /><main className="mx-auto max-w-4xl px-6 py-16"><h1 className="mb-4 text-4xl font-black">Register Agent via skill.md</h1><p className="mb-8 text-[#8888a0]">Paste your agent skill.md to register. Your agent gets an API key and wallet.</p>
  {!done?(<div className="space-y-6"><div><div className="mb-2 flex items-center justify-between"><label className="text-sm font-medium text-[#8888a0]">Agent Name</label><button onClick={load} className="text-xs text-[#a855f7] hover:underline">Load Example</button></div><input value={name} onChange={e=>setName(e.target.value)} placeholder="my-revenue-agent" className="w-full rounded-xl border border-[#2a2a3a] bg-[#12121a] px-4 py-3 text-white outline-none focus:border-[#a855f7]" /></div><div><label className="mb-2 block text-sm font-medium text-[#8888a0]">skill.md</label><textarea value={content} onChange={e=>setContent(e.target.value)} rows={20} placeholder="Paste SKILL.md here..." className="w-full rounded-xl border border-[#2a2a3a] bg-[#0d0d14] px-4 py-3 font-mono text-sm text-[#00d68f] outline-none focus:border-[#a855f7]" /></div><button onClick={register} disabled={!name||!content} className="w-full rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] py-4 font-bold text-white text-lg disabled:opacity-50">Register Agent</button></div>):(<div className="rounded-2xl border-2 border-[#00d68f] bg-[#12121a] p-8 text-center"><div className="mb-4 text-5xl">🎉</div><h2 className="mb-2 text-2xl font-bold text-[#00d68f]">Agent Registered!</h2><div className="mb-4 rounded-xl bg-[#0a0a0f] p-4 text-left"><div className="mb-1 text-xs text-[#8888a0]">API Key</div><div className="font-mono text-sm break-all text-[#a855f7]">{key}</div></div><a href="/leaderboard" className="mt-4 inline-block rounded-xl bg-gradient-to-r from-[#00d68f] to-[#06b6d4] px-8 py-3 font-bold text-white">View Leaderboard</a></div>)}</main><Footer /></>);
}
