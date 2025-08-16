import { PDFPayload } from '../types';

export const generatePDF = async (payload: PDFPayload): Promise<Blob> => {
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
    // First, call the webhook to get the PDF URL
    const webhookResponse = await fetch(fullUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
    });

    if (!webhookResponse.ok) {
      let errorText = '';
      try {
        errorText = await webhookResponse.text();
        // Limit error text to first 300 characters
        if (errorText.length > 300) {
          errorText = errorText.substring(0, 300) + '...';
        }
      } catch {
        errorText = 'No additional error details available';
      }

      throw new Error(`HTTP ${webhookResponse.status}: ${errorText}`);
    }

    // Parse the JSON response to get the PDF URL
    const responseData = await webhookResponse.json();
    
    if (!responseData.url) {
      throw new Error('No PDF URL found in webhook response');
    }
    
    // Now download the PDF from the provided URL
    const pdfResponse = await fetch(responseData.url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
    });
    
    if (!pdfResponse.ok) {
      throw new Error(`Failed to download PDF: HTTP ${pdfResponse.status}`);
    }
    
    // Get the PDF blob from the download URL
    const blob = await pdfResponse.blob();
    
    // Verify it's a PDF
    if (blob.type !== 'application/pdf' && !blob.type.includes('pdf')) {
      throw new Error('Response is not a PDF file');
    }
    
    return blob;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while generating PDF');
  }
};
