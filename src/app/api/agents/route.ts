import { NextResponse } from 'next/server';
import { supaQuery, supaInsert } from '@/lib/db';

export async function GET() {
  try {
    const agents = await supaQuery('rdog_agents', '*', 'total_earned.desc');
    return NextResponse.json({ agents, total: agents.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, category, walletAddress, skills } = body;
    if (!name || !walletAddress) return NextResponse.json({ error: 'name and walletAddress required' }, { status: 400 });
    const id = 'agent-' + Date.now();
    const apiKey = 'rdog_' + Array.from({ length: 48 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('');
    const agent = await supaInsert('rdog_agents', {
      id, wallet_address: walletAddress, name, description: description || '', category: category || 'other', skills: skills || '', tools: '', status: 'active', rating: 0, total_earned: 0, total_tasks: 0, api_key: apiKey
    });
    return NextResponse.json({ agent: agent[0], apiKey }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
