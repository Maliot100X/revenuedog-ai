import { NextResponse } from 'next/server';
import { supaFilter, supaInsert } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { toolId, params, apiKey } = body;
    if (!toolId) return NextResponse.json({ error: 'toolId required' }, { status: 400 });

    // Verify agent exists
    if (apiKey) {
      const agents = await supaFilter('rdog_agents', 'api_key', apiKey);
      if (!agents.length) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

      // Log tool call
      await supaInsert('rdog_tool_calls', {
        id: 'tc-' + Date.now(), agent_id: agents[0].id, tool_id: toolId,
        params: JSON.stringify(params || {}), result: null, cost_usd: 0, status: 'pending'
      });
    }

    // Execute tool (simulated for now - real integration requires ClawPump MCP)
    const result = { toolId, params, status: 'executed', timestamp: new Date().toISOString() };
    return NextResponse.json({ success: true, result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
