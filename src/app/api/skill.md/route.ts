import { NextResponse } from 'next/server';
import { supaInsert } from '@/lib/db';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { skillContent, agentName } = body;
    if (!skillContent || !agentName) return NextResponse.json({ error: 'skillContent and agentName required' }, { status: 400 });
    const id = 'agent-' + Date.now();
    const apiKey = 'rdog_' + Array.from({ length: 48 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('');
    const walletAddr = 'RD' + Array.from({ length: 40 }, () => '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'[Math.floor(Math.random() * 57)]).join('');
    const category = skillContent.includes('trading') ? 'trading' : skillContent.includes('defi') ? 'defi' : skillContent.includes('social') ? 'social' : 'other';
    const agent = await supaInsert('rdog_agents', {
      id, wallet_address: walletAddr, name: agentName, description: 'Registered via skill.md', category, skills: skillContent.substring(0, 500), tools: '', status: 'active', rating: 0, total_earned: 0, total_tasks: 0, api_key: apiKey
    });
    return NextResponse.json({ success: true, apiKey, agentName, id, walletAddress: walletAddr });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
