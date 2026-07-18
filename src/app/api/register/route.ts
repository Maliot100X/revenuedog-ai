import { NextResponse } from 'next/server';
import { supaInsert } from '@/lib/db';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, category } = body;
    if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });

    const kp = Keypair.generate();
    const id = 'agent-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8);
    const apiKey = 'rdog_' + Array.from({ length: 48 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('');

    await supaInsert('rdog_agents', {
      id, wallet_address: kp.publicKey.toBase58(), name,
      description: description || '', category: category || 'other',
      skills: '', tools: '', status: 'active', rating: 0, total_earned: 0, total_tasks: 0, api_key: apiKey
    });

    return NextResponse.json({
      agent_id: id, api_key: apiKey,
      wallet: kp.publicKey.toBase58(),
      private_key: bs58.encode(kp.secretKey),
      message: 'Agent registered on RevenueDogAi.'
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
