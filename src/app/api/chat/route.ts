import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { searchDiscoveryEngine, answerDiscoveryEngine } from '@/lib/discoveryEngine';
import { createBetterAnswer, rephraseQuery } from '@/lib/gemini-client';



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    const rephrasedQuery = await rephraseQuery(query);

    // 1. Get relevant information from Discovery Engine Search
    const searchResponse = await searchDiscoveryEngine(rephrasedQuery[0]['Query'] || query);
    const queryId = searchResponse.queryId;
    const sessionData = searchResponse.session;
    // @ts-ignore
    const name = sessionData.name;

    // 2. Generate an answer using Discovery Engine Answer
    const answerResponse: any = await answerDiscoveryEngine(query, queryId, name);
    const betterAns = await createBetterAnswer(query, answerResponse)

    const newAns = {
      ...answerResponse.answer,
      answerText: betterAns
    }
    const newResponse = {
      ...answerResponse,
      answer: newAns
    }
    // answerResponse.answer = betterAns;
    return NextResponse.json(newResponse);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    let errorMessage = 'Failed to communicate with the chat service.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
