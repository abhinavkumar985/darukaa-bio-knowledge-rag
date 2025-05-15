# Biodiversity and Conservation Knowledge RAG System

This is a Proof of Concept (POC), built during [Google GenAI & Agents for Builders - Berlin Edition](https://rsvp.withgoogle.com/events/gen-ai-builders-berlin?eventId=b8bb8eb0076943bea9ff76f7f49b7bd3&guestId=1088846bda474aa2992677b9ce471057) with the [Agenda](https://docs.google.com/presentation/d/18f74b5tdnAU-UHjiYHYIWwOt3SuD8dA9mS5KAxbNoIA/edit?resourcekey=0-mQzl-JSbxteOGI01R-wQKw&slide=id.g34fa9ffb321_0_1130#slide=id.g34fa9ffb321_0_1130).

This project aims to build a Retrieval-Augmented Generation (RAG) system for [Darukaa](https://www.darukaa.earth/) to provide accurate and relevant information on biodiversity and conservation topics, leveraging Google Cloud and Vertex AI Search.

## Overall Goal

To create a robust and user-friendly system that can answer complex questions about biodiversity and conservation by retrieving information from a curated knowledge base (PDF documents) and generating informative responses.

## Demo

Check the cool demo here
https://github.com/user-attachments/assets/05f03ab4-a8a2-47b8-af30-09648b5b15fa



## Core Components

*   **Knowledge Base:** A collection of relevant PDF documents (e.g., biodiversity and conservation-related articles, research papers) on biodiversity and conservation.
*   **Indexing and Retrieval:** Using Google Vertex AI Search to index the PDF documents and retrieve relevant passages based on user queries.
*   **User Interface:** A web application (built with Next.js) for users to interact with the system, input queries, and view responses.
*   **Language Model (Partially Implemented):** A powerful language model (e.g., Gemini) to generate coherent and informative answers based on the retrieved information.

## Google Tools Used

*   **Google Vertex AI Search:** For indexing and retrieving information from the PDF knowledge base.
*   **Google Cloud Storage:** To store the PDF documents.
*   **Vertex AI:** To access and utilize powerful language models.
*  **Google Cloud Functions or Cloud Run (Not Implemented):** For deploying the backend logic that handles user queries and interacts with Vertex AI Search and the language model.
 
## Approach Taken

### Phase 1: Setting up the Knowledge Base and Indexing (Focus for Hacking Session)

1.  **Curate Knowledge Base:** Gather relevant PDF documents on biodiversity and conservation topics.
2.  **Upload to Cloud Storage:** Store the PDF documents in a Google Cloud Storage bucket.
3.  **Configure Vertex AI Search:** 
    *   Create a Vertex AI Search data store.
    *   Connect the data store to the Cloud Storage bucket containing the PDFs.
    *   Initiate the indexing process.
4.  **Test Retrieval:** Use the Vertex AI Search console or API to test if relevant document snippets are retrieved for sample queries.

### Phase 2: Building the Application and Integration

5.  **Develop Backend:**
    *   Create an API endpoint (using Cloud Functions or Cloud Run) to receive user queries.
    *   Implement logic to call the Vertex AI Search API with the user query.
    *   Process the search results (retrieved passages).
    *   Call a language model (via Vertex AI) with the user query and the retrieved passages to generate an answer.
    *   Return the generated answer to the frontend.
6.  **Develop Frontend (Next.js):**
    *   Create a user interface with an input field for queries and a display area for responses.
    *   Implement logic to send user queries to the backend API.
    *   Display the responses received from the backend.

## Improvement
 
*   **Customer Query Improvement:** Use Gemini ai.model to [rephrasec customer](https://github.com/abhinavkumar985/darukaa-bot/blob/master/src/lib/gemini-client.ts#L26) query before sending to RAG, Vertex AI search.
*   **RAG Response Improvement:** Combine user query and RAG answers to formulate a [better answer](https://github.com/abhinavkumar985/darukaa-bot/blob/master/src/lib/gemini-client.ts#L51) using the Gemini ai.model.

## How to Run
1. Create GCP Bucket and add research files
2. Create a data source in the Vertex AI Search Project.
3. Update the configs in discoveryEngine.ts
4. Get Gemini API Key and configure it in the gemini-clints.ts
5. Run the app `npm i` and `npm run dev`

## How the Application Works

The application works by taking a user's query and sending it to a backend service. This service interacts with Google Vertex AI Search, which has pre-indexed a collection of PDF documents related to biodiversity and conservation. Vertex AI Search retrieves the most relevant passages from these documents based on the user's query. These retrieved passages, along with the original query, are then passed to a large language model (like Gemini) hosted on Vertex AI. The language model uses this information to generate a comprehensive and informed answer, which is then sent back to the user interface for display. This process of combining retrieval with generation is known as Retrieval-Augmented Generation (RAG), and it allows the system to provide answers grounded in specific, up-to-date information from the provided PDF files.
