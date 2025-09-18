// File: netlify/functions/azure-video-storage.ts

import { Handler, HandlerEvent } from "@netlify/functions";
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

// Use bracket notation to access environment variables
const STORAGE_ACCOUNT_NAME = process.env['AZURE_STORAGE_ACCOUNT_NAME'];
const STORAGE_ACCOUNT_KEY = process.env['AZURE_STORAGE_ACCOUNT_KEY'];
const CONTAINER_NAME = process.env['AZURE_CONTAINER_NAME'];

// Check if credentials are available
if (!STORAGE_ACCOUNT_NAME || !STORAGE_ACCOUNT_KEY || !CONTAINER_NAME) {
  throw new Error("Azure Storage environment variables are not fully set.");
}

// Create a client to interact with Azure Blob Storage
const sharedKeyCredential = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY);
const blobServiceClient = new BlobServiceClient(
  `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  sharedKeyCredential
);

const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  
  const { action, name } = event.queryStringParameters || {};

  try {
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    let body: any;

    switch (action) {
      case 'list':
        const blobs = [];
        for await (const blob of containerClient.listBlobsByHierarchy("/", { includeMetadata: true })) {
          if (blob.kind === 'blob') {
            blobs.push({
              name: blob.name,
              url: `${containerClient.url}/${blob.name}`,
              size: blob.properties.contentLength,
              lastModified: blob.properties.lastModified,
              contentType: blob.properties.contentType,
              metadata: blob.metadata || {},
            });
          }
        }
        body = blobs;
        break;

      case 'get':
        if (!name) {
          return { statusCode: 400, headers, body: JSON.stringify({ error: 'Blob "name" is required.' }) };
        }
        const blobClient = containerClient.getBlobClient(name);
        const properties = await blobClient.getProperties();
        body = {
          name: name,
          url: blobClient.url,
          size: properties.contentLength,
          lastModified: properties.lastModified,
          contentType: properties.contentType,
          metadata: properties.metadata || {},
        };
        break;

      default:
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid "action" specified. Use "list" or "get".' }) };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(body),
    };

  } catch (error) {
    // FIX: Check if the caught object is an instance of Error before accessing .message
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Azure function error:', errorMessage);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Server error: ${errorMessage}` }),
    };
  }
};

export { handler };