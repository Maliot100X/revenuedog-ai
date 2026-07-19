import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // Fetch from ClawPump API
    const res = await fetch('https://clawpump.tech/api/tokens?sort=new&limit=20', {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 30 }
    });
    const data = await res.json();

    // Find our $RA token
    const RA_MINT = '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K';
    const raToken = data.tokens?.find((t: any) => t.mintAddress === RA_MINT);

    // Format tokens
    const tokens = (data.tokens || []).map((t: any) => ({
      mint: t.mintAddress,
      name: t.name,
      symbol: t.symbol,
      image: t.imageUrl || '',
      marketCap: t.marketCap || 0,
      price: t.price || 0,
      volume24h: t.volume24h || 0,
      volumeAllTime: t.volumeAllTime || 0,
      agentName: t.agentName || '',
      agentImage: t.agentAvatarUrl || '',
      verified: t.verified || false,
      isOurs: t.mintAddress === RA_MINT,
      source: t.source || 'clawpump',
      platform: t.launchPlatform || 'pump_fun',
      twitter: t.twitter || '',
      website: t.website || '',
      createdAt: t.createdAt || '',
    }));

    return NextResponse.json({
      ourToken: raToken ? {
        mint: raToken.mintAddress,
        name: raToken.name,
        symbol: raToken.symbol,
        image: raToken.imageUrl || '',
        marketCap: raToken.marketCap || 0,
        price: raToken.price || 0,
        volume24h: raToken.volume24h || 0,
      } : { mint: RA_MINT, name: 'RevenueDog Ai', symbol: '$RA' },
      tokens,
      total: data.total || tokens.length,
      source: 'clawpump.tech'
    });
  } catch (e) {
    return NextResponse.json({
      ourToken: { mint: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K', name: 'RevenueDog Ai', symbol: '$RA' },
      tokens: [],
      total: 0,
      error: 'Failed to fetch from ClawPump'
    });
  }
}
