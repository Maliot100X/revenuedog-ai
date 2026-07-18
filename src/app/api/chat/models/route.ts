import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    models: [
      { id: 'revenuedog-default', name: 'RevenueDogAi Default', pricePerRequest: 0.004 },
      { id: 'revenuedog-pro', name: 'RevenueDogAi Pro', pricePerRequest: 0.01 },
    ],
  });
}
