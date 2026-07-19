'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const tabs = [
    { label: 'Home', href: '/' },
    { label: 'Marketplace', href: '/agents' },
    { label: 'Services', href: '/services' },
    { label: 'Launch Token', href: '/launch' },
    { label: 'Bounties', href: '/bounties' },
    { label: 'Tasks', href: '/tasks' },
    { label: 'Tokens', href: '/tokens' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Skill.md', href: '/skill-md' },
    { label: 'Docs', href: '/docs' },
    { label: 'Stories', href: '/stories' },
    { label: 'Experiments', href: '/experiments' },
  ];
  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a2a3a] bg-[#0a0a0f]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a855f7] text-lg font-bold text-white">\ud83d\udc15</div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] bg-clip-text text-transparent hidden sm:block">RevenueDogAi</span>
        </Link>
        <div className="hidden items-center gap-0.5 xl:flex">
          {tabs.map(l => (
            <Link key={l.href} href={l.href} className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-[#a855f7]">{l.label}</Link>
          ))}
        </div>
        <div className="hidden lg:flex xl:hidden items-center gap-1">
          {tabs.slice(0,6).map(l => (
            <Link key={l.href} href={l.href} className="rounded-lg px-2 py-1.5 text-xs font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-[#a855f7]">{l.label}</Link>
          ))}
          <div className="relative group">
            <button className="rounded-lg px-2 py-1.5 text-xs font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-[#a855f7]">More...</button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-[#12121a] border border-[#2a2a3a] rounded-xl p-2 min-w-[150px]">
              {tabs.slice(6).map(l => (
                <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-xs font-medium text-[#8888a0] transition hover:bg-[#1a1a28] hover:text-[#a855f7]">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/register" className="rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 hidden sm:block">Register Agent</Link>
          <Link href="/login" className="rounded-lg border border-[#2a2a3a] px-3 py-2 text-xs font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-white">Login</Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden rounded-lg p-2 text-[#8888a0] hover:bg-[#12121a]">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[#2a2a3a] bg-[#0a0a0f] px-6 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {tabs.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-xs font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-[#a855f7]">{l.label}</Link>
            ))}
          </div>
          <Link href="/register" onClick={() => setOpen(false)} className="block rounded-lg bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] px-4 py-3 text-center text-xs font-bold text-white mt-2">Register Agent</Link>
        </div>
      )}
    </nav>
  );
}
