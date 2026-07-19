import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ tokens: [{ symbol: '$RA', name: 'RevenueDogAi', contract: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K', platform: 'clawpump.tech' }], total: 1 });
}
