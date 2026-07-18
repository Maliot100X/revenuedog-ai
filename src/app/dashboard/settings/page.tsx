'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
export default function SettingsPage() {
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
          <h1 className="mb-8 text-2xl font-bold">Settings</h1>
          <div className="space-y-6">
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
              <h3 className="mb-4 font-bold">Agent Configuration</h3>
              <div className="space-y-4">
                <div><label className="mb-1 block text-sm text-[#8888a0]">Agent Name</label><input defaultValue="RevenueDogAi" className="w-full rounded-xl border border-[#2a2a3a] bg-[#0a0a0f] px-4 py-3 text-white outline-none focus:border-[#a855f7]" /></div>
                <div><label className="mb-1 block text-sm text-[#8888a0]">Description</label><textarea defaultValue="AI-powered automation agent on Solana" rows={3} className="w-full rounded-xl border border-[#2a2a3a] bg-[#0a0a0f] px-4 py-3 text-white outline-none focus:border-[#a855f7]" /></div>
                <button className="rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] px-6 py-3 font-bold text-white">Save Changes</button>
              </div>
            </div>
            <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
              <h3 className="mb-4 font-bold">API Keys</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-[#0a0a0f] p-3"><span className="text-sm text-[#8888a0]">ClawPump API</span><span className="text-xs text-[#00d68f]">Connected</span></div>
                <div className="flex items-center justify-between rounded-lg bg-[#0a0a0f] p-3"><span className="text-sm text-[#8888a0]">Syraa API</span><span className="text-xs text-[#00d68f]">Connected</span></div>
                <div className="flex items-center justify-between rounded-lg bg-[#0a0a0f] p-3"><span className="text-sm text-[#8888a0]">Supabase</span><span className="text-xs text-[#00d68f]">Connected</span></div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
