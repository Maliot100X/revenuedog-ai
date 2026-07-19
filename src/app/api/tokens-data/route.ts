import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const RA_MINT = '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K';

    // Fetch real data for our $RA token from Pump.fun
    let raData: any = {};
    try {
      const raRes = await fetch('https://frontend-api-v3.pump.fun/coins/' + RA_MINT, { signal: AbortSignal.timeout(8000) });
      raData = await raRes.json();
    } catch (e) {}

    const ourToken = {
      mint: RA_MINT,
      name: raData.name || 'RevenueDog Ai',
      symbol: '$' + (raData.symbol || 'RA'),
      image: raData.image_uri || '',
      marketCap: raData.usd_market_cap || 0,
      price: raData.market_cap && raData.total_supply ? (raData.market_cap / (raData.total_supply / 1000000)) : 0,
      volume24h: 0,
      agentName: 'RevenueDogAi',
      agentImage: '',
      verified: true,
      isOurs: true,
      source: 'pump.fun',
      platform: 'pump_fun',
      twitter: raData.twitter || 'https://x.com/RevenueDogAi',
      website: raData.website || '',
      createdAt: raData.created_timestamp ? new Date(raData.created_timestamp).toISOString() : '',
    };

    // Fetch ClawPump tokens
    let clawpumpTokens: any[] = [];
    try {
      const cpRes = await fetch('https://clawpump.tech/api/tokens?sort=new&limit=20', { signal: AbortSignal.timeout(8000) });
      const cpData = await cpRes.json();
      clawpumpTokens = (cpData.tokens || []).map((t: any) => ({
        mint: t.mintAddress,
        name: t.name,
        symbol: t.symbol,
        image: t.imageUrl || '',
        marketCap: t.marketCap || 0,
        price: t.price || 0,
        volume24h: t.volume24h || 0,
        agentName: t.agentName || '',
        agentImage: t.agentAvatarUrl || '',
        verified: t.verified || false,
        isOurs: false,
        source: 'clawpump.tech',
        platform: t.launchPlatform || 'pump_fun',
        twitter: t.twitter || '',
        website: t.website || '',
        createdAt: t.createdAt || '',
      }));
    } catch (e) {}

    // Our token is always first
    return NextResponse.json({
      ourToken,
      tokens: [ourToken, ...clawpumpTokens],
      total: clawpumpTokens.length + 1,
      source: 'clawpump.tech + pump.fun'
    });
  } catch (e) {
    return NextResponse.json({
      ourToken: { mint: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K', name: 'RevenueDog Ai', symbol: '$RA', isOurs: true },
      tokens: [],
      total: 0,
      error: 'Failed to fetch'
    });
  }
}
