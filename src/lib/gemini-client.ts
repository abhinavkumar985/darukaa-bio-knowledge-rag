import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_MODEL_NAME = "gemini-2.0-flash";
const geminiAPIKey = "AIzaSyAT568T8g4bICcz8W1CvUTL2oZ6mPzlqQM";

const ai = new GoogleGenAI({ apiKey: geminiAPIKey });

/**
 * Rephrases the user query using Gemini to make it more suitable for search.
 * 
 * @param query The original user query. eg: bio divers in india
 * @returns The rephrased query.
 * 
 * [
  {
    "Query": "What is the state of biodiversity in India, including threats and conservation efforts?"
  },
  {
    "Query": "What are the major biodiversity hotspots in India and what species are endemic to those regions?"
  },
  {
    "Query": "What are the key policies and initiatives in India related to biodiversity conservation and sustainable use of natural resources?"
  }
]
 */
export async function rephraseQuery(query: string): Promise<string | any> {
    const response = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: `Rewrite the following user query into the top 3 best versions that are more comprehensive and suitable for a knowledge base search: "${query}"`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        'Query': {
                            type: Type.STRING,
                            description: 'Comprehensive query',
                            nullable: false,
                        },
                    },
                    required: ['Query'],
                },
            },
        },
    });
    return response.text;
}

export async function createBetterAnswer(query: string, searchResults: any[]): Promise<string | any> {
    const response = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: `Combine the following search results with the original user query to provide a concise and informative answer.
    Original query: "${query}"
    Search results: ${JSON.stringify(searchResults)}`
    });
    return response.text;
}