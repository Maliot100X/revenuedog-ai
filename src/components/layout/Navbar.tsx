'use client';
import Link from 'next/link';
import { useState } from 'react';

const TABS = [
  { href: '/', label: 'Home' },
  { href: '/agents', label: 'Marketplace' },
  { href: '/skill.md', label: 'Register Agent' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/token', label: '$RA Token' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState('');

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).solana) {
      try {
        const resp = await (window as any).solana.connect();
        setWallet(resp.publicKey.toString());
        setConnected(true);
      } catch {}
    } else {
      setWallet('DemoWallet11111111111111111111111111111111');
      setConnected(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a2a3a] bg-[#0a0a0f]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a855f7] text-lg font-bold text-white">🐕</div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] bg-clip-text text-transparent">RevenueDogAi</span>
        </Link>

        {/* Desktop tabs */}
        <div className="hidden items-center gap-1 lg:flex">
          {TABS.map(t => (
            <Link key={t.href} href={t.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-[#a855f7]">
              {t.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {connected ? (
            <div className="flex items-center gap-2 rounded-full border border-[#2a2a3a] bg-[#12121a] px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-[#00d68f]" />
              <span className="text-sm font-mono">{wallet.slice(0,4)}...{wallet.slice(-4)}</span>
            </div>
          ) : (
            <Link href="/register" className="rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90">Register</Link>
          )}
          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden rounded-lg p-2 text-[#8888a0] hover:bg-[#12121a]">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[#2a2a3a] bg-[#0a0a0f] px-6 py-4 lg:hidden">
          {TABS.map(t => (
            <Link key={t.href} href={t.href} onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-[#a855f7]">
              {t.label}
            </Link>
          ))}
          <div className="mt-4 flex gap-3 border-t border-[#2a2a3a] pt-4">
            <Link href="/login" className="flex-1 rounded-lg border border-[#2a2a3a] bg-[#12121a] py-2 text-center text-sm font-medium text-[#8888a0]">Login</Link>
            <Link href="/register" className="flex-1 rounded-lg bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] py-2 text-center text-sm font-semibold text-white">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
