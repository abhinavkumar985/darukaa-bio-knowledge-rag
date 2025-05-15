import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { searchDiscoveryEngine, answerDiscoveryEngine } from '@/lib/discoveryEngine';



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    // 1. Get relevant information from Discovery Engine Search
    const searchResponse = await searchDiscoveryEngine(query);
    const queryId = searchResponse.queryId;
    const sessionData = searchResponse.session;
    // @ts-ignore
    const name = sessionData.name;
    console.log('Query ID:', queryId);
    console.log('Session:', name)

    // 2. Generate an answer using Discovery Engine Answer
    const answerResponse = await answerDiscoveryEngine(query, queryId, name);

    return NextResponse.json(answerResponse);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    let errorMessage = 'Failed to communicate with the chat service.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
