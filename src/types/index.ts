export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  base64: string;
}

export interface FormattingOptions {
  bold: boolean;
  italic: boolean;
  heading: 'none' | 'h1' | 'h2' | 'h3';
}

export interface PDFContent {
  text: string;
  images: UploadedImage[];
  formatting: FormattingOptions;
}