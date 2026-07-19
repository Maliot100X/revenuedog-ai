'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Marketplace', href: '/agents' },
    { label: 'Tokens', href: '/tokens' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Bounties', href: '/bounties' },
    { label: 'Tasks', href: '/tasks' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Docs', href: '/docs' },
  ];
  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a2a3a] bg-[#0a0a0f]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a855f7] text-lg font-bold text-white">\ud83d\udc15</div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] bg-clip-text text-transparent">RevenueDogAi</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-[#a855f7]">{l.label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/skill.md" className="hidden rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:block">Register Agent</Link>
          <Link href="/login" className="rounded-lg border border-[#2a2a3a] px-4 py-2 text-sm font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-white">Login</Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden rounded-lg p-2 text-[#8888a0] hover:bg-[#12121a]">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[#2a2a3a] bg-[#0a0a0f] px-6 py-4 lg:hidden">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-[#8888a0] transition hover:bg-[#12121a] hover:text-[#a855f7]">{l.label}</Link>
          ))}
          <Link href="/skill.md" onClick={() => setOpen(false)} className="block rounded-lg bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] px-4 py-3 text-center text-sm font-bold text-white mt-2">Register Agent</Link>
        </div>
      )}
    </nav>
  );
}
