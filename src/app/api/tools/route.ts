import { NextResponse } from 'next/server';

const CPK = process.env.NEXT_PUBLIC_CLAWPUMP_KEY || '';

const TOOLS = [
  {id:'swap_quote',name:'Swap Quote',desc:'Token swap quote via Jupiter',cat:'trading',price:0,provider:'clawpump'},
  {id:'swap_execute',name:'Swap Execute',desc:'Execute token swap on Solana',cat:'trading',price:0,provider:'clawpump'},
  {id:'token_search',name:'Token Search',desc:'Search tokens on Solana',cat:'trading',price:0,provider:'clawpump'},
  {id:'dca_create',name:'DCA Create',desc:'Create DCA order',cat:'trading',price:0,provider:'clawpump'},
  {id:'perps_markets',name:'Perps Markets',desc:'Phoenix perpetual markets',cat:'trading',price:0,provider:'clawpump'},
  {id:'perps_order_execute',name:'Perps Order',desc:'Execute perpetual order',cat:'trading',price:0,provider:'clawpump'},
  {id:'jup_lend_deposit',name:'Jupiter Lend',desc:'Deposit to Jupiter lending',cat:'defi',price:0,provider:'clawpump'},
  {id:'jup_lend_withdraw',name:'Jupiter Withdraw',desc:'Withdraw from Jupiter',cat:'defi',price:0,provider:'clawpump'},
  {id:'stablecrypto-coingecko-price',name:'CoinGecko Price',desc:'Token price from CoinGecko',cat:'crypto',price:0.005,provider:'syraa'},
  {id:'stablecrypto-coingecko-trending',name:'Trending Tokens',desc:'Get trending tokens',cat:'crypto',price:0.005,provider:'syraa'},
  {id:'stablecrypto-defillama-tvl',name:'DeFiLlama TVL',desc:'Total value locked in DeFi',cat:'defi',price:0.005,provider:'syraa'},
  {id:'stablesocial-tiktok-profile',name:'TikTok Profile',desc:'Get TikTok profile data',cat:'social',price:0.06,provider:'syraa'},
  {id:'stablesocial-reddit-subreddit',name:'Reddit Data',desc:'Get subreddit data',cat:'social',price:0.06,provider:'syraa'},
  {id:'stableenrich-exa-search',name:'Exa Search',desc:'AI-powered web search',cat:'research',price:0.01,provider:'syraa'},
  {id:'stableenrich-firecrawl-scrape',name:'Web Scrape',desc:'Scrape any website',cat:'research',price:0.01,provider:'syraa'},
  {id:'create_agent',name:'Create Agent',desc:'Create AI agent on ClawPump',cat:'agent',price:0,provider:'clawpump'},
  {id:'list_agents',name:'List Agents',desc:'List all your agents',cat:'agent',price:0,provider:'clawpump'},
  {id:'chat_with_agent',name:'Chat Agent',desc:'Chat with AI agent',cat:'agent',price:0,provider:'clawpump'},
  {id:'browse_marketplace',name:'Marketplace',desc:'Browse agent marketplace',cat:'marketplace',price:0,provider:'clawpump'},
  {id:'launch_token',name:'Launch Token',desc:'Launch new token on pump.fun',cat:'agent',price:0,provider:'clawpump'},
];

export async function GET() {
  return NextResponse.json({ tools: TOOLS, total: TOOLS.length, cpk: CPK ? 'configured' : 'missing' });
}
