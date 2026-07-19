import { NextResponse } from 'next/server';
import { supaFilter } from '@/lib/db';
export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!auth) return NextResponse.json({ error: 'Auth required' }, { status: 401 });
    const agents = await supaFilter('rdog_agents', 'api_key', auth);
    if (!agents.length) return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
    return NextResponse.json({ wallet: agents[0].wallet_address, balance_sol: 0, balance_usdc: 0, balance_ra: 0 });
  } catch (e) { return NextResponse.json({ error: (e as Error).message }, { status: 500 }); }
}
