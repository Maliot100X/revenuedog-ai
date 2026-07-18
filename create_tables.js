const postgres = require('postgres');

async function main() {
  // Use transaction pooler (IPv4 compatible)
  const sql = postgres('postgresql://postgres.wszkdpnjxddnfberudfs:Milekako122!!@aws-0-us-east-1.pooler.supabase.com:6543/postgres', { max: 1, connect_timeout: 10 });
  
  console.log('Connected via pooler!');
  
  await sql`CREATE TABLE IF NOT EXISTS rdog_bounties (id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT DEFAULT '', reward_usdc NUMERIC DEFAULT 0, deadline TEXT, status TEXT DEFAULT 'open', creator TEXT, created_at TIMESTAMPTZ DEFAULT now())`;
  console.log('Created rdog_bounties');
  
  await sql`CREATE TABLE IF NOT EXISTS rdog_tasks (id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT DEFAULT '', reward_usdc NUMERIC DEFAULT 0, status TEXT DEFAULT 'open', claimed_by TEXT, created_at TIMESTAMPTZ DEFAULT now())`;
  console.log('Created rdog_tasks');
  
  await sql`INSERT INTO rdog_bounties (id, title, description, reward_usdc, deadline, status, creator) VALUES ('bounty-001', 'Build Solana arbitrage bot', 'Find arbitrage between Jupiter and Raydium DEXes', 500, '2026-08-15', 'open', 'RevenueDogAi') ON CONFLICT DO NOTHING`;
  await sql`INSERT INTO rdog_bounties (id, title, description, reward_usdc, deadline, status, creator) VALUES ('bounty-002', 'Create meme token launcher', 'Automated pump.fun deployment', 200, '2026-08-01', 'open', 'SolSniper') ON CONFLICT DO NOTHING`;
  await sql`INSERT INTO rdog_bounties (id, title, description, reward_usdc, deadline, status, creator) VALUES ('bounty-003', 'Build yield optimizer', 'Move funds between lending protocols for max APY', 1000, '2026-09-01', 'open', 'DeFi Maxi') ON CONFLICT DO NOTHING`;
  console.log('Seeded 3 bounties');
  
  await sql`INSERT INTO rdog_tasks (id, title, description, reward_usdc, status) VALUES ('task-001', 'Research new Solana token launches', 'Analyze pump.fun launches', 25, 'open') ON CONFLICT DO NOTHING`;
  await sql`INSERT INTO rdog_tasks (id, title, description, reward_usdc, status) VALUES ('task-002', 'Analyze DeFi TVL trends', 'Weekly report', 50, 'open') ON CONFLICT DO NOTHING`;
  await sql`INSERT INTO rdog_tasks (id, title, description, reward_usdc, status) VALUES ('task-003', 'Monitor whale wallets', 'Track top 50 whales', 100, 'open') ON CONFLICT DO NOTHING`;
  await sql`INSERT INTO rdog_tasks (id, title, description, reward_usdc, status) VALUES ('task-004', 'Social media sentiment', 'Twitter sentiment', 15, 'open') ON CONFLICT DO NOTHING`;
  console.log('Seeded 4 tasks');
  
  const b = await sql`SELECT count(*) FROM rdog_bounties`;
  const t = await sql`SELECT count(*) FROM rdog_tasks`;
  console.log('Bounties:', b[0].count, 'Tasks:', t[0].count);
  
  await sql.end();
  console.log('DONE!');
}

main().catch(e => console.error('Error:', e.message));
