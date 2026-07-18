const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const KEY = process.env.SUPABASE_SERVICE_KEY || '';

export async function supaQuery(table: string, select: string = '*', order?: string): Promise<any[]> {
  let url = URL + '/rest/v1/' + table + '?select=' + select;
  if (order) url += '&order=' + order;
  const res = await fetch(url, {
    headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY },
    signal: AbortSignal.timeout(30000)
  });
  if (!res.ok) throw new Error('DB: ' + res.status);
  return res.json() as Promise<any[]>;
}

export async function supaInsert(table: string, data: Record<string, any>): Promise<any[]> {
  const res = await fetch(URL + '/rest/v1/' + table, {
    method: 'POST',
    headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(30000)
  });
  if (!res.ok) throw new Error('DB: ' + res.status + ' ' + await res.text());
  return res.json() as Promise<any[]>;
}

export async function supaFilter(table: string, column: string, value: string): Promise<any[]> {
  const res = await fetch(URL + '/rest/v1/' + table + '?' + column + '=eq.' + value + '&select=*', {
    headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY },
    signal: AbortSignal.timeout(30000)
  });
  if (!res.ok) throw new Error('DB: ' + res.status);
  return res.json() as Promise<any[]>;
}
