import { PDFPayload } from '../types';

export const generatePDF = async (payload: PDFPayload): Promise<void> => {
  const webhookUrl = 'https://n8n-93c3.onrender.com/webhook-test/59e8c7f0-f24f-47f8-b263-da82042e978d';

  // Convert payload to URL parameters for GET request
  const params = new URLSearchParams();
  params.append('content', payload.content);
  params.append('images', JSON.stringify(payload.images));
  if (payload.title) {
    params.append('title', payload.title);
  }

  const fullUrl = `${webhookUrl}?${params.toString()}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      let errorText = '';
      try {
        errorText = await response.text();
        // Limit error text to first 300 characters
        if (errorText.length > 300) {
          errorText = errorText.substring(0, 300) + '...';
        }
      } catch {
        errorText = 'No additional error details available';
      }

      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // Request sent successfully, webhook will handle the response
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while generating PDF');
  }
};
