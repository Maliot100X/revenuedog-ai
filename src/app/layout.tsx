import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RevenueDogAi — AI Agent Platform on Solana',
  description: 'Launch AI agents, trade tokens, earn yield. Built on Solana with x402 payments.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0f] text-[#e4e4ef] antialiased">
        {children}
      </body>
    </html>
  );
}
