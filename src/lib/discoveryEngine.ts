import nodeFetch from 'node-fetch';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const PROJECT_ID = '194113201958';
const LOCATION = 'eu';
const COLLECTION_ID = 'default_collection';
const ENGINE_ID = 'darukaa-knowledge-hub-app_1747299091695';
const SERVING_CONFIG_ID = 'default_search';

const SEARCH_URL = `https://${LOCATION}-discoveryengine.googleapis.com/v1alpha/projects/${PROJECT_ID}/locations/${LOCATION}/collections/${COLLECTION_ID}/engines/${ENGINE_ID}/servingConfigs/${SERVING_CONFIG_ID}:search`;

export async function searchDiscoveryEngine(query: string): Promise<{ queryId: string; session: string }> {
  // Using node-fetch for making the HTTP request
  const accessToken = await getAccessToken(); // Implement getAccessToken function
  const response = await nodeFetch(SEARCH_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      pageSize: 10,
      queryExpansionSpec: { condition: 'AUTO' },
      spellCorrectionSpec: { mode: 'AUTO' },
      languageCode: 'en-US',
      contentSearchSpec: { extractiveContentSpec: { maxExtractiveAnswerCount: 1 } },
      userInfo: { timeZone: 'Europe/Berlin' },
      session: `projects/${PROJECT_ID}/locations/${LOCATION}/collections/${COLLECTION_ID}/engines/${ENGINE_ID}/sessions/-`, // Start a new session
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Discovery Engine Search API error: ${response.status} - ${errorBody}`);
  }

  const data: any = await response.json();

  // Extract queryId and session from the response
  // The session name is usually in the response body or the Location header,
  // but the curl example puts it directly in the subsequent request body.
  // For now, we'll assume the session name can be reconstructed or is part of a
  // field in the response like 'session' if the API returns it explicitly.
  // Based on the second curl example, the session seems to be returned.
  const session = data.session;

  // The second curl example shows queryId being returned in the response body.
  const queryId = data.queryId;


  if (!queryId || !session) {
      console.error("Could not find queryId or session in search response:", data);
      throw new Error("Failed to get queryId or session from Discovery Engine search.");
  }


  return { queryId, session };
}

const ANSWER_URL = `https://${LOCATION}-discoveryengine.googleapis.com/v1alpha/projects/${PROJECT_ID}/locations/${LOCATION}/collections/${COLLECTION_ID}/engines/${ENGINE_ID}/servingConfigs/${SERVING_CONFIG_ID}:answer`;

export async function answerDiscoveryEngine(query: string, queryId: string, session: string): Promise<string> {
  const accessToken = await getAccessToken();

  const response = await nodeFetch(ANSWER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: { text: query, queryId: queryId },
      session: session,
      relatedQuestionsSpec: { enable: true },
      answerGenerationSpec: {
        ignoreAdversarialQuery: true,
        ignoreNonAnswerSeekingQuery: false,
        ignoreLowRelevantContent: true,
        multimodalSpec: {},
        includeCitations: true,
        modelSpec: { modelVersion: 'stable' }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Discovery Engine Answer API error: ${response.status}`);
  }


  // @ts-ignore
  return { queryId, session };
}


// Helper function to get the access token
// In a production environment, use a more secure method to obtain credentials.
async function getAccessToken(): Promise<string> {
  try {
    const { stdout } = await execAsync('gcloud auth print-access-token');
    return stdout.trim();
  } catch (error) {
    console.error("Error getting gcloud access token:", error);
    throw new Error("Failed to obtain Google Cloud access token.");
  }
}
