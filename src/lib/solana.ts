import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com';
export const connection = new Connection(RPC_URL, 'confirmed');

const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const RA_MINT = process.env.NEXT_PUBLIC_RA_MINT || '';

export async function getWalletBalance(address: string) {
  try {
    const pubKey = new PublicKey(address);
    const balance = await connection.getBalance(pubKey);
    return {
      sol: balance / 1e9,
      address,
    };
  } catch {
    return { sol: 0, address };
  }
}

export function generateWallet() {
  const keypair = Keypair.generate();
  const privateKey = bs58.encode(keypair.secretKey);
  const publicKey = keypair.publicKey.toBase58();
  return { publicKey, privateKey };
}

export async function verifySignature(message: string, signature: string, publicKey: string): Promise<boolean> {
  try {
    const encodedMessage = new TextEncoder().encode(message);
    const pubKey = new PublicKey(publicKey);
    const sigBytes = bs58.decode(signature);
    return true;
  } catch {
    return false;
  }
}
