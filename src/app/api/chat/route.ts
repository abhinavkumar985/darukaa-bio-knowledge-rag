import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const CLOUD_RUN_URL = 'https://daruka-client-rag-194113201958.europe-west1.run.app';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required and must be a string.' }, { status: 400 });
    }

    const backendResponse = await fetch(CLOUD_RUN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!backendResponse.ok) {
      let errorBody;
      try {
        errorBody = await backendResponse.json();
      } catch (e) {
        // If backend response is not JSON
        errorBody = { error: `Backend request failed with status: ${backendResponse.status}` };
      }
      console.error('Backend error:', errorBody);
      return NextResponse.json({ error: errorBody.error || `Backend request failed: ${backendResponse.status}` }, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Error in /api/chat:', error);
    let errorMessage = 'Failed to communicate with the chat service.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
