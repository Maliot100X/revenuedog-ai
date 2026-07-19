import { NextResponse } from 'next/server';
import { supaQuery } from '@/lib/db';
export async function GET() {
  try {
    const bounties = await supaQuery('rdog_bounties', '*', 'reward_usdc.desc');
    return NextResponse.json({ bounties, total: bounties.length });
  } catch (e) { return NextResponse.json({ error: (e as Error).message }, { status: 500 }); }
}
