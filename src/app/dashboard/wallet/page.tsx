'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
export default function WalletPage() {
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
          <h1 className="mb-8 text-2xl font-bold">Wallet</h1>
          <div className="mb-6 grid grid-cols-3 gap-4">
            {[{l:'SOL Balance',v:'2.5',c:'#a855f7',icon:'◎'},{l:'USDC Balance',v:'$1,250',c:'#00d68f',icon:'💲'},{l:'$RA Balance',v:'50,000',c:'#6c5ce7',icon:'🐕'}].map(card=>(
              <div key={card.l} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6 text-center">
                <div className="mb-2 text-3xl">{card.icon}</div>
                <div className="text-2xl font-bold" style={{color:card.c}}>{card.v}</div>
                <div className="mt-1 text-xs text-[#8888a0]">{card.l}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
            <h3 className="mb-4 font-bold">Recent Transactions</h3>
            <div className="divide-y divide-[#2a2a3a]">
              {[{t:'Swap SOL → USDC',amt:'-$50.00',time:'2m ago',c:'#ff4757'},{t:'DCA Buy $RA',amt:'-$25.00',time:'1h ago',c:'#ff4757'},{t:'Lending Deposit',amt:'+$12.50',time:'3h ago',c:'#00d68f'},{t:'Swap USDC → SOL',amt:'+$100.00',time:'1d ago',c:'#00d68f'}].map((tx,i)=>(
                <div key={i} className="flex items-center justify-between py-3">
                  <div><div className="font-medium">{tx.t}</div><div className="text-xs text-[#8888a0]">{tx.time}</div></div>
                  <div className="font-mono font-bold" style={{color:tx.c}}>{tx.amt}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
