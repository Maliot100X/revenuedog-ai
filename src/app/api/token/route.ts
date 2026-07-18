import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const res = await fetch('https://clawpump.tech/tokens/3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K', { next: { revalidate: 300 } });
    const html = await res.text();
    const title = html.match(/property="og:title"\s+content="([^"]*)"/);
    return NextResponse.json({
      symbol: '$RA', name: 'RevenueDog Ai',
      description: 'RevenueDog Ai is an autonomous ClawPump agent tokenized on Solana.',
      contract: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K',
      network: 'solana', platform: 'clawpump.tech',
      profileUrl: 'https://clawpump.tech/tokens/3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K',
      ogTitle: title ? title[1] : '$RA RevenueDog Ai'
    });
  } catch {
    return NextResponse.json({ symbol: '$RA', name: 'RevenueDog Ai', contract: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K', platform: 'clawpump.tech' });
  }
}
