# AI PDF Generator

A modern, responsive web application that transforms user descriptions and images into professional PDFs using an external n8n webhook. Built with React, TypeScript, and Tailwind CSS featuring a cyberpunk neon-on-dark theme.

## Features

- **AI-Powered PDF Generation**: Describe your content and let AI craft the PDF
- **Image Support**: Upload up to 10 images (PNG, JPG, JPEG, WebP) with drag & drop
- **Customizable Options**: Configure page size, orientation, margins, and document title
- **Real-time Preview**: See a lightweight preview of your content
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Cyberpunk-inspired design with neon accents and glass panels

## Environment Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Configure your n8n webhook URL:**
   ```env
   VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/generate-pdf
   ```

3. **Optional - Add authentication token:**
   ```env
   VITE_PDF_TOKEN=your-optional-token-here
   ```

## Installation & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## N8N Webhook Configuration

### Required Setup

Your n8n webhook should:
- Accept POST requests to `/webhook/generate-pdf`
- Use HTTPS (required for production)
- Return a PDF file with `Content-Type: application/pdf`

### Request Format

The application sends JSON data in this format:

```json
{
  "content": "User's description of what the PDF should contain",
  "images": ["data:image/png;base64,iVBOR...", "data:image/jpeg;base64,/9j/4AA..."],
  "options": {
    "pageSize": "A4",
    "orientation": "portrait",
    "margins": {
      "top": "20mm",
      "right": "15mm", 
      "bottom": "20mm",
      "left": "15mm"
    }
  },
  "title": "Optional document title"
}
```

### CORS Configuration

If you encounter CORS errors:

1. In your n8n Webhook node settings:
   - Add your site's origin to "Allowed Origins"
   - Enable POST and OPTIONS methods
   - Set appropriate CORS headers

2. Example CORS headers to return:
   ```
   Access-Control-Allow-Origin: https://your-app-domain.com
   Access-Control-Allow-Methods: POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type, X-PDF-Token
   ```

### Authentication (Optional)

If you set `VITE_PDF_TOKEN`, the application will send it as:
```
X-PDF-Token: your-token-value
```

You can validate this token in your n8n workflow for additional security.

## Project Structure

```
src/
├── components/
│   ├── ImagePicker.tsx      # Image upload and management
│   ├── OptionsPanel.tsx     # PDF configuration options
│   ├── Preview.tsx          # Content preview component
│   └── ConfigBanner.tsx     # Configuration help banner
├── utils/
│   ├── file.ts              # File handling utilities
│   └── pdfGenerator.ts      # PDF generation logic
├── types/
│   └── index.ts             # TypeScript type definitions
└── App.tsx                  # Main application component
```

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **File Handling**: Native FileReader API

## Browser Support

- Modern browsers with ES2020+ support
- FileReader API support required for image uploads
- Fetch API support required for webhook communication

## Troubleshooting

### Common Issues

1. **"Configuration Required" banner shows:**
   - Ensure `VITE_N8N_WEBHOOK_URL` is set in your `.env` file
   - Restart the development server after adding environment variables

2. **CORS errors:**
   - Configure your n8n webhook to allow your domain
   - Ensure HTTPS is used for production deployments

3. **PDF generation fails:**
   - Check that your n8n webhook is accessible and returns proper PDF content
   - Verify the webhook URL is correct and includes the full path
   - Check browser network tab for detailed error messages

4. **Images not uploading:**
   - Ensure files are valid image types (PNG, JPG, JPEG, WebP)
   - Check file size limits (10MB per image)
   - Maximum 10 images allowed per PDF

## License

© 2025 PDF Builder. All rights reserved.