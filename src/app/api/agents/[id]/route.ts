import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({
    id,
    name: 'RevenueDogAi Agent',
    description: 'AI agent for RevenueDogAi platform',
    status: 'active',
    tools: ['swap_quote', 'token_search', 'stablecrypto-coingecko-price'],
  });
}
