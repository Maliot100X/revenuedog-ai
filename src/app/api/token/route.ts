import { NextResponse } from 'next/server';

const MINT = '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K';

export async function GET() {
  try {
    // Fetch REAL data from Pump.fun API
    const res = await fetch('https://frontend-api-v3.pump.fun/coins/' + MINT, {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 60 }
    });
    const data = await res.json();

    return NextResponse.json({
      symbol: '$' + (data.symbol || 'RA'),
      name: data.name || 'RevenueDog Ai',
      description: data.description || '',
      contract: MINT,
      network: 'solana',
      platform: 'clawpump.tech',
      profileUrl: 'https://clawpump.tech/tokens/' + MINT,
      imageUri: data.image_uri || '',
      twitter: data.twitter || '',
      website: data.website || '',
      creator: data.creator || '',
      marketCap: data.usd_market_cap || data.market_cap || 0,
      marketCapSol: data.market_cap || 0,
      totalSupply: data.total_supply || 1000000000000000,
      complete: data.complete || false,
      bondingCurve: data.bonding_curve || '',
      poolAddress: data.pool_address || '',
      lastTrade: data.last_trade_timestamp || 0,
      createdAt: data.created_timestamp || 0,
      athMarketCap: data.ath_market_cap || 0,
      program: data.program || 'pump',
      nsfw: data.nsfw || false,
      banned: data.is_banned || false,
      replyCount: data.reply_count || 0,
    });
  } catch (e) {
    return NextResponse.json({
      symbol: '$RA', name: 'RevenueDog Ai', contract: MINT,
      network: 'solana', platform: 'clawpump.tech',
      error: 'Failed to fetch live data'
    });
  }
}
