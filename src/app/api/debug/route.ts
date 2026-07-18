import { NextResponse } from 'next/server';
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET';
  const key = process.env.SUPABASE_SERVICE_KEY || 'NOT SET';
  const keyLen = key.length;
  const keyStart = key.substring(0, 10);
  try {
    const res = await fetch(url + '/rest/v1/rdog_agents?select=name&limit=3', {
      headers: { 'apikey': key, 'Authorization': 'Bearer ' + key },
      signal: AbortSignal.timeout(10000)
    });
    const data = await res.json();
    return NextResponse.json({ envSet: keyLen > 10, url, keyStart, status: res.status, agents: data });
  } catch (e: any) {
    return NextResponse.json({ envSet: keyLen > 10, url, keyStart, error: e.message });
  }
}
