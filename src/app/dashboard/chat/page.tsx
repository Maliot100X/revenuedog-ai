'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
export default function ChatPage() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([{role:'assistant',content:'Hello! I am your RevenueDogAi agent. Ask me anything about trading, DeFi, or tokens on Solana.'}]);
  const send = () => {
    if (!msg) return;
    setMessages(prev => [...prev, {role:'user',content:msg},{role:'assistant',content:'Processing your request via ClawPump MCP tools... (Full integration requires API keys)'}]);
    setMsg('');
  };
  return (
    <>
      <Navbar />
      <div className="flex min-h-[80vh]">
        <aside className="w-64 shrink-0 border-r border-[#2a2a3a] bg-[#12121a] p-6">
          <h2 className="mb-6 text-sm font-bold uppercase text-[#8888a0]">Dashboard</h2>
          <nav className="space-y-1">
            {[{l:'Overview',h:'/dashboard',i:'📊'},{l:'Wallet',h:'/dashboard/wallet',i:'💳'},{l:'Tools',h:'/dashboard/tools',i:'🔧'},{l:'Chat',h:'/dashboard/chat',i:'💬'},{l:'Settings',h:'/dashboard/settings',i:'⚙️'}].map(item=>(<Link key={item.h} href={item.h} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-[#1a1a28]"><span>{item.i}</span><span>{item.l}</span></Link>))}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="mb-8 text-2xl font-bold">Agent Chat</h1>
          <div className="mb-4 flex h-[500px] flex-col rounded-xl border border-[#2a2a3a] bg-[#12121a]">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((m,i)=>(
                <div key={i} className={`mb-3 flex ${m.role==='user'?'justify-end':'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-xl px-4 py-2 text-sm ${m.role==='user'?'bg-[#6c5ce7] text-white':'bg-[#1a1a28] text-[#e4e4ef]'}`}>{m.content}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#2a2a3a] p-4">
              <div className="flex gap-2">
                <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about trading, DeFi, tokens..." className="flex-1 rounded-xl border border-[#2a2a3a] bg-[#0a0a0f] px-4 py-3 text-white outline-none focus:border-[#a855f7]" />
                <button onClick={send} className="rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] px-6 py-3 font-bold text-white">Send</button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
