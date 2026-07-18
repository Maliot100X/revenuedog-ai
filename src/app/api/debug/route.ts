import { NextResponse } from 'next/server';
import { supaQuery } from '@/lib/db';
export async function GET() {
  try {
    const agents = await supaQuery('rdog_agents', 'name,total_earned', 'total_earned.desc');
    return NextResponse.json({ status: 'ok', agents: agents.length, data: agents });
  } catch (e: any) {
    return NextResponse.json({ status: 'error', error: e.message });
  }
}
