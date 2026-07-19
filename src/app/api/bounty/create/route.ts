import { NextResponse } from 'next/server';
import { supaInsert, supaFilter } from '@/lib/db';
export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!auth || !auth.startsWith('rdog_')) return NextResponse.json({ error: 'Auth required' }, { status: 401 });
    const agents = await supaFilter('rdog_agents', 'api_key', auth);
    if (!agents.length) return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
    const body = await req.json();
    if (!body.title || !body.rewardUsdc) return NextResponse.json({ error: 'title and rewardUsdc required' }, { status: 400 });
    const id = 'bounty-' + Date.now();
    await supaInsert('rdog_bounties', { id, title: body.title, description: body.description || '', reward_usdc: body.rewardUsdc, deadline: body.deadline || 'TBD', status: 'open', creator: agents[0].name });
    return NextResponse.json({ id, title: body.title, reward_usdc: body.rewardUsdc, status: 'open', creator: agents[0].name });
  } catch (e) { return NextResponse.json({ error: (e as Error).message }, { status: 500 }); }
}
