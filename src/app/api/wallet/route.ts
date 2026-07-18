import { NextResponse } from 'next/server';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
export async function POST(req: Request) {
  const body = await req.json();
  if (body.action === 'generate') {
    const kp = Keypair.generate();
    return NextResponse.json({ address: kp.publicKey.toBase58(), privateKey: bs58.encode(kp.secretKey), message: 'SAVE THIS PRIVATE KEY - SHOWN ONCE' });
  }
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
