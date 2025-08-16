import { PDFContent } from '../types';

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generatePDF = async (content: PDFContent): Promise<void> => {
  const webhookUrl = 'https://n8n-93c3.onrender.com/webhook/59e8c7f0-f24f-47f8-b263-da82042e978d';
  
  try {
    // Prepare the payload for the webhook
    const payload = {
      text: content.text,
      formatting: content.formatting,
      images: content.images.map(img => ({
        id: img.id,
        name: img.file.name,
        base64: img.base64,
        type: img.file.type
      }))
    };

    // Send the content to the webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
    }

    // Check if the response contains a PDF blob or download URL
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/pdf')) {
      // If the webhook returns a PDF directly, download it
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      // If the webhook returns JSON with a download URL
      const result = await response.json();
      if (result.downloadUrl) {
        window.open(result.downloadUrl, '_blank');
      } else {
        console.log('PDF generation completed:', result);
        alert('PDF has been generated successfully!');
      }
    }
    
  } catch (error) {
    console.error('Error generating PDF via webhook:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};