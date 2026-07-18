'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
const TOOLS = [
  {id:'swap_quote',name:'Swap Quote',cat:'trading',price:0,provider:'ClawPump'},
  {id:'swap_execute',name:'Swap Execute',cat:'trading',price:0,provider:'ClawPump'},
  {id:'token_search',name:'Token Search',cat:'trading',price:0,provider:'ClawPump'},
  {id:'dca_create',name:'DCA Create',cat:'trading',price:0,provider:'ClawPump'},
  {id:'perps_markets',name:'Perps Markets',cat:'trading',price:0,provider:'ClawPump'},
  {id:'jup_lend_deposit',name:'Jupiter Lend',cat:'defi',price:0,provider:'ClawPump'},
  {id:'stablecrypto-coingecko-price',name:'CoinGecko Price',cat:'crypto',price:0.005,provider:'Syraa'},
  {id:'stableenrich-exa-search',name:'Exa Search',cat:'research',price:0.01,provider:'Syraa'},
  {id:'stablesocial-tiktok-profile',name:'TikTok Profile',cat:'social',price:0.06,provider:'Syraa'},
];
export default function ToolsPage() {
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
          <h1 className="mb-8 text-2xl font-bold">Available Tools</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map(tool=>(
              <div key={tool.id} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition hover:border-[#a855f7]">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold">{tool.name}</h3>
                  <span className="text-xs text-[#8888a0]">{tool.provider}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#1a1a28] px-2 py-0.5 text-xs text-[#06b6d4]">{tool.cat}</span>
                  <span className="text-sm font-bold text-[#00d68f]">{tool.price > 0 ? '$'+tool.price : 'Free'}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
