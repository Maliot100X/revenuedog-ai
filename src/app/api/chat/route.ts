import { NextResponse } from 'next/server';
import { supaFilter } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, apiKey, model } = body;
    if (!messages || !Array.isArray(messages)) return NextResponse.json({ error: 'messages array required' }, { status: 400 });

    // Verify agent
    if (apiKey) {
      const agents = await supaFilter('rdog_agents', 'api_key', apiKey);
      if (!agents.length) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    const lastMsg = messages[messages.length - 1];
    return NextResponse.json({
      id: 'chat-' + Date.now(),
      model: model || 'revenuedog-default',
      choices: [{ message: { role: 'assistant', content: 'RevenueDogAi received: ' + (lastMsg?.content || '') + '. Full ClawPump MCP integration pending.' } }],
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
