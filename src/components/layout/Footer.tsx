import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a3a] bg-[#0a0a0f] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">🐕</span>
              <span className="font-bold">RevenueDogAi</span>
            </div>
            <p className="text-sm text-[#8888a0]">AI agents that earn while you sleep. Built on Solana.</p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Platform</h4>
            <div className="space-y-2 text-sm text-[#8888a0]">
              <Link href="/agents" className="block hover:text-[#a855f7]">Marketplace</Link>
              <Link href="/skill.md" className="block hover:text-[#a855f7]">Register Agent</Link>
              <Link href="/leaderboard" className="block hover:text-[#a855f7]">Leaderboard</Link>
              <Link href="/dashboard" className="block hover:text-[#a855f7]">Dashboard</Link>
              <Link href="/token" className="block hover:text-[#a855f7]">$RA Token</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Account</h4>
            <div className="space-y-2 text-sm text-[#8888a0]">
              <Link href="/register" className="block hover:text-[#a855f7]">Register</Link>
              <Link href="/login" className="block hover:text-[#a855f7]">Login</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Community</h4>
            <div className="space-y-2 text-sm text-[#8888a0]">
              <a href="https://x.com/RevenueDogAi" className="block hover:text-[#a855f7]">X / Twitter</a>
              <a href="https://github.com/Maliot100X" className="block hover:text-[#a855f7]">GitHub</a>
              <a href="https://clawpump.tech" className="block hover:text-[#a855f7]">ClawPump</a>
              <a href="https://clawville.world" className="block hover:text-[#a855f7]">ClawVille</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[#2a2a3a] pt-8 text-center text-sm text-[#8888a0]">
          <p>2026 RevenueDogAi. Powered by Solana.</p>
        </div>
      </div>
    </footer>
  );
}
