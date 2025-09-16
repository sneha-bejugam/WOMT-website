export const environment = {
  production: false,
  azureSpeech: {
    subscriptionKey: 'Removed Key', // Replace with your actual key
    region: 'eastus', // Replace with your region (e.g., 'eastus', 'westus2')
    language: 'en-US'
  },
  azureOpenAI: {
    endpoint: 'https://YOUR_RESOURCE_NAME.openai.azure.com',
    apiKey: 'YOUR_AZURE_OPENAI_API_KEY',
    deploymentName: 'YOUR_DEPLOYMENT_NAME' // e.g., 'gpt-4', 'gpt-35-turbo'
  }
};