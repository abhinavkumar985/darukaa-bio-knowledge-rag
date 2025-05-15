# Biodiversity and Conservation Knowledge RAG System

This project aims to build a Retrieval-Augmented Generation (RAG) system to provide accurate and relevant information on biodiversity and conservation topics, leveraging Google Cloud and Vertex AI Search.

## Overall Goal

To create a robust and user-friendly system that can answer complex questions about biodiversity and conservation by retrieving information from a curated knowledge base (PDF documents) and generating informative responses.

## Core Components

*   **Knowledge Base:** A collection of relevant PDF documents on biodiversity and conservation.
*   **Indexing and Retrieval:** Using Google Vertex AI Search to index the PDF documents and retrieve relevant passages based on user queries.
*   **Language Model:** A powerful language model (e.g., Gemini) to generate coherent and informative answers based on the retrieved information.
*   **User Interface:** A web application (built with Next.js) for users to interact with the system, input queries, and view responses.

## Recommended Google Cloud Tools

*   **Google Vertex AI Search:** For indexing and retrieving information from the PDF knowledge base.
*   **Google Cloud Storage:** To store the PDF documents.
*   **Google Cloud Functions or Cloud Run:** For deploying the backend logic that handles user queries and interacts with Vertex AI Search and the language model.
*   **Vertex AI:** To access and utilize powerful language models.

## Step-by-Step Guide

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

## Focus for the Hacking Session

The primary focus for the hacking session will be on **Phase 1: Setting up the Knowledge Base and Indexing**. This involves curating the PDF documents, uploading them to Cloud Storage, and successfully configuring and running the indexing process with Google Vertex AI Search.

## Key Considerations

*   **Document Quality:** The accuracy and relevance of the knowledge base directly impact the system's performance.
*   **Query Formulation:** How user queries are formulated can affect the retrieval results.
*   **Language Model Prompting:** Crafting effective prompts for the language model is crucial for generating high-quality answers.
*   **Scalability:** Consider the expected volume of queries and choose scalable Google Cloud services.

## Tips

*   Start with a small set of documents for initial testing.
*   Utilize the Vertex AI Search console for debugging and monitoring the indexing process.
*   Explore different prompting techniques for the language model.
*   Iterate on the knowledge base and indexing configuration based on testing results.

## How the Application Works

The application works by taking a user's query and sending it to a backend service. This service interacts with Google Vertex AI Search, which has pre-indexed a collection of PDF documents related to biodiversity and conservation. Vertex AI Search retrieves the most relevant passages from these documents based on the user's query. These retrieved passages, along with the original query, are then passed to a large language model (like Gemini) hosted on Vertex AI. The language model uses this information to generate a comprehensive and informed answer, which is then sent back to the user interface for display. This process of combining retrieval with generation is known as Retrieval-Augmented Generation (RAG), and it allows the system to provide answers grounded in specific, up-to-date information from the provided PDF files.

## Getting Started

To get started, take a look at src/app/page.tsx.