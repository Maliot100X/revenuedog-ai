import { NextResponse } from 'next/server';
import { supaQuery } from '@/lib/db';
export async function GET() {
  try {
    const agents = await supaQuery('rdog_agents', 'id,total_earned,total_tasks');
    return NextResponse.json({ total_agents: agents.length, total_earned: agents.reduce((s, a) => s + Number(a.total_earned), 0), total_tasks: agents.reduce((s, a) => s + Number(a.total_tasks), 0), platform: 'RevenueDogAi', chain: 'Solana', token: '$RA' });
  } catch (e) { return NextResponse.json({ error: (e as Error).message }, { status: 500 }); }
}
