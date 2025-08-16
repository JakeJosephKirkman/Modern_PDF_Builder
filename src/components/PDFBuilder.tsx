import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { PDFContent, UploadedImage, FormattingOptions } from '../types';
import { generatePDF } from '../utils/pdfGenerator';
import TextEditor from './TextEditor';
import ImageUpload from './ImageUpload';
import LoadingSpinner from './LoadingSpinner';

const PDFBuilder: React.FC = () => {
  const [content, setContent] = useState<PDFContent>({
    text: '',
    images: [],
    formatting: {
      bold: false,
      italic: false,
      heading: 'none',
    },
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTextChange = (text: string) => {
    setContent(prev => ({ ...prev, text }));
  };

  const handleFormattingChange = (formatting: FormattingOptions) => {
    setContent(prev => ({ ...prev, formatting }));
  };

  const handleImagesAdd = (newImages: UploadedImage[]) => {
    setContent(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleImageRemove = (imageId: string) => {
    setContent(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId),
    }));
  };

  const handleGeneratePDF = async () => {
    if (!content.text.trim() && content.images.length === 0) {
      alert('Please add some content or images before generating the PDF.');
      return;
    }

    setIsGenerating(true);
    
    try {
      await generatePDF(content);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const canGeneratePDF = content.text.trim().length > 0 || content.images.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D0D0D] to-[#1A1A1A] border-b border-[#00E5FF]/20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-[#00E5FF] mr-3 drop-shadow-[0_0_10px_#00E5FF]" />
              <h1 className="text-4xl font-light text-[#E0E0E0] drop-shadow-[0_0_20px_#00E5FF]">
                PDF Generator
              </h1>
            </div>
            <p className="text-lg text-[#8A8A8A] max-w-2xl mx-auto font-light">
              Transform your ideas into professional documents
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-[#1A1A1A]/80 to-[#0D0D0D]/80 backdrop-blur-sm rounded-xl shadow-2xl border border-[#00E5FF]/30 overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.1)]">
          <div className="p-8 space-y-8">
            {/* Text Editor */}
            <TextEditor
              text={content.text}
              onTextChange={handleTextChange}
              formatting={content.formatting}
              onFormattingChange={handleFormattingChange}
            />
            
            {/* Image Upload */}
            <ImageUpload
              images={content.images}
              onImagesAdd={handleImagesAdd}
              onImageRemove={handleImageRemove}
            />
            
            {/* Generate Button */}
            <div className="flex flex-col items-center space-y-4 pt-6 border-t border-[#00E5FF]/20">
              {isGenerating ? (
                <LoadingSpinner />
              ) : (
                <button
                  onClick={handleGeneratePDF}
                  disabled={!canGeneratePDF}
                  className={`flex items-center px-8 py-4 rounded-xl font-medium text-[#0D0D0D] transition-all duration-300 transform hover:scale-105 ${
                    canGeneratePDF
                      ? 'bg-gradient-to-r from-[#00FF85] to-[#00E5FF] hover:from-[#00FF85] hover:to-[#FF00A0] shadow-lg hover:shadow-xl shadow-[0_0_20px_rgba(0,255,133,0.3)] hover:shadow-[0_0_30px_rgba(0,255,133,0.5)]'
                      : 'bg-[#8A8A8A] cursor-not-allowed'
                  }`}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Generate PDF →
                </button>
              )}
              
              {!canGeneratePDF && (
                <p className="text-sm text-[#8A8A8A] text-center">
                  Add some text content or upload images to generate your PDF
                </p>
              )}
            </div>
          </div>
        </div>
        
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#0D0D0D] to-[#1A1A1A] border-t border-[#00E5FF]/20 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-[#8A8A8A] text-sm font-light">
            Powered by advanced AI technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PDFBuilder;