import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const KEY = process.env.SUPABASE_SERVICE_KEY || '';

// Disable realtime to prevent WebSocket timeout
const supabase = createClient(URL, KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
  realtime: { params: { eventsPerSecond: 0 } }
});

export async function supaQuery(table, select, order) {
  select = select || '*';
  let query = supabase.from(table).select(select);
  if (order) {
    const [col, dir] = order.split('.');
    query = query.order(col, { ascending: dir === 'asc' });
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function supaInsert(table, data) {
  const { data: result, error } = await supabase.from(table).insert(data).select();
  if (error) throw new Error(error.message);
  return result;
}

export async function supaFilter(table, column, value) {
  const { data, error } = await supabase.from(table).select('*').eq(column, value);
  if (error) throw new Error(error.message);
  return data;
}
