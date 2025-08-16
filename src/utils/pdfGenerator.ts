import { PDFPayload } from '../types';

export const generatePDF = async (payload: PDFPayload): Promise<Blob> => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  const token = import.meta.env.VITE_PDF_TOKEN;

  if (!webhookUrl) {
    throw new Error('VITE_N8N_WEBHOOK_URL environment variable is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['X-PDF-Token'] = token;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
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

    const blob = await response.blob();
    
    // Verify it's actually a PDF
    if (blob.type !== 'application/pdf' && !blob.type.includes('pdf')) {
      console.warn('Response may not be a PDF:', blob.type);
    }

    return blob;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while generating PDF');
  }
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};