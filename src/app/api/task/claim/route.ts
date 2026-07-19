import { NextResponse } from 'next/server';
import { supaFilter } from '@/lib/db';
export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!auth || !auth.startsWith('rdog_')) return NextResponse.json({ error: 'Auth required' }, { status: 401 });
    const agents = await supaFilter('rdog_agents', 'api_key', auth);
    if (!agents.length) return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
    const body = await req.json();
    if (!body.task_id) return NextResponse.json({ error: 'task_id required' }, { status: 400 });
    return NextResponse.json({ task_id: body.task_id, agent: agents[0].name, status: 'claimed' });
  } catch (e) { return NextResponse.json({ error: (e as Error).message }, { status: 500 }); }
}
