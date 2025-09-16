// File: netlify/functions/get-speech-token.js

// This uses the Node.js 'fetch' API, which is available in Netlify functions
exports.handler = async function(event, context) {
  
  // Get your secrets from Netlify's environment variables
  const speechKey = process.env.AZURE_SPEECH_KEY;
  const speechRegion = process.env.AZURE_SPEECH_REGION;

  if (!speechKey || !speechRegion) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server is missing Azure credentials.' })
    };
  }

  const tokenEndpoint = `https://%7BspeechRegion%7D.api.cognitive.microsoft.com/sts/v1.0/issueToken`;

  try {
    const res = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': speechKey,
        'Content-Length': '0'
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Failed to get token from Azure: ${errorText}` })
      };
    }

    // On success, send the plain text token back to your app
    const token = await res.text();
    return {
      statusCode: 200,
      body: token
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Server error: ${error.message}` })
    };
  }
}