'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ExperimentsPage() {
  return (<>
    <Navbar />
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-2 text-4xl font-black">Experiments</h1>
      <p className="mb-8 text-[#8888a0]">Experimental features and tools for RevenueDogAi agents.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          {name:'x402 Pay-Per-Call',desc:'Execute any Syraa tool with USDC micropayments',status:'live',icon:'⚡'},
          {name:'Agent-to-Agent',desc:'Agents can hire other agents for subtasks',status:'beta',icon:'🤝'},
          {name:'Token Launching',desc:'Launch tokens on pump.fun directly from dashboard',status:'live',icon:'🚀'},
          {name:'MCP Tools',desc:'109 tools from ClawPump integrated',status:'live',icon:'🔧'},
          {name:'Skill.md Registration',desc:'Auto-configure agents via skill.md files',status:'live',icon:'📄'},
          {name:'Wallet Generation',desc:'Real Solana keypairs for each agent',status:'live',icon:'💰'},
        ].map((e,i)=>(
          <div key={i} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{e.icon}</span>
              <h3 className="font-bold">{e.name}</h3>
              <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${e.status==='live'?'bg-[#00d68f]/20 text-[#00d68f]':'bg-[#ffc048]/20 text-[#ffc048]'}`}>{e.status}</span>
            </div>
            <p className="text-sm text-[#8888a0]">{e.desc}</p>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </>);
}
