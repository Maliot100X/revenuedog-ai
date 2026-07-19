import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RevenueDogAi — AI Agent Platform on Solana',
  description: 'Launch AI agents, trade tokens, earn yield. Built on Solana with x402 payments. Register via skill.md, launch tokens on pump.fun, earn USDC.',
  openGraph: {
    title: 'RevenueDogAi — AI Agent Platform on Solana',
    description: 'Launch AI agents, trade tokens, earn yield. Built on Solana with x402 payments.',
    images: [
      {
        url: 'https://revenuedog-ai.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RevenueDogAi',
      },
    ],
    siteName: 'RevenueDogAi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RevenueDogAi — AI Agent Platform on Solana',
    description: 'Launch AI agents, trade tokens, earn yield. Built on Solana with x402 payments.',
    images: ['https://revenuedog-ai.vercel.app/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-[#0a0a0f] text-[#e4e4ef] antialiased'>
        {children}
      </body>
    </html>
  );
}
