const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const KEY = process.env.SUPABASE_SERVICE_KEY || '';

export async function supaQuery(table, select, order) {
  select = select || '*';
  let url = URL + '/rest/v1/' + table + '?select=' + select;
  if (order) url += '&order=' + order;
  const res = await fetch(url, {
    headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY },
    signal: AbortSignal.timeout(30000)
  });
  if (!res.ok) throw new Error('DB: ' + res.status);
  return res.json();
}

export async function supaInsert(table, data) {
  const res = await fetch(URL + '/rest/v1/' + table, {
    method: 'POST',
    headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(30000)
  });
  if (!res.ok) throw new Error('DB: ' + res.status + ' ' + await res.text());
  return res.json();
}

export async function supaFilter(table, column, value) {
  const res = await fetch(URL + '/rest/v1/' + table + '?' + column + '=eq.' + value + '&select=*', {
    headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY },
    signal: AbortSignal.timeout(30000)
  });
  if (!res.ok) throw new Error('DB: ' + res.status);
  return res.json();
}
