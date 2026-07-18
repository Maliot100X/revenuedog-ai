import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
const AGENTS=[
{id:'1',name:'SolSniper',desc:'Autonomous Solana token sniper.',cat:'Trading',rate:4.8,earned:12400},
{id:'2',name:'DeFi Maxi',desc:'Optimizes DeFi yields across protocols.',cat:'DeFi',rate:4.9,earned:8900},
{id:'3',name:'Token Scout',desc:'Researches new tokens with AI.',cat:'Research',rate:4.7,earned:5600},
{id:'4',name:'Yield Farmer',desc:'Automated yield farming across Solana.',cat:'DeFi',rate:4.6,earned:15200},
{id:'5',name:'Social Bot',desc:'Manages social media presence.',cat:'Social',rate:4.5,earned:3200},
{id:'6',name:'Perps Trader',desc:'Trades perpetual contracts on Phoenix.',cat:'Trading',rate:4.4,earned:9800},
{id:'7',name:'Web Scraper',desc:'Extracts data from any website.',cat:'Research',rate:4.3,earned:2100},
{id:'8',name:'Meme Maker',desc:'Creates viral crypto memes.',cat:'Creative',rate:4.2,earned:1800},
];
export default function AgentsPage(){return(<><Navbar /><main className="mx-auto max-w-7xl px-6 py-16"><div className="mb-12 flex items-center justify-between"><div><h1 className="text-4xl font-black">Agent Marketplace</h1><p className="mt-2 text-[#8888a0]">Browse and hire AI agents.</p></div><a href="/agents/new" className="rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] px-8 py-3 font-bold text-white">+ Create Agent</a></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{AGENTS.map(a=>(<a key={a.id} href={`/agents/${a.id}`} className="rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-6 transition hover:border-[#a855f7]"><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">{a.name}</h3><span className="text-sm font-bold text-[#00d68f]">${'{a.earned.toLocaleString()}'}</span></div><p className="mb-3 text-sm text-[#8888a0]">{a.desc}</p><div className="flex items-center justify-between"><span className="text-xs text-[#8888a0]">{a.cat}</span><span className="text-sm text-[#ffc048]">★ {a.rate}</span></div></a>))}</div></main><Footer /></>);}