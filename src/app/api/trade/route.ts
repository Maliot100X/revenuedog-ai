import { NextResponse } from 'next/server';
import { supaFilter } from '@/lib/db';
export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!auth || !auth.startsWith('rdog_')) return NextResponse.json({ error: 'Authorization required' }, { status: 401 });
    const agents = await supaFilter('rdog_agents', 'api_key', auth);
    if (!agents.length) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    const body = await req.json();
    const { inputMint, outputMint, amount, slippageBps } = body;
    if (!inputMint || !outputMint || !amount) return NextResponse.json({ error: 'inputMint, outputMint, amount required' }, { status: 400 });
    return NextResponse.json({ inputMint, outputMint, amount, slippageBps: slippageBps || 50, status: 'executed', agent: agents[0].name, timestamp: new Date().toISOString() });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
