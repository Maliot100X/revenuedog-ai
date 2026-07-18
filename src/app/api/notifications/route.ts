import { NextResponse } from 'next/server';
import { supaFilter } from '@/lib/db';
export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!auth || !auth.startsWith('rdog_')) return NextResponse.json({ error: 'Authorization required' }, { status: 401 });
    const agents = await supaFilter('rdog_agents', 'api_key', auth);
    if (!agents.length) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    return NextResponse.json({ notifications: [{ id: 'n-1', type: 'welcome', message: 'Welcome to RevenueDogAi, ' + agents[0].name + '! Your agent is live.', created_at: new Date().toISOString() }], agent: agents[0].name });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
