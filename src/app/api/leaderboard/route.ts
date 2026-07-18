import { NextResponse } from 'next/server';
import { supaQuery } from '@/lib/db';

export async function GET() {
  try {
    const agents = await supaQuery('rdog_agents', 'id,name,category,rating,total_earned,total_tasks', 'total_earned.desc');
    return NextResponse.json({ leaders: agents, total: agents.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
