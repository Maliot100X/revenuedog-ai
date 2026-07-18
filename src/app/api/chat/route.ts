import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, model, walletAddress } = body;

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages array required' }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];

  return NextResponse.json({
    id: 'chat-' + Date.now(),
    model: model || 'revenuedog-default',
    choices: [{
      message: {
        role: 'assistant',
        content: 'RevenueDogAi agent received your message. Full integration pending API keys.',
      },
    }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  });
}
