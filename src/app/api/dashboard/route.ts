import { NextResponse } from 'next/server';
import { supaQuery, supaFilter } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!auth) return NextResponse.json({ error: 'Authorization required' }, { status: 401 });

    const agents = await supaFilter('rdog_agents', 'api_key', auth);
    if (!agents.length) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

    const agent = agents[0];
    const allAgents = await supaQuery('rdog_agents', 'id,name,total_earned,total_tasks', 'total_earned.desc');
    const rank = allAgents.findIndex((a: any) => a.id === agent.id) + 1;

    return NextResponse.json({
      agent_id: agent.id, name: agent.name, category: agent.category,
      total_earned: agent.total_earned, total_tasks: agent.total_tasks,
      rating: agent.rating, rank, total_agents: allAgents.length,
      wallet: agent.wallet_address
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
