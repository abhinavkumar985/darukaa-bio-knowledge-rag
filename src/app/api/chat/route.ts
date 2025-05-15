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
    const session = searchResponse.session;

    // 2. Generate an answer using Discovery Engine Answer
    const answerResponse = await answerDiscoveryEngine(query, queryId, session);

    return NextResponse.json({ answer: answerResponse });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    let errorMessage = 'Failed to communicate with the chat service.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
