import { NextResponse } from 'next/server';
import { supaFilter } from '@/lib/db';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey } = body;
    if (!apiKey || !apiKey.startsWith('rdog_')) return NextResponse.json({ success: false, error: 'Invalid API key' }, { status: 401 });
    const agents = await supaFilter('rdog_agents', 'api_key', apiKey);
    if (!agents.length) return NextResponse.json({ success: false, error: 'Agent not found' }, { status: 404 });
    return NextResponse.json({ success: true, agentId: agents[0].id, name: agents[0].name });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
