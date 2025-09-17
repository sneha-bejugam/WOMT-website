const { BlobServiceClient } = require('@azure/storage-blob');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_STORAGE_CONTAINER || 'lessons';

  if (!connectionString) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Azure Storage not configured' })
    };
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const method = event.httpMethod;
    const path = event.path.split('/').pop(); // Get the last part of the path

    switch (method) {
      case 'GET':
        if (path === 'list') {
          // List all lessons
          const blobs = [];
          for await (const blob of containerClient.listBlobsFlat()) {
            blobs.push({
              name: blob.name,
              lastModified: blob.properties.lastModified,
              size: blob.properties.contentLength,
              url: `${containerClient.url}/${blob.name}`
            });
          }
          return {
            statusCode: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(blobs)
          };
        } else {
          // Get specific lesson
          const blobName = event.queryStringParameters?.name;
          if (!blobName) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'Blob name required' })
            };
          }
          
          const blobClient = containerClient.getBlobClient(blobName);
          const downloadResponse = await blobClient.download();
          const content = await streamToBuffer(downloadResponse.readableStreamBody);
          
          return {
            statusCode: 200,
            headers: { 
              ...headers, 
              'Content-Type': downloadResponse.contentType || 'application/json' 
            },
            body: content.toString()
          };
        }

      case 'POST':
        // Upload lesson
        const { name, content, contentType = 'application/json' } = JSON.parse(event.body);
        if (!name || !content) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Name and content required' })
          };
        }

        const uploadBlobClient = containerClient.getBlockBlobClient(name);
        await uploadBlobClient.upload(content, content.length, {
          blobHTTPHeaders: { blobContentType: contentType }
        });

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({ 
            message: 'Lesson uploaded successfully',
            url: uploadBlobClient.url 
          })
        };

      case 'DELETE':
        // Delete lesson
        const deleteName = event.queryStringParameters?.name;
        if (!deleteName) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Blob name required' })
          };
        }

        const deleteBlobClient = containerClient.getBlobClient(deleteName);
        await deleteBlobClient.deleteIfExists();

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Lesson deleted successfully' })
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

  } catch (error) {
    console.error('Azure Storage error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// Helper function to convert stream to buffer
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}