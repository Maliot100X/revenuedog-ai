import { NextResponse } from 'next/server';

export const runtime = 'edge';

const RA_MINT = '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K';
const CLAW_MINT = '739dnZEG4yaBWFsY8L8ZwrfhGG6dhtCSercW8Umspump';
const ATELIER_MINT = '7newJUjH7LGsGPDfEq83gxxy2d1q39A84SeUKha8pump';
const TOP3 = [RA_MINT, CLAW_MINT, ATELIER_MINT];

async function fetchPumpFun(mint: string) {
  try {
    const r = await fetch('https://frontend-api-v3.pump.fun/coins/' + mint, { signal: AbortSignal.timeout(6000) });
    const d = await r.json();
    return {
      mint,
      name: d.name || '',
      symbol: d.symbol || '',
      image: d.image_uri || '',
      marketCap: d.usd_market_cap || 0,
      price: d.market_cap && d.total_supply ? (d.market_cap / (d.total_supply / 1000000)) : 0,
      volume24h: 0,
      agentName: '',
      agentImage: '',
      verified: true,
      isOurs: mint === RA_MINT,
      source: 'pump.fun',
      twitter: d.twitter || '',
      website: d.website || '',
      createdAt: d.created_timestamp ? new Date(d.created_timestamp).toISOString() : '',
    };
  } catch (e) {
    return { mint, name: '', symbol: '', image: '', marketCap: 0, price: 0, volume24h: 0, isOurs: mint === RA_MINT, source: 'pump.fun' };
  }
}

export async function GET() {
  try {
    // Fetch top 3 from Pump.fun (guaranteed real data)
    const [ra, claw, atelier] = await Promise.all([
      fetchPumpFun(RA_MINT),
      fetchPumpFun(CLAW_MINT),
      fetchPumpFun(ATELIER_MINT),
    ]);

    // Fetch rest from ClawPump API
    let clawTokens: any[] = [];
    try {
      const cpRes = await fetch('https://clawpump.tech/api/tokens?sort=new&limit=20', { signal: AbortSignal.timeout(8000) });
      const cpData = await cpRes.json();
      clawTokens = (cpData.tokens || [])
        .filter((t: any) => !TOP3.includes(t.mintAddress))
        .map((t: any) => ({
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
          twitter: t.twitter || '',
          website: t.website || '',
          createdAt: t.createdAt || '',
        }));
    } catch (e) {}

    // Top 3 always first: $RA, CLAW, ATELIER, then rest
    return NextResponse.json({
      ourToken: ra,
      tokens: [ra, claw, atelier, ...clawTokens],
      total: clawTokens.length + 3,
      source: 'clawpump.tech'
    });
  } catch (e) {
    return NextResponse.json({
      ourToken: { mint: RA_MINT, name: 'RevenueDog Ai', symbol: '$RA', isOurs: true },
      tokens: [],
      total: 0,
      error: 'Failed to fetch'
    });
  }
}
