export interface PDFPayload {
  content: string;
  images: string[];
  title?: string;
}

export interface AppState {
  description: string;
  images: string[];
  title: string;
  isGenerating: boolean;
  error: string | null;
  success: string | null;
}