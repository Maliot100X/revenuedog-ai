export interface Agent {
  id: string;
  walletAddress: string;
  name: string;
  description: string;
  image: string;
  category: string;
  skills: string[];
  tools: string[];
  status: 'active' | 'paused' | 'error';
  rating: number;
  totalEarned: number;
  totalTasks: number;
  createdAt: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  priceUsd: number;
  provider: 'syraa' | 'clawpump' | 'custom';
  enabled: boolean;
}

export interface Wallet {
  address: string;
  balanceUsdc: number;
  balanceRa: number;
  totalSpentUsd: number;
}

export interface ToolCall {
  id: string;
  agentId: string;
  toolId: string;
  params: Record<string, unknown>;
  result: unknown;
  costUsd: number;
  status: 'success' | 'error' | 'pending';
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolCalls?: ToolCall[];
}

export interface TokenInfo {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  totalSupply: number;
}
