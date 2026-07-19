import { NextResponse } from 'next/server';

const RA_MINT = '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K';

export const runtime = 'edge';

export async function GET() {
  try {
    // Fetch our $RA token first
    const raRes = await fetch('https://frontend-api-v3.pump.fun/coins/' + RA_MINT, { signal: AbortSignal.timeout(8000), next: { revalidate: 30 } });
    const raData = await raRes.json();

    // Fetch top tokens by market cap
    const topRes = await fetch('https://frontend-api-v3.pump.fun/coins?limit=10&sort=market_cap&order=desc', { signal: AbortSignal.timeout(8000), next: { revalidate: 30 } });
    const topTokens = await topRes.json();

    // Format our token
    const ourToken = {
      mint: RA_MINT,
      name: raData.name || 'RevenueDog Ai',
      symbol: '$' + (raData.symbol || 'RA'),
      image: raData.image_uri || '',
      marketCapSol: raData.market_cap || 0,
      marketCapUsd: raData.usd_market_cap || 0,
      price: raData.market_cap && raData.total_supply ? (raData.market_cap / (raData.total_supply / 1000000)) : 0,
      complete: raData.complete || false,
      replyCount: raData.reply_count || 0,
      lastTrade: raData.last_trade_timestamp || 0,
      isOurs: true,
    };

    // Format top tokens
    const formatted = topTokens.map((t: any) => ({
      mint: t.mint,
      name: t.name,
      symbol: t.symbol,
      image: t.image_uri || '',
      marketCapSol: t.market_cap || 0,
      marketCapUsd: t.usd_market_cap || 0,
      price: t.market_cap && t.total_supply ? (t.market_cap / (t.total_supply / 1000000)) : 0,
      complete: t.complete || false,
      replyCount: t.reply_count || 0,
      lastTrade: t.last_trade_timestamp || 0,
      isOurs: false,
    })).filter((t: any) => t.mint !== RA_MINT);

    // Our token is always #1
    return NextResponse.json({
      ourToken,
      topTokens: [ourToken, ...formatted],
      total: formatted.length + 1,
      source: 'pump.fun'
    });
  } catch (e) {
    return NextResponse.json({
      ourToken: { mint: RA_MINT, name: 'RevenueDog Ai', symbol: '$RA', isOurs: true },
      topTokens: [],
      total: 0,
      error: 'Failed to fetch from Pump.fun'
    });
  }
}
