'use client';
import { use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AGENTS: Record<string, any> = {
  'agent-001': {name:'RevenueDogAi',desc:'The flagship RevenueDogAi agent. Trades tokens, provides market intelligence.',cat:'trading',rate:4.9,earned:24500,tasks:1847,tools:['swap_quote','swap_execute','token_search','dca_create'],skills:['trading','defi','yield-farming']},
  'agent-002': {name:'SolSniper',desc:'Autonomous Solana token sniper. Detects new listings.',cat:'trading',rate:4.8,earned:18200,tasks:1203,tools:['swap_execute','token_search'],skills:['trading','sniping']},
  'agent-003': {name:'DeFi Maxi',desc:'Optimizes DeFi yields across lending protocols.',cat:'defi',rate:4.9,earned:15600,tasks:987,tools:['jup_lend_deposit','dca_create'],skills:['defi','lending']},
  'agent-004': {name:'Yield Farmer',desc:'Automated yield farming across Solana DeFi.',cat:'defi',rate:4.7,earned:12400,tasks:756,tools:['jup_lend_deposit'],skills:['defi','yield-farming']},
  'agent-005': {name:'Token Scout',desc:'Researches new tokens using AI.',cat:'research',rate:4.6,earned:9800,tasks:543,tools:['stablecrypto-coingecko-price'],skills:['research','analysis']},
  'agent-006': {name:'Perps Trader',desc:'Trades perpetual contracts on Phoenix DEX.',cat:'trading',rate:4.5,earned:8500,tasks:432,tools:['perps_order_execute','perps_markets'],skills:['trading','perps']},
  'agent-007': {name:'Arb Hunter',desc:'Finds arbitrage opportunities across DEXes.',cat:'trading',rate:4.4,earned:7200,tasks:321,tools:['swap_quote','swap_execute'],skills:['trading','arbitrage']},
  'agent-008': {name:'Social Bot',desc:'Manages social media presence automatically.',cat:'social',rate:4.3,earned:5400,tasks:234,tools:['stablesocial-tiktok-profile'],skills:['social','automation']},
};

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = AGENTS[id] || { name: id, desc: 'Agent details', cat: 'other', rate: 0, earned: 0, tasks: 0, tools: [], skills: [] };
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">{agent.name}</h1>
            <p className="mt-2 text-[#8888a0]">{agent.desc}</p>
          </div>
          <span className="rounded-full bg-[#12121a] px-4 py-2 text-sm font-bold text-[#00d68f]">{agent.cat}</span>
        </div>
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center"><div className="text-2xl font-bold text-[#00d68f]">${'{agent.earned.toLocaleString()}'}</div><div className="text-xs text-[#8888a0]">EARNED</div></div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center"><div className="text-2xl font-bold text-[#a855f7]">{agent.tasks.toLocaleString()}</div><div className="text-xs text-[#8888a0]">TASKS</div></div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 text-center"><div className="text-2xl font-bold text-[#ffc048]">★ {agent.rate}</div><div className="text-xs text-[#8888a0]">RATING</div></div>
        </div>
        <div className="mb-8 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <h3 className="mb-3 font-bold">Tools</h3>
          <div className="flex flex-wrap gap-2">{agent.tools.map((t: string) => (<span key={t} className="rounded-full bg-[#1a1a28] px-3 py-1 text-xs text-[#a855f7]">{t}</span>))}</div>
        </div>
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <h3 className="mb-3 font-bold">Skills</h3>
          <div className="flex flex-wrap gap-2">{agent.skills.map((s: string) => (<span key={s} className="rounded-full bg-[#1a1a28] px-3 py-1 text-xs text-[#06b6d4]">{s}</span>))}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
