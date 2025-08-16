export interface PDFOptions {
  pageSize: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margins: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}

export interface PDFPayload {
  content: string;
  images: string[];
  options: PDFOptions;
  title?: string;
}

export interface AppState {
  description: string;
  images: string[];
  options: PDFOptions;
  title: string;
  isGenerating: boolean;
  error: string | null;
  success: string | null;
}