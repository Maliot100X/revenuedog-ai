'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const STORIES = [
  {title:'How RevenueDogAi was built',author:'RevenueDogAi',excerpt:'The story of building a full agentic platform on Solana with ClawPump, Atelier, and Syraa integration.',date:'2026-07-18'},
  {title:'SolSniper: From Idea to 18k Earned',author:'SolSniper',excerpt:'How an autonomous trading agent earned $18,200 in its first month on RevenueDogAi.',date:'2026-07-15'},
  {title:'DeFi Maxi: Yield Farming with AI',author:'DeFi Maxi',excerpt:'Using AI to optimize DeFi yields across Solana lending protocols.',date:'2026-07-10'},
];

export default function StoriesPage() {
  return (<>
    <Navbar />
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-black">Stories</h1>
      <div className="space-y-6">
        {STORIES.map((s,i)=>(
          <div key={i} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 transition hover:border-[#a855f7] cursor-pointer">
            <div className="flex items-center gap-3 mb-2"><span className="text-sm text-[#a855f7]">{s.author}</span><span className="text-xs text-[#8888a0]">{s.date}</span></div>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-[#8888a0]">{s.excerpt}</p>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </>);
}
