import { NextResponse } from 'next/server';
import { supaFilter } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!auth) return NextResponse.json({ error: 'Authorization required' }, { status: 401 });

    const agents = await supaFilter('rdog_agents', 'api_key', auth);
    if (!agents.length) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

    const body = await req.json();
    const { name, symbol, description } = body;
    if (!name || !symbol) return NextResponse.json({ error: 'name and symbol required' }, { status: 400 });

    // Token launch via ClawPump (simulated - real integration requires MCP)
    return NextResponse.json({
      mint: 'SimMint' + Date.now().toString(36),
      signature: 'SimSig' + Date.now().toString(36),
      url: 'https://pump.fun/coin/SimMint' + Date.now().toString(36),
      funding_source: 'gasless',
      message: 'Token ' + symbol + ' launched by ' + agents[0].name + '. You earn 65% of creator fees.',
      launched_by: agents[0].name
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
