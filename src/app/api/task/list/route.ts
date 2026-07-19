import { NextResponse } from 'next/server';
import { supaQuery } from '@/lib/db';
export async function GET() {
  try {
    const tasks = await supaQuery('rdog_tasks', '*', 'reward_usdc.desc');
    return NextResponse.json({ tasks, total: tasks.length });
  } catch (e) { return NextResponse.json({ error: (e as Error).message }, { status: 500 }); }
}
